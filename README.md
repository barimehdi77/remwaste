# RemWaste - Skip Size Selection Page Redesign

This project is a modern redesign of the skip size selection page for We Want Waste. The redesign focuses on providing a clean, responsive, and user-friendly interface while maintaining all the original functionality.

## Features

- Modern, responsive design that works on both mobile and desktop
- Clean and intuitive user interface
- Real-time skip data fetching from the API
- Interactive skip selection with visual feedback
- Loading and error states
- TypeScript for better type safety and developer experience
- Tailwind CSS for styling
- Progress stepper for multi-step form navigation

## Tech Stack

- React 19
- TypeScript
- Tailwind CSS
- Axios for API calls
- Headless UI components
- Heroicons for icons

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/barimehdi77/remwaste.git
cd remwaste
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
  ├── components/
  │   ├── ProgressStepper.tsx  # Multi-step progress indicator
  │   └── SkipSelection.tsx    # Main skip selection component
  ├── types/
  │   └── skip.ts             # TypeScript interfaces
  ├── App.tsx                 # Root component
  └── index.css              # Global styles and Tailwind imports
```

## Design Decisions

1. **Responsive Design**
   - Mobile-first approach using Tailwind CSS
   - Grid layout that adapts to different screen sizes
   - Touch-friendly interface elements

2. **User Experience**
   - Clear visual hierarchy
   - Interactive feedback on selection
   - Loading and error states for better user feedback
   - Smooth transitions and animations
   - Multi-step progress tracking

3. **Code Quality**
   - TypeScript for type safety
   - Component-based architecture
   - Clean and maintainable code structure
   - Proper error handling
   - ESLint for code quality

## API Integration

The application fetches skip data from:
```
https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft
```

## Future Improvements

- Add skip images
- Implement skip comparison feature
- Add more detailed skip information
- Implement skip size calculator
- Add user reviews and ratings
- Implement skip availability checking
- Add form validation
- Implement user authentication
- Add order tracking system

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
