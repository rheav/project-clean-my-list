// Function to log messages in the popup
function logMessage(message) {
	// Send a message back to the popup script for logging
	chrome.runtime.sendMessage({ message: message });
}

// Function to clean saved items
function cleanSavedItems() {
	// Add your code here to delete items and log messages
	logMessage("Cleaning saved items...");

	// Get the parent div
	const parentDiv = document.getElementById("sc-saved-cart-items");

	if (parentDiv) {
		// Get all div elements inside the parent div
		const childDivs = parentDiv.getElementsByTagName("div");

		// Initialize a delay variable for deleting items
		let deleteDelay = 1000;

		// Function to click on the element and handle the next element
		async function clickAndContinue(index) {
			if (index < childDivs.length) {
				// Check if the id attribute of the div starts with "sc-saved-"
				if (childDivs[index].id.startsWith("sc-saved-")) {
					// Construct the selector based on the current ID
					const selector = `#${childDivs[index].id} > div.sc-list-item-content > div > div:nth-child(2) > div.a-row.sc-action-links > span.a-size-small.sc-action-delete > span > input`;

					// Find the element using the selector
					const element = document.querySelector(selector);

					if (element) {
						// Click on the element to delete
						element.click();

						// Wait for the specified delay before processing the next element
						setTimeout(() => {
							logMessage("Item deleted.");
							clickAndContinue(index + 1); // Process the next element
						}, deleteDelay);
					} else {
						logMessage(`Element not found for ID: ${childDivs[index].id}`);
						clickAndContinue(index + 1); // Process the next element
					}
				} else {
					clickAndContinue(index + 1); // Process the next element
				}
			} else {
				logMessage("No more items to delete.");
			}
		}

		// Start the process with the first element (index 0)
		clickAndContinue(0);
	} else {
		logMessage("Parent div not found. No items to delete.");
	}
}

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	logMessage(message.message);
});

// Trigger the cleanSavedItems function upon extension load (you can change this to your desired trigger)
cleanSavedItems();
