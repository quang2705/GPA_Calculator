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
	var percent_each_test = 100/val;
	var per = document.getElementsByClassName("percentage")[0];
	per.value = percent_each_test;
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
		per.setAttribute("value", percent_each_test);
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
			total += parseFloat(array[i]);
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
		var score = result.children[i*2];
		if (score.style.color == "red"){
			test_array.push("");
		}
		else
			test_array.push(score.value);
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

function Estimate(){
	var current_test_score = 0
	var estimate_percentage = 0
	var val = document.getElementById("total").value;
	for (var i = 0; i < val; i++){
		var unknow = 0
		var test_array = test_score(i);
		var per = document.getElementsByClassName("percentage")[i].value/100;
		var per_each_test = per/test_array.length;
		for (var n = 0; n < test_array.length; n++){
			if (test_array[n] ==""){
				unknow += 1;
			}
			else{
				current_test_score += parseInt(test_array[n])*per_each_test;
			}
		}
		estimate_percentage += unknow*per_each_test;
	}
	var goal = document.getElementById("goal").value;
	if (estimate_percentage != 0){
		var estimate_score = ((parseInt(goal)-current_test_score))/estimate_percentage;
		estimate_score = estimate_score.toString();
	}
	else
		console.log("ERROR");
	for (var i = 0; i < val ; i++ ){
		var result = document.getElementsByClassName("result")[i];
		var number = document.getElementsByClassName("theId")[i].value;
		for (var n = 0 ; n < number; n++){
			var score = result.children[n*2];
			if (score.value == "" || score.style.color == "red"){
				result.children[n*2].value = estimate_score;
				score.style.color = "red";
			}
		}
	}
}
