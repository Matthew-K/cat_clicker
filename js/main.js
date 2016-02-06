/* ======= Model ======= */

var model = {
	catList: [],
	Cat: function(name, url){
		this.name = name;
		this.url = url;
		this.clickNumber = 0;
		this.imageId = name.toLowerCase() + "Pic";
	},

	//add cat to model.catList by using model.Cat constructor
	addCat: function(name, url){
	 	var addThis = new model.Cat(name, url);
	 	model.catList.push(addThis);
	},
};


/* ======= Controller ======= */

var controller = {

	init: function(){
		view.listRender();
		view.imageAndClickRender();
	},

	//input catList and return an array of strings as if they are buttons in HTML format
	buttonReady: function(array){
		buttons = [];
		for (var i = 0; i < array.length; i++){
			newButton = "<button type=\"button\">" + array[i].name + "</button>";
			buttons.push(newButton);
		}
		return buttons;
	},

	//input array of button ready strings and return an HTML list. Each button gets an id corresponding to the cat's name
	createUlList: function(array){
		firstEl = document.createElement('ul');
		for (var i = 0; i < array.length; i++){
			listItem = document.createElement('li');
			listItem.innerHTML = array[i];
			listItem.id = model.catList[i].name;
			firstEl.appendChild(listItem);
		}
		return firstEl;		
	},

	increaseClickCount: function(cat){
		var number = cat.clickNumber;
		number ++;
		cat.clickNumber = number;
	},

	currentCats: model.catList
};


/* ======= View ======= */

var view = {

	catButtons: document.getElementById('catButtons'),
	catImage: document.getElementsByClassName("catImage")[0],
	clickTitle: document.getElementById("nameInsert"),
	clickCount: document.getElementById("clickCount"),

	//input html list and the id you want to insert list into
	insertList: function(list, idNode){
		idNode.appendChild(list);	
	},

	createButtonHandlers: function(array){
		for (var i = 0; i < array.length; i++){
			(function(j){
				var name = array[j].name;
				var id = document.getElementById(name);
				id.addEventListener("click", (function() {
					picTitle = document.getElementById("catNameTitle");
					picTitle.innerHTML = name;
					view.catImage.src = array[j].url;
					view.catImage.id = array[j].imageId;
					//var clickTitle = document.getElementById("nameInsert");
					view.clickTitle.innerHTML = name;
					view.clickCount.innerHTML = array[j].clickNumber;
				}));
			}(i));
		}
	},

	createImageEventListeners: function(catImage){
		catImage.addEventListener("click", function(){
			var id = (catImage.id);
			var i;
			for (i in controller.currentCats){
				if (id === controller.currentCats[i].imageId){
					controller.increaseClickCount(controller.currentCats[i]);
					view.renderClickCount(controller.currentCats[i]);
					break;
				}
			}
		});
	},

	renderClickCount: function(cat){
		clickCount.innerHTML = cat.clickNumber;
	},

	listRender: function(){
		var catButtons = controller.buttonReady(controller.currentCats);
		var catButtonList = controller.createUlList(catButtons);
		this.insertList(catButtonList, this.catButtons);
	},

	imageAndClickRender: function(){
		view.createButtonHandlers(controller.currentCats);
		view.createImageEventListeners(view.catImage);
	}


};

//initial cats
model.addCat("Fred", "images/cat.jpg");
model.addCat("Mittens", "images/cat2.jpg");
model.addCat("Belleh", "images/cat3.jpg");
model.addCat("Cotton", "images/cat4.jpg");
model.addCat("William", "images/cat5.jpg");

//start program
controller.init();