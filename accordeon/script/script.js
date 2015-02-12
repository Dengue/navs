var createAccordeon = function(jsonObject){
	var accordeon = document.getElementById("accordeon");
	accordeon.innerHTML = "<ul class='accordeon-level'></ul>";
	parseJSON(jsonObject);
}


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
	createAccordeonLevel(accordeon,accordeonData);
};

var createAccordeonLevel = function(nodeToInsert,accordeonData){
	if(accordeonData !== null){

		for(var accordTitle in accordeonData){
			if(accordeonData.hasOwnProperty(accordTitle)){
				var isObject = (typeof(accordeonData[accordTitle]) === "object" && accordeonData[accordTitle] !== null && !Array.isArray(accordeonData[accordTitle]));
				if(isObject){
				}
				else{
					createInset(accordTitle,accordeonData[accordTitle]);
				}
			} //if
		} //for
	} //if
};

var createInset = function(insetTitle,insetData){
	var accordLevel = document.getElementsByClassName("accordeonLevel")[0];
				
	var li = document.createElement('li');
	accordLevel.appendChild(li);

	var accordeonItem = document.createElement('div');
	accordeonItem.classList.add("accordeonItem");
	li.appendChild(accordeonItem);

	// creation of title
	var a = document.createElement("a");
	a.setAttribute("href","#");
	a.addEventListener('click',toogleText);
	a.appendChild(document.createTextNode(insetTitle));
	accordeonItem.appendChild(a);

	//creation of textdata
	var p;
	if(Array.isArray(insetData)){
		for(var i = 0; i < insetData.length; i++){
			p = document.createElement("p");
			p.classList.add("hide");
			p.appendChild(document.createTextNode(insetData[i]));
			accordeonItem.appendChild(p);
		}
	}
	else{
		p = document.createElement("p");
		p.classList.add("hide");
		p.appendChild(document.createTextNode(insetData));
		accordeonItem.appendChild(p);
	}
}
var toogleText = function(e){
	var next = this.nextSibling;
	while(next){
		next.classList.toggle("hide");
		next = next.nextSibling;
	}
}