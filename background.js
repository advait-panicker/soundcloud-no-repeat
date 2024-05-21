let delay = 0;
chrome.runtime.onMessage.addListener((request, sender) => {
    if (request.action === 'skipSong') {
        delay += 10;
        console.log(delay);
        setTimeout(() => {
            chrome.scripting.executeScript({
                target : { tabId: sender.tab.id }, 
                func: () => document.getElementsByClassName('skipControl')[0].click()
            }, () => delay -= 10);
        }, delay);
    }
});