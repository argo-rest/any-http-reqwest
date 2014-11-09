import {Http} from '../../index';

describe('Http', () => {

    // TODO: replace dummy test once `import' actually working
    it('should be a function', () => {
        Http.should.be.a('function');
    });

    describe('new Http', function() {
        var http;

        beforeEach(() => {
            http = new Http;
        });

        it('should be an object', () => {
            http.should.be.an('object');
        });


        describe('#get', function() {
            it('should be a function', () => {
                http.get.should.be.a('function');
            });

            // TODO: when called
        });

        // TODO: post
        // TODO: put
        // TODO: patch
        // TODO: delete
    });
});
