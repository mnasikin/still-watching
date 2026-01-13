# Still Watching - Auto-Continue Watching

A simple Chrome Extension to automatically dismiss "Are you still watching?" confirmation dialogs on supported streaming platforms.

## Supported Platforms

-   **YouTube**: Automatically detects and clicks the "Yes" / "Continue" button on the "Still watching?" popup.


- **Non-Intrusive**  
  Does not interfere with videos you manually pause.

- **Lightweight**  
  Runs a simple check every 5 seconds with minimal overhead.


## Installation

Since this extension is not in the Chrome Web Store, you need to load it manually:

1.  **Download/Clone** this repository to a folder on your computer.
2.  Open Google Chrome and navigate to `chrome://extensions/`.
3.  Enable **Developer mode** in the top right corner.
4.  Click **Load unpacked** in the top left.
5.  Select the folder where you saved these files (the folder containing `manifest.json`).
6.  The extension is now active!

## Usage

Simply watch videos on supported platforms as usual.
When the "Are you still watching?" dialog appears, the extension will click it for you within a few seconds.

## Uninstall

To uninstall the extension, follow these steps:

1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Find the "Still Watching" extension in the list.
3. Click the **Remove** button next to the extension.
4. The extension is now uninstalled.

## Tested on

- Google Chrome 143.0.7499.193 (Official Build) (64-bit)

## License

MIT License