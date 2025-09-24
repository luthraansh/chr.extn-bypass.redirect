chrome.webNavigation.onCompleted.addListener(function (details) {
    console.log("Entering the extension");
    console.log("Navigated to:", details.url);
    const currentUrl = details.url;

    // Check if it's a Google redirect link
    if (currentUrl.includes("https://www.google.com/url?q=")) {
        // Extract the URL from the "q" parameter
        const targetUrl = new URL(currentUrl).searchParams.get('q');

        // If we found a target URL, navigate directly there
        if (targetUrl) {
            chrome.tabs.update(details.tabId, { url: decodeURIComponent(targetUrl) });
        }
    }
}, { url: [{ urlMatches: 'https://www.google.com/url*' }] });

