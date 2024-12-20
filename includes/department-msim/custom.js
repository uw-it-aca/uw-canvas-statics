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

/* run this code only once the page is loaded */
window.addEventListener('load',function(){

var tabs = document.querySelectorAll(".tabs ul li");
var tab_wraps = document.querySelectorAll(".tab_wrap");

tabs.forEach(function(tab, tab_index){
  tab.addEventListener("click", function(){
    tabs.forEach(function(tab){
      tab.classList.remove("active");
    });
    tab.classList.add("active");

    tab_wraps.forEach(function(content, content_index){
      if(content_index == tab_index){
        content.style.display = "block";
      } else {
        content.style.display = "none";
      }
    });
  });
});
});
