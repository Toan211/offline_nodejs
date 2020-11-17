
let fireFoxBr = navigator.userAgent.indexOf("Firefox") > -1;

let chromeBr = navigator.userAgent.indexOf("Chrome") > -1;
let ME = navigator.userAgent.indexOf("Microsoft Edge") > -1;
    if (chromeBr) {
        document.querySelector("*").style.backgroundColor = "red";
    } else if (ME){
        document.body.style.backgroundColor = "blue";    
    }