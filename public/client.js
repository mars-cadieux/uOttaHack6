let uploadInput = document.getElementById("uploadTex");
let genButton = document.getElementById("generateButton");
let currentFileContent = null;

uploadInput.addEventListener('change', function(event){
	const reader = new FileReader()
  	reader.onload = handleFileLoad;
  	reader.readAsText(event.target.files[0])
});

function handleFileLoad(event) {
	//console.log(event);
	currentFileContent = event.target.result;
	console.log(currentFileContent);
}

genButton.addEventListener('click', generateFlashcards);

function generateFlashcards() {
	let parsedFile = parseDefinitionToObject(currentFileContent);
	console.log(parsedFile);

	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){
			console.log("success!");
			//window.location.reload();
		}
	}
	//let test = {"test": "test"};

	xhttp.open("POST", '/');
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(parsedFile));
}

function parseDefinitionToArray(str) {
    let regex = RegExp('definition{(.+)}{(.+)}', 'g');
    let array1;
    let jsonArray = [];
    while ((array1 = regex.exec(str)) !== null) {
        const jsonObject = {
            "title" : array1[1],
            "definition" : array1[2]
        };
        jsonArray.push(jsonObject);
    }

    return jsonArray;
}

function parseDefinitionToObject(str) {
    let regex = RegExp('definition{(.+)}{(.+)}', 'g');
    let array1;
    let jsonObject = {null : null};
    while ((array1 = regex.exec(str)) !== null) {
        jsonObject[array1[1]] = array1[2];
    }

    delete jsonObject[null];

    return jsonObject;
}
