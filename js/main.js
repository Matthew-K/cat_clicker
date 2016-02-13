/* ======= Model ======= */

var model = {
	catList: [],
	Cat: function(name, url){
		this.name = name;
		this.url = url;
		this.clickNumber = 0;
		//this.imageId = name.toLowerCase() + "Pic";
	},

	//add cat to model.catList by using model.Cat constructor
	addCat: function(name, url){
	 	var addThis = new model.Cat(name, url);
	 	model.catList.push(addThis);
	},
	currentCat: null,

	showAdminSettings: false
};


/* ======= Controller ======= */

var controller = {

	init: function(){
		view.listRender();
		view.imageAndButtonRender();
		view.removeAdminSettings();
		view.createAdminHandler();
		view.createCancelHandler();
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

	currentCats: model.catList,


	turnOffAdmin: function(){
		model.showAdminSettings = false;
		view.removeAdminSettings();
	},

	turnOnAdmin: function(){
		model.showAdminSettings = true;
		view.renderAdminSettings();
	},

	setCurrentCat: function(position){
		model.currentCat = model.catList[position];
	},

	getCurrentCat: function(){
		return model.currentCat;
	},

	increaseClick: function(cat){
		clickNumber = cat.clickNumber;
		clickNumber++;
		cat.clickNumber = clickNumber;
	}


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
					controller.setCurrentCat(j);
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
			var currentCat = controller.getCurrentCat();
			controller.increaseClick(currentCat);
			view.renderClickCount(currentCat.clickNumber);
		});
	},

	renderClickCount: function(number){
		clickCount.innerHTML = number;
	},

	listRender: function(){
		var catButtons = controller.buttonReady(controller.currentCats);
		var catButtonList = controller.createUlList(catButtons);
		this.insertList(catButtonList, this.catButtons);
	},

	imageAndButtonRender: function(){
		view.createButtonHandlers(controller.currentCats);
		view.createImageEventListeners(view.catImage);
	},

	removeAdminSettings: function(){
		document.getElementById("form").style.display = "none";
	},

	renderAdminSettings: function(){
		document.getElementById("form").style.display = "block";
		var nameValue = document.getElementById("name").setAttribute("value", "1");
		var urlValue = document.getElementById("url").setAttribute("value", "2");
		//var idValue = document.getElementById("id").setAttribute("value", "3");
		var clicksValue = document.getElementById("clicks").setAttribute("value", "3");
	},

	createAdminHandler: function(){
		document.getElementById("admin").addEventListener("click", function(){
			controller.turnOnAdmin();
		});
	},

	createCancelHandler: function(){
		document.getElementById("cancel").addEventListener("click", function(){
			controller.turnOffAdmin();
		});
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

/*
console.log(document.getElementById("name"))
console.log(document.getElementById("url"))
console.log(document.getElementById("id"))
console.log(document.getElementById("clicks"))
*/
/*
if showForm = false
	document.getElementById("form").style.display = "none";
else
	document.getElementById("form").style.display = "block";
*/

/*
click admin button
	turn admin to true

======================================================================

model:
	showForm = null

======================================================================

octopus:
	init:
		showForm = false

	turnformtoTrueFunction:
		showerForm = true;
		view.render function

	turnFormtoFalse:
		showForm = false
		view.render function

	update stats:
		take form ids and put them into the catList
		showForm = False

======================================================================

view:
	


	render function:
		if showForm = false
			document.getElementById("form").style.display = "none";
	else
		document.getElementById("form").style.display = "block";

	function:
		add click listener to admin button
			if clicked
				octopus.turnFormtoTrueFunction = True

	function: 
		add click listeners to save and cancel buttons:
			if save is clicked
				octopus.updatestats
			if cancel clicked:
				octopus.turnFormtoFalse


*/
