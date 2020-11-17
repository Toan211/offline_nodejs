var str = document.getElementById("box").textContent;
var a = new Array;
var key = /nodejs/i;
var res = '';

a = str.split(" ");
document.write(a);

document.write(str.match());

for (let i = 0; i < a.length; i++) {
    if (a[i] == key)
        res += "haha";
    else {
        res += a[i] + " ";
    }
    
}

document.getElementById('box').innerHTML = res;