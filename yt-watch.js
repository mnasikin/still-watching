let isHandling = false;

setInterval(() => {
    const dialog = document.querySelector('yt-confirm-dialog-renderer');
    if (!dialog) {
        isHandling = false;
        return;
    }

    // check if dialog is visible
    const isVisible = dialog.offsetParent !== null;

    // if dialog is not visible, reset state
    if (!isVisible) {
        isHandling = false;
        return;
    }

    // if visible but already handled, stop
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
}, 1000);