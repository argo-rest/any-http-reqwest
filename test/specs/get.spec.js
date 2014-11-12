import {Http} from '../../index';

describe('Http', () => {

    var http;

    beforeEach(() => {
        http = new Http;
    });

    describe('#get', () => {
        it('should be a function', () => {
            http.get.should.be.a('function');
        });

        it('should fail if no uri is given', () => {
            (() => {
                http.get();
            }).should.throw()
            // FIXME: catch error
        });

        it('should fail if non-string uri is given', () => {
            (() => {
                http.get('');
            }).should.throw()
            // FIXME: catch error
        });

        it('should fail if empty uri is given', () => {
            (() => {
                http.get('');
            }).should.throw()
            // FIXME: catch error
        });


        it('should return a Promise', () => {
            // TODO: make it work
            var xhr = sinon.useFakeXMLHttpRequest();

            var ret = http.get('http://example.com');
            ret.should.be.an('object');
            ret.then.should.be.a('function');

            xhr.restore();
        });

        it.skip('should issue a request with the GET method', () => {
            // TODO: make it work
            var xhr = sinon.useFakeXMLHttpRequest();

            xhr.onCreate = function (xhr) {
                sinon.spy(xhr, 'open');
                console.log("IN")
                xhr.open.should.have.been.calledWith('getx')
            };

            http.get('http://example.com');


            xhr.restore();
        });

        it('should issue a request to the given uri', () => {
            var server = sinon.fakeServer.create();
            server.respondWith("GET", "http://example.com",
                               [200,
                                { "Content-Type": "application/json" },
                                '{ "a": 1 }']);

            var callback = sinon.spy();
            var errback = sinon.spy();

            var resp = http.get('http://example.com').then(callback, errback);

            server.respond();

            return resp.then(() => {
                callback.should.have.been.calledWith({
                    uri: 'http://example.com',
                    body: {a: 1},
                    headers: {'Content-Type': 'application/json'},
                    status: 200
                });
                errback.should.not.have.been.called;

                server.restore();
            });
        });

        it('should serialise the parameters in the requested uri', () => {
            var server = sinon.fakeServer.create();
            server.respondWith("GET", "http://example.com?x=1&y=z",
                               [200,
                                { "Content-Type": "application/json" },
                                '{ "a": 1 }']);

            var callback = sinon.spy();
            var errback = sinon.spy();

            var resp = http.get('http://example.com', {x: 1, y: 'z'}).then(callback, errback);

            server.respond();

            return resp.then(() => {
                callback.should.have.been.calledWith({
                    uri: 'http://example.com',
                    body: {a: 1},
                    headers: {'Content-Type': 'application/json'},
                    status: 200
                });
                errback.should.not.have.been.called;

                server.restore();
            });
        });

        // TODO: if params are not an object? or contains smt not an int, string, etc?

        // FIXME: always on?
        // it('should pass the crossOrigin option to the XHR', (done) => {
        // });

        it.skip('should pass withCredentials=false to the XHR by default', (done) => {
        });

        it.skip('should pass the withCredentials option to the XHR', (done) => {
        });

        it.skip('should pass the contentType option to the XHR', (done) => {
            // FIXME: or just shouldn't be set?
        });

        it.skip('should pass the headers option to the XHR', (done) => {
            // FIXME: or just shouldn't be set?
        });

        // TODO: pass underlying options?
        // TODO: type?

        it.skip('should not send any data in the request', (done) => {
        });

        it('should return all the response information of a JSON response', () => {
            var server = sinon.fakeServer.create();
            server.respondWith("GET", "http://example.com",
                               [200,
                                { "Content-Type": "application/json" },
                                '{ "a": 1 }']);

            var callback = sinon.spy();
            var errback = sinon.spy();

            var resp = http.get('http://example.com').then(callback, errback);

            server.respond();

            return resp.then(() => {
                callback.should.have.been.calledWith({
                    uri: 'http://example.com',
                    body: {a: 1},
                    headers: {'Content-Type': 'application/json'},
                    status: 200
                });
                errback.should.not.have.been.called;
            });
        });

        // FIXME: fails because the response is not set, only
        // responseText, which needs parsing based on the Content-Type
        it.skip('should return a rejected Promise with all the response information in case of 404 error', () => {
            var server = sinon.fakeServer.create();
            server.respondWith("GET", "http://example.com",
                               [404,
                                { "Content-Type": "application/json" },
                                '{ "err": "or" }']);

            var callback = sinon.spy();
            var errback = sinon.spy();

            var resp = http.get('http://example.com').then(callback, errback);

            server.respond();

            return resp.then(() => {
                errback.should.have.been.calledWith({
                    uri: 'http://example.com',
                    body: { "err": "or" },
                    headers: {'Content-Type': 'application/json'},
                    status: 404
                });
                callback.should.not.have.been.called;
            });
        });

        // TODO: errors
        // TODO: promise adapter?
    });

    // TODO: post
    // TODO: put
    // TODO: patch
    // TODO: delete

    // TODO: configured instance?
});
