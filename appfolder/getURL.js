/**
 * Created by Kevin Wu on 2/2/2017.
 */
//https://developer.chrome.com/extensions/tabs
//https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples/api/tabs/
//https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples/api/

//starting to create tab url grabbers.
//borrowed code from popup.hmtl
//good point is that the tab.url can get gotten
//https://developer.chrome.com/extensions/tabs#method-query
//https://developer.chrome.com/extensions/match_patterns
//https://developer.chrome.com/extensions/samples

//this blacklist might get a little too big and heavy on processing.
//JS might not have a list structure available

var blacklist = ["https://www.facebook.com/", "https://twitter.com/", "https://www.reddit.com/",
    "https://www.youtube.com/"];

var globalurl = null;
var timers = [];
//http://stackoverflow.com/questions/19956976/block-url-with-a-specific-word-somewhere-in-the-subdomain

function getCurrentTabUrl(callback) {
  /*tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|)*/
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {

    var tab = tabs[0];

    var url = tab.url;


    console.assert(typeof url == 'string', 'tab.url should be a string');
    console.log(url)
    /*for (i = 0; i < tabs.length; i++) {
          console.log('Tab url: ', tabs[i].url)
      }*/

    /*tabs.forEach(function(tab) {
        console.log('Tab ID: ', tab.id);
    });*/

    callback(url);
  });
}
/*chrome.tabs.onCreated.addListener(function callback) {

}*/
//http://stackoverflow.com/questions/11156479/how-do-i-use-chrome-tabs-onupdated-addlistener
//http://stackoverflow.com/questions/8457382/opening-a-new-tab-on-google-chrome-extension


//http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
//https://books.google.com/books?id=ivdjDAAAQBAJ&pg=PA13&lpg=PA13&dq=chrome+extension+current+date&source=bl&ots=s7u2VVXbYp&sig=6zVtJ_czfmTh0-f4aRd0ljyKuKA&hl=en&sa=X&ved=0ahUKEwiy5J-696HSAhXjy1QKHQZlD8Y4ChDoAQgiMAE#v=onepage&q=chrome%20extension%20current%20date&f=false
//https://developer.chrome.com/apps/app_codelab_alarms
//http://stackoverflow.com/questions/14082674/timer-for-chrome-extension


//testing out chrome
chrome.tabs.onActivated.addListener(function (activeInfo) {
    //console.log(blacklist[0])
    getCurrentTabUrl(function(url) {

    globalurl = url;
        timers[url] = new Date();
       for (i = 0; i <blacklist.length< i++;) {
            //console.log(url.localeCompare(blacklist[i]))

            if (url.localeCompare(blacklist[i]) == 0) {
                //chrome.pageAction.show(url);
                //notification.show();
                window.alert("Testing blacklist")
            }
        }

    });
});
//this is for clicking on the popup.  May or may not be used
//Listening JS.  If you change to a certain tab url, you will get a pop up notif.
/*document.addEventListener('DOMContentLoaded', function() {
    getCurrentTabUrl(function(url) {


    }
    //chrome.tabs.onActivated.addListener(function callback)
    //chrome.tabs.create(object createProperties, function callback)
});*/
