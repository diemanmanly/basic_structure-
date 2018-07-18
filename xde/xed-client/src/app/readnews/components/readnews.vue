<template src="./readnews.html"></template>

<script>
  import Vue from 'vue'
  import {mapState, mapActions} from 'vuex'
  import VueFrame from 'vue-frame'
  import {MENUS, CATEGORIES, SIZE, TYPE} from '../../../common/consts'
  import {Paging} from '../../../common/paging'
  import * as utils from "../../../common/utils";
  import * as notify from "../../../common/notify/notify-service"
  import {$http} from '../../../common/http-utils'

  export default {
    name: 'actionstatus',
    props: [],
    data() {
      return {
        selectedRange: "",
        timer: "",
        iframe: {}
      }
    },
    created() {
      this.init();
      this.request();
    },
    mounted() {
    },
    methods: {
      ...mapActions([]),
      request() {

      },
      init() {
        let vm = this;
       
//         var x = $('#iframe')[0];
// var y = x.contentWindow;
// y.body.style.backgroundColor = "red";

// window = $('#iframe')[0].contentWindow.window;
//           document = $('#iframe')[0].contentWindow.document;
        // setTimeout(function () {
        //   vm.httpGet("http://localhost:8005/news?cmd=gethtml&link=https://vuejs.org/", function(res){
        //     var iframe = $('#iframe')[0];
        //     var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        //     iframeDoc.open();
        //     iframeDoc.write(res + "</html>");
        //     iframeDoc.close();
        //   })
        //   $('button').click(function () {
        //     vm.grabSelectedText();
        //   });
        // }, 1000);
setTimeout(function () {
//    $( "#result" ).load( "http://localhost:8080/#/readnews", function() {
//   alert( "Load was performed." );
// });

  $('button').click(function () {
            vm.myFunction();
          });
}, 1000);
        

      },
      httpGet(url, callback) {
        $http.get(url)
            .then(result => {
              var res = result.data;
              if (res.code >= 0) {
                var data = res.data || true;
                callback(data);
              } else {
                if (res.code == ERROE_CODES.not_login) {
                  auth.clearCookies();
                  router.push({name: "login"});
                }
                callback(null);
              }
            }).catch(e => {
              callback(null);
            });
      },
      grabSelectedText() {
        var t = '',
          window = $('#iframe')[0].contentWindow.window,
          document = $('#iframe')[0].contentWindow.document,
          chucknorris = document.createElement("chucknorris");

        if (window.getSelection) {
          t = window.getSelection();
        } else if (document.getSelection) {
          t = document.getSelection();
        } else if (document.selection) {
          t = document.selection.createRange().text;
        }
        console.log(t.focusNode.data);
      },
      getselText() {
        var iframes = document.getElementsByTagName('iframe');
        [].forEach.call(iframes, function (frame) {
          frame.contentWindow.document.onmouseup = function () {

            var win = frame.contentWindow;
            var doc = frame.contentDocument || win.document;

            if (win.getSelection) {
              console.log(win.getSelection().toString());
            } else if (doc.selection && doc.selection.createRange) {
              console.log(doc.selection.createRange().text);
            }
          }
        });
      },
      getIframeSelectionText(iframe) {
        var win = iframe.contentWindow || iframe.contentDocument.defaultView;
        var doc = iframe.contentDocument || win.document || iframe.contentWindow.document;
        if (win.getSelection) {
          return win.getSelection().toString();
        }
        else if (doc.selection && doc.selection.createRange) {
          return doc.selection.createRange().text;
        }
        else if (doc.selection) {
          return doc.selection.createRange().text;
        }
        else {
          alert('Error in rendering');
        }
      },
      myFunction() {
    var x = document.getElementById("myframe");
    var y = x.contentWindow.document;
    debugger
    y.body.style.backgroundColor = "red";
},
      createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
},
getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
},
makeCorsRequest(url) {
  let vm = this;
  // This is a sample server that supports CORS.
  // var url = 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html';

  var xhr = vm.createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = vm.getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}


    },
    computed: {
      ...mapState({})
    },
    watch: {}
  };
</script>

<style>
  #app-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding: 10px 0 10px 240px;
    z-index: 1;
  }

  .disable-connect {
    opacity: 0.5;
  }
</style>
