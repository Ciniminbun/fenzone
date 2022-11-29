let albums = {
    links: ["https://soundcloud.com/nanode/sets/paradise",
    "https://soundcloud.com/nanode/sets/paradise",
    "https://soundcloud.com/tinywaves/sets/tnywvs-001",
    "https://soundcloud.com/tinywaves/sets/lemondrop-familiar-feeling",
    "https://soundcloud.com/grid-division/sets/boogie-knights-ep",
    "https://soundcloud.com/ujico/sets/ordinary-songs-3",
    "https://soundcloud.com/fod-steve/sets/exit-plan",
    "https://soundcloud.com/pitsombrio/sets/kid-icarus-uprising-ost-full",
    "https://soundcloud.com/deskpopmusic/sets/deskpop-chipwin",
    "https://soundcloud.com/leyawn/sets/bird-world",
    "https://soundcloud.com/brasstracks/sets/ftwk1",
    "https://soundcloud.com/deskpopmusic/sets/drive45-have-you-seen-me",
    "https://soundcloud.com/ujico/sets/4rfhibsxap1n",
    "https://soundcloud.com/gamechops/sets/mother4",
    "https://soundcloud.com/sexytoadsandfrogsfriendcircle/sets/staffcirc-vol-4-switched-on",
    "https://soundcloud.com/ujico/sets/os4",
    "https://soundcloud.com/ujico/sets/sno",
    "https://soundcloud.com/shadymonk/sets/the-peach-montage",
    "https://soundcloud.com/jackstauber/sets/hilo",
    "https://soundcloud.com/jackstauber/sets/pop-food",
    "https://soundcloud.com/angeloleroi/sets/dirty-laundry",
    "https://soundcloud.com/fleetzerozero/sets/engine-burnout-compilation",
    "https://soundcloud.com/ujico/sets/lete",
    "https://soundcloud.com/fleetzerozero/sets/james-hunter-usa-ngcym-ep",
    "https://soundcloud.com/glassbeach/sets/the-first-glass-beach-album",
    "https://soundcloud.com/ujico/sets/alienpop2",
    "https://soundcloud.com/mynameisvalentine/sets/introspection",
    "https://soundcloud.com/sintel-music/sets/cosmic-noodlespout",
    "https://soundcloud.com/sintel-music/sets/top-ten-most-epic-fish-of-2",
    "https://soundcloud.com/wearecassia/sets/movers-shapers-1",
    "https://soundcloud.com/sexytoadsandfrogsfriendcircle/sets/staffcirc-vol-omega",
    "https://soundcloud.com/sexytoadsandfrogsfriendcircle/sets/staffcirc-vol-6-1-windows",
    "https://soundcloud.com/sexytoadsandfrogsfriendcircle/sets/staffcirc-vol-60-windows-variat1",
    "https://soundcloud.com/origamiangel/sets/gami-gang",
    "https://soundcloud.com/origamiangel/sets/broke-minecraft",
    "https://soundcloud.com/origamiangel/sets/somewhere-city",
    "https://soundcloud.com/origamiangel/sets/gen-3-2",
    "https://soundcloud.com/galentipton/sets/nymph-tones",
    "https://soundcloud.com/ehiorobo/sets/omniboi-ehiorobo-1-slash-million-remix-ep",
    "https://soundcloud.com/ehiorobo/sets/bickle-ehiorobo-bootcut",
    "https://soundcloud.com/dynastic/sets/rare-haunts-pt-i",
    "https://soundcloud.com/deskpopmusic/sets/princess-ketamines-nighttime-tales",
    "https://soundcloud.com/deskpopmusic/sets/floor-baba-prehistory-album",
    "https://soundcloud.com/el-cuarteto-de-nos/sets/grandes-exitos-greatest-hits",
    "https://soundcloud.com/sufjan-stevens/sets/illinois-3",
    "https://soundcloud.com/sealvester/sets/vib-ribbon-ost",
    "https://soundcloud.com/glassbeach/sets/alchemist-rats-beg-bashful",
    "https://soundcloud.com/glassbeach/sets/yoshis-island-world-7x7-mix",
    "https://soundcloud.com/simonfinn/sets/pass-the-distance-1",
    "https://soundcloud.com/simonfinn/sets/subjunctive-mood-1",
    "https://soundcloud.com/car-seat-headrest/sets/twin-fantasy-mirror-to-mirror",
    "https://soundcloud.com/chao-gardem/sets/jungle-sunday-vol-10",
    "https://soundcloud.com/the-front-bottoms/sets/theresa-53671510",
    "https://soundcloud.com/deskpopmusic/sets/friends-without-faces-this-is-not-modern-life",
    "https://soundcloud.com/necrytalkie/sets/freak-564603472",
    "https://soundcloud.com/necrytalkie/sets/memories-2-3",
    "https://soundcloud.com/origamiangel/sets/re-turn-4",
    "https://soundcloud.com/origamiangel/sets/depart-194934409"]
}


