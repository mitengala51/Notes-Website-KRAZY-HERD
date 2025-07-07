import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">📝</span>
            </div>
            <h1 className="text-2xl font-bold">Notes App</h1>
          </div>
          <div className="text-sm opacity-90">
            Organize your thoughts with tags & search
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;