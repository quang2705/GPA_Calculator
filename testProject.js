
function createTest(i=0){
	var number = document.getElementsByClassName("theId")[i].value;
	var result = document.getElementsByClassName("result")[i];
	while (result.firstChild){
		result.removeChild(result.firstChild);
	}
	if (number <= 20)
	{	
		for (var i = 0 ; i < number; i++)
		{
			var input = document.createElement("INPUT");
			input.setAttribute("type","text");
			input.setAttribute("oninput","test_score(i)");
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
		miniTest.oninput = function(){createTest(n)};
		per.oninput = function(){Compute_percentage(n)};
	}
}

function Compute_percentage(i=0){
	var percentage = document.getElementsByClassName("percentage")[i].value;
	var array = test_score();
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
	document.getElementById("current-grade").innerHTML = final_grade;
}

function test_score(i=0){
	var test_array = [];
	var number = document.getElementsByClassName("theId")[i].value;
	var result = document.getElementsByClassName("result")[i];
	for (var i = 0 ; i < number; i++)
	{
		var score = result.children[i*2].value;
		test_array.push(score);
	}
	return test_array;
}

