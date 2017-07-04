function createTest(n){
	n = parseInt(n);
	var number = document.getElementsByClassName("theId")[n].value;
	var result = document.getElementsByClassName("result")[n];
	while (result.firstChild){
		result.removeChild(result.firstChild);
	}
	if (number <= 20)
	{	
		for (var i = 0 ; i < number; i++)
		{
			var input = document.createElement("INPUT");
			input.setAttribute("type","text");
			input.setAttribute("oninput","test_score("+n+")");
			result.appendChild(input);
			result.appendChild(document.createElement("br"));
		}
	}
}

function testCreate(){
	var val = document.getElementById("total").value;
	var con = document.getElementById("content");
	while (con.firstChild){
		con.removeChild(con.firstChild);
	}
	for (var i = 1; i <val ; i++)
	{	
		var original = document.getElementsByClassName("default")[0];
		var clone = original.cloneNode(true); 
		con.appendChild(clone);
		var per = document.getElementsByClassName("percentage")[i];
		var miniTest = document.getElementsByClassName("theId")[i];
		var n = i;
		miniTest.setAttribute("oninput","createTest("+n+")");
		per.setAttribute("oninput","Compute_percentage("+n+")");
	}
}

function Compute_percentage(n){
	n = parseInt(n);
	var percentage = document.getElementsByClassName("percentage")[n].value;
	var array = test_score(n);
	var grade_and_percentage = [];
	var total = 0;
	var denominator = 0;
	for (var i = 0; i < array.length; i++){
		if (array[i] != "")
		{
			denominator +=1;
			total += parseInt(array[i]);
		}
	}
	var final_grade = total/denominator;
	grade_and_percentage.push(final_grade);
	grade_and_percentage.push(percentage);
	document.getElementsByClassName("current-grade")[n].innerHTML = final_grade;
	return grade_and_percentage;
}

function test_score(n){
	n = parseInt(n);
	var test_array = [];
	var number = document.getElementsByClassName("theId")[n].value;
	var result = document.getElementsByClassName("result")[n];
	for (var i = 0 ; i < number; i++)
	{
		var score = result.children[i*2].value;
		test_array.push(score);
	}
	return test_array;
}

function GPA_grade(){
	var val = document.getElementById("total").value;
	var percent_total = 0;
	var grade_percent =[];
	var gpa= 0;
	for (var i =0; i< val ; i ++){
		var array = Compute_percentage(i);
		console.log(array);
		percent_total += parseInt(array[1]);
	}
	console.log(percent_total);
	for (var i = 0 ; i <val; i++){
		var grade_percent = Compute_percentage(i);
		gpa += grade_percent[0]*grade_percent[1]/percent_total;
	}	
	document.getElementById("final_grade").innerHTML = gpa;
}
