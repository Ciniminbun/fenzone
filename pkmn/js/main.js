
// url stuf
const queryString = window.location.search, urlParams = new URLSearchParams(queryString);
let userData = urlParams.get('u'), mode = urlParams.get('mode'), pkId = parseInt(urlParams.get('pkid')), userName = urlParams.get('name');
userData = pkmnDecode(userData);

// DOM stuf
const body = document.body, main = document.getElementsByTagName('main')[0];

async function pokeAPI(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`),
  data = await response.json();
  return data;
}

function updateData(data, id, smash) {
  let change;
  if (smash) {
    change = '0';
  } else {
    change = '1';
  }

  id -= 1;
  let updated = data.slice(0, id) + change + data.slice(id + 1);
  return updated;
}

function viewResults() {
  let content = "", item = '', style = '', smashed = 0;
  for (i in userData) {
    item = `<p>${pkmnNames[i].toUpperCase()}</p><img src="img/box/${pkmnNames[i].toLowerCase()}.png">`
    if (userData[i] == "0"){
      item += "<div><b>SMASH</b></div>"
      style = 'background-color: #e0e0e0; color: black;'
      smashed++;
    } else {
      item += "<div>pass</div>"
      style = 'background-color: #2c2c2c; color: white;'
    }
    content += `<a href="?mode=edit&name=${userName}&pkid=${parseInt(i) + 1}&u=${pkmnEncode(userData)}" id="item" style="${style}">${item}</a>`
  }
  return `${smashed} smashed out of 898 (${((smashed / 898) * 100).toFixed(2)}%), click on a pokemon to edit its status<div id="results">${content}</div>`;
}

async function editPkCode() {
  // want top row buttons, back, go to, and next; want middle pkmn name and id #; bottom smash or pass
  let next, back;
  if (pkId + 1 < 898) {
    next = `<a class='button' href='?mode=edit&name=${userName}&pkid=${pkId + 1}&u=${pkmnEncode(userData)}'>next</a>`
  } else { next = `<a id='button'>next</a>`}
  if (pkId - 1 > 0) {
    back = `<a class='button' href='?mode=edit&name=${userName}&pkid=${pkId - 1}&u=${pkmnEncode(userData)}'>back</a>`
  } else { back = `<a id='button'>back</a>`}

  let navButs = `Making list for ${userName}<br><div id="nav">${back} ${next}</div>`;

  let name, id, image;
  if (pkId < 10) {
    id = "00" + pkId;
  }
  else if (pkId < 100) {
    id = "0" + pkId;
  }
  else {
    id = "" + pkId;
  }
  name = `${pkmnNames[pkId - 1].toUpperCase()} #${id}`;

  image = await pokeAPI(pkId);
  image = image.sprites.other['official-artwork'].front_default;

  let pokemon = `<h3 id="name">${name}</h3><img src="${image}">`;

  let smash, pass;
  smash = `<a class='button smash' href='?mode=edit&name=${userName}&pkid=${pkId + 1}&u=${pkmnEncode(updateData(userData, pkId, true))}'>SMASH</a>`;
  pass = `<a class='button pass' href='?mode=edit&name=${userName}&pkid=${pkId + 1}&u=${pkmnEncode(updateData(userData, pkId, false))}'>pass</a>`;
  view = `<a class='button' href='?mode=view&name=${userName}&pkid=${pkId}&u=${pkmnEncode(userData)}'>view all</a>`;
  let choiceButs = `<div id="nav">${smash}${view}${pass}</div>`;

  return `<div id="edit">${navButs}${pokemon}${choiceButs}</div>`
}



window.onload = async function (event) {
  if (mode == "view") {
    main.innerHTML = viewResults();
  } else if (mode == "edit") {
    main.innerHTML = await editPkCode();
  }
};