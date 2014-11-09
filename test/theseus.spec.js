"format es6;";

// import * as theseus from "..";
// import theseus from "..";
import theseus from "../index";

// FIXME: installed node_modules not exposed to SystemJS?
// import 'chai';

console.log("OK");
console.log("T", theseus);

describe('theseus', function(done) {

    it('should be a function', function() {
        theseus.should.be.an('object');
    });

});
