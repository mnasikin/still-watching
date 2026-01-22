let enabled = true;
let autoSkipAds = false;
let isHandling = false;

// load initial state
chrome.storage.sync.get({ enabled: true, autoSkipAds: false }, (res) => {
    enabled = res.enabled;
    autoSkipAds = res.autoSkipAds;
});

// listen for toggle changes
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync') {
        if (changes.enabled) {
            enabled = changes.enabled.newValue;
        }
        if (changes.autoSkipAds) {
            autoSkipAds = changes.autoSkipAds.newValue;
        }
    }
});

let adDetectedTime = 0;
let adSkipped = false;
let lastLogTime = 0;

// NUCLEAR OPTION: Forcefully remove ads
function trySkipAd() {
    const player = document.querySelector('.html5-video-player');
    if (!player) return false;

    let actionsPerformed = 0;

    // METHOD 1: Remove ALL ad overlay elements
    const adSelectors = [
        '.video-ads',
        '.ytp-ad-overlay-container',
        '.ytp-ad-player-overlay',
        '.ytp-ad-module',
        '.ytp-ad-image-overlay',
        '.ytp-ad-text-overlay',
        'div[class*="ad-container"]',
        'div[class*="ad-overlay"]',
        'div[id*="ad-container"]'
    ];

    adSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.remove();
            actionsPerformed++;
            console.log(`Still Watching: Removed ad element: ${selector}`);
        });
    });

    // METHOD 2: Strip ad-related classes from the player
    const adClasses = [
        'ad-showing',
        'ad-interrupting',
        'ad-created',
        'playing-ad'
    ];

    adClasses.forEach(className => {
        if (player.classList.contains(className)) {
            player.classList.remove(className);
            actionsPerformed++;
            console.log(`Still Watching: Removed class: ${className}`);
        }
    });

    // METHOD 3: Try to click skip button (as backup)
    const skipButtons = document.querySelectorAll(`
        button.ytp-ad-skip-button,
        button.ytp-skip-ad-button,
        .ytp-ad-skip-button-container button,
        button[class*="skip"]
    `);

    skipButtons.forEach(button => {
        try {
            button.click();
            actionsPerformed++;
            console.log('Still Watching: Clicked skip button');
        } catch (e) {
            // Ignore
        }
    });

    // METHOD 4: Manipulate video element directly 
    const video = document.querySelector('video');
    if (video && video.duration) {
        try {
            // Try to seek to the end of the ad (if it's a short ad)
            if (video.currentTime < 10) {
                video.currentTime = video.duration;
                actionsPerformed++;
                console.log('Still Watching: Skipped to end of video');
            }
        } catch (e) {
            // Ignore
        }
    }

    if (actionsPerformed > 0) {
        console.log(`Still Watching: Performed ${actionsPerformed} anti-ad actions`);
        return true;
    }

    return false;
}

setInterval(() => {
    if (!enabled) return;

    if (autoSkipAds) {
        const player = document.querySelector('.html5-video-player');
        const isAdShowing = player?.classList.contains('ad-showing') || player?.classList.contains('ad-interrupting');

        if (isAdShowing) {
            const now = Date.now();

            if (adDetectedTime === 0) {
                adDetectedTime = now;
                adSkipped = false;
                console.log("Still Watching: Ad detected!");
            }

            if (!adSkipped) {
                // Log status periodically
                if (now - lastLogTime > 2000) {
                    console.log("Still Watching: Attempting to skip ad...");
                    lastLogTime = now;
                }

                // Try to skip the ad
                if (trySkipAd()) {
                    adSkipped = true;
                }
            }
        } else {
            if (adDetectedTime !== 0) {
                console.log("Still Watching: Ad ended.");
            }
            adDetectedTime = 0;
            adSkipped = false;
        }
    }

    const dialog = document.querySelector('yt-confirm-dialog-renderer');
    if (!dialog) {
        isHandling = false;
        return;
    }

    const isVisible = dialog.offsetParent !== null;
    if (!isVisible) {
        isHandling = false;
        return;
    }

    if (isHandling) return;

    const confirmBtn = dialog.querySelector(
        '#confirm-button button, button[aria-label="Yes"]'
    );

    if (!confirmBtn) return;

    confirmBtn.click();
    console.log("Still Watching: True");
    isHandling = true;

    setTimeout(() => {
        document.querySelector('tp-yt-paper-toast')?.remove();
    }, 300);
}, 500);
