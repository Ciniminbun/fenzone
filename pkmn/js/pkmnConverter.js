// crunches smash or pass results

function pkmnEncode(bin) {
    let binArr = [], chunk = 51; // biggest chunk size is 52 including the necesary '1' at the start
    for (let i = 0; i < bin.length; i += chunk){
        binArr.push(bin.slice(i, i + chunk));
    }
    let chunks = ('1' + binArr.join(' 1')).split(" "), hex = '';
    for (chunk of chunks) {
        hex += ConvertBase.bin2hex(chunk);
    }
    return hex
}

function pkmnDecode(hex) {
    let arr = [], chunk = 13;
    for (let i = 0; i < hex.length; i += chunk){
        arr.push(hex.slice(i, i + chunk));
    }
    let bin = '';
    for (chunk of arr) {
        bin += ConvertBase.hex2bin(chunk).substring(1);
    }
    return bin;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function makeRndBinStr(len) {
    let number = '';
    for (let i = 0; i < len; i++) {
        number += getRandomInt(2);
    }
    return number
}

function pkmnShrink(hex){
    let pkCode = '', j = 0;
    for (let i = 0; i < hex.length; i++) {
        if (hex[i] == hex[i + 1] && hex[i] == hex[i + 2]) {
            j = i;
            while (true) {
                if (hex[j] != hex[i]) { break }
                j++;
            }
            if (j - i < 10) {
                pkCode += hex[i] + "%" + (j - i); // % indicates single digit repeat
            } else if (j - i < 100) {
                pkCode += hex[i] + "$" + (j - i); // $ indicates double digit repeat
            } else {
                pkCode += hex[i] + "_" + (j - i); // @ indicates tripple digit repeat
            }
            
            i = j - 1;
        } else {
            pkCode += hex[i];
        }
    }
    return pkCode
}

function pkmnGrow(pkCode){
    let hex = '', len = 0;
    for (let i = 0; i < pkCode.length; i++) {
        if (pkCode[i] == "%" || pkCode[i] == "$" || pkCode[i] == "_") {
            if (pkCode[i] == "%") {
                len = parseInt(pkCode[i + 1]);
            } else if (pkCode[i] == "$"){
                len = parseInt(pkCode[i + 1] + pkCode[i + 2]);
            } else {
                len = parseInt(pkCode[i + 1] + pkCode[i + 2] + pkCode[i + 3]);
            }
            for (let x = 1; x < len; x++) {
                hex += pkCode[i - 1];
            }

            if (pkCode[i] == "%") {
                i += 1;
            } else if (pkCode[i] == "$") {
                i += 2;
            } else {
                i += 3;
            }
        } else {
            hex += pkCode[i];
        }
    }
    return hex
}
