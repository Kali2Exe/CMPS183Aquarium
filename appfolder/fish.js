var canvas, context, uimode1, uimode2;
var fishAry = [];
var btnAry = [];
var uid;
var mouseman = new MouseManager();
var background = chrome.extension.getBackgroundPage();
var url = null;
var panes = backgroundSetup();

  var config = {
    apiKey: "AIzaSyC_4qm-B8jjfW5Ac10kdKVS0Tfpe67c1lc",
    authDomain: "productivityaquarium.firebaseapp.com",
    databaseURL: "https://productivityaquarium.firebaseio.com",
    storageBucket: "productivityaquarium.appspot.com",
    messagingSenderId: "6131845978"
  };
    var pAquariumApp = firebase.initializeApp(config);
	console.log(pAquariumApp.name);
	defaultDatabase = firebase.database()

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
      uid = user.uid;
      var refreshToken = user.refreshToken;
      var providerData = user.providerData;
	  
	  var checkUserData = firebase.database().ref('users/' + uid);
	  if (checkUserData == null){
		writeUserData(uid);
	  }else{
          var query = firebase.database().ref('users/' + uid).orderByKey();
          query.once("value").then(function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                //var key = childSnapshot.key;
                var childData = childSnapshot.val();

                //READ ALL RELATIVE FISH INFORMATION FOR EACH FISH;
                console.log(childData.fish_id);
                console.log(childData.color);
                console.log(childData.size);
                console.log(childData.date);

                var newFish = new Fish();
                fishAry.push(newFish);
                });
            });
		}
	  
	  
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
		
		
	  // CLEAR FISH ARRAY IF USER LOGS OUT;
		fishAry = [];
		
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

function startSignIn() {
  document.getElementById('quickstart-button').disabled = true;
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    startAuth(true);
  }
}

function writeUserData(userId, name, email) {
  firebase.database().ref('users/' + userId).set({
  });
}

function init() {
    uimode1 = document.getElementById('mode1');
    uimode2 = document.getElementById('mode2');
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');    
    
    uimode1.addEventListener('mouseup', function() {uiMode("one");});
    uimode2.addEventListener('mouseup', function() {uiMode("two");});
    
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
    btnAry[0].setSpriteAttributes(10, 10, 20, 20, "pressButton");
    btnAry[0].setSrc("http://www.iconsdb.com/icons/preview/blue/square-xxl.png", "http://www.iconsdb.com/icons/preview/blue/square-xxl.png");	
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
                                 
    panes.forEach(function (elem) {
        elem.draw();                    
    })
    btnAry.forEach(function draw(elem) {
        elem.draw();
    })
    fishAry.forEach(function draw(elem) {
        elem.draw();
    });
}

function createFish() {
    var newFish = new Fish();
    fishAry.push(newFish);
    
	//STORE ALL RELATIVE FISH INFORMATION FOR EACH FISH FOR THE USER;
	var fishListRef = firebase.database().ref('users/' + uid);
	var newFishRef = fishListRef.push();
	newFishRef.set({
		'fish_id': 'Fish Type',
		'color': 'Fish Color',
		'date': 'Date Created',
		'size': 'Fish Size'
		
	});	
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

 document.addEventListener("DOMContentLoaded", function()
 {
	 initApp();
     init();
     //get URL from background script and print to popup's console
     url = background.globalurl;
     console.log(url);
 });
 
