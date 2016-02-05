/* ======= Model ======= */

var model = {
	catList: [],
	Cat: function(name, url){
		this.name = name;
		this.url = url;
		this.clickNumber = 0;
		this.imageId = name.toLowerCase() + "Pic";
	}
};


/* ======= Controller ======= */

var controller = {
	//add cat to model.catList by using model.Cat constructor
	addCat: function(name, url){
	 	var addThis = new model.Cat(name, url);
	 	model.catList.push(addThis);
	},

	//input catList and return an array of strings as if they are buttons in HTML format
	buttonReady: function(array){
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
			name = catList[i].name;
			listItem.id = catList[i].name;
			firstEl.appendChild(listItem);
		}
		return firstEl;		
	}
};


/* ======= View ======= */

var view = {
	//input html list and the id you want to insert list into
	insertList: function(list, id){
		var parent = document.getElementById(id);
		parent.appendChild(list);	
	},

	createButtonHandlers: function(array){
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
	},

	createImageEventListeners: function(catImage){
		catImage.addEventListener("click", function(){
			var id = (catImage.id);
			var i;
			for (i in catList){
				if (id === catList[i].imageId){
					catList[i].clickNumber += 1;
					clickCount.innerHTML = catList[i].clickNumber;
					break;
				}
			}
		});
	}
};





/*

//array of button-ready markup for each cat in catList
var catButtons = buttonReady(catList);

//html list of cat buttons
catButtonList = createUlList(catButtons);

//list inserted inside div with id of "catButtons"
insertList(catButtonList, 'catButtons');

var clickCount = document.getElementById("clickCount");
var catImage = document.getElementsByClassName("catImage");
catImage = catImage[0];

createButtonHandlers(catList);

*/

controller.addCat("Fred", "images/cat.jpg");
controller.addCat("Fred", "images/cat.jpg");
controller.addCat("Mittens", "images/cat2.jpg");
controller.addCat("Belleh", "images/cat3.jpg");
controller.addCat("Cotton", "images/cat4.jpg");
controller.addCat("William", "images/cat5.jpg");
