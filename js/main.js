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

//input catList and return an array of strings as if they are buttons in HTML format
function buttonReady(array){
	buttons = [];
	for (var i = 0; i < array.length; i++){
		newButton = "<button type=\"button\">" + array[i].name + "</button>";
		buttons.push(newButton);
	}
	return buttons;
}

//array of button-ready markup for each cat in catList
var catButtons = buttonReady(catList);

//input array of button ready strings and return an HTML list. Each button gets an id corresponding to the cat's name
function createUlList (array){
	firstEl = document.createElement('ul');
	for (var i = 0; i < array.length; i++){
		listItem = document.createElement('li');
		listItem.innerHTML = array[i];
		name = catList[i].name;
		listItem.id = catList[i].name;
		firstEl.appendChild(listItem);
	}
	return firstEl;
}

//html list of cat buttons
catButtonList = createUlList(catButtons);

//input html list and the id you want to insert list into
function insertList(list, id){
	var parent = document.getElementById(id);
	parent.appendChild(list);
}

//list inserted inside div with id of "catButtons"
insertList(catButtonList, 'catButtons');

//creates click handlers for each button. Pressing a button will change the name above the image, the cat image,
//the name in the sentence above the click count, and the click count itself. All of these correspond to the cat 
//the button represents
function createButtonHandlers2(array){
	for (var i = 0; i < array.length; i++){
		(function(j){
			var name = array[j].name;
			var id = document.getElementById(name);
			id.addEventListener("click", (function() {

				picTitle = document.getElementById("catNameTitle");
				picTitle.innerHTML = name;

				var image = document.getElementsByClassName("catImage");
				var imageSrc = array[j].url;
				image[0].src = imageSrc;
				//an id is created for each picture, this will be used for click handler catImage.addEventListener
				image[0].id = name.toLowerCase() + "Pic";

				var clickTitle = document.getElementById("nameInsert");
				clickTitle.innerHTML = name;

				var clickCount = document.getElementById("clickCount");
				clickCount.innerHTML = array[j].clickNumber;
			}));
		}(i));
	}
}

createButtonHandlers2(catList);		

var catImage = document.getElementsByClassName("catImage");

var catImage = catImage[0];

catImage.addEventListener("click", function(){
	console.log("click worked");
	id = (catImage.id);
	console.log(id);
});
