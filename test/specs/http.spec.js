import {Http} from '../../index';

describe('Http', () => {

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
    });
});
