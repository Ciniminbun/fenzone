// create the cards for the main container

const ideas = [
    ["Make theideasdotcom generate ideas", "automation"],
    ["Sell Drugs", "investment"],
    ["sell drugs to the people who sell drugs", "cashmoney"],
    ["What if we invested in the Venezuelan Bolivar", "stocks trading profit"],
    ["What if we use diplomacy to get the Venezuelan Bolivar to invest in us", "diplomacy investment"],
    ["steal other people's ideas then make them worth of ideasdotcom", "theft stealing"],
    ["take the internet, but make it small", "smallBusiness networking internet"],
    ["make the internet easier to understand", "internet understand zen"],
    ["what if there was a discord server that played discord?", "DPD Discord"],
    ["make big money", "ideas finance"],
    ["put salt in the fridge", "food salty cold"],
    ["what if we took a hamburger and made it small, but it expanded as you ate it", "food inflation efficieny"],
    ["make ice, but it isn't cold", "cold food water"],
    ["buy theideasdotcom then send the idea to a popular business man and sell them the website", "ideas trading profit"],
    ["what if there was the internet but without liberals?", "utopia internet political"],
    ["idea: what if we had weed", "explore expand"],
    ["voting app\nrun by theideasdotcom", "voting votes elections internet political"],
    ["ideasdotcom idea: make cum great again", "cum cumrights"],
];

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const search = urlParams.get('tags')
console.log(search)

function getTags(index) {
    var formatted = "";
    const tags = ideas[index][1].split(" ")
    for (let x = 0; x < tags.length; x++) {
        formatted += `<a href='?tags=${tags[x]}'>#${tags[x]}</a> `
    }
    return formatted
}

function checkSearch(index) {
    let terms = search.split(" ")
    count = 0
    for (let i = 0; i < terms.length; i++)
        if (ideas[index][1].toLocaleLowerCase().includes(terms[i].toLocaleLowerCase())){
            count += 1
        }
    
    if (count == terms.length) {
        return true
    }
    else {
        return false
    }
}

function makeCards() {
    var combined = "";
    for (let i = 0; i < ideas.length; i++) {
        if (search == undefined || search == "" || checkSearch(i)) {
            combined += `<div class='card'><img src='images/lightbulb.png' class='unselectable'></img><div class='content'>${ideas[i][0]}</div><div class='tags'>${getTags(i)}</div></div>\n`
        }
    }

    if (combined == "") {
        combined = `Sorry! No results for ${search}:(`
    }

    return combined
}

function getTagUL() {
    // gets tags from ideas array and makes an html unordered list
    var combined = "";
    for (let x = 0; x < ideas.length; x++) {
        combined += ideas[x][1] + " "
    }
    const biglist = combined.split(" ");
    let tags = [...new Set(biglist)]; // this just removes repeats (very lazy)
    var formatted = "<li><h3>All Tags</h3></li>\n"
    for (let x = 0; x < tags.length - 1; x++) {
        formatted += `<li><a href='?tags=${tags[x]}'>#${tags[x]}</a></li>\n`
    }
    return formatted
}

document.getElementById("card-grid").innerHTML = makeCards();
document.getElementById("taglist").innerHTML = getTagUL();
document.getElementById("tags").value = search;


// theme toggle
let theme = 'light';
// localStorage.clear();
if (localStorage.getItem('theme') != undefined) {
    console.log(`found stored theme: ${localStorage.getItem('theme')}`);
} else {
    console.log(`no stored theme`)
    localStorage.setItem('theme', 'light');
}

theme = localStorage.getItem('theme');

if (theme == 'dark') {
    document.body.classList = 'dark-theme';
} else {
    document.body.classList = 'light-theme';
}

function togTheme() {
    console.log(`toggling theme, current theme is ${localStorage.getItem('theme')}`);
    theme = localStorage.getItem('theme');
    if (theme == 'light') {
        document.body.classList = 'dark-theme';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList = 'light-theme';
        localStorage.setItem('theme', 'light');
    }
    console.log(`new stored theme is ${localStorage.getItem('theme')}`)
    console.log(`theme var ${theme}`)
}