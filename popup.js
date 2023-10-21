// Function to send a message to content script when the button is clicked
function sendMessageToContentScript() {
	// Send a message to the content script to trigger the action
	chrome.runtime.sendMessage({ action: "cleanSavedItems" });
}

// Attach the click event handler to the "Clean Saved Items" button
document
	.getElementById("cleanButton")
	.addEventListener("click", sendMessageToContentScript);
