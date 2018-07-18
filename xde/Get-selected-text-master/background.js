// debugger
// chrome.browserAction.onClicked.addListener(function(tab) {
//     debugger
//
//     chrome.runtime.sendMessage({tab: tab.id, greeting: "hello"}, function(response) {
//         var url=response.url;
//             var subject=response.subject;
//             var body= response.body;
//
//             if(body==''){
//                 body="No text selected";
//             }
//     });
// });
//
// debugger
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     debugger
//     if (request.method == "getSelection") {
//         var selection = window.getSelectionHTML();
//         sendResponse({body: selection, url: window.location.href, subject: document.title});
//     }
//     else
//         sendResponse({}); // snub them.
// });

debugger
console.log("Atleast reached background.js")
var gPos = null;
chrome.runtime.onMessage.addListener (
    function (request, sender, sendResponse) {
        console.log("Reached Background.js");
        if (request.cmd == "selectText") {
            debugger
            console.log(request.message);
            sendResponse({body: request.message});// len server lây về

            // $.get("http://localhost:63342/Projects/StackOverflow/ChromeEXT/helloWorld1", function(response) {
            //     console.log(response);
            //     // to send back your response  to the current tab
            //     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            //         chrome.tabs.sendMessage(tabs[0].id, {fileData: response}, function(response) {
            //             ;
            //         });
            //     });
            // })
        }
        else {
            console.log("Did not receive the response!!!")
        }
    }
);