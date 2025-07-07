// import React from 'react';
// import { Search } from 'lucide-react';

// const SearchAndFilter = ({ searchTerm, onSearchChange, selectedTag, onTagChange, allTags }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//       <div className="flex flex-col lg:flex-row gap-4">
//         <div className="flex-1">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search notes by title or content..."
//               value={searchTerm}
//               onChange={(e) => onSearchChange(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>
//         <div className="lg:w-64">
//           <select
//             value={selectedTag}
//             onChange={(e) => onTagChange(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="">All Tags</option>
//             {allTags.map(tag => (
//               <option key={tag} value={tag}>#{tag}</option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchAndFilter;






import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';

const SearchAndFilter = ({ 
  searchTerm, 
  onSearchChange, 
  selectedTag, 
  onTagChange, 
  allTags 
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Update local state when props change
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  // Handle search input change
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    onSearchChange(value);
  };

  // Handle tag select change
  const handleTagSelectChange = (e) => {
    const value = e.target.value;
    onTagChange(value);
  };

  // Clear search
  const clearSearch = () => {
    setLocalSearchTerm('');
    onSearchChange('');
  };

  // Clear tag filter
  const clearTagFilter = () => {
    onTagChange('');
  };

  // Prevent form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-4 mb-4">
        <Search className="w-5 h-5 text-gray-500" />
        <h2 className="text-lg font-semibold text-gray-800">Search & Filter</h2>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Notes
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              value={localSearchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search by title or content..."
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            {localSearchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tag Filter */}
        <div className="relative">
          <label htmlFor="tagFilter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Tag
          </label>
          <div className="relative">
            <select
              id="tagFilter"
              value={selectedTag}
              onChange={handleTagSelectChange}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <Filter className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            {selectedTag && (
              <button
                type="button"
                onClick={clearTagFilter}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {(localSearchTerm || selectedTag) && (
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-sm text-gray-500">Active filters:</span>
            {localSearchTerm && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Search: "{localSearchTerm}"
                <button
                  type="button"
                  onClick={clearSearch}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedTag && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Tag: {selectedTag}
                <button
                  type="button"
                  onClick={clearTagFilter}
                  className="text-green-600 hover:text-green-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchAndFilter;