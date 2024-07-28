function getToken() {
    return localStorage.getItem('token');
}

function setToken(token) {
    localStorage.setItem('token', token);

}

function removeToken() {
    localStorage.removeItem('token');
}

async function refreshToken() {
    const response = await fetch('http://localhost:8080/auth/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken: getRefreshToken() })
    });

    if (!response.ok) {
        throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    setToken(data.token);
}

async function fetchWithAuth(url, options = {}) {
    let token = getToken();

    options.headers = options.headers || {};
    options.headers['Authorization'] = `Bearer ${token}`;

    let response = await fetch(url, options);

    if (response.status === 401) {
        try {
            await refreshToken();
            token = getToken();
            options.headers['Authorization'] = `Bearer ${token}`;
            response = await fetch(url, options);
        } catch (error) {
            console.error('Failed to refresh token', error);
            removeTokens();
            window.location.href = 'login.html';
        }
    }

    return response;
}