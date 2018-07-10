'use strict';

const Benchmark = require('benchmark');
const SHA1 = require('cryptojs').Crypto.SHA1;
const SHA3 = require('sha3');
const uuid = require('uuid/v4');
const assert = require('assert');

const suite = new Benchmark.Suite();

const options = {
  async: true,
};

const string = uuid();
const reusedHash = new SHA3.SHA3Hash();

suite.add('SHA3 construct', () => {
  const hash = new SHA3.SHA3Hash();
  hash.update(string);
  hash.digest('hex');
})
.add('SHA3 reuse', () => {
  reusedHash.update(string);
  reusedHash.digest('hex');
})
.add('SHA1', () => {
  SHA1(string);
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run(options);
