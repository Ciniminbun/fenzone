// mimicking rss feed because yeah
const feed = {
    title: "homepage feed",
    link: "",
    description: "",
    items: [
        {
            title: "anodyne 2!!!!!",
            link: "posts/anodyne2.html",
            description: "i recently played anodyne 2! i think it broke something in me and fixed something in me at the same time! AAAAAAAAA!",
            pubDate: 7152023
        },
        {
            title: "long week, good music tho",
            link: "recs.html",
            description: "its been a long week for me so no little article this friday, but recently 2 of my fav bands have released new albums! so ive added those to my recs page this week. lookin forward to a weekend of Big Chillinᵀᴹ after probably the most stressful job i've ever worked, cya next week",
            pubDate: 6302023
        },
        {
            title: "STEAM NEXT FEST BABY WOOOO",
            link: "posts/nextfest2023.html",
            description: "haven't i been so good at weekly updates!! anyways this week i talk about a lot of cool game demos i played and liked from this years Next Fest.",
            pubDate: 6232023
        },
        {
            title: "wittewey hitting da gwiddy in minecwaf",
            link: "posts/essentialminecraftmods.html",
            description: "im gonna start updating this site every friday! to start im just making <a href='posts/essentialminecraftmods.html'>a little post</a> about some minecraft mods i like",
            pubDate: 5122023
        },
        {
            title: "just rememebred this was here lolll",
            link: "https://soundcloud.com/aphextwinsucks/messy",
            description: "im so h<a style='text-decoration: none;' href='lol/imsohighlol.HTML'>i</a>gh and listening to breakcore it feels like it should be later i should add things to this site",
            pubDate: 3142023
        },
        {
            title: "like the 3rd total remake launch lol",
            link: "lol/BOOM.HTML",
            description: "it's 1:26 am aand im pubilshing the site again, if an old link is broken a copy of the old site is at <a href='https://old.cinimin.net/'>old.cinimin.net</a>",
            pubDate: 11292022
        },
        {
            title: "You should play Franken",
            link: "https://splendidland.itch.io/franken",
            description: "franken is a game you should be playing",
            pubDate: 11282022
        },
        {
            title: "xtra steam keys",
            link: "https://cinimin.net/keys/",
            description: "i end up with leftover steam keys from game bundles n stuff and i dont care to sell them, so anyone can pick them up at this site",
            pubDate: 12032021
        },
        {
            title: "simple physics test",
            link: "https://old.cinimin.net/example/js/phyics/",
            description: "little basic physics engine i coded in my free time at a job recently\ntheres no collision between objects atm but i'll get to it eventually",
            pubDate: 10162021
        },
        {
            title: "dog age",
            link: "https://cinimin.itch.io/dog-age",
            description: "did a game jam with a friend by pulling an all nighter right before the submission was due. it's mostly just strange but i mean that in a good way<br><a href='https://cinimin.itch.io/dog-age'>game page</a><br><a href='https://itch.io/jam/random-wikihow-jam'>jam page</a>",
            pubDate: 6152020
        },
        // {
        //     title: "test one",
        //     link: "test.html",
        //     description: "testing is fun right",
        //     pubDate: 11242022
        // },
        // {
        //     title: "test two",
        //     link: "test.html",
        //     description: "i can feel myself being tested",
        //     pubDate: 11242022
        // },
        // {
        //     title: "test three",
        //     link: "test.html",
        //     description: "i'm always being tested",
        //     pubDate: 11242022
        // },
    ]
}

const buttonList = [
    'anibanner.gif',
    'amatsuki.gif',
    'aoltos_a.gif',
    'beyes.gif',
    'false.gif',
    'fubutton2.gif',
    'homicidenow.gif',
    'life_anm.gif',
    'loser.webp',
    'piss.gif',
    'tf.gif',
    'tohell.gif',
    'typhrakromer.gif'
]

