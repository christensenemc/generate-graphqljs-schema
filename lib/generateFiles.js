'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateFiles;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _optimist = require('optimist');

var _objectType = require('./generators/objectType');

var _objectType2 = _interopRequireDefault(_objectType);

var _enumType = require('./generators/enumType');

var _enumType2 = _interopRequireDefault(_enumType);

var _interfaceType = require('./generators/interfaceType');

var _interfaceType2 = _interopRequireDefault(_interfaceType);

var _schemaType = require('./generators/schemaType');

var _schemaType2 = _interopRequireDefault(_schemaType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateFiles(definitions) {

  var hasMutation = definitions.filter(function (d) {
    return d.name === _optimist.argv.m;
  }) > 1;

  if (!_fs2.default.existsSync('./interfaces')) {
    _fs2.default.mkdirSync('./interfaces');
  }

  if (!_fs2.default.existsSync('./types')) {
    _fs2.default.mkdirSync('./types');
  }

  definitions.forEach(function (definition) {
    if (definition.generator === 'types') {
      var fileName = './types/' + definition.name + '.js';
      _fs2.default.writeFileSync(fileName, (0, _objectType2.default)(definition));
    } else if (definition.generator === 'enums') {
      var fileName = './types/' + definition.name + '.js';
      _fs2.default.writeFileSync(fileName, (0, _enumType2.default)(definition));
    } else if (definition.generator === 'interfaces') {
      var fileName = './interfaces/' + definition.name + '.js';
      _fs2.default.writeFileSync(fileName, (0, _interfaceType2.default)(definition));
    }
  });

  _fs2.default.writeFileSync('./index.js', (0, _schemaType2.default)(null, { hasMutation: hasMutation }));
}