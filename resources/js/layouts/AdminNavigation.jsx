import React from 'react';
import { Leaf } from 'lucide-react'; // Using Lucide React for a modern icon
import NavLink from '@/Components/NavLink';

// Main navigation component
const App = () => {
  return (
    // The main navigation container.
    // Fixed width (max-w-7xl) for content centering, padding, and light background.
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo Section (Hrvst) */}
          <div className="flex items-center">
            {/* Using a Lucide-React icon that resembles the original logo's theme */}
            <Leaf className="w-6 h-6 text-green-600 mr-2" />
            <span className="font-extrabold text-xl tracking-tight text-gray-900">
              Hrvst
            </span>
          </div>

          {/* Auth/Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Log In Button (Outlined/Inverted Style) */}
            <button
              onClick={() => console.log('Log in clicked')}
              className="px-4 py-2 text-sm font-semibold rounded-lg transition duration-150 ease-in-out
                         text-green-600 bg-white border-2 border-green-600
                         hover:bg-green-50 hover:border-green-700 hover:text-green-700
                         focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label="Log in"
            >
              Log in
            </button>

            {/* Sign Up Button (Primary Solid Style) */}
            <button
              onClick={() => console.log('Sign up clicked')}
              className="px-4 py-2 text-sm font-semibold rounded-lg transition duration-150 ease-in-out
                         text-white bg-green-600 shadow-md
                         hover:bg-green-700
                         focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label="Sign up"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default App;