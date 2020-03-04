// Имплементация класса взаимодействия по REST API
export const URL_AUTH = 'https://reqres.in/api/login';

function getCookie(name) {
  const matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, token) {
  const date = new Date(new Date().getTime() + 1 * 60 * 1000);
  document.cookie = name + '=' + token + ';path=/;expires=' + date.toUTCString();
}

function deleteCookie(name) {
  setCookie(name, '', {
    expires: -1
  });
}

export class API_AUTH {
  get(url) {
    return this.sendRequest('GET', url);
  }

  post(url, body) {
    return this.sendRequest('POST', url, body);
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
        console.log(json);
        const tokentest = json.token;
        setCookie('token', tokentest);
        return Promise.resolve(json);
      }))
      .catch(error => {
        return Promise.reject(error);
      });
  }
}
