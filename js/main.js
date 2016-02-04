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
		name = catList[i].name;
		listItem.id = catList[i].name;
		firstEl.appendChild(listItem);
	}
	return firstEl;
}

catButtonList = createUlList(catButtons);

//input list and the id you want to insert list into
function insertList(list, id){
	var parent = document.getElementById(id);
	parent.appendChild(list);
}

insertList(catButtonList, 'catButtons');

function createButtonHandlers2(array){
	for (var i = 0; i < array.length; i++){
		(function(j){
			var name = array[j].name;
			var id = document.getElementById(name);
			var image = document.getElementById("catImage");
			var clickTitle = document.getElementById("nameInsert");
			var clickCount = document.getElementById("clickCount");
			var url = array[j].url;
			id.addEventListener("click", (function() {
				title = document.getElementById("catNameTitle");
				title.innerHTML = name;
				image.src = url;
				image.id = name + "Pic";
				clickTitle.innerHTML = name;
				clickCount.innerHTML = array[j].clickNumber;
				fullImage = document.getElementById(image.id);
				fullImage.addEventListener("click",(function(){
					console.log("click worked");
					console.log(fullImage);
					array[j].clickNumber += 1;
					clickCount.innerHTML = array[j].clickNumber;
				}));
			}));
		}(i));
	}
}

createButtonHandlers2(catList);		