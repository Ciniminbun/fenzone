// keys thing

// vars

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const search = urlParams.get('tags')
console.log(`search: ${search}`)

const titles = Object.keys(keys).sort();

// funcitons n stuff

function checkSearch(game) {
    let terms = search.split(" ")
    count = 0
    for (x of terms)
        if (game.toUpperCase().includes(x.toUpperCase())){
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
    for (game of titles) {
        if (search == undefined || search == "" || checkSearch(game)) {
            combined += `<div class='card' style='display: block;'>
                        <div class='content' style="text-align: center">
                        <a href="https://store.steampowered.com/search/?term=${game}" target="_blank">${game}</a><br>${keys[game].key}<br>expires: ${keys[game].exp}
                        </div>
                        </div>\n`
        }
    }

    if (combined == "") {
        combined = `Sorry! No results for ${search} :(`
    }

    return combined
}

function getSearchUL() {
    // gets titles from keys obj and makes an html unordered list

    let terms = document.getElementById("tags").value.toUpperCase();
    searchlist = [];
    count = 0;
    for (let i = 0; i < titles.length; i++){
        if (titles[i].toUpperCase().includes(terms)){
            searchlist.push(titles[i])
        }
    }
    if (terms == "" || searchlist.length < 1){
        document.getElementById("searchdrop").style.display = "none";
    }
    else {
        document.getElementById("searchdrop").style.display = "block";
    }

    var formatted = ""
    for (let x = 0; x < searchlist.length; x++) {
        formatted += `<li><a href='?tags=${searchlist[x]}'>${searchlist[x]}</a></li>\n`
    }
    document.getElementById("searchdrop").innerHTML = formatted;
}

document.getElementById("card-grid").innerHTML = makeCards();
document.getElementById("tags").value = search;
document.getElementById("searchdrop").style.display = "none";