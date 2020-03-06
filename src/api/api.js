import { getCookie, setCookie } from '../utils/cookie';

export const BASE_URL = 'https://reqres.in/api';

/* authentication */
export class AUTH_API {
  get(url) {
    return this.sendRequest('GET', url);
  }

  post(body) {
    return this.sendRequest('POST', `${BASE_URL}/login`, body);
  }

  put(url) {
    return this.sendRequest('PUT', url);
  }

  delete(url) {
    return this.sendRequest('DELETE', url);
  }

  sendRequest = (method, url, body) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    };

    const token = getCookie('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const config = {
      method,
      headers
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    return fetch(url, config)
      .then((response) => {
        if (response.status === 400) {
          throw new Error('Неверные логин/пароль');
        } else if (!response.ok) {
          throw new Error(`Статус ошибки: ${response.status} сообщение: ${response.message}`);
        }
        return response;
      })
      .then(response => response.json().then(json => {
        const saveToken = json.token;
        setCookie('token', saveToken);
        return Promise.resolve(json);
      }))
      .catch(error => {
        return Promise.reject(error);
      });
  }
}