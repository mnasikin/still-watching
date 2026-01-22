const globalToggle = document.getElementById('globalToggle');
const adsToggle = document.getElementById('adsToggle');

// load global state
chrome.storage.sync.get({ enabled: true, autoSkipAds: false }, (res) => {
    globalToggle.checked = res.enabled;
    adsToggle.checked = res.autoSkipAds;
});

globalToggle.addEventListener('change', () => {
    chrome.storage.sync.set({ enabled: globalToggle.checked });
});

adsToggle.addEventListener('change', () => {
    chrome.storage.sync.set({ autoSkipAds: adsToggle.checked });
});
