#! /usr/bin/env node
'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _optimist = require('optimist');

var _optimist2 = _interopRequireDefault(_optimist);

var _definitionsFromTypeString = require('./definitionsFromTypeString');

var _definitionsFromTypeString2 = _interopRequireDefault(_definitionsFromTypeString);

var _generateFiles = require('./generateFiles');

var _generateFiles2 = _interopRequireDefault(_generateFiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var argv = _optimist2.default.usage('Generate a GraphQL Server from a schema types file.\n' + 'See http://graphql.org/docs/typesystem/ for more info.').demand('t').alias('t', 'typedef-file').describe('t', 'Typef file name').alias('q', 'query-name').describe('q', 'Name of root query type').default('q', 'RootQuery').alias('m', 'mutation-name').describe('m', 'Name of root mutation type').default('m', 'RootMutation').argv;

if (!_fs2.default.existsSync(argv.t)) {
  console.warn('Schema types file "' + argv.t + '" does not exist.');
  process.exit(1);
}
var typeString = _fs2.default.readFileSync(argv.t);
var definitions = (0, _definitionsFromTypeString2.default)(typeString);
(0, _generateFiles2.default)(definitions);