
angular.module('teamform-admin-app', ['firebase'])
.controller('AdminCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$window', function($scope, $firebaseObject, $firebaseArray, $window) {
	
	$scope.events = {
		event_name: '',
		description: '',
		date: '',
		time: '',
		venue: '',
		table_num: '',
		people_num: '',
		organizer: '',
		deadline: ''
	}
	
	// Initialize $scope.param as an empty JSON object
	$scope.param = {};
			
	// Call Firebase initialization code defined in site.js
	initalizeFirebase();
	$scope.doLogout = function () {

		firebase.auth().signOut().then(function() {
			// Sign-out successful.
			sessionStorage.setItem("urlAfterLogin","");
			sessionStorage.setItem("logout","yes");
			window.location.href= "index.html";
		}, function(error) {
			// An error happened.
			console.log(error)
		});


	};

	$scope.showLogButton = function (user) {
		if (user) {
			$scope.isLogin = true;
			$scope.isLogout = false;
			$scope.username = user.displayName;
			// update $scope
		} else {
			// No user is signed in.
			$scope.isLogin = false;
			$scope.isLogout = true;
			console.log("YEAH - You did not login lol");
		}
	};

	firebase.auth().onAuthStateChanged(function(user) {
		$scope.showLogButton(user);
		if (user) {

		}else{
			console.log("YEAH - You did not login lol");
			sessionStorage.setItem("urlAfterLogin","administrator.html");
			window.location.href = "signIn.html"; // default redirect page is index
		}
	});
	var refPath, ref, eventName;

	//eventName = getURLParameter("q");
	var refEventPath = "events";	
	var refFeedbackPath = "Feedback";	
	
	refEvent = firebase.database().ref(refEventPath);
	refFeedback = firebase.database().ref(refFeedbackPath);
	
	// Link and sync a firebase object
	$scope.paramEvent = $firebaseArray(refEvent);
	$scope.paramFeedback = $firebaseArray(refFeedback);

	$scope.goToEvent = function(eID) {
	  $window.location.href = 'adminDashboard.html?q='+ eID;
	};
	
	$scope.hideEvent = function(eID) {
		var createRef = firebase.database().ref("events/" + eID + "/visible");
		createRef.set(false);
		
	};
	
	$scope.showEvent = function(eID) {
		var createRef = firebase.database().ref("events/" + eID + "/visible");
		createRef.set(true);
		
	};
		
		
}]);