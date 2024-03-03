let frontSide = document.getElementById("frontSide");
let backSide = document.getElementById("backSide");

let frontSideText = frontSide.innerHTML;
let backSideText = backSide.innerHTML;

let re = /(?<=\\code{)(.*)}/g;
let reg = /\\code{(.*)(?=})/g;

console.log(backSideText);
//console.log(re.exec(backSideText));
//console.log(reg.exec(backSideText));

//while(arr = re.exec(frontSideText) != null){
	frontSideText = frontSideText.replaceAll(re, "</span>");
//}

let seg = backSideText.split("}");
console.log(seg);
for(let i=0; i< seg.length -1; i++){
	if(seg[i].includes('\\code{')){
		seg[i] += '</span>';
	}
	else{
		seg[i]+= '}';
	}
}
backSideText = seg.join('');

while(arr = reg.exec(backSideText) != null){
	let segments = backSideText.split(reg);
	console.log(segments);
	segments[1] = segments[1].replace("}", "</span>");
	backSideText = segments[0] + segments[1];
	console.log(backSideText);
}

frontSideText = frontSideText.replaceAll("\\code{", "<span class=\"code\">");

//frontSideText = frontSideText.replaceAll("}", "</span>");

backSideText = backSideText.replaceAll("\\code{", "<span class=\"code\">");

//backSideText = backSideText.replaceAll("}", "</span>");

console.log(frontSideText);
console.log(backSideText);

document.getElementById("frontSide").innerHTML = frontSideText;
document.getElementById("backSide").innerHTML = backSideText;
