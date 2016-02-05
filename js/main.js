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
	this.imageId = name.toLowerCase() + "Pic"
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

var clickCount = document.getElementById("clickCount");
var catImage = document.getElementsByClassName("catImage");
catImage = catImage[0];

//creates click handlers for each button. Pressing a button will change the name above the image, the cat image,
//the name in the sentence above the click count, and the click count itself. All of these correspond to the cat 
//the button represents
function createButtonHandlers(array){
	for (var i = 0; i < array.length; i++){
		(function(j){
			var name = array[j].name;
			var id = document.getElementById(name);
			id.addEventListener("click", (function() {

				picTitle = document.getElementById("catNameTitle");
				picTitle.innerHTML = name;

				catImage.src = array[j].url;
				catImage.id = array[j].imageId;

				var clickTitle = document.getElementById("nameInsert");
				clickTitle.innerHTML = name;

				clickCount.innerHTML = array[j].clickNumber;
			}));
		}(i));
	}
}

createButtonHandlers(catList);		

catImage.addEventListener("click", function(){
	var id = (catImage.id);
	var i;
	for (i in catList){
		if (id === catList[i].imageId){
			catList[i].clickNumber += 1;
			console.log(catList[i].clickNumber);
			clickCount.innerHTML = catList[i].clickNumber;
			break;
		}
	}
});
