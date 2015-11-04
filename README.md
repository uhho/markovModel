# MarkovModel in JavaScript

Simple implementation of a [Markov Model](https://en.wikipedia.org/wiki/Markov_model).

## Usage


```js
var MM = require('markovModel');
var markovModel = new MM.Model();

var observations = ['A', 'B', 'A', 'B', 'A', 'B', 'A', 'B', 'B', 'B', 'B', 'A'];
markovModel.build([observations]);
markovModel.next('A'); // B
```
