const BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * PUBLIC_INTERFACE
 * apiFetch wraps window.fetch with base URL, JSON handling, and auth header.
 * @param {string} path - API path beginning with '/'
 * @param {object} options - fetch options
 * @returns {Promise<any>} parsed JSON or throws error with status/message
 */
export async function apiFetch(path, options = {}) {
  if (!BASE_URL) {
    // Helpful error to guide env setup
    throw new Error('REACT_APP_API_BASE_URL is not set. Please configure it in .env.');
  }

  const token = localStorage.getItem('auth_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const url = `${BASE_URL}${path}`;
  const resp = await fetch(url, { ...options, headers });

  // Attempt to parse json if present
  let data = null;
  const text = await resp.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text || null;
  }

  if (!resp.ok) {
    const message = data?.detail || data?.message || `Request failed with status ${resp.status}`;
    const error = new Error(message);
    error.status = resp.status;
    error.data = data;
    throw error;
  }
  return data;
}

/**
 * PUBLIC_INTERFACE
 * setAuthToken stores the JWT in localStorage.
 * @param {string} token
 */
export function setAuthToken(token) {
  localStorage.setItem('auth_token', token);
}

/**
 * PUBLIC_INTERFACE
 * clearAuthToken removes the JWT from localStorage.
 */
export function clearAuthToken() {
  localStorage.removeItem('auth_token');
}
