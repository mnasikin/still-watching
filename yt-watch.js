setInterval(() => {
    // Check for the "Still watching?" dialog
    const confirmDialog = document.querySelector('yt-confirm-dialog-renderer');

    if (confirmDialog && confirmDialog.parentElement.style.display !== 'none') {
        const buttons = confirmDialog.querySelectorAll('yt-button-renderer, button');

        for (const btn of buttons) {
            const text = btn.innerText?.toLowerCase();
            if (text && (text.includes('yes') || text.includes('continue') || text.includes('confirm'))) {
                btn.click();
                console.log("YT auto-click: confirmed 'Still watching'");
                return; // Exit after clicking
            }
        }
    }

}, 5000);
