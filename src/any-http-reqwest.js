import reqwest from 'reqwest';


function getHeaders(request) {
  return {
    // FIXME: can't read Location?
    // 'Location':     request.getResponseHeader('Location'),
    'Content-Type': request.getResponseHeader('Content-Type')
  };
}

function dispatch(method, uri, data, options) {
  if (typeof uri !== 'string' || uri === '') throw new Error()

  // Note: don't use reqwest's promises that are not A+-compliant
  return new Promise((resolve, reject) => {
    var {request} = reqwest({
      url:     uri,
      method:  method,
      type:    'json',
      data:    data,
      // FIXME: not for GET though?
      // FIXME: or argo?
      contentType:     'application/json',
      headers:         options.headers,
      crossOrigin:     options.crossOrigin,
      withCredentials: options.withCredentials,
      success: (body) => resolve({uri: uri, body: body, status: request.status, headers: getHeaders(request)}),
      // FIXME: parse response iff json content-type
      error:   ()     => reject( {uri: uri, body: request.responseText, status: request.status, headers: getHeaders(request)})
    });
  });
}


export class Http {
  /**
   * @param {Object} options Base set of options:
   *  - withCredentials {boolean} Whether to send credentials
   *  - crossOrigin {boolean} Whether to allow CORS
   *  - headers {Object} Default headers to send
   */
  constructor(baseOptions = {}) {
    this.baseOptions = baseOptions;
  }

  prepareOptions(options) {
    // TODO: check and normalise types?
    return Object.mixin(Object.mixin({
      // TODO: recursively merge, e.g. headers
      // FIXME: should be passed in as option to make adapter more generic
      headers: {
        'Accept': 'application/vnd.argo+json'
      }
    }, this.baseOptions), options);
  }

  get(uri, params, options = {}) {
    const opts = this.prepareOptions(options);
    return dispatch('get', uri, params, opts);
  }

  post(uri, data, options = {}) {
    const opts = this.prepareOptions(options);
    return dispatch('post', uri, JSON.stringify(data), opts);
  }

  put(uri, data, options = {}) {
    const opts = this.prepareOptions(options);
    return dispatch('put', uri, JSON.stringify(data), opts);
  }

  patch(uri, data, options = {}) {
    const opts = this.prepareOptions(options);
    return dispatch('patch', uri, JSON.stringify(data), opts);
  }

  delete(uri, options = {}) {
    const opts = this.prepareOptions(options);
    return dispatch('delete', uri, undefined, opts);
  }

}
