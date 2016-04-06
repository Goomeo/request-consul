# Request-Consul

Request consul is used to request internal microservice through Consul.

If many occurences of called service exist, a randomly choice is made.

# Usage

## Basic Usage

```javascript
'use strict';

var Consul  = require('consul-node'),
    request = require('./index');

request({
    uri : 'http://servicename/function',
}, function (err, res, body) {
    console.log(body);
});
```

| params    | description   | default   |
| ----      | ----          | ----      |
| consul    | Consul Instance from package `consul-node` or object params for cConsul constructor | - |
| uri       | Request URL, the hostname must be your service name in Consul.io | - |


## Advanced

## Change consul options

```javascript
'use strict';

var Consul  = require('consul-node'),
    request = require('./index');

request({
    uri : 'http://servicename/function',
    consul : {
        hostname    : '172.17.0.1',
        port        : 8888,
        secure      : true,
        strict      : true
    }
}, function (err, res, body) {
    console.log(body);
});
```

## Pass Consul Instance

```javascript
'use strict';

var Consul  = require('consul-node'),
    request = require('./index');

var consul = new Consul();

request({
    uri : 'http://servicename/function',
    consul : consul
}, function (err, res, body) {
    console.log(body);
});
```