var parseJSON = function(jsonObject){
	var accordeonData;
	try{
		accordeonData = JSON.parse(jsonObject);
	}
	catch(e){
		console.log(e.message);
		console.log("invalid JSON");
		return;
	}
	console.log(accordeonData);
	var accordeon = document.getElementById("accordeon");
	var mustHide = false;
	createAccordeonLevel(accordeon,accordeonData,mustHide);
};

var createAccordeonLevel = function(nodeToInsert,accordeonData,mustHide){
	if(accordeonData !== null){
		var accordLevel = document.createElement("ul");
		accordLevel.classList.add("accordeonLevel");
		if(mustHide){
			accordLevel.classList.add("hide");
			accordLevel.classList.add("content");
		}
		nodeToInsert.appendChild(accordLevel);
		for(var accordTitle in accordeonData){
			if(accordeonData.hasOwnProperty(accordTitle)){
				createAccordeonItem(accordLevel,accordTitle,accordeonData[accordTitle]);
			} //if
		} //for
	} //if
};
var createAccordeonItem = function(nodeToInsert,insetTitle,insetData){
	var isObject = (typeof(insetData) === "object" && insetData !== null && !Array.isArray(insetData));
	var li = document.createElement('li');
	nodeToInsert.appendChild(li);

	var accordeonItem = document.createElement('div');
	accordeonItem.classList.add("accordeonItem");
	li.appendChild(accordeonItem);

	createTitle(accordeonItem,insetTitle);
	var mustHide = true;
	if(isObject){
		createAccordeonLevel(accordeonItem,insetData,mustHide)
	}
	else{
		createInset(accordeonItem,insetData);
	}
}

var createTitle = (function(){
	var tabIndex = 1;
	var createTitle = function(nodeToInsert,insetTitle){
		// creation of title
		var a = document.createElement("a");
		a.tabIndex = tabIndex++;
		a.setAttribute("href","#");
		a.addEventListener('click',toogleText);
		a.addEventListener("focus",toogleText);
		a.appendChild(document.createTextNode(insetTitle));
		nodeToInsert.appendChild(a);
	}
	return createTitle;
})();
var createInset = function(nodeToInsert,insetData){
	//creation of textdata
	var p;
	if(Array.isArray(insetData)){
		for(var i = 0; i < insetData.length; i++){
			p = document.createElement("p");
			p.classList.add("hide");
			p.classList.add("content");
			p.appendChild(document.createTextNode(insetData[i]));
			nodeToInsert.appendChild(p);
		}
	}
	else{
		p = document.createElement("p");
		p.classList.add("hide");
		p.classList.add("content");
		p.appendChild(document.createTextNode(insetData));
		nodeToInsert.appendChild(p);
	}
}
var toogleText = function(e){
	var next = this.nextSibling;
	while(next){
		next.classList.toggle("hide");
		next = next.nextSibling;
	}
}
