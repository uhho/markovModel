/**
 * Implementation of a Markov Model
 */
function MarkovModel(modelData) {
  this.states = null;
  this.chain = null;
  this.observations = null;

  if (modelData) {
    this.states = modelData.states;
    this.chain = modelData.chain;
    this.observations = modelData.observations;
  }
}

/**
 * Building Markov Model
 *
 * @param {Array.<Array>} observations
 * @param {Array.<string|number>} states
 * @returns {Array}
 */
MarkovModel.prototype.build = function(observations, states) {
  if (!(observations instanceof Array)) {
    throw new Error('First parameter must be an array');
  }

  if (typeof states !== 'undefined' && !(states instanceof Array)) {
    throw new Error('Second parameter must be an array');
  }

  this.observations = observations;

  var len = observations.length;
  var matrixSize;
  var sums;
  var from;
  var to;
  var i;

  if (typeof states === 'undefined') {
    // get list of unique states from all observations
    var allStates = [];

    for (i = 0; i < len; i++) {
      allStates = allStates.concat(observations[i]);
    }

    this.states = this.arrayUnique(allStates);
  } else {
    this.states = states;
  }

  // init probability matrix
  matrixSize = this.states.length;
  this.chain = this.initMatrix(matrixSize);
  sums = this.arrayFill(matrixSize, 0);

  // count transition occurencies
  for (i = 0; i < len; i++) {
    var observedStates = observations[i];
    var obsLen = observedStates.length;
    if (obsLen > 1) {
      for (var j = 1; j < obsLen; j++) {
        from = this.states.indexOf(observedStates[j - 1]);
        to = this.states.indexOf(observedStates[j]);

        this.chain[from][to]++;
        sums[from]++;
      }
    }
  }

  // compute probability of each transition
  for (from = 0; from < matrixSize; from++) {
    var total = sums[from];

    if (total > 0) {
      for (to = 0; to < matrixSize; to++) {
        if (total === 0 && from === true) {
          this.chain[from][to] = 1;
        } else {
          this.chain[from][to] /= total;
        }
      }
    }
  }

  return this;
};

/**
 * Find state with closest probability to selected random value
 *
 * @param {string|number} state
 * @returns {string|number}
 */
MarkovModel.prototype.next = function(state) {
  var value = Math.random();
  var sum = 0;
  var from = this.states.indexOf(state);
  var to = 0;

  if (from < 0) {
    throw new Error('State \'' + state + '\' not found');
  }

  while ((sum += this.chain[from][to]) < value &&
      typeof this.chain[from][to + 1] !== 'undefined') {
    to++;
  }

  return this.states[to];
};

/**
 * Init two dimensional sqare probability identity matrix
 *
 * @param {number} matrixSize
 * @returns {Array.<Array>}
 */
MarkovModel.prototype.initMatrix = function(matrixSize) {
  var matrix = new Array(matrixSize);

  for (var i = 0; i < matrixSize; i++) {
    matrix[i] = this.arrayFill(matrixSize, 0);
  }

  return matrix;
};

/**
 * Get list of unique items in given array
 *
 * @param {Array} arr
 * @returns {Array.<string|number>}
 */
MarkovModel.prototype.arrayUnique = function(arr) {
  return arr.filter(function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  });
};

/**
 * Create new array filled with given value
 *
 * @param {number} size
 * @param {number} value
 * @returns {Array.<number>}
 */
MarkovModel.prototype.arrayFill = function(size, value) {
  return Array.apply(null, new Array(size))
    .map(Number.prototype.valueOf, value);
};

module.exports = MarkovModel;
