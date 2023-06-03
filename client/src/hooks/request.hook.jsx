import { useState, useCallback } from "react";

function useRequest() {
  const [error, setError] = useState(null); // создать ошибку, чтобы его ловить в catch

  const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
    try {
      if (body) {
        body = JSON.stringify(body)
        headers["Content-Type"] = "application/json"
      }
      const response = await fetch(url, { method, body, headers });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Ошибка fetch запроса")
      }

      return data

    } catch (err) {
      setError(err.message)
      throw err // выбрасываем ошибку во вне
    }
  }, [])

  const clearError = () => setError(null) // очистить ошибку

  return (
    { request, error, clearError }
  );
}

export default useRequest;