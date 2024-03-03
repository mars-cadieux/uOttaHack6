loginButton.addEventListener('click', function() {

	let username = (document.getElementById("username")).value;
	let password = (document.getElementById("password")).value;

	req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4){
			let responseObj = (this.responseText).toString();
			if(this.status==200){
				window.location.href = " http://localhost:3000/upload";
			}
			//unauthorized access due to incorrect password, the validation is handled by the server
			else if(this.status == 401){
				(document.getElementById("password")).classList.add("error");
				alert(responseObj);
			}
			//unauthorized access due to non-existent username, the validation is handled by the server
			else if(this.status == 404){
				(document.getElementById("username")).classList.add("error");
				alert(responseObj);
			}
			//the Two other types of errors handled by our server just need an alert, no red border around username or password is needed 
			else {
				alert(responseObj);
			}
		}
	}
	let formData = {"username": username, "password": password};

	req.open("POST", "/login");
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify(formData));
});

registerButton.addEventListener('click', function() {

	let username = (document.getElementById("username")).value;
	let password = (document.getElementById("password")).value;

	req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4){
			if(this.status==201){
				alert("You have successfully been registered!");
			}
			//bad request due to username already existing
			else if(this.status == 400){
				(document.getElementById("username")).classList.add("error");
				alert("This username has already been taken.");
			}
			else if(this.status == 401){
				(document.getElementById("password")).classList.add("error");
				alert("You must enter a password.");
			}
			//any other type of failure will be an issue on the server end (most likely res code 500), give a general error message, but indicate to the user that the error was not on their end by prompting them to try again
			else {
				alert("An error occurred while trying to register you. Please try again.");
			}
		}
	}

	let formData = {"username": username, "password": password};

	req.open("POST", "/register");
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify(formData));
});

