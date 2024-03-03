let uploadInput = document.getElementById("uploadTex");
let genButton = document.getElementById("generateButton");
let currentFileContent = null;

uploadInput.addEventListener('change', function(event){
	const reader = new FileReader();
  	reader.onload = handleFileLoad;
  	reader.readAsText(event.target.files[0]);
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

	xhttp.open("POST", '/upload');
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(parsedFile));
}

function parseDefinitionToArray(str) {
    let regex1 = RegExp('\\$[^\\$]+\\$', 'gd');
    let regex2 = RegExp('definition{(.+)}{(.+)}', 'g');
    let array1;

    while ((array1 = regex1.exec(str)) !== null) {
        let index1 = array1.indices[0][0];
        let index2 = array1.indices[0][1];
        if (str[index1 - 1] !== "$" && str[index2] !== "$$") {
            str = str.substring(0, index1) + "\\(" + str.substring(index1 + 1, index2 - 1) + "\\)" + str.substring(index2, str.length);
        }
    }

    let jsonArray = [];
    while ((array1 = regex2.exec(str)) !== null) {
        const jsonObject = {
            "front side" : array1[1],
            "back side" : array1[2]
        };
        jsonArray.push(jsonObject);
    }

    return jsonArray;
}

function parseDefinitionToObject(str) {
    let regex1 = RegExp('(?<!\\$)(\\$[^\\$]+\\$)(?!\\$)', 'gd');
    let regex2 = RegExp('definition{(.+)}{(.+)}', 'g');
    let array1;

    while ((array1 = regex1.exec(str)) !== null) {
        let index1 = array1.indices[0][0];
        let index2 = array1.indices[0][1];
        //if (str[index1 - 1] !== "$" && str[index2] !== "$$") {
            str = str.substring(0, index1) + "\\(" + str.substring(index1 + 1, index2 - 1) + "\\)" + str.substring(index2, str.length);
        //}
    }
    let jsonObject = {null : null};
    while ((array1 = regex2.exec(str)) !== null) {
        jsonObject[array1[1]] = array1[2];
    }

    delete jsonObject[null];

    return jsonObject;
}

const root = document.querySelector(":root");
function toggleDarkMode(){
    const toggle = document.getElementById("darkModeToggle")
    if(toggle.textContent == "🌙"){
        root.style.setProperty("--backgroundprimary", "#4b331c");
        root.style.setProperty("--backgroundsecondary", "#7d6357");
        root.style.setProperty("--backgroundtertiary", "#ae875e");
        root.style.setProperty("--accentprimary", "#4b736b");
        root.style.setProperty("--accentsecondary", "#f44336");
        root.style.setProperty("--accenttertiary", "#e1bb88");
        root.style.setProperty("--textlight", "#ffdeb4");
        root.style.setProperty("--textdark", "#ffdeb4");
        toggle.textContent = "☀️";
    } else {
        root.style.setProperty("--backgroundprimary", "#ead4b8");
        root.style.setProperty("--backgroundsecondary", "#dbbc93");
        root.style.setProperty("--backgroundtertiary", "#ae875e");
        root.style.setProperty("--accentprimary", "#499c8c");
        root.style.setProperty("--accentsecondary", "#f44336");
        root.style.setProperty("--accenttertiary", "#e1bb88");
        root.style.setProperty("--textlight", "#ead4b8");
        root.style.setProperty("--textdark", "#282828");
        toggle.textContent = "🌙";
    }
}

let playOnlineButton = document.getElementById("playOnline");

playOnlineButton.addEventListener('click', function() {
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){
			let response = this.responseText;
			window.location.href = `/room/${response}`;
		}
	}

	xhttp.open("GET", '/room');
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send();
});