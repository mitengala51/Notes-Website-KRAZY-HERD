// import React, { useState } from 'react';
// import { Edit2, Trash2, Tag, Calendar } from 'lucide-react';
// import Button from './Button';

// const NoteCard = ({ note, onDelete, onEdit }) => {
//   const [isDeleting, setIsDeleting] = useState(false);

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete this note?')) {
//       setIsDeleting(true);
//       try {
//         await onDelete(note.id);
//       } finally {
//         setIsDeleting(false);
//       }
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
//       <div className="flex items-start justify-between mb-3">
//         <h3 className="text-lg font-semibold text-gray-800 flex-1 pr-2">
//           {note.title}
//         </h3>
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => onEdit(note)}
//             className="p-1 text-gray-500 hover:text-blue-600 rounded hover:bg-blue-50"
//             title="Edit note"
//           >
//             <Edit2 className="w-4 h-4" />
//           </button>
//           <button
//             onClick={handleDelete}
//             disabled={isDeleting}
//             className="p-1 text-gray-500 hover:text-red-600 rounded hover:bg-red-50 disabled:opacity-50"
//             title="Delete note"
//           >
//             <Trash2 className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       <p className="text-gray-600 mb-4 leading-relaxed">
//         {note.content}
//       </p>

//       <div className="flex items-center justify-between">
//         <div className="flex flex-wrap gap-2">
//           {note.tags && note.tags.map(tag => (
//             <span
//               key={tag}
//               className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
//             >
//               <Tag className="w-3 h-3" />
//               {tag}
//             </span>
//           ))}
//         </div>

//         <div className="flex items-center gap-1 text-sm text-gray-500">
//           <Calendar className="w-4 h-4" />
//           {formatDate(note.createdAt)}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NoteCard;











import React, { useState } from 'react';
import { Edit2, Trash2, Tag, Calendar } from 'lucide-react';

const NoteCard = ({ note, onDelete, onEdit }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this note?')) {
      setIsDeleting(true);
      try {
        // Pass the correct ID (MongoDB uses _id)
        const noteId = note._id || note.id;
        await onDelete(noteId);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(note);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex-1 pr-2">
          {note.title}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handleEdit}
            className="p-1 text-gray-500 hover:text-blue-600 rounded hover:bg-blue-50 transition-colors duration-200"
            title="Edit note"
            type="button"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-1 text-gray-500 hover:text-red-600 rounded hover:bg-red-50 disabled:opacity-50 transition-colors duration-200"
            title="Delete note"
            type="button"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-4 leading-relaxed">
        {note.content}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {note.tags && note.tags.length > 0 && note.tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          {formatDate(note.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;