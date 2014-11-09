var SystemJS = require('systemjs');
require('../config');

describe('tests', function(done) {

    // Awkward workaround to force mocha to wait until SystemJS has
    // loaded the tests.  There ought to be a better way really...
    it('should be loaded using SystemJS', function(done) {
        System.import('test/theseus.spec').then(done).catch(function(e) {
            setTimeout(function(){ throw e; });
        });
    });

});
