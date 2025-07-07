import axios from 'axios';

// API Configuration
const API_BASE_URL = 'https://notes-website-krazy-herd-production.up.railway.app/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    
    if (error.response) {
      // Server responded with error status
      return Promise.reject({
        success: false,
        message: error.response.data?.message || 'Server error occurred',
        status: error.response.status
      });
    } else if (error.request) {
      // Request was made but no response received
      return Promise.reject({
        success: false,
        message: 'Network error - please check your connection and ensure the server is running',
        status: 0
      });
    } else {
      // Something else happened
      return Promise.reject({
        success: false,
        message: error.message || 'An unexpected error occurred',
        status: 0
      });
    }
  }
);

// API Service
export const noteService = {
  async getAllNotes(search = '', tag = '') {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (tag) params.append('tag', tag);
      
      const response = await api.get(`/notes?${params}`);
      return response;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  },

  async createNote(noteData) {
    try {
      const response = await api.post('/notes', noteData);
      return response;
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  },

  async updateNote(id, noteData) {
    try {
      // Ensure we have a valid ID
      if (!id) {
        throw new Error('Note ID is required for update');
      }
      
      const response = await api.put(`/notes/${id}`, noteData);
      return response;
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },

  async deleteNote(id) {
    try {
      // Ensure we have a valid ID
      if (!id) {
        throw new Error('Note ID is required for deletion');
      }
      
      const response = await api.delete(`/notes/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  },

  async getNote(id) {
    try {
      if (!id) {
        throw new Error('Note ID is required');
      }
      
      const response = await api.get(`/notes/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching note:', error);
      throw error;
    }
  },

  async getAllTags() {
    try {
      // Since the backend doesn't have a dedicated tags endpoint,
      // we'll extract tags from all notes
      const response = await api.get('/notes');
      if (response.success) {
        const allTags = new Set();
        response.data.forEach(note => {
          if (note.tags && Array.isArray(note.tags)) {
            note.tags.forEach(tag => {
              if (tag && tag.trim()) {
                allTags.add(tag.trim());
              }
            });
          }
        });
        return {
          success: true,
          data: Array.from(allTags).sort()
        };
      }
      return response;
    } catch (error) {
      console.error('Error fetching tags:', error);
      return {
        success: false,
        data: [],
        message: 'Failed to fetch tags'
      };
    }
  },

  async healthCheck() {
    try {
      const response = await api.get('/health');
      return response;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }
};
