let frontSide = document.getElementById("frontSide");
let backSide = document.getElementById("backSide");

let frontSideText = frontSide.innerHTML;
let backSideText = backSide.innerHTML;

let re = new RegExp("(?<=\\code{)(.*)}");

frontSideText = frontSideText.replaceAll("\\code{", "<span class=\"code\">");
while(arr = re.exec(frontSideText) != null){
	let index = arr.indices[0][1];
	frontSideText = frontSideText.substring(0,index) +  "</span>" + frontSideText.substring(index+1, frontSideText.length - 1);
}
//frontSideText = frontSideText.replaceAll("}", "</span>");

backSideText = backSideText.replaceAll("\\code{", "<span class=\"code\">");
while(arr = re.exec(backSideText) != null){
	let index = arr.indices[0][1];
	backSideText = backSideText.substring(0,index) +  "</span>" + backSideText.substring(index+1, backSideText.length - 1);
}
//backSideText = backSideText.replaceAll("}", "</span>");

console.log(frontSideText);
console.log(backSideText);

document.getElementById("frontSide").innerHTML = frontSideText;
document.getElementById("backSide").innerHTML = backSideText;


const coffeeSleeve = document.getElementById('coffeeSleeve');
let currentVisible = backSide;

coffeeSleeve.addEventListener("click", function() {

	if (currentVisible === backSide) {
		backSide.style.transform = 'translateX(150%)';
		frontSide.style.transform = 'translateX(0%)';

		currentVisible = frontSide;
	  } else {
		backSide.style.transform = 'translateX(0%)';
		frontSide.style.transform = 'translateX(150%)';

		currentVisible = backSide;
	  }
});
