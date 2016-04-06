'use strict';

var Consul  = require('consul-node'),
    request = require('request'),
    url     = require('url');

var Request = request.Request;
Request.prototype.original_init = Request.prototype.init;

Request.prototype.init = function (options) {
    if (!options) {
        options = {};
    }

    if (!(options.consul instanceof Consul)) {
        this.consul = new Consul(options.consul);
    } else {
        this.consul = options.consul;
    }

    // People use this property instead all the time, so support it.
    if (!this.uri && this.url) {
        this.uri = this.url;
        delete this.url;
    }

    if(typeof this.uri === 'string') {
        this.uri = url.parse(this.uri);
    }

    this.consul.catalog.service(this.uri.host, function (err, result) {
        if (err) {
            throw err;
        }

        var item = result[Math.floor(Math.random() * result.length)];

        this.uri.host       = item.ServiceAddress;
        this.uri.hostname   = item.ServiceAddress;
        this.uri.port       = item.ServicePort;
        options.uri         = this.uri;

        this.original_init(options);
    }.bind(this));
};

module.exports = request;