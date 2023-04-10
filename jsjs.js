var tag;
var comm;
var tst = false;
var date = new Date();
var y = date.getUTCFullYear();
var m = date.getUTCMonth()+1;
var j = date.getUTCDate();
var url = ("https://wol.jw.org/fr/wol/h/r30/lp-f/" + y + "/" + m + "/" + j);
const xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
    tag = this.responseText;
var parser = new DOMParser();
var doc = parser.parseFromString(tag, "text/html");
var id = doc.getElementsByTagName("h2")[1].getAttribute("id").replace(/\D+/, "");

var jour = doc.getElementById("p"+id).innerText;
var ref = doc.getElementById("p"+(parseInt(id)+1)).innerText;
var com = doc.getElementById("p"+(parseInt(id)+2)).innerText;

var refText = ref.substring(0, ref.lastIndexOf('('));
var refTextt = ref.substring(ref.lastIndexOf('('));


refTextt = refTextt.replace(":", " verset ");
refText += refTextt;

com = extractWords(com);

console.log(jour + "\n\n" + refText + "\n\n" + com);

var blob = new Blob([jour + "\n\n" + refText + "\n\n" + com], {type: "text/plain;charset=utf-8"});
saveAs(blob, "helloworld.txt");

  }
xhttp.open("GET", url, true);
xhttp.setRequestHeader("Access-Control-Allow-Headers", "*");
xhttp.setRequestHeader("Access-Control-Allow-Origin", "https://nathanael-bonamie.github.io");
xhttp.send(null);
  
function extractWords(str) {
	str = [...str];
	var i=0
    for (i; i < str.length; i++) {
        if(str[i] === '(') {
            tst = true;
        }
		if(tst & (str[i] === ':')){
			str[i] = ' verset ';
		}
		else if(tst & (str[i] === ',')){
			str[i] = ' et';
		}
		else if(tst & (str[i] === '-')){
			str[i] = ' a ';
		}
		if(str[i] === ')')
			tst = false;
    }
    return str.join('');
}
