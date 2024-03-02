let uploadInput = document.getElementById("uploadTex");
let genButton = document.getElementById("generateButton");
let currentFileContent = null;

uploadInput.addEventListener('change', function(event){
	const reader = new FileReader();
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
		if(this.readyState == 4 ){
			let response = this.responseText;
			window.alert(response);
		}
	}
	//let test = {"test": "test"};

	//TODO: add user data 
	xhttp.open("POST", '/upload');
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(parsedFile));
}

function parseDefinitionToArray(str) {
    let regex1 = RegExp('definition{(.+)}{(.+)}', 'g');
    let regex2 = RegExp('code{([^}]+)}', 'g');
    let array1;
    let jsonArray = [];
    while ((array1 = regex1.exec(str)) !== null) {
        let array2;
        let frontside = array1[1];
        let backside = array1[2];
        while ((array2 = regex2.exec(frontside)) !== null) {
            frontside = frontside.replace(array2[0], 'textcolor{Thistle}{\\texttt{' + array2[1] + '}}')
        }
        while ((array2 = regex2.exec(backside)) !== null) {
            backside = backside.replace(array2[0], 'textcolor{Thistle}{\\texttt{' + array2[1] + '}}')
        }
        const jsonObject = {
            "front side" : frontside,
            "back side" : backside
        };
        jsonArray.push(jsonObject);
    }

    return jsonArray;
}

function parseDefinitionToObject(str) {
    let regex1 = RegExp('definition{(.+)}{(.+)}', 'g');
    let regex2 = RegExp('code{([^}]+)}', 'g');
    let array1;
    let jsonObject = {null : null};
    while ((array1 = regex1.exec(str)) !== null) {
        let array2;
        let frontside = array1[1];
        let backside = array1[2];
        while ((array2 = regex2.exec(frontside)) !== null) {
            frontside = frontside.replace(array2[0], 'textcolor{Thistle}{\\texttt{' + array2[1] + '}}')
        }
        while ((array2 = regex2.exec(backside)) !== null) {
            backside = backside.replace(array2[0], 'textcolor{Thistle}{\\texttt{' + array2[1] + '}}')
        }
        jsonObject[frontside] = backside;
    }

    delete jsonObject[null];

    return jsonObject;
}
