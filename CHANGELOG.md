# Changelog

All notable changes to this project will be documented in this file.

## [1.0.2] - 2026-01-15
- **Improved dialog detection**
  Updated the confirmation logic on Youtube and Youtube Music

## [1.0.1] - 2026-01-14

### Fixed
- **Improved dialog detection**  
  Updated the confirmation logic to directly target YouTube's active confirm button, ensuring reliable dismissal on both YouTube and YouTube Music.

- **Toast notification suppressed**  
  Removed the "Thanks for confirming." toast after auto-confirming, resulting in a cleaner, distraction-free viewing experience.


## [1.0.0] - 2026-01-13

### Initial Release
-   **Core Feature**: Automatically dismisses "Are you still watching?" confirmation dialogs on YouTube.
-   **Support**: Works on `youtube.com` and all subdomains (e.g., `music.youtube.com`).
-   **Icons**: Includes custom application icons.
-   **Documentation**: Comprehensive README with installation instructions.
