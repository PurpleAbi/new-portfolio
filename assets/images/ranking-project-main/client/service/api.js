const API_URL = "http://localhost:8080";

export const getData = async (endpoint) => {
  try {
    const clean = String(endpoint || '').replace(/^\/+/, ''); // remove leading slashes
    const url = `${API_URL}/${clean}`;
    console.log('[api] fetching', url);
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Failed to fetch data from the API (${res.status}): ${text}`);
    }
    const json = await res.json();
    return json;
  } catch (err) {
    console.error('[api] getData error:', err);
    throw err;
  }
};

