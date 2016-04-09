chrome.management.onInstalled.addListener( function() { getCurrentUser(); } );
chrome.identity.onSignInChanged.addListener(function ( account, signedIn ) { getCurrentUser(); });


getCurrentUser();

function getCurrentUser() {
	chrome.identity.getProfileUserInfo(function(userInfo){
		window.email_addy = userInfo;
	});
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		sendResponse(window.email_addy);
	}
);
