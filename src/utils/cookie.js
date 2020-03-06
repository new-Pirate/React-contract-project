export function getCookie(name) {
  const matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, token) {
  const date = new Date(new Date().getTime() + 10 * 60 * 1000);
  document.cookie = name + '=' + token + ';path=/;expires=' + date.toUTCString();
}

export function deleteCookie(name) {
  setCookie(name, '', {
    expires: -1
  });
}

