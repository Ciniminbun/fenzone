// e621.net API handler

// utility stufs
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function filterOutliers(arr) {  

  // Copy the values, rather than operating on references to existing values
  var values = arr.concat();

  // Then sort
  values.sort( function(a, b) {
          return a - b;
       });

  /* Then find a generous IQR. This is generous because if (values.length / 4) 
   * is not an int, then really you should average the two elements on either 
   * side to find q1.
   */     
  var q1 = values[Math.floor((values.length / 4))];
  // Likewise for q3. 
  var q3 = values[Math.ceil((values.length * (3 / 4)))];
  var iqr = q3 - q1;

  // Then find min and max values
  var maxValue = q3 + iqr*1.5;
  var minValue = q1 - iqr*1.5;

  // Then filter anything beyond or beneath these values.
  var filteredValues = values.filter(function(x) {
      return (x <= maxValue) && (x >= minValue);
  });

  // Then return
  return filteredValues;
}

function geometricMean(arr)
{
  // let length = arr.length, num = 0, i = 0;
  // while (i < length && !(i > length)) {
  //   num = (arr[i] + arr[i+1]) * (2 + num);
  //   i += 2;
  // }
  let product = arr.reduce((a, b) => a * b),
  gm = Math.pow(product, 1 / arr.length);
  // console.log('product', product, 'gm', gm);
  return gm;
}

// DOM
const inputBar = document.getElementById("input"),
// threshInput = document.getElementById("threshInput"),
includeInput = document.getElementById("include"),
imgBoard = document.getElementById("imgboard"),
debugElement = document.getElementById("debug"),
loader = document.getElementById("loader");

// Get URL Input
const queryString = window.location.search, urlParams = new URLSearchParams(queryString);
let search = urlParams.get('tags'), thresh = urlParams.get('thresh'), include = urlParams.get('include');
if (search == null || search == "") {console.log(`search: ${'none'}`)} else {console.log(`search: ${search}`)}
if (include == null || include == "") {include = ""; console.log(`includes: ${'none'}`)} else {console.log(`includes: ${include}`)}
// if (thresh == null || thresh == "") {thresh = 1000; console.log(`thresh: ${thresh}`)} else {console.log(`thresh: ${thresh}`)}
inputBar.value = search;
// threshInput.value = thresh;
includeInput.value = include;

// Calls
async function e6GetPost(id){
  const response = await fetch(`https://e621.net/posts/${id}.json`),
  data = await response.json(), post = data.post;
  return post;
}

async function e6Search(terms){
    const response = await fetch(`https://e621.net/posts.json?tags=${terms}`),
    data = await response.json(), posts = data.posts;
    return posts;
}

// Math
function e6Avg(posts){
  let total = 0;
  for (post of posts) {
    total += post.score.total;
  }
  return total / posts.length;
}

function tagStats(posts) {
    // Makes and returns an obj with weights of all tags from an e6 json
    let stats = {};
    categories = ['general', 'species', 'character', 'artist', 'lore']
    for (post of posts) {
      for (cat of categories) {
        for (tag of post.tags[cat]) {
          if (stats[tag]) {stats[tag] += 1;} else {stats[tag] = 1}
        }
      }
    }
    
    return stats
}

// Combo/Eval Calls
async function removeTop(stats){
  let response, tags = [], topTags = [], i = 1;

  while (i < 10) {
    response = await fetch(`https://e621.net/tags.json?page=${i}&search[category]=0&search[order]=count`);
    data = await response.json();
    if (data.length == 0) {break}
    tags = tags.concat(data);
    i++;
  }

  for (tag of tags) {
    if (tag.post_count > 150000) {topTags.push(tag.name)}
  }
  topTags.push("mammal");
  topTags.push("conditional_dnp");
  topTags.push("unknown_artist");
  topTags.push("large_group");

  // console.log(Object.keys(stats).length);
  for (tag of Object.keys(stats)) {
    if (topTags.includes(tag)) {delete stats[tag]}
  }
  // console.log(Object.keys(stats).length);

  let highest = Math.max(...Object.values(stats));
  for (tag of Object.keys(stats)) {
    stats[tag] = (stats[tag] / highest) + 1;
  }
  highest = Math.max(...Object.values(stats));
  // console.log(stats)
  return stats
}

async function e6Suggest(username){
  // get tag stats for input, return random high score posts
  // check if user exists
  const userResp = await fetch(`https://e621.net/users.json?search[name_matches]=${username}`),
  userData = await userResp.json();
  if (userData.lenght == 0) {
    return 
  }
  debugElement.innerHTML = "getting user data...";
  let blacklist = " -animated -flash -webm -loli -shota", basePosts = [], newPosts = [];
  const sugPosts = [];

  for (let i = 0; i < 2; i++) {
    sleep(500);
    basePosts = basePosts.concat(await e6Search(`fav:${username} ${blacklist} order:random&limit=250`));
  }
  // console.log(basePosts.length);
  debugElement.innerHTML = "evaluating base posts...";
  let stats = await removeTop(tagStats(basePosts));

  debugElement.innerHTML = "clearing top e6 tags...";
  

  debugElement.innerHTML = "collecting random posts...";

  let avg = 0, totalScore = 0, totalPosts = 0, scoresArr = [0, 0], highestScore = 0,
  score = 1, page, categories = ['general', 'species', 'character', 'artist', 'lore'];

  for (let i = 0; i < 5; i++) {
    page = await e6Search(`order:random ${include} &limit=320`);
    for (post of page) {
      score = 1;
      if (post.tags.species.length > 15) {continue}
      for (cat of categories) {
        for (tag of post.tags[cat]) {
          if (stats[tag]) {score *= stats[tag];}
        }
      }

      if (score > highestScore) {highestScore = score}
      sugPosts.push({post: post, score: score.toFixed(0)}); scoresArr.push(score);
      totalScore += score;
      totalPosts++;
      avg = totalScore / ( (i - 1) * 320 + totalPosts);

      // debugElement.innerHTML = `evaulating posts from set ${tries}... found: ${sugPosts.length}<br>avg score: ${numberWithCommas(avg.toFixed(0))}, highest: ${numberWithCommas(highestScore.toFixed(0))}`;
    }
  }

  

  debugElement.innerHTML = "evaulating random posts...";

  let sortedPosts = sugPosts.sort(function(a, b){return b.score - a.score});
  console.log(sortedPosts);
  sortedPosts = sortedPosts.splice(10);
  console.log("average:", avg, "highest:", highestScore);
  debugElement.innerHTML = `avg: ${numberWithCommas(avg.toFixed(0))}, highest: ${numberWithCommas(highestScore.toFixed(0))}`;
  return sortedPosts
}

// execution
async function fillBoard(){
  if (search == "" || search == null) {return}
  loader.style.display = "block";
  debugElement.style.display = "block";
  const posts = await e6Suggest(search);
  // debugElement.style.display = "none";
  debugElement.style.paddingTop = "15px";
  loader.style.display = "none";
  imgBoard.style.display = "grid";
  
  for (postdata of posts){// if (!(postdata.post.preview.url == null)) {
    let post = postdata.post, score = postdata.score;
    imgBoard.innerHTML += `<a href="https://e621.net/posts/${post.id}" target="_blank" class="imgcontainer"><img src="${post.preview.url}">${numberWithCommas(score)}</a>`
  }// }
  
  // console.log(e6Suggest(inputBar.value))
}
