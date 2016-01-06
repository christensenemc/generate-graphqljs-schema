'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (definition) {
  return (0, _writeText2.default)(function (t) {
    t.line('import { GraphQLEnumType } from \'graphql/type\'');
    t.line('');
    t.block('const ' + definition.name + 'Type = new GraphQLEnumType({', function (e) {
      e.line('name: \'' + definition.name + '\',');
      e.line('description: \'TODO: describe enum ' + definition.name + '\',');
      e.block('values: {', function (v) {
        definition.values.forEach(function (enumValue) {
          v.line(enumValue.name + ': {value: ' + enumValue.value + '},');
        });
      }, '}');
    }, '});');
    t.line('');
    t.line('export default ' + definition.name + 'Type');
  });
};

var _writeText = require('../writeText');

var _writeText2 = _interopRequireDefault(_writeText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }