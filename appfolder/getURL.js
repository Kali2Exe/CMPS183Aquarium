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

var blacklist = ['https://*.facebook.com/*', 'https://twitter.com/*', 'https://*.reddit.com/*'];

//http://stackoverflow.com/questions/19956976/block-url-with-a-specific-word-somewhere-in-the-subdomain

function getCurrentTabUrl(callback) {

  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {

    var tab = tabs[0];

    var url = tab.url;


    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}
/*chrome.tabs.onCreated.addListener(function callback) {

}*/
//http://stackoverflow.com/questions/11156479/how-do-i-use-chrome-tabs-onupdated-addlistener
//http://stackoverflow.com/questions/8457382/opening-a-new-tab-on-google-chrome-extension

//testing out chrome
chrome.tabs.onActivated.addListener(function (activeInfo) {

    getCurrentTabUrl(function(url) {
       for (i = 0; i <blacklist.length< i++;) {
            if (url == blacklist[i]) {
                var item = "https://www.google.com/";
                chrome.tabs.create({'url': item});
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
