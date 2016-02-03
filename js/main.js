var cat1 = document.getElementById("cat1");
var cat2 = document.getElementById("cat2");

var cat1pic = document.getElementById("cat1pic");
var cat2pic = document.getElementById("cat2pic");

var clickNumber1 = document.getElementById("number1");
var num1 = Number(clickNumber1.innerHTML);

var clickNumber2 = document.getElementById("number2");
var num2 = Number(clickNumber2.innerHTML);

var cat1Name = document.createElement("h2");
cat1Name.textContent = "Fred";

var cat2Name = document.createElement("h2");
cat2Name.textContent = "Mittens";

cat1.insertBefore(cat1Name, cat1pic);
cat2.insertBefore(cat2Name, cat2pic);


var cat1ClickTitle = document.createElement("h2");
cat1ClickTitle.textContent = "Number of clicks for " + cat1Name.textContent;

var cat2ClickTitle = document.createElement("h2");
cat2ClickTitle.textContent = "Number of clicks for " + cat2Name.textContent;

var score = document.getElementById("scores");
score.insertBefore(cat1ClickTitle, clickNumber1);
score.insertBefore(cat2ClickTitle, clickNumber2);


//increase "Number of Times Clicked" by 1 each time cat picture is clicked
cat1.addEventListener("click", function() {
	num1 += 1;
	clickNumber1.innerHTML = num1;
});

cat2.addEventListener("click", function() {
	num2 += 1;
	clickNumber2.innerHTML = num2;
});

