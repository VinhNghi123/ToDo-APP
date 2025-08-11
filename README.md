# Todo App with Robust LocalStorage

A modern, responsive Todo application built with React, TypeScript, and Tailwind CSS that uses localStorage for data persistence.

## Features

- ✅ Add, complete, and delete tasks
- 🌙 Dark/Light mode toggle
- 💾 Automatic data persistence using localStorage
- 📊 Real-time statistics
- 🎨 Beautiful, responsive UI
- ♿ Accessibility features
- 🔒 Robust error handling
### How it works in this app:

1. **Data Storage**: Tasks and dark mode preferences are automatically saved to localStorage
2. **Data Retrieval**: When the app loads, it retrieves previously saved data
3. **Error Handling**: The app gracefully handles cases where localStorage is unavailable
4. **Browser Compatibility**: Works across all modern browsers


## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ToDo-APP
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## LocalStorage Utilities

The app includes a robust localStorage utility (`src/utils/localStorage.ts`) that provides:

- **Error Handling**: Graceful fallbacks when localStorage is unavailable
- **Type Safety**: TypeScript interfaces for data structures
- **Browser Detection**: Automatic detection of localStorage availability
- **Storage Monitoring**: Usage tracking and limits
- **Safe Operations**: Try-catch blocks for all storage operations

### Key Functions

```typescript
// Safe getter with default value
getFromStorage('tasks', [])

// Safe setter with error handling
setToStorage('tasks', taskArray)

// Check if localStorage is available
storageAvailable

// Initialize default storage values
initializeStorage()
```

## Troubleshooting

### localStorage Not Working?

1. **Check Browser Settings**: Ensure cookies are enabled
2. **Private/Incognito Mode**: localStorage may be disabled
3. **Browser Extensions**: Some privacy extensions block localStorage
4. **Storage Full**: Clear browser data if storage is full

### Data Not Persisting?

1. **Check Console**: Look for localStorage error messages
2. **Browser Compatibility**: Ensure you're using a supported browser
3. **Storage Limits**: Check if you've exceeded storage limits

### Performance Issues?

1. **Large Data Sets**: Consider pagination for many tasks
2. **Frequent Updates**: Debounce storage operations if needed
3. **Storage Monitoring**: Use `getStorageInfo()` to check usage

## Development

### Project Structure

```
src/
├── pages/
│   ├── index.tsx          # Main app component
│   ├── Component/
│   │   ├── header.tsx     # Header with dark mode toggle
│   │   └── footer.tsx     # Footer component
│   └── _app.tsx           # Next.js app wrapper
├── utils/
│   └── localStorage.ts    # Storage utilities
└── styles/
    └── globals.css        # Global styles
```

### Adding New Features

When adding new features that need persistence:

1. Use the localStorage utilities:
```typescript
import { getFromStorage, setToStorage } from '../utils/localStorage';

// Load data
const data = getFromStorage('myKey', defaultValue);

// Save data
setToStorage('myKey', newData);
```

2. Handle storage errors gracefully
3. Provide fallbacks for when storage is unavailable
4. Test in different browsers and scenarios

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```
