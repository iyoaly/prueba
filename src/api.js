export const url = "https://desarrollo.api.noktos.com/api";

export const fetchApi = (route, method, headers, body) => {
  const response = fetch(route, {
    method, // *GET, POST, PUT, DELETE, etc.
    headers,
    body: JSON.stringify(body), // body data type must match "Content-Type" header
  });
  return response;
};

export default fetchApi;
