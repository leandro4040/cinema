const API_BASE_URL = "https://cinema-85g1.onrender.com/api";

async function fetchMedia(mediaType = "") {
  try {
    const response = await fetch(`${API_BASE_URL}/media?type=${mediaType}`);
    if (!response.ok) {
      throw new Error("Falha na resposta da rede");
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar ${mediaType}:`, error);
    return [];
} }

async function postData(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Ocorreu um erro.");
    }

    return { success: true, data: result };
  } catch (error) {
    console.error(`Erro em ${endpoint}:`, error);
    return { success: false, message: error.message };
} }