const recsList = [
    {
        title: ' The Brightest Days - Origami Angel',
        thumb: 'https://i1.sndcdn.com/artworks-SRsK6QtQl023-0-t500x500.jpg',
        link: 'https://soundcloud.com/origamiangel/sets/the-brightest-days',
        desc: 'singlehandedly improving my boring summer',
        date: 6302023
    },
    {
        title: 'Biblickle - Bickle',
        thumb: 'https://i1.sndcdn.com/artworks-6ccaa247-c829-4dad-84d1-abe2c2eeeddb-0-t500x500.jpg',
        link: 'https://soundcloud.com/heybickle/sets/biblickle-1',
        desc: 'Bickleheads Know Whats Up',
        date: 6302023
    },
    {
        title: 'Ride on Time (Jamie Paige Arrange) - Jamie Paige',
        thumb: 'img/dance-dance-moves.gif',
        link: 'https://soundcloud.com/jamieirl/ride-on-time-jamie-paige-arrange',
        desc: '',
        date: 3142023
    },
    {
        title: 'thread - gonima',
        thumb: 'https://i1.sndcdn.com/artworks-ijXCph8kXn6JZDOH-hMDuKw-t500x500.jpg',
        link: 'https://soundcloud.com/gonima/thread',
        desc: '/\^/\^^\___.... :3 **',
        date: 3142023
    },
    {
        title: 'tattoos - STOMACH BOOK',
        thumb: 'https://i1.sndcdn.com/artworks-rqtiJqTmJSwlYKyW-Wjk5pA-t500x500.jpg',
        link: 'https://soundcloud.com/stomachbook/tattoos',
        desc: 'WHYDIDNOONETELLMEABOUTTHISBAND',
        date: 3142023
    },
    {
        title: `Jippy's In My City (feat. Jalen Tyree) - Miles Powers`,
        thumb: 'https://i1.sndcdn.com/artworks-Ob9JrYz07zkrwcCE-KQhVQQ-t500x500.jpg',
        link: 'https://soundcloud.com/milespowers/jippys-in-my-city',
        desc: 'wish i could make piano riffs with my mouth',
        date: 3142023
    },
    {
        title: `#scuffgod - ilysm`,
        thumb: 'https://i1.sndcdn.com/artworks-rgkLrhlJ1FAHeQZb-2PrC2g-t500x500.jpg',
        link: 'https://soundcloud.com/iluvyousomuch/sets/scuffgod',
        desc: '(ʘᴥʘ) got that dawg in it',
        date: 3142023
    },
    {
        title: '👼 - 52penguin52',
        thumb: 'https://pbs.twimg.com/media/FjOZwm4akAAiwXp?format=jpg&name=large',
        link: 'https://twitter.com/52penguin52/status/1599791698028421121',
        desc: 'i cradle angel devil lovingly',
        date: 12052022
    },
    {
        title: 'chroma - quickly, quickly',
        thumb: 'https://i1.sndcdn.com/artworks-pAIJHiRkbJbAyg7X-gR9uuw-t500x500.jpg',
        link: 'https://soundcloud.com/quicklyquickly/chroma',
        desc: '<img src="img/dancey.gif" style="height: 1em">,',
        date: 12032022
    },
    {
        title: 'big blues - bickle',
        thumb: 'https://i1.sndcdn.com/artworks-Qee57qR41yCtg0d2-p1mvDQ-t500x500.jpg',
        link: 'https://soundcloud.com/heybickle/bigblues',
        desc: 'first of like a billion bickle recs i will make i lov his stuf :3',
        date: 12032022
    },
    {
        title: 'not nice - fryoum',
        thumb: 'https://i1.sndcdn.com/artworks-QMIQqs49y9jZoj5S-YEP3eQ-t500x500.jpg',
        link: 'https://soundcloud.com/fvckyoumate/not-nice',
        desc: '<a href="https://soundcloud.com/fvckyoumate/sets/world-ends-with-you">check out the full album</a>',
        date: 12032022
    },
    {
        title: 'reasonsnotto - Alexander Panos',
        thumb: 'https://i1.sndcdn.com/artworks-xxgQ4e4SaP1hOdFt-pevaDg-t500x500.jpg',
        link: 'https://soundcloud.com/alexanderpanos/reasonsnotto',
        desc: 'aaaaalfdjkghdkyufhjg;huioh conversation :3',
        date: 12032022
    },
    {
        title: 'in your head - Charlie',
        thumb: 'https://i1.sndcdn.com/artworks-aD2Om93SuOLeLtFL-z9rCug-t500x500.jpg',
        link: 'https://soundcloud.com/charliemakesmusic/in-your-head',
        desc: 'inyourhead',
        date: 12032022
    },
]