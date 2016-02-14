/* ======= Model ======= */

var model = {
	catList: [],
	Cat: function(name, url){
		this.name = name;
		this.url = url;
		this.clickNumber = 0;
		//this.imageId = name.toLowerCase() + "Pic";
		this.listId = name;
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
		view.createSaveHandler();

		model.currentCat = model.catList[0];
		initCat = model.currentCat;
		view.renderImage(initCat);


			//renderImage: function(cat){
		//view.catImage.src = cat.url;
	
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
			listItem.id = model.catList[i].listId;
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
	},

	updateCurrentCat: function(values){
		model.currentCat.name = values.name;
		model.currentCat.url = values.url;
		model.currentCat.clickNumber = values.clickNumber;
	},

	changeListItemId: function(listItem, newId){
		listItem.id = newId;
	},

	changeCatListId: function(cat, newListId){
	cat.listId = cat.name;
}
};


/* ======= View ======= */

var view = {

	catButtons: document.getElementById('catButtons'),
	catImage: document.getElementsByClassName("catImage")[0],
	clickTitle: document.getElementById("nameInsert"),
	clickCount: document.getElementById("clickCount"),
	picTitle: document.getElementById("catNameTitle"),

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
					var currentCat = controller.getCurrentCat();
					view.render(currentCat);
					view.updateAdminSettings(currentCat);
				}));
			}(i));
		}
	},

	render: function(cat){
		view.renderPicTitle(cat);
		view.renderImage(cat);
		view.renderClickTitle(cat);
		view.renderClickCount(cat.clickNumber);
	},

	renderPicTitle: function(cat){	
		view.picTitle.innerHTML = cat.name;
	},

	renderImage: function(cat){
		view.catImage.src = cat.url;
	},

	renderClickTitle: function(cat){
		view.clickTitle.innerHTML = cat.name;
	},

	renderClickCount: function(number){
		clickCount.innerHTML = number;
	},

	createImageEventListeners: function(catImage){
		catImage.addEventListener("click", function(){
			var currentCat = controller.getCurrentCat();
			controller.increaseClick(currentCat);
			view.renderClickCount(currentCat.clickNumber);
			view.updateAdminSettings(currentCat);
		});
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

	updateAdminSettings: function(cat){
		document.getElementById('name').value = cat.name;
		document.getElementById("url").value =  cat.url;
		document.getElementById("clicks").value = cat.clickNumber;
	},

	renderAdminSettings: function(){
		document.getElementById("form").style.display = "block";
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
	},

	createSaveHandler: function(){
		document.getElementById("save").addEventListener("click", function(){
			view.flashSave();
			values = view.getInputValues();
			controller.updateCurrentCat(values);
			var cat = controller.getCurrentCat();
			view.changeButtonName(cat);
			view.render(cat);
		});
	},

	changeButtonName: function(cat){
		var listItem = document.getElementById(cat.listId);
		controller.changeListItemId(listItem, cat.name);
		var button = listItem.firstElementChild;
		button.innerHTML = cat.name;
		controller.changeCatListId(cat, cat.name);
	},

	flashSave: function(){
		var form = document.getElementById("form");
		form.classList.toggle("saved");
		setTimeout(function(){
			form.classList.toggle("saved");
		},100);
	},

	getInputValues: function(){
		var values = {
		name: document.getElementById('name').value, 
		url: document.getElementById("url").value,
		clickNumber: document.getElementById("clicks").value 
		};
		return values;
	},
};


//initial cats
model.addCat("Fred", "images/cat.jpg");
model.addCat("Mittens", "images/cat2.jpg");
model.addCat("Belleh", "images/cat3.jpg");
model.addCat("Cotton", "images/cat4.jpg");
model.addCat("William", "images/cat5.jpg");

//start program
controller.init();

