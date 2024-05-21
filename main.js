let seen = new Set();
// load the seen set from storage
chrome.storage.sync.get(['seen'], function(result) {
    seen = new Set(result.seen);
});

var targetNodeObserver = new MutationObserver(function(mutations) {
    var targetNode = document.getElementsByClassName('playbackSoundBadge__avatar sc-media-image sc-mr-2x')[0];
    if(targetNode) {
        // The targetNode has loaded, we can stop observing
        targetNodeObserver.disconnect();

        // Continue with the rest of your program
        document.getElementsByClassName('skipControl')[0].remove();

        let config = { attributes: true, childList: true, subtree: true };

        let callback = function(mutationsList, observer) {
            for(let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    targetNode = document.getElementsByClassName('playbackSoundBadge__avatar sc-media-image sc-mr-2x')[0];
                    observer.observe(targetNode, config);
                    const link = targetNode.href.split('?')[0];
                    if (seen.has(link)) {
                        console.log('Seen');
                        chrome.runtime.sendMessage({ action: 'skipSong' });
                    } else {
                        console.log('Not seen');
                        seen.add(link);
                        chrome.storage.sync.set({ seen: Array.from(seen) });
                    }
                }
            }
        };

        let observer = new MutationObserver(callback);

        observer.observe(targetNode, config);
    }
});

// Start observing the document with the configured parameters
targetNodeObserver.observe(document, { childList: true, subtree: true });
