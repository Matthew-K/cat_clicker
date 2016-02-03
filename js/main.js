/*
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


elem.addEventListener('click', (function(numCopy) {
    return function() {
        alert(numCopy);
    };
})(num));
*/



/*function createButtons(array){
	buttons = [];
	for (var i = 0; i < array.length; i++){
		newButton = document.createElement("button");
		newButton.type = "button";
		newButton.textContent = array[i].name;
		buttons.push(newButton);
	}
	return buttons;
}
*/

var catList = [];

//change cat and his image url into a Cat object and add it to catList
function addCat(name, url){
 	var addThis = new Cat(name, url);
 	catList.push(addThis);
}

//Cat constructor
function Cat (name, url){
	this.name = name;
	this.url = url;
	this.clickNumber = 0;
} 

addCat("Fred", "images/cat.jpg");
addCat("Mittens", "images/cat2.jpg");
addCat("Belleh", "images/cat3.jpg");
addCat("Cotton", "images/cat4.jpg");
addCat("William", "images/cat5.jpg");

//input catList and return a list of strings as if they are buttons in HTML format
function buttonReady(array){
	buttons = [];
	for (var i = 0; i < array.length; i++){
		newButton = "<button type=\"button\">" + array[i].name + "</button>";
		buttons.push(newButton);
	}
	return buttons;
}

var catButtons = buttonReady(catList);

//input list of button ready strings and return an HTML list
function createUlList (array){
	firstEl = document.createElement('ul');
	for (var i = 0; i < array.length; i++){
		listItem = document.createElement('li');
		listItem.innerHTML = array[i];
		firstEl.appendChild(listItem);
	}
	return firstEl;
}

catList = createUlList(catButtons);

//input list and the id you want to insert list into
function insertList(list, id){
	var parent = document.getElementById(id);
	parent.appendChild(list);
}

insertList(catList, 'catButtons');
