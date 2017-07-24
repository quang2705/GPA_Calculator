function createTest(n){
	n = parseInt(n);
	var number_miniTest = document.getElementsByClassName("smallTest")[n].value;
	var list_miniTest = document.getElementsByClassName("list_miniTest")[n];
	while (list_miniTest.firstChild){
		list_miniTest.removeChild(list_miniTest.firstChild);
	}
	if (number_miniTest <= 20){	
		for (var i = 0 ; i < number_miniTest; i++){
			var text =  document.createTextNode("Enter test grade");
			var input = document.createElement("INPUT");
			input.setAttribute("type","text");
			input.setAttribute("oninput","test_score("+n+")");
			list_miniTest.appendChild(text);
			list_miniTest.appendChild(input);
			list_miniTest.appendChild(document.createElement("br"));
		}
	}
}

function CreateBigTest(){
	var per = document.getElementsByClassName("percentage")[0];
	var bt = document.getElementById("bigTest").value;
	var con = document.getElementById("content");
	var percent_each_test = 100/bt;
	per.value = percent_each_test;
	
	while (con.firstChild){
		con.removeChild(con.firstChild);
	}
	
	if (bt <= 15){
		for (var i = 1; i <bt ; i++){	
			var original = document.getElementsByClassName("default")[0];
			var clone = original.cloneNode(true); 
			clone.getElementsByTagName("p")[0].innerHTML = "Big Test "+(i+1)+ ":"
			con.appendChild(clone);
			var per = document.getElementsByClassName("percentage")[i];
			var miniTest = document.getElementsByClassName("smallTest")[i];
			var n = i;
			miniTest.setAttribute("oninput","createTest("+n+")");
			per.setAttribute("oninput","Grade_and_percentage("+n+")");
			per.setAttribute("value", percent_each_test);
		}
	}
}

function Grade_and_percentage(n){
	n = parseInt(n);
	var percentage = document.getElementsByClassName("percentage")[n].value;
	var grade_and_percentage = [];
	var array = test_score(n);
	var denominator = 0;
	var total = 0;

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
	// document.getElementsByClassName("current-grade")[n].innerHTML = final_grade;
	return grade_and_percentage;
}

function test_score(n){
	n = parseInt(n);
	var test_array = [];
	var number_miniTest = document.getElementsByClassName("smallTest")[n].value;
	var list_miniTest = document.getElementsByClassName("list_miniTest")[n];
	
	for (var i = 0 ; i < number_miniTest; i++){
		var score = list_miniTest.children[i*2];
		if (score.style.color == "red"){
			test_array.push("");
		}
		else
			test_array.push(score.value);
	}
	return test_array;
}

function GPA_grade(){
	var bt = document.getElementById("bigTest").value;
	var percent_total = 0;
	var grade_percent =[];
	var gpa= 0;
	for (var i =0; i< bt ; i ++){
		var array = Grade_and_percentage(i);
		percent_total += parseInt(array[1]);
	}

	for (var i = 0 ; i <bt; i++){
		var grade_percent = Grade_and_percentage(i);
		gpa += grade_percent[0]*grade_percent[1]/percent_total;
	}	
	document.getElementById("final_grade").innerHTML = gpa;
}

function Estimate(){
	var bt = document.getElementById("bigTest").value;
	var goal = document.getElementById("goal").value;
	var current_test_score = 0
	var estimate_percentage = 0
	for (var i = 0; i < bt; i++){
		var per = document.getElementsByClassName("percentage")[i].value/100;
		var unknow = 0
		var test_array = test_score(i);
		var per_each_test = per/test_array.length;
		for (var n = 0; n < test_array.length; n++){
			if (test_array[n] ==""){
				unknow += 1;
			}
			else
				current_test_score += parseInt(test_array[n])*per_each_test;
		}
		estimate_percentage += unknow*per_each_test;
	}

	if (estimate_percentage != 0){
		var estimate_score = ((parseInt(goal)-current_test_score))/estimate_percentage;
		if (estimate_score >100){
			document.getElementById("warning").innerHTML = "YOU WILL NEVER REACH YOUR GOAL LOL!";
			return;
		}
		estimate_score = estimate_score.toString();
	}
	else{
		document.getElementById("warning").innerHTML = "YOU DONT HAVE ANY TEST LEFT TO ESTIMATE";
		return;
	}

	for (var i = 0; i < bt ; i++ ){
		var list_miniTest = document.getElementsByClassName("list_miniTest")[i];
		var number_miniTest = document.getElementsByClassName("smallTest")[i].value;
		for (var n = 0 ; n < number_miniTest; n++){
			var score = list_miniTest.children[n*2];
			if (score.value == "" || score.style.color == "red"){
				list_miniTest.children[n*2].value = estimate_score;
				score.style.color = "red";
			}
		}
	}
}
