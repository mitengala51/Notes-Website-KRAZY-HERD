import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import Header from './components/Header';
import SearchAndFilter from './components/SearchAndFilter';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import { noteService } from './services/noteService';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [allTags, setAllTags] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true); // For initial load
  const [updating, setUpdating] = useState(false); // For search/tag updates
  const [error, setError] = useState(null);
  const [editingNote, setEditingNote] = useState(null);

  // Debounced search function to prevent excessive API calls
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Load notes and tags
  const loadNotes = useCallback(async (isInitialLoad = false) => {
    try {
      if (isInitialLoad) {
        setInitialLoading(true);
      } else {
        setUpdating(false);
      }

      const [notesResponse, tagsResponse] = await Promise.all([
        noteService.getAllNotes(searchTerm, selectedTag),
        noteService.getAllTags()
      ]);

      if (notesResponse.success) {
        setNotes(notesResponse.data);
      } else {
        setError(notesResponse.message);
      }

      if (tagsResponse.success) {
        setAllTags(tagsResponse.data);
      }
    } catch (err) {
      setError('Failed to load notes. Please make sure the server is running.');
    } finally {
      if (isInitialLoad) {
        setInitialLoading(false);
      } else {
        setUpdating(false);
      }
    }
  }, [searchTerm, selectedTag]);

  // Create note
  const handleCreateNote = async (noteData) => {
    try {
      const response = await noteService.createNote(noteData);
      if (response.success) {
        await loadNotes();
        setError(null);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to create note');
    }
  };

  // Update note
  const handleUpdateNote = async (noteData) => {
    try {
      const noteId = editingNote._id || editingNote.id;
      const response = await noteService.updateNote(noteId, noteData);
      if (response.success) {
        setEditingNote(null);
        await loadNotes();
        setError(null);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to update note');
    }
  };

  // Delete note
  const handleDeleteNote = async (noteId) => {
    try {
      const id = noteId._id || noteId.id || noteId;
      const response = await noteService.deleteNote(id);
      if (response.success) {
        await loadNotes();
        setError(null);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to delete note');
    }
  };

  // Handle search with debouncing to prevent excessive API calls
  const handleSearchChange = useCallback((newSearchTerm) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      setSearchTerm(newSearchTerm);
    }, 300); // 300ms delay

    setSearchTimeout(timeout);
  }, [searchTimeout]);

  // Handle tag filter change
  const handleTagChange = useCallback((newTag) => {
    setSelectedTag(newTag);
  }, []);

  // Load notes when search/filter changes
  useEffect(() => {
    loadNotes(true); // Initial load
  }, [loadNotes]);

  useEffect(() => {
    if (searchTerm || selectedTag) {
      loadNotes(false); // Update triggered by search or tag filter
    }
  }, [searchTerm, selectedTag, loadNotes]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <div className="flex items-center gap-2">
              <X className="w-5 h-5" />
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {editingNote ? (
          <NoteForm
            onSubmit={handleUpdateNote}
            onCancel={() => setEditingNote(null)}
            initialData={editingNote}
          />
        ) : (
          <NoteForm onSubmit={handleCreateNote} />
        )}

        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedTag={selectedTag}
          onTagChange={handleTagChange}
          allTags={allTags}
        />

        {initialLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading notes...</p>
          </div>
        ) : (
          <>
            {updating && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Updating notes...</p>
              </div>
            )}
            <NotesList
              notes={notes}
              onDelete={handleDeleteNote}
              onEdit={setEditingNote}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
