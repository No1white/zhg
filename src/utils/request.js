import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

const parseQuery = (obj) => {
  let str = ''
  for (let key in obj) {
    const value = typeof obj[key] !== 'string' ? JSON.stringify(obj[key]) : obj[key]
    str += '&' + key + '=' + value
  }
  return str.substr(1)
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
const request = (url, method = 'get', data) => {
  const options = {
    method: method,   // HTTP请求方法，默认为GET
    headers: {        // HTTP的请求头，默认为{}
      'Content-Type': 'application/json'
    },
    // credentials: 'include', // 是否携带cookie，默认为omit,不携带; same-origi,同源携带; include,同源跨域都携带
    mode: 'cors',
  }
  if (method === 'get') {
    url += '?' + parseQuery(data)
  } else {
    options.body = JSON.stringify(data)
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
export default {
  get (url, data) {
    return request(url, 'get', data)
  },
  post (url, data) {
    return request(url, 'post', data)
  }
}
