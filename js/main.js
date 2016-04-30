/* ============================    Model   ============================ */

var model = {

	// Array with all the cats
	catList: [
		{
			name: "Fred", 
			url: "images/cat.jpg", 
			clickNumber: 0, 
			listId: "Fred"}, 
		{
			name: "Mittens", 
			url: "images/cat2.jpg", 
			clickNumber: 0, 
			listId: "Mittens"}, 
		{
			name: "Belleh", 
			url: "images/cat3.jpg", 
			clickNumber: 0, 
			listId: "Belleh"}, 
		{
			name: "Cotton", 
			url: "images/cat4.jpg", 
			clickNumber: 0, 
			listId: "Cotton"}, 
		{
			name: "William", 
			url: "images/cat5.jpg", 
			clickNumber: 0, 
			listId: "William"}
	],

	// Object constructor for a cat. Input the cat's name and image url. Constructor includes name, image url, the clicknumber(starts at 0), and the id that will be used in the html(same as cat's name)
	Cat: function(name, url){
		this.name = name;
		this.url = url;
		this.clickNumber = 0;
		this.listId = name;
	},

	// Will be set once program is initialized
	currentCat: null,
};


/* ============================    Controller    ============================ */

var controller = {

	// Initializes program. Will set the current cat as the first cat in the model.catList array, and will initialize the view and the admin view
	init: function(){
		model.currentCat = model.catList[0];
		view.init();
		adminView.init();
	},

	// add cat to model.catList by using model.Cat constructor
	addCat: function(name, url){
	 	var addThis = new model.Cat(name, url);
	 	model.catList.push(addThis);
	},

	// Will take an array of cats and create an array of buttons for them
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

	// Sets current cats as the ones in model.catList
	currentCats: model.catList,

	// Retrieves the current cat 
	getCurrentCat: function(){
		return model.currentCat;
	},

	// Sets the current cat depending on what index you input
	setCurrentCat: function(position){
		model.currentCat = model.catList[position];
	},

	// Increases the click count for specificed cat
	increaseClick: function(cat){
		var clickNumber = cat.clickNumber;
		clickNumber++;
		cat.clickNumber = clickNumber;
	},

	// Updates model.currentCat. This is only used when saving settings from the admin form for a specific cat.
	updateCurrentCat: function(values){
		model.currentCat.name = values.name;
		model.currentCat.url = values.url;
		model.currentCat.clickNumber = values.clickNumber;
	},

	// Changes id of the button 
	changeListItemId: function(listItem, newId){
		listItem.id = newId;
	},

	// Changes value of the listId key for a cat
	changeCatListId: function(cat, newListId){
		cat.listId = cat.name;
	}

};



/* ============================    View    ============================ */


/* ==============  View  ============== */

var view = {

	//Initializes view by creating the buttons, click handlers, and headings
	init: function(){
		view.createCatButtons();
		view.createButtonClickHandlers(controller.currentCats);
		view.createImageClickHandlers(view.catImage);
		view.renderImageAndClickParts(controller.getCurrentCat());

		//get first cat button and make it appear active
		view.activeThis();
		firstCatButton = document.getElementById(controller.getCurrentCat().listId);
		firstCatButton.classList.add("active");
	},

	// Variables that can be used 
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

	// Creates the buttons using the buttons in the array created by controller.buttonReady
	createCatButtons: function(){
		catButtonList = controller.buttonReady(controller.currentCats);
		this.insertList(catButtonList, this.catButtons);
	},	

	//Loops through an array of cats and adds a click handler to the button that corresponds with their id
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

	// Makes button active
	activeThis: function(){
		var buttonsTest = document.querySelectorAll(".btn-primary");
		for (var i = 0; i < buttonsTest.length; i++){
			buttonsTest[i].addEventListener("click", function(){
				this.classList.add('active');
				view.removeActive(this, buttonsTest);
			});
		}
	},

	// Makes button not active
	removeActive: function(keep, buttons){
		for (var i = 0; i < buttons.length; i++){
			if (buttons[i] !== keep){
				buttons[i].classList.remove('active');
			}
		}
	},

	// Change text of cat button
	changeCatButtonText: function(cat){
		var button = document.getElementById(cat.listId);
		controller.changeListItemId(button, cat.name);
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

	// Creates click handlers for the images
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

	// Initializes admin view 
	init: function(){
		adminView.removeAdminSettings();
		adminView.createAdminHandler();
		adminView.createCancelHandler();
		adminView.createSaveHandler();
		adminView.updateInputValues(controller.getCurrentCat());
	},

	// Displays the admin form 
	showAdminSettings: function(){
		document.getElementById("form").style.display = "block";
	},

	// Removes the display for the admin form 
	removeAdminSettings: function(){
		document.getElementById("form").style.display = "none";
	},

	// Collects input values in the admin form
	getInputValues: function(){
		var values = {
		name: document.getElementById('name').value, 
		url: document.getElementById("url").value,
		clickNumber: document.getElementById("clicks").value 
		};
		return values;
	},

	// Updates input values of admin form based on what cat serves as the input
	updateInputValues: function(cat){
		document.getElementById('name').value = cat.name;
		document.getElementById("url").value =  cat.url;
		document.getElementById("clicks").value = cat.clickNumber;
	},

	// Click handler for the "admin" button
	createAdminHandler: function(){
		document.getElementById("admin").addEventListener("click", function(){
			adminView.showAdminSettings();
		});
	},

	// Click handler for the "cancel" button
	createCancelHandler: function(){
		document.getElementById("cancel").addEventListener("click", function(){
			adminView.removeAdminSettings();
		});
	},

	// Click handler for the "save" button
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

	// Makes admin button flash blue
	flashSave: function(){
		var form = document.getElementById("admin");
		form.classList.toggle("saved");
		setTimeout(function(){
			form.classList.toggle("saved");
		},100);
	}
};


// Add Twix to  model.catList. He's a dog, but that's alright. 
controller.addCat("Twix", "images/twix.jpg" );

//start program
controller.init();



