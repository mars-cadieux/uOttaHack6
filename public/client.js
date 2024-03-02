let uploadInput = document.getElementById("uploadTex");
let genButton = document.getElementById("generateButton");
let currentFile = null;

uploadInput.addEventListener('click', function(event){
	currentFile = event.target.files[0];
});

genButton.addEventListener('click', generateFlashcards());

function generateFlashcards() {
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){
			console.log("success!");
			//window.location.reload();
		}
	}
	

	xhttp.open("POST", '/');
	xhttp.setRequestHeader("Content-Type", "text/html");
	xhttp.send();
}
