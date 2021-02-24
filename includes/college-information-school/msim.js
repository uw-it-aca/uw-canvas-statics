var acc = document.getElementsByClassName("element_toggler");
var pad = document.getElementsByClassName("element_to_toggle");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var pad = this.nextElementSibling;
        if (pad.style.display === "block") {
            pad.style.display = "none";
        } else {
            pad.style.display = "block";
        }
    });
}

var accLive = document.getElementsByClassName("element_toggler_live");
var callIn = document.getElementsByClassName("call_in_content");
var j;

for (j = 0; j < accLive.length; j++) {
    accLive[j].addEventListener("click", function() {
        this.classList.toggle("active");
        var callIn = this.nextElementSibling;
        if (callIn.style.display === "block") {
            callIn.style.display = "none";
        } else {
            callIn.style.display = "block";
        }
    });
}


/////Tabs JS code

var tabs = document.getElementById('icetab-container').children;
var tabcontents = document.getElementById('icetab-content').children;

var myFunction = function() {
	var tabchange = this.mynum;
	for(var int=0;int<tabcontents.length;int++){
		tabcontents[int].className = ' tabcontent-block';
		tabs[int].className = ' icetab';
	}
	tabcontents[tabchange].classList.add('tab-active');
	this.classList.add('current-tab');
};


for(var index=0;index<tabs.length;index++){
	tabs[index].mynum=index;
	tabs[index].addEventListener('click', myFunction, false);
}
