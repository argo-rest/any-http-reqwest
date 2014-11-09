import reqwest from 'reqwest';


function getHeaders(request) {
  return {
    // FIXME: can't read Location?
    // 'Location':     request.getResponseHeader('Location'),
    'Content-Type': request.getResponseHeader('Content-Type')
  };
}

function dispatch(method, uri, data) {
  // Note: don't use reqwest's promises that are not A+-compliant
  return new Promise((resolve, reject) => {
    var {request} = reqwest({
      url:     uri,
      method:  method,
      type:    'json',
      data:    data,
      // FIXME: not for GET though?
      // FIXME: or argo?
      contentType: 'application/json',
      headers: {
        // FIXME: should be passed in as argument to make adapter more generic
        'Accept': 'application/vnd.argo+json'
      },
// TODO: optional:
      crossOrigin: true,
      //withCredentials: true,
      success: (body) => resolve({uri: uri, body: body, status: request.status, headers: getHeaders(request)}),
      // FIXME: parse response iff json content-type
      error:   ()     => reject( {uri: uri, body: request.response, status: request.status, headers: getHeaders(request)})
    });
  });
}


export class Http {

  get(uri, params, implemOptions) {
    return dispatch('get', uri, params);
  }

  post(uri, data, implemOptions) {
    return dispatch('post', uri, JSON.stringify(data));
  }

  put(uri, data, implemOptions) {
    return dispatch('put', uri, JSON.stringify(data));
  }

  patch(uri, data, implemOptions) {
    return dispatch('patch', uri, JSON.stringify(data));
  }

  delete(uri, implemOptions) {
    return dispatch('delete', uri);
  }

}
