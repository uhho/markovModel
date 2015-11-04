var MM = require('../index.js');
var markovModel = new MM.Model();

describe('MarkovModel', function() {
  
  describe('build', function() {
    var observations = ['A', 'B', 'A', 'B', 'A', 'B', 'A', 'B', 'B', 'B', 'B', 'A'];
      
    it('should build markov model', function(done) {
      markovModel.build([observations]);
      markovModel.states.should.eql(['A', 'B']);
      markovModel.chain.should.have.lengthOf(2);
      markovModel.chain[0].should.eql([0, 1]);
      markovModel.next('A').should.eql('B');
      done();
    });

    it('should build markov model with defined states', function(done) {
      markovModel.build([observations], ['A', 'B', 'C']);
      markovModel.states.should.eql(['A', 'B', 'C']);
      markovModel.chain.should.have.lengthOf(3);
      markovModel.chain[0].should.eql([0, 1, 0]);
      markovModel.next('A').should.eql('B');
      done();
    });
  });
  
  describe('initMatrix', function() {
    it('should initialize probability matrix', function(done) {
      markovModel.initMatrix(2).should.eql([[0, 0], [0, 0]]);
      done();
    });
  });
  
  describe('arrayUnique', function() {
    it('should return unique array', function(done) {
      var arr = ['A', '1', 1, 0, 0, 1, '1', 'A', 'a', 'a'];
      markovModel.arrayUnique(arr).should.eql(['A', '1', 1, 0, 'a']);
      done();
    });
  });
  
  describe('arrayFill', function() {
    it('should return new array  filled with given value', function(done) {
      markovModel.arrayFill(3, 1).should.eql([1, 1, 1]);
      done();
    });
  });
  
});