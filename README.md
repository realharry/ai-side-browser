# AI Side Browser

AI Side Browser is a Chrome extension that provides a side panel browser, which can be used to access AI services or browse the web alongside your main browser window. The side browser can be used for summarizing articles, generating content, translating text, and more, all without leaving the current tab in the Chrome browser.

## Features

- **Minimalistic Design**: Clean and simple interface with an address bar and content pane
- **Configurable Width**: Adjust the side panel width from 300-800 pixels via the Options page
- **Navigation Controls**: Back, forward, refresh, and home buttons
- **Smart URL Handling**: Automatically formats URLs and supports search queries
- **Chrome Storage Integration**: Settings are synced across devices
- **Modern Tech Stack**: Built with TypeScript, React, Shadcn UI, TailwindCSS, and Vite

## Installation

### Install from Chrome Web Store
*Coming soon - extension will be published to the Chrome Web Store*

### Install from Source

1. Clone this repository:
   ```bash
   git clone https://github.com/realharry/ai-side-browser.git
   cd ai-side-browser
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run build
   ```

4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked"
   - Select the `dist` folder from this project

## Usage

1. **Open Side Panel**: Click the AI Side Browser extension icon in the Chrome toolbar
2. **Navigate**: Use the address bar to enter URLs or search terms
3. **Configure Settings**: Right-click the extension icon and select "Options" to customize:
   - Side panel width (300-800 pixels)
   - Default home page URL
   - Theme preferences

## Development

### Prerequisites
- Node.js 16+ and npm
- Chrome browser for testing

### Setup
```bash
npm install
```

### Development Commands
```bash
# Start development server (for testing components)
npm run dev

# Build for production
npm run build

# Run type checking
npm run type-check

# Run linter
npm run lint
```

### Project Structure
```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── AddressBar.tsx   # Navigation bar component
│   ├── ContentPane.tsx  # Iframe container
│   ├── Options.tsx      # Settings page
│   └── SidePanel.tsx    # Main side panel component
├── lib/
│   └── utils.ts         # Utility functions
├── background.ts        # Extension background script
├── sidepanel.html       # Side panel HTML entry
├── sidepanel.tsx        # Side panel React entry
├── options.html         # Options page HTML entry
├── options.tsx          # Options page React entry
└── index.css           # Global styles
```

### Loading Extension for Development

1. Build the extension: `npm run build`
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `dist` folder
5. The extension icon will appear in the toolbar

### Making Changes

1. Make your changes to the source code
2. Run `npm run build` to rebuild
3. Go to `chrome://extensions/` and click the refresh icon on your extension
4. Test your changes

## Technology Stack

- **TypeScript**: Type-safe JavaScript development
- **React**: UI framework for building components
- **Vite**: Fast build tool and development server
- **TailwindCSS**: Utility-first CSS framework
- **Shadcn UI**: High-quality React components
- **Lucide React**: Beautiful icon library
- **Chrome Extension APIs**: Side panel, storage, and permissions

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests if applicable
4. Run the build and linting: `npm run build && npm run lint`
5. Commit your changes: `git commit -am 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
