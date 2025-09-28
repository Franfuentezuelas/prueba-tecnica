const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Función genérica para GET
export async function getRequest<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) throw new Error("Error en la petición GET");
  return response.json();
}

// Función genérica para POST
export async function postRequest<T>(endpoint: string, body: any): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error("Error en la petición POST");
  return response.json();
}

// PUT
export async function putRequest<T>(endpoint: string, body: any): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error("Error en la petición PUT");
  return response.json();
}

// DELETE
export async function deleteRequest<T>(endpoint: string, body: any): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error("Error en la petición DELETE");
  return response.json();
}