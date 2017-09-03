// https://github.com/zeit/next.js/issues/153

export default class AuthService {

  constructor(domain) {
    this.domain = process.env.API_URL || 'http://localhost:3000';
  }

  login(username, password) {
    return this.fetch(`${this.domain}/auth`, {
      method: 'POST',
      body: JSON.stringify({ username, password })
    }).then(res => {
      const { token, profile } = res;
      this.setToken(token);
      this.setProfile(profile);
      return Promise.resolve(res);
    });
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    return false; // TODO
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getProfile() {
    return localStorage.getItem('profile');
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  setProfile(profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    return Promise.resolve(true);
  }

  checkStatus(resp) {
    if (resp.status >= 200 && resp.status < 300) {
      return resp;
    }
    let error = new Error(resp.statusText);
    error.response = resp;
    throw error;
  }

  fetch(url, options) {

    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };

    if (this.loggedIn()) {
      headers['Authorizatoin'] = `Bearer ${this.getToken()}`;
    }

    return fetch(url, {
      headers,
      ...options 
    })
    .then(this.checkStatus)
    .then(resp => resp.json());

  }

}