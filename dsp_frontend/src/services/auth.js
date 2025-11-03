import { apiFetch, setAuthToken, clearAuthToken } from './api';

/**
 * PUBLIC_INTERFACE
 * signup registers a new user.
 * Expects backend endpoint: POST /auth/signup {email, password}
 * Returns: { token } or backend-specific response that includes token.
 */
export async function signup(email, password) {
  const data = await apiFetch('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  const token = data?.token || data?.access_token;
  if (token) setAuthToken(token);
  return data;
}

/**
 * PUBLIC_INTERFACE
 * login authenticates an existing user.
 * Expects backend endpoint: POST /auth/login {email, password}
 * Returns: { token } or backend-specific response that includes token.
 */
export async function login(email, password) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  const token = data?.token || data?.access_token;
  if (token) setAuthToken(token);
  return data;
}

/**
 * PUBLIC_INTERFACE
 * logout clears local auth state.
 */
export function logout() {
  clearAuthToken();
}

/**
 * PUBLIC_INTERFACE
 * isAuthenticated checks if a token exists.
 */
export function isAuthenticated() {
  return !!localStorage.getItem('auth_token');
}
