var list_div = document.getElementById("list_div");
for (var i = 0, len = list_div.children.length; i < len; i++) {
	if(list_div.children[i].className == "div"){
		var attr1 = document.createAttribute("draggable");
		attr1.value = "true";
		list_div.children[i].setAttributeNode(attr1);

		var attr2 = document.createAttribute("ondragstart");
		attr2.value = "dsHandler(event)";
		list_div.children[i].setAttributeNode(attr2);
	}
}

var save_div = document.getElementById("save_div");
for (var i = 0, len = save_div.children.length; i < len; i++) {
	if(save_div.children[i].localName == "h2"){
		var attr = document.createAttribute("ondragleave");
		attr.value = "return false";
		save_div.children[i].setAttributeNode(attr);
	}
}

var dsHandler = function(evt){
	evt.dataTransfer.setData("text/plain", "<item>" + evt.target.innerHTML);
}

save_div.ondrop = function(evt){
	 var text = evt.dataTransfer.getData("text/plain");
	 if (text.indexOf("<item>") == 0) {
	 	var newElem = document.createElement("div");
	 	newElem.id = new Date().getUTCMilliseconds();
	 	newElem.innerHTML = text.substring(6);
	 	newElem.draggable = "true";
	 	newElem.className = "div";
	 	newElem.ondragstart = function(evt){
	 		evt.dataTransfer.setData("text/plain", "<remove>"+newElem.id);
	 	}
	 	save_div.appendChild(newElem);
	 }
}

document.getElementById("dusty").ondrop = function(evt){
	var id = evt.dataTransfer.getData("text/plain");
	if (id.indexOf("<remove>") == 0) {
		var target = document.getElementById(id.substring(8));
		save_div.removeChild(target);
	}

}

document.ondragover = function(evt){
	return false;
}

document.ondrop = function(evt){
	return false;
}