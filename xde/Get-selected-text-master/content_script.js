
console.log("Hello World!s");
$(document).ready(function () {
    console.log("DOM READY!");
    $(document.documentElement).mouseup(function (e) {
        var selected = getSelection();
        var message = selected.toString();
        console.log(selected);
        if(message && message.trim()){
            chrome.runtime.sendMessage({cmd: "selectText", pointx: e.clientX, pointy: e.clientY, message: message}, function (response) {
                var range = selected.getRangeAt(0).cloneRange();
                var a = document.createElement("span");
                a.style.color= "inherit";
                a.setAttribute('tabindex', "0");
                a.setAttribute('data-toggle','popover');
                a.setAttribute('data-content',response.body);
                a.setAttribute('title','popover title');
    
                range.surroundContents(a);
                selected.removeAllRanges();
                selected.addRange(range);
    
                setTimeout(function(){
                    $(a).popover("show");  
                    }, 1000);
            })
        }
        

    });

    $(document.documentElement).click(function (e) {
        $('[data-toggle="popover"]').popover("hide");   
    });
});

function getSelectedText() {
    var seltxt = '';
     if (window.getSelection) { 
         seltxt = window.getSelection(); 
     } else if (document.getSelection) { 
         seltxt = document.getSelection(); 
     } else if (document.selection) { 
         seltxt = document.selection.createRange().text; 
     }
    else return;
    return seltxt.toString();
}
