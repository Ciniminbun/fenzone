function BuildFeed(desc) {
    thing = `<div id='feed'>${desc}<hr>`
    tempFeedList = feed.items;
    for (let i = 0; i < feed.items.length; i++){
        thing += `
            <h3><a href="${feed.items[i].link}">${feed.items[i].title}</a></h3>
            <h6>${Format8Date(feed.items[i].pubDate, 1)}</h6>
            ${feed.items[i].description}<hr>
        `
    }
    thing += `</div>`
    return thing
}

function Format8Date(raw, version) {
    raw = raw.toString();
    let months = ['fake', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',],
    versionList = [
        `${raw.slice(0,2)}/${raw.slice(2,4)}/${raw.slice(4,8)}`,
        `${months[parseInt(raw.slice(0,2))]} ${raw.slice(2,4)}, ${raw.slice(4,8)}`
    ];
    return versionList[version]
}

function BuildNav() {
    let yes = `<li><a href="https://cinimin.net">home</a></li>
    <li><a href="https://cinimin.net/about.html">about me</a></li>
    <li><a href="https://cinimin.net/recs.html">recs</a></li>
    <li><a href="https://cinimin.net/keys/">xtra keys</a></li>
    <br>
    <li><b>social</b></li>
    <hr>
    <li><a href="https://twitter.com/ciniminbun">twitter</a></li>
    <li><a href="https://ciniminbun.tumblr.com/">tumblr</a></li>
    <li><a href="https://cohost.org/slaterot">cohost</a></li>
    <br>`;

    for (i = 0; i < buttonList.length; i++) {
        yes += `<li><img src="https://cinimin.net/img/buttons/${buttonList[i]}"></li>`
    }

    return yes
}

function BuildRecs(desc) {
    thing = `<div id='feed'>${desc}<hr>`
    tempFeedList = recsList;
    for (let i = 0; i < recsList.length; i++){
        thing += `
            <img src="${recsList[i].thumb}">
            <h3><a href="${recsList[i].link}" target="_blank">${recsList[i].title}</a></h3>
            <h6>${Format8Date(recsList[i].date, 1)}</h6>
            ${recsList[i].desc}<hr>
        `
    }
    thing += `</div>`
    return thing
}
