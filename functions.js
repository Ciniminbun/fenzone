function BuildFeed(type, desc) {
    let head = `<div id='feed'>${desc}<hr>`;
    let allFeeds = [
        nav=()=> {
            let navFeed = `<li><a href="https://cinimin.net">home</a></li>
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
                navFeed += `<li><img src="https://cinimin.net/img/buttons/${buttonList[i]}"></li>`
            }
            return navFeed
        },
        index=()=> {
            for (let i = 0; i < feed.items.length; i++){
                head += `
                <h3><a href="${feed.items[i].link}">${feed.items[i].title}</a></h3>
                <h6>${Format8Date(feed.items[i].pubDate, 1)}</h6>
                ${feed.items[i].description}<hr>
            `
            }
            return head + `</div>`
        },
        recs=()=> {
            for (let i = 0; i < recsList.length; i++){
                head += `
                    <img src="${recsList[i].thumb}" onclick="OpenImage(this)">
                    <h3><a href="${recsList[i].link}" target="_blank">${recsList[i].title}</a></h3>
                    <h6>${Format8Date(recsList[i].date, 1)}</h6>
                    ${recsList[i].desc}<hr>
                `
            }
            return head + `</div>`
        }
    ];
    return allFeeds[type]();
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

function OpenImage(imgEl) {
    let widthThing;
    if (imgEl.offsetWidth > imgEl.offsetHeight) {
        widthThing = 700;
    } else {
        widthThing = 500;
    }

    let newHeight = widthThing * (imgEl.offsetHeight / imgEl.offsetWidth);
    console.log(newHeight);

    // refer to main.css for most of the important styling, classes popupImg and shade
    let imgStyle = `style="
        width: ${widthThing}px;
        margin-left: calc(50vw - ${(widthThing/2)}px);
        margin-top: calc(50vh - ${newHeight/2}px);
        "`;
    document.getElementsByTagName('body')[0].innerHTML += 
        `<img class="popupImg" src='${imgEl.src}' ${imgStyle}>
        <div class="shade" onclick="CloseImage()"></div>`;
}

function CloseImage() {
    let bodyStuff = document.getElementsByTagName('body')[0],
    children = bodyStuff.children;
    for (let i = 0; i < 2; i++) {
        bodyStuff.removeChild(children[children.length - 1]);
    }
}
    
