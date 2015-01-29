import {Http} from '../../src/any-http-reqwest';

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
                http.get({});
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
            var xhr = sinon.useFakeXMLHttpRequest();

            var ret = http.get('http://example.com');
            ret.should.be.an('object');
            ret.then.should.be.a('function');

            xhr.restore();
        });

        describe('request', () => {
            var requests;
            var xhr;

            beforeEach(() => {
                requests = [];

                xhr = sinon.useFakeXMLHttpRequest();
                xhr.onCreate = function (xhr) {
                    requests.push(xhr);
                };
            });

            afterEach(() => {
                xhr.restore();
            });

            it('should issue a request to the URL with the GET method', () => {
                http.get('http://example.com');

                requests[0].url.should.equal('http://example.com');
                requests[0].method.should.equal('GET');
            });

            it('should serialise the parameters in the requested uri', () => {
                http.get('http://example.com', {x: 1, y: 'z'});

                requests[0].url.should.equal('http://example.com?x=1&y=z');
            });

            // TODO: url encode params
            // TODO: fail if params not an Object?
            // TODO: ignore if undefined, null or empty Object
            // TODO: fail if options not an Object?

            it('should not send any data in the request', () => {
                http.get('http://example.com', {a: 1});

                expect(requests[0].requestBody).to.be.null;
            });

            it.skip('should pass the contentType option to the XHR', () => {
                // FIXME: or just shouldn't be set for GET?
            });

            it.skip('should pass the headers option to the XHR', () => {
                // FIXME: fix test
                http.get('http://example.com', {}, {headers: {'X-Test': 'ok'}});

                requests[0].headers['X-Test'].should.equal('ok');
            });

            it('should pass withCredentials=false to the XHR by default', () => {
                http.get('http://example.com', {a: 1});

                requests[0].withCredentials.should.equal(false);
            });

            it.skip('should pass the withCredentials option to the XHR', () => {
                // FIXME: fix test
                http.get('http://example.com', {}, {withCredentials: true});

                requests[0].withCredentials.should.equal(true);
            });

            it.skip('should pass underlying options to reqwest', () => {
                // FIXME: fix test
                http.get('http://example.com', {}, {underlying: {url: 'http://hijack.com'}});

                requests[0].url.should.equal('http://hijack.com');
            });

            // TODO: type?
            // FIXME: always on?
            // it('should pass the crossOrigin option to the XHR', (done) => {
            // });
        });


        describe('response', () => {
            var server;
            var callback;
            var errback;

            beforeEach(() => {
                server = sinon.fakeServer.create();

                callback = sinon.spy();
                errback = sinon.spy();
            });

            afterEach(() => {
                server.restore();
            });

            it('should return all the response information of a JSON response', () => {
                server.respondWith("GET", "http://example.com",
                                   [200,
                                    { "Content-Type": "application/json" },
                                    '{ "a": 1 }']);

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

        });
    });


    // TODO: post
    // TODO: put
    // TODO: patch
    // TODO: delete

    // TODO: configured instance?
});
