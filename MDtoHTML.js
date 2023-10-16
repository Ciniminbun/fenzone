
const testText = `because you're high as shit and love the basics
## Taquitopendance Day
- 1 Corn Tortilla
- **A Hot Dog**
- *1 slice preslice Cheddar Cheese*
- 1/2 tablespoon salted butter
- optional: 1 like tablespoon i guess Sriracha Ketchup
    get ur small pan on medium low,, throw in the hot dog and the tortilla at the same time
    when the shitty grocery store tortilla is pliable instead of inflexible garbage give it a flip and then put the cheese on the tortilla
    once ur hot dog seems warm all the way thru (or maybe with a few cold spots in it, if u try it u'll see) poke the hot dog over on top of the cheese
    get that shit plated and then add a little sauce baybeee i prefer Sriracha ketchup but maybe ur a horseradish girl or something` 

function MDToHTML(mdInit) {
    let htmlFinal = "<div>", makingUL = false;
    mdList = mdInit.split('\n');
    for (let i in mdList) {
        let mdLine = mdList[i];
        switch (mdLine[0]) {
            case '#' : 
                mdLine = ConvertHeader(mdLine);
                htmlFinal += mdLine + '\n';
                break;
            case '-' :
                if (makingUL == false) { 
                    makingUL = true;
                    htmlFinal += '<ul>\n';
                }
                htmlFinal += `<li>${mdLine.substring(2)}</li>\n`;
                break;
            default:
                if (makingUL == true) {
                    makingUL = false;
                    htmlFinal += '</ul>\n'
                }
                htmlFinal += `<p>${mdLine},</p>\n`
        }
        
    }
    console.log(htmlFinal);
    return htmlFinal + `</div>`
}

function ConvertHeader(line) {
    let hIndex = 0;
    for (let i in line) {
        if (line[i] == "#") {
            hIndex++;
        }
    }
    line = line.substring(hIndex);
    final = `<h${hIndex}>${line}</h${hIndex}>`
    return final
}