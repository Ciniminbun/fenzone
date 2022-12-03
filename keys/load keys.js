// keys thing

// vars

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const search = urlParams.get('tags')
console.log(`search: ${search}`)

const titles = Object.keys(keys).sort();

// funcitons n stuff

// function checkSearch(game) {
//     let terms = search.split(" ")
//     count = 0
//     for (x of terms)
//         if (game.toUpperCase().includes(x.toUpperCase())){
//             count += 1
//         }
    
//     if (count == terms.length) {
//         return true
//     }
//     else {
//         return false
//     }
// }

function makeCards(desc) {
    var combined = `<div id="feed">${desc}`;
    for (game of titles) {
        combined += `
            <h3><a href="https://store.steampowered.com/search/?term=${game}" target="_blank">${game}</a></h3>
            <h6>expires: ${keys[game].exp}</h6>
            ${keys[game].key}<hr>
            `
    }

    return combined + '</div>'
}

// function getSearchUL() {
//     // gets titles from keys obj and makes an html unordered list

//     let terms = document.getElementById("tags").value.toUpperCase();
//     searchlist = [];
//     count = 0;
//     for (let i = 0; i < titles.length; i++){
//         if (titles[i].toUpperCase().includes(terms)){
//             searchlist.push(titles[i])
//         }
//     }
//     if (terms == "" || searchlist.length < 1){
//         document.getElementById("searchdrop").style.display = "none";
//     }
//     else {
//         document.getElementById("searchdrop").style.display = "block";
//     }

//     var formatted = ""
//     for (let x = 0; x < searchlist.length; x++) {
//         formatted += `<li><a href='?tags=${searchlist[x]}'>${searchlist[x]}</a></li>\n`
//     }
//     document.getElementById("searchdrop").innerHTML = formatted;
// }