const img = document.querySelector('img')
img.ondragstart = () => {
  return false;
};

let rot = {total: {likes: 97600, tweets: 4339}}, avgtwtlen = 100;

let mainel = document.getElementsByTagName("main")[0], totalsel = document.getElementById("totals");

let wordcloud = "random thought games top super playing suck wait punch boob running hours move fan tongue bad puppy cat years big person pop tha person cat fall dog hard version rot rat google general hope open hand shot image fine fucking remember stupid school white cream find toe care pokemon tweets smell elden stuff sex feed guy half run rolling couple idk head front piece kiss sonic real eye chew american fight fuck names blow lonely hole sleep knight feeling lov series flesh kid start throat happy grab running boob games work gotta eat top close window funny lord krill blood feel dude hit times change woman dick asshole prosecutor full dumb woof john parent super color love god life weird till job normal cool played lil art best sound hair nice ring kick hate large star doesnt entire second ill discord hot realized true accound bed bottom teeth baby video model lie trans day ball men comic dead boy pfp girl fun gay likes mario cock cunt brain pretty brain taste bus george started month face phone jim stand making bone ass mind eating die tree room friend gaming penis joke kill pussy gut epic wall call";

let wordcloudarray = wordcloud.split(" ");

function UpdateTotals(progress) {
    totalsel.innerHTML = `posts=${(rot.total.tweets * progress).toFixed(0)} <br> likes=${(rot.total.likes * progress).toFixed(0)} <br> 
    goodhours=${(((rot.total.likes * progress).toFixed(0) * avgtwtlen) / 18000).toFixed(0)}<br>
    all=${(((rot.total.likes * progress).toFixed(0) * avgtwtlen) / 18000).toFixed(0) * 4}`;
}

let albumcover = document.getElementById("album");

function UpdateAlbum(progress) {
    let albumIndex = (albums.links.length *  progress).toFixed(0);
    albumcover.innerHTML = `<img src="img/albums/${albumIndex}.jpg">`
    albumcover.href = albums.links[albumIndex];
}

let heartScrub = {el: document.getElementById("heart_scrub"), maxX: 1860, minX: -50, pos: [-50,-35], ratioThing: 1845/1920, isGrabbed: false};
heartScrub.el.ondragstart = () => {
  return false;
};

function UpdateHeartScrub() {
    if ((mouseDown == true && mousePos[1] > 865 && mousePos[1] < 935 && mousePos[0] > 5 && mousePos[0] < 1950) || (heartScrub.isGrabbed))
    {
        heartScrub.isGrabbed = true;
        heartScrub.pos[0] = (mousePos[0] - 60);
        if (heartScrub.pos[0] > heartScrub.maxX) {
            heartScrub.pos[0] = heartScrub.maxX;
        }
        if (heartScrub.pos[0] < heartScrub.minX) {
            heartScrub.pos[0] = heartScrub.minX;
        } 
    }
    heartScrub.el.style.left = `${heartScrub.pos[0]}px`;
    UpdateTotals((heartScrub.pos[0]+50) / 1925);
    UpdateAlbum((heartScrub.pos[0]+50) / 1925);
}

// Input Pos Listeners
let mousePos = [0,0], mouseDown = false;

document.addEventListener('mousemove', (event) => {
	mousePos = [event.pageX, event.pageY];
    //console.log(mousePos);
    UpdateHeartScrub();
});
document.addEventListener('touchmove', (event) => {
  updateTouchPos();
});
function updateTouchPos() {
  mousePos = [event.touches[0].clientX, event.touches[0].clientY];
}
window.onmousedown = function() { mouseDown = true; UpdateHeartScrub(); }
window.onmouseup = function() { mouseDown = false; drag.grabbed =[]; heartScrub.isGrabbed = false;}
document.addEventListener('touchstart', (event) => { mouseDown = true; updateTouchPos();});
document.addEventListener('touchend', (event) => { mouseDown = false; drag.grabbed =[] });

const drag = {
  grabbed: [],
  isGrabbed: (obj) => {
    for (x of drag.grabbed) {
      if (obj == x) { return true }
    }
    return false
  }
}

function SpawnLine() {
    let line = "";
    for (let i = 0; i < 1650; i++) {
        line += wordcloudarray[Math.floor(Math.random() * wordcloudarray.length)] + " ";
    }
    mainel.children[0].innerHTML = line;
}

// Update
const frameTime = 1000 / 3;

function Update() {
    SpawnLine();
}
var frameInterval = setInterval(Update, frameTime);

