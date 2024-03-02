let frontSide = document.getElementById("frontSide");
let backSide = document.getElementById("backSide");

let frontSideText = frontSide.innerHTML;
let backSideText = backSide.innerHTML;

frontSideText = frontSideText.replaceAll("\\code{", "<span class=\"code\">");
frontSideText = frontSideText.replaceAll("}", "</span>");

backSideText = backSideText.replaceAll("\\code{", "<span class=\"code\">");
backSideText = backSideText.replaceAll("}", "</span>");

console.log(frontSideText);
console.log(backSideText);

document.getElementById("frontSide").innerHTML = frontSideText;
document.getElementById("backSide").innerHTML = backSideText;
