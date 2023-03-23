const navElement = document.querySelector('nav'),
headerElement = document.querySelector('header'),
underlines = document.querySelectorAll('hr'),
mainElement = document.querySelector('main'),
cards = document.querySelectorAll('#card');

let currentlyOpen = '';

function OpenBody(element) {

    
    let type = element.id,
    sites = ['twit', 'redd', 'pint', 'inst'],
    colors = {
        twit: '#1DA1F2', 
        redd: '#ff4500',
        pint: '#E60023',
        inst: 'linear-gradient(to right, #F58529, #FEDA77, #DD2A7B, #8134AF, #515BD4)'
    },
    bgColors = {
        twit: '#FFFFFF', 
        redd: '#dae0e6',
        pint: '#FFFFFF',
        inst: '#FFFFFF'
    },
    txtColors = {
        twit: '#000000', 
        redd: '#000000',
        pint: '#000000',
        inst: '#000000'
    },
    altColors = {
        twit: '#f3f3f3', 
        redd: '#FFFFFF',
        pint: '#FFFFFF',
        inst: '#FFFFFF'
    }
    ;

    document.querySelector(`#${type}-info`).scrollIntoView({behavior: 'smooth'});

    if (type == currentlyOpen) {
        element.style.width = '75px';
        element.style.filter = 'grayscale(100%)';
        document.querySelector('.backdrop').style.backgroundColor = 'white';
        document.querySelector('body').style.color = 'black';
        headerElement.style.backgroundColor = '#efefef';
        headerElement.style.margin = '25px 25px 0'
        headerElement.style.width = '712px';
        headerElement.style.borderRadius = '16px';
        document.querySelector('h1').style.marginTop = '22px';
        RemoveCardLines();
        for (let z = 0; z < underlines.length; z++) {
            underlines[z].style.backgroundColor = 'black';
            underlines[z].style.backgroundImage = 'none';
        }
        currentlyOpen = '';
        return
    }

    element.style.width = '85px';
    element.style.filter = 'grayscale(0%)';

    for (let i = 0; i < sites.length; i++) {
        if (sites[i] != type) {
            let currEl = document.getElementById(sites[i]);
            currEl.style.filter = 'grayscale(100%)';
            currEl.style.width = '75px';
        }
        
    }

    for (let z = 0; z < underlines.length; z++) {
        if (type == 'inst') {
            underlines[z].style.backgroundImage = colors[type];
            RemoveCardLines();
            //document.querySelector('h1').style.fontFamily = "Lobster Sans"
        }
        else {
            underlines[z].style.backgroundImage = 'none';
            underlines[z].style.backgroundColor = colors[type];
            document.querySelector('h1').style.fontFamily = "Segoe UI"
            if (type == 'redd') {
                headerElement.style.margin = '-5px 0 0';
                document.querySelector('h1').style.marginTop = '52px';
                headerElement.style.width = '762px';
                headerElement.style.borderRadius = '0px';
                AddCardLines();
                
            } else {
                headerElement.style.margin = '25px 25px 0';
                headerElement.style.width = '712px';
                headerElement.style.borderRadius = '16px';
                document.querySelector('h1').style.marginTop = '22px';
                RemoveCardLines();
            }
        }
    }
    document.querySelector('.backdrop').style.backgroundColor = bgColors[type];
    document.querySelector('.backdrop').style.color = txtColors[type];
    document.querySelector('header').style.backgroundColor = altColors[type];

    currentlyOpen = type;
}

function AddCardLines() {
    for (let y = 0; y < cards.length; y++) {
        cards[y].style.border = '1px solid #c7c7c7';
    }
}

function RemoveCardLines() {
    for (let y = 0; y < cards.length; y++) {
        cards[y].style.border = '1px solid white';
    }
}

function ToggleCard(type) {
    let card = document.querySelector(`.${type}-card`);
    if (card.style.height == "64px" || "") {
        card.style.height = 'max-content';
    } else {
        card.style.height = '64px';
    }
    
}
