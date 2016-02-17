/* ============================    Model   ============================ */

var model = {

	catList: [],

	Cat: function(name, url){
		this.name = name;
		this.url = url;
		this.clickNumber = 0;
		this.listId = name;
	},

	currentCat: null,
};



/* ============================    Controller    ============================ */

var controller = {

	init: function(){
		model.currentCat = model.catList[0];
		view.init();
		adminView.init();
	},

	//add cat to model.catList by using model.Cat constructor
	addCat: function(name, url){
	 	var addThis = new model.Cat(name, url);
	 	model.catList.push(addThis);
	},

	buttonReady: function(array){
		buttons = [];
		for (var i = 0; i < array.length; i++){
			newButton = document.createElement("button");
			newButton.innerHTML = array[i].name;
			newButton.className = "btn btn-primary";
			newButton.id = model.catList[i].listId;
			buttons.push(newButton);
		}
		return buttons;
	},

	currentCats: model.catList,

	getCurrentCat: function(){
		return model.currentCat;
	},

	setCurrentCat: function(position){
		model.currentCat = model.catList[position];
	},

	increaseClick: function(cat){
		var clickNumber = cat.clickNumber;
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



/* ============================    View    ============================ */


/* ==============  View  ============== */

var view = {

	init: function(){
		view.createCatButtons();
		view.createButtonClickHandlers(controller.currentCats);
		view.createImageClickHandlers(view.catImage);
		view.renderImageAndClickParts(controller.getCurrentCat());
		view.activeThis();
		//get first cat button and make it appear active
		firstCatButton = document.getElementById(controller.getCurrentCat().listId);
		firstCatButton.classList.add("active");
	},

	catButtons: document.getElementById('catButtons'),
	imageTitle: document.getElementById("imageTitle"),
	catImage: document.getElementById("catImage"),
	clickTitle: document.getElementById("nameInsert"),
	clickCount: document.getElementById("clickCount"),


/* ----- Related to list of cat buttons ----- */

	//input html list and the id you want to insert list into
	insertList: function(list, idNode){
		for (var i = 0; i < list.length; i++){
			idNode.appendChild(list[i]);
		}	
	},

	createCatButtons: function(){
		catButtonList = controller.buttonReady(controller.currentCats);
		this.insertList(catButtonList, this.catButtons);
	},	

	createButtonClickHandlers: function(array){
		for (var i = 0; i < array.length; i++){
			(function(j){
				var name = array[j].name;
				var id = document.getElementById(name);
				id.addEventListener("click", (function() {
					controller.setCurrentCat(j);
					var currentCat = controller.getCurrentCat();
					view.renderImageAndClickParts(currentCat);
					adminView.updateInputValues(currentCat);
				}));
			}(i));
		}
	},

	activeThis: function(){
		var buttonsTest = document.querySelectorAll(".btn-primary");
		for (var i = 0; i < buttonsTest.length; i++){
			buttonsTest[i].addEventListener("click", function(){
				this.classList.add('active');
				view.removeActive(this, buttonsTest);
			});
		}
	},

	removeActive: function(keep, buttons){
		for (var i = 0; i < buttons.length; i++){
			if (buttons[i] !== keep){
				buttons[i].classList.remove('active');
			}
		}
	},

	changeCatButtonText: function(cat){
		var button = document.getElementById(cat.listId);
		controller.changeListItemId(button, cat.name);
		//var button = listItem.firstElementChild;
		button.innerHTML = cat.name;
		controller.changeCatListId(cat, cat.name);
	},


/* ----- Related to image, image title, click count, and phrase above click count ----- */

	renderImageAndClickParts: function(cat){
		view.renderImageTitle(cat);
		view.renderImage(cat);
		view.renderClickCount(cat.clickNumber);
	},

	renderImageTitle: function(cat){	
		view.imageTitle.innerHTML = cat.name;
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

	createImageClickHandlers: function(catImage){
		catImage.addEventListener("click", function(){
			var currentCat = controller.getCurrentCat();
			controller.increaseClick(currentCat);
			view.renderClickCount(currentCat.clickNumber);
			adminView.updateInputValues(currentCat);
		});
	}

};


// ==============  Admin View  ==============

var adminView = {

	init: function(){
		adminView.removeAdminSettings();
		adminView.createAdminHandler();
		adminView.createCancelHandler();
		adminView.createSaveHandler();
		adminView.updateInputValues(controller.getCurrentCat());
	},

	showAdminSettings: function(){
		document.getElementById("form").style.display = "block";
	},

	removeAdminSettings: function(){
		document.getElementById("form").style.display = "none";
	},

	getInputValues: function(){
		var values = {
		name: document.getElementById('name').value, 
		url: document.getElementById("url").value,
		clickNumber: document.getElementById("clicks").value 
		};
		return values;
	},

	updateInputValues: function(cat){
		document.getElementById('name').value = cat.name;
		document.getElementById("url").value =  cat.url;
		document.getElementById("clicks").value = cat.clickNumber;
	},

	createAdminHandler: function(){
		document.getElementById("admin").addEventListener("click", function(){
			adminView.showAdminSettings();
		});
	},

	createCancelHandler: function(){
		document.getElementById("cancel").addEventListener("click", function(){
			adminView.removeAdminSettings();
		});
	},

	createSaveHandler: function(){
		document.getElementById("save").addEventListener("click", function(){
			adminView.flashSave();
			var values = adminView.getInputValues();
			controller.updateCurrentCat(values);
			var cat = controller.getCurrentCat();
			view.changeCatButtonText(cat);
			view.renderImageAndClickParts(cat);
			adminView.removeAdminSettings();
		});
	},

	flashSave: function(){
		var form = document.getElementById("admin");
		form.classList.toggle("saved");
		setTimeout(function(){
			form.classList.toggle("saved");
		},100);
	}
};


//initial cats
controller.addCat("Fred", "images/cat.jpg");
controller.addCat("Mittens", "images/cat2.jpg");
controller.addCat("Belleh", "images/cat3.jpg");
controller.addCat("Cotton", "images/cat4.jpg");
controller.addCat("William", "images/cat5.jpg");


//start program
controller.init();



