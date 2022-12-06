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
            <img src="${recsList[i].thumb}" onclick="OpenImage(this)">
            <h3><a href="${recsList[i].link}" target="_blank">${recsList[i].title}</a></h3>
            <h6>${Format8Date(recsList[i].date, 1)}</h6>
            ${recsList[i].desc}<hr>
        `
    }
    thing += `</div>`
    return thing
}

function OpenImage(imgEl) {
    let widthThing;
    if (imgEl.offsetWidth > imgEl.offsetHeight) {
        widthThing = 700;
    } else {
        widthThing = 500;
    }

    let newHeight = widthThing * (imgEl.offsetHeight / imgEl.offsetWidth);
    console.log(newHeight);

    let imgStyle = `style="
        position: absolute;
        top: 0;
        width: ${widthThing}px;
        margin-left: calc(50vw - ${(widthThing/2)}px);
        margin-top: calc(50vh - ${newHeight/2}px);
        z-index: 99;
        image-rendering: auto;
        box-shadow: 2.7px 5.4px 5.4px hsl(0deg 0% 0% / 0.35);
        "`,
    shade = `
        onclick="CloseImage()"
        style="
        background-color: rgba(20,20,20,0.9); 
        width: 100vw; 
        height: 100vh; 
        position: fixed;
        top: 0;
        left: 0;
        z-index: 50;
        "`;
    document.getElementsByTagName('body')[0].innerHTML += 
        `<img class="imgClose" src='${imgEl.src}' ${imgStyle}>
        <div class="imgClose" ${shade}></div>`;
}

function CloseImage() {
    let bodyStuff = document.getElementsByTagName('body')[0],
    children = bodyStuff.children;
    for (let i = 0; i < 2; i++) {
        bodyStuff.removeChild(children[children.length - 1]);
    }
}
    
