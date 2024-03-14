function ajax(url, requestMethod, jwt, requestBody) {
    const fetchData = {
        headers: {
            "Content-Type": "application/json"
        },
        method: requestMethod
    };
    if (jwt) {
        fetchData.headers.Authorization = `Bearer ${jwt}`;
    }
    if (requestBody) {
        fetchData.body = JSON.stringify(requestBody);
    }
    return fetch(url, fetchData)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Check if the response has a content type of application/json
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                // If the response is JSON, parse it
                return response.json();
            } else {
                // If the response is not JSON, return null or handle it as needed
                return null;
            }
        })
        .catch((error) => {
            console.error('Fetch error:', error);
        });
}

export default ajax;
