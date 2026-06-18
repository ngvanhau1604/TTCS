const defaultApiUrl = 'http://localhost:8080';
export const apiBase = import.meta.env.VITE_API_URL !== undefined && import.meta.env.VITE_API_URL !== null
  ? import.meta.env.VITE_API_URL
  : defaultApiUrl;

// Helper to manage session
export const session = {
  getToken: () => localStorage.getItem('token'),
  getRole: () => localStorage.getItem('role'),
  getUsername: () => localStorage.getItem('username'),
  save: (token, role, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
  },
  clear: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
  },
  isLoggedIn: () => !!localStorage.getItem('token')
};

// Custom fetch wrapper
export async function apiFetch(path, options = {}) {
  const token = session.getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${apiBase}${path}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      session.clear();
      // Redirect to login if on page that requires auth
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Lỗi hệ thống (${response.status})`);
  }

  // Handle empty responses
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}
