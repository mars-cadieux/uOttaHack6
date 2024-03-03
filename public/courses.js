addCourseButton.addEventListener('click', function() {
    
	let courseCode = (document.getElementById("courseField")).value;

	let formData = {"courseCode": courseCode};

    req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState == 4 ){
			let response = this.responseText;
			window.alert(response);
            if(this.status==201){
				var dropdown = document.getElementById('courseSelector');
                var option = document.createElement('option');
                option.value = courseCode.toUpperCase();
                option.text = courseCode.toUpperCase();
                dropdown.add(option);
			}
		}
	}

	req.open("POST", "/addCourse");
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify(formData));

});