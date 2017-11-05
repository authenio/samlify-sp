// https://github.com/zeit/next.js/issues/153
import axios from 'axios';

export default class AuthService {

  constructor(ctx) {
    this.domain = process.env.API_URL || 'http://localhost:3000';
    this.setAuth(ctx);
  }

  async login(username, password) {
    const token = await axios.post(`${this.domain}/auth`, { username, password }).then(e => e.data);
    await this.setAuth(token);
  }

  loggedIn() {
    const token = AuthService.getAuth();
    return !!token;
  }

  static getAuth() {
    const token = localStorage.getItem('token') || '';
    return token ? token : '';
  }

  setAuth(token) {
    if (typeof window !== 'undefined' && token) {
      localStorage.setItem('token', token);
    }
  }

  async logout() {
    // remove auth in localstorage
    localStorage.removeItem('token');
    // remove auth in cookie
    await axios.get(`/logout`);
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
      headers['Authorization'] = `Bearer ${AuthService.getAuth()}`;
    }

    return fetch(url, {
      headers,
      ...options 
    })
    .then(this.checkStatus)
    .then(resp => resp.json());

  }

}