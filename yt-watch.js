let isHandling = false;

setInterval(() => {
    const dialog = document.querySelector('yt-confirm-dialog-renderer');

    if (!dialog) {
        isHandling = false;
        return;
    }

    if (isHandling) return;

    const confirmBtn = dialog.querySelector(
        '#confirm-button button, button[aria-label="Yes"]'
    );

    if (!confirmBtn) return;

    confirmBtn.click();
    isHandling = true;

    console.log('Still Watching: clicked YES');

    setTimeout(() => {
        document.querySelector('tp-yt-paper-toast')?.remove();
    }, 300);
}, 3000);
