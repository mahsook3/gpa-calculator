var open = false;
document.getElementById("burgermenu").addEventListener('click', function(e) {
  var nr1 = document.getElementById("nr1");
  var nr2 = document.getElementById("nr2");
  var nr3 = document.getElementById("nr3");
  var menu = document.getElementById("menu");
  if(open === true) {
    open = false;
    menu.style.transform = "translateX(100%)";
    nr1.style.rotate = "0deg";
    nr1.style.transform = "translate3D(0px,0px,0)";
    nr1.style.width = "50px";
    nr2.style.opacity = "1";
    nr3.style.rotate = "0deg";
    nr3.style.transform = "translate3D(0px,0px,0)";
    nr3.style.width = "50px";
  } else {
    open = true;
    menu.style.transform = "translateX(0%)";
    nr1.style.rotate = "-45deg";
    nr1.style.transform = "translate3D(-8px,14px,0)";
    nr1.style.width = "55px";
    nr2.style.opacity = "0";
    nr3.style.rotate = "45deg";
    nr3.style.transform = "translate3D(-8px,-15px,0)";
    nr3.style.width = "55px";
  }
});
// function to add subject fields dynamically
function addSubjectFields() {
	let numSubjects = document.getElementById("num-subjects").value;
	let subjectFields = document.getElementById("subject-fields");
	subjectFields.innerHTML = ""; // clear previous fields

	for (let i = 1; i <= numSubjects; i++) {
		let fieldset = document.createElement("fieldset");
		let legend = document.createElement("legend");
		legend.innerHTML = "Subject " + i;
		fieldset.appendChild(legend);

		let labelCredits = document.createElement("label");
		labelCredits.setAttribute("for", "credits-" + i);
		labelCredits.innerHTML = "Credits:";
		fieldset.appendChild(labelCredits);

		let inputCredits = document.createElement("input");
		inputCredits.setAttribute("type", "number");
		inputCredits.setAttribute("id", "credits-" + i);
		inputCredits.setAttribute("name", "credits-" + i);
		inputCredits.setAttribute("min", "1");
		inputCredits.setAttribute("required", "required");
		fieldset.appendChild(inputCredits);

		let labelGrade = document.createElement("label");
		labelGrade.setAttribute("for", "grade-" + i);
		labelGrade.innerHTML = "Grade:";
		fieldset.appendChild(labelGrade);

		let selectGrade = document.createElement("select");
		selectGrade.setAttribute("id", "grade-" + i);
		selectGrade.setAttribute("name", "grade-" + i);

		let grades = ["O", "A+", "A", "B+", "B", "C"];
		let gradePoints = [10, 9, 8, 7, 6, 5];

		for (let j = 0; j < grades.length; j++) {
			let option = document.createElement("option");
			option.setAttribute("value", gradePoints[j]);
			option.innerHTML = grades[j] + " (" + gradePoints[j] + " points)";
			selectGrade.appendChild(option);
		}

		fieldset.appendChild(selectGrade);

		subjectFields.appendChild(fieldset);
	}
}

// function to calculate GPA
function calculateGPA(event) {
	event.preventDefault(); // prevent form submission

	let totalCredits = 0;
	let totalGradePoints = 0;
	let numSubjects = document.getElementById("num-subjects").value;

	for (let i = 1; i <= numSubjects; i++) {
		let credits = parseInt(document.getElementById("credits-" + i).value);
		let gradePoints = parseFloat(document.getElementById("grade-" + i).value);
		totalCredits += credits;
		totalGradePoints += credits * gradePoints;
	}

	let gpa = totalGradePoints / totalCredits;

	document.getElementById("result").innerHTML = "Your GPA is: " + gpa.toFixed(2);
}

// add event listeners
document.getElementById("num-subjects").addEventListener("change", addSubjectFields);
document.getElementById("gpa-form").addEventListener("submit", calculateGPA);
