var eslint = require('broccoli-lint-eslint');
var compileES6 = require('broccoli-es6-concatenator');
var concat = require('broccoli-concat');
var mergeTrees = require('broccoli-merge-trees');
var sass = require('broccoli-sass');
var myAwesomeLog = require('my-awesome-log');

// Copy static files
var publicTree = 'public';

// Compile styles
var cssTree = new sass(['styles'], 'main.scss', 'application.css');

// Run eslint
var lintTree = new eslint('lib');

var lintTreeWithLog = new myAwesomeLog(lintTree);

// Transpile es6 code & generate application.js file
var appTree = new compileES6(lintTreeWithLog, {
    inputFiles: [
        '**/*.js'
    ],
    ignoredModules: [
      'loader'
    ],
    wrapInEval: false,
    loaderFile: 'loader.js',
    outputFile: '/application.js'
});

// Merge all trees
module.exports = mergeTrees([appTree, publicTree, cssTree]);
