import React, { useState, useEffect } from 'react';

// Footer Component
const Footer = () => {
    const [currentYear, setCurrentYear] = useState('');

    useEffect(() => {
      setCurrentYear(new Date().getFullYear().toString());
    }, []);

    return (
      <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Built with React • {currentYear}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Stay productive, one task at a time
          </p>
        </div>
      </footer>
    );
  };

export default Footer;