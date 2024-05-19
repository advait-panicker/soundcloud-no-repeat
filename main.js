let seen = new Set();

document.getElementsByClassName('skipControl')[0].remove();

const skipButton = document.getElementsByClassName('skipControl')[0];

let targetNode = document.getElementsByClassName('playbackSoundBadge__avatar sc-media-image sc-mr-2x')[0];

let config = { attributes: true, childList: true, subtree: true };

let callback = function(mutationsList, observer) {
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            targetNode = document.getElementsByClassName('playbackSoundBadge__avatar sc-media-image sc-mr-2x')[0];
            observer.observe(targetNode, config);
            const link = targetNode.href;
            if (seen.has(link)) {
                console.log('Seen');
                skipButton.click();
            }
            console.log('Not seen');
            seen.add(link);
            return;
        }
    }
};

let observer = new MutationObserver(callback);

observer.observe(targetNode, config);