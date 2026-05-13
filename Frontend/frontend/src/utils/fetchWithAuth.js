const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: "Bearer " + token
    }
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/Login";
    return null;
  }

  return response;
};

export default fetchWithAuth;