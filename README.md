# AnyHTTP adapter for reqwest

[AnyHTTP](https://github.com/argo-rest/any-http) adapter for the
[reqwest](https://github.com/ded/reqwest) AJAX micro-library.

## Usage

This adapter is implemented as an ES6 module which can be installed
with [jspm](https://jspm.io) and loaded via
[SystemJS](https://github.com/systemjs/systemjs) as follows:

``` javascript
import {Http} from 'github:argo-rest/any-http-reqwest';

var httpClient = new Http;
httpClient.
  get('https://example.com').
  then(({body, headers}) => {
    console.log("body:", body);
    console.log("content-type:", headers['Content-Type']);
  });
```
