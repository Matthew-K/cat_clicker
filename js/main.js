var cat = document.getElementById("cat");
var clickNumber = document.getElementById("number");
var num = Number(clickNumber.innerHTML);

//increase "Number of Times Clicked" by 1 each time cat picture is clicked
cat.addEventListener("click", function() {
	num += 1;
	clickNumber.innerHTML = num;
});