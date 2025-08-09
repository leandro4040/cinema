const API_BASE_URL = "http://localhost:5000/api";

function getAuthHeaders() {
  const token = localStorage.getItem('authToken');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function apiRequest(endpoint, method = 'GET', data = null) {
  const config = {
    method,
    headers: getAuthHeaders(),
  };

  if (data && (method === 'POST' || method === 'PUT')) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (response.status === 204) {
      return { success: true };
    }

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Ocorreu um erro na requisição.');
    }

    return { success: true, data: result };
  } catch (error) {
    console.error(`Erro em ${method} ${endpoint}:`, error);
    return { success: false, message: error.message };
} }

const api = {
  get: (endpoint) => apiRequest(endpoint, 'GET'),
  post: (endpoint, data) => apiRequest(endpoint, 'POST', data),
  put: (endpoint, data) => apiRequest(endpoint, 'PUT', data),
  delete: (endpoint) => apiRequest(endpoint, 'DELETE'),
};