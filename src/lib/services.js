const auth = {
  isAuthenticated() {
    return this.getUserInfo();
  },
  storeToken(token) {
    localStorage.setItem('token', token);
  },
  getToken() {
    return localStorage.getItem('token');
  },
  getExpiration() {
    const token = this.getToken();
    if (token) {
      const decodedData = this.decode(token);
      return decodedData.exp;
    }
    return 0;
  },
  getRole() {
    const token = this.getToken();
    if (token) {
      const decodedData = this.decode(token);
      //TODO - Add role on schema to determine user type
      return decodedData.role;
    }
    return null;
  },
  getUserInfo() {
    const token = this.getToken();
    if (token) {
      const decodedData = this.decode(token);
      return decodedData;
    }
    return null;
  },
  decode(token) {
    let base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  },
  login(credential) {
    return fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credential),
    });
  },
  register(data) {
    //TODO - fix API to combine both admin and student
    return fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
  clear() {
    localStorage.clear();
    window.location.reload();
  },
};

export default auth;
