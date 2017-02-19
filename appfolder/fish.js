var canvas, context;
var fishAry = [];
var btnAry = [];
var mouseman = new MouseManager();
var background = chrome.extension.getBackgroundPage();

var url = null;

  var config = {
    apiKey: "AIzaSyC_4qm-B8jjfW5Ac10kdKVS0Tfpe67c1lc",
    authDomain: "productivityaquarium.firebaseapp.com",
    databaseURL: "https://productivityaquarium.firebaseio.com",
    storageBucket: "productivityaquarium.appspot.com",
    messagingSenderId: "6131845978"
  };
  firebase.initializeApp(config);

function initApp() {
  // Listen for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var refreshToken = user.refreshToken;
      var providerData = user.providerData;
      // [START_EXCLUDE]
      document.getElementById('quickstart-button').textContent = 'Sign out';
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
      document.getElementById('quickstart-account-details').textContent = JSON.stringify({
        displayName: displayName,
        email: email,
        emailVerified: emailVerified,
        photoURL: photoURL,
        isAnonymous: isAnonymous,
        uid: uid,
        refreshToken: refreshToken,
        providerData: providerData
      }, null, '  ');
      // [END_EXCLUDE]
    } else {
      // Let's try to get a Google auth token programmatically.
      // [START_EXCLUDE]
      document.getElementById('quickstart-button').textContent = 'Sign-in with Google';
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
      document.getElementById('quickstart-account-details').textContent = 'null';
      // [END_EXCLUDE]
    }
    document.getElementById('quickstart-button').disabled = false;
  });
  // [END authstatelistener]

  document.getElementById('quickstart-button').addEventListener('click', startSignIn, false);
}

/**
 * Start the auth flow and authorizes to Firebase.
 * @param{boolean} interactive True if the OAuth flow should request with an interactive mode.
 */
function startAuth(interactive) {
  // Request an OAuth token from the Chrome Identity API.
  chrome.identity.getAuthToken({interactive: !!interactive}, function(token) {
    if (chrome.runtime.lastError && !interactive) {
      console.log('It was not possible to get a token programmatically.');
    } else if(chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else if (token) {
      // Authrorize Firebase with the OAuth Access Token.
      var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
      firebase.auth().signInWithCredential(credential).catch(function(error) {
        // The OAuth token might have been invalidated. Lets' remove it from cache.
        if (error.code === 'auth/invalid-credential') {
          chrome.identity.removeCachedAuthToken({token: token}, function() {
            startAuth(interactive);
          });
        }
      });
    } else {
      console.error('The OAuth Token was null');
    }
  });
}

/**
 * Starts the sign-in process.
 */
function startSignIn() {
  document.getElementById('quickstart-button').disabled = true;
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    startAuth(true);
  }
}


function init() {
   canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
	
    canvas.addEventListener('mousemove', function(evt) {
        mouseman.findTarget(evt);   
    });
    canvas.addEventListener('mousedown', function(evt) {
        mouseman.findTarget(evt);   
    });
    canvas.addEventListener('mouseup', function(evt) {
        mouseman.findTarget(evt);   
    });
    
    btnAry[0] = new Button(createFish);
    console.log(createFish);
    btnAry[0].setSpriteAttributes(10, 10, 20, 20, "pressButton");
    btnAry[0].setSrc("http://www.iconsdb.com/icons/preview/blue/square-xxl.png", "http://www.iconsdb.com/icons/preview/blue/square-xxl.png");
    fishAry[0] = new Fish(); 
    setInterval(update, 15);
    setInterval(draw, 15);
}
function update() {
    fishAry.forEach(function update(elem) {
        elem.update();
    });
}

function draw()
{

    context.clearRect(0, 0, canvas.width, canvas.height);
    fishAry.forEach(function draw(elem) {
        elem.draw();
    }); 
    btnAry.forEach(function draw(elem) {
        elem.draw();
    })
}

function createFish() {
    var newFish = new Fish();
    fishAry.push(newFish);
    console.log(fishAry);
}

 function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

 //window.onload = function() {
//	 initApp();
 // init();
 // url = background.globalurl;
 //   console.log(url);
 //};
 
 
 
 document.addEventListener("DOMContentLoaded", function()
 {
	 initApp();
     init();
     //get URL from background script and print to popup's console
     url = background.globalurl;
     console.log(url);
 });
 
