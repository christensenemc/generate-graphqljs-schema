'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (definition, options) {
  return (0, _writeText2.default)(function (t) {
    t.line('import { GraphQLSchema } from \'graphql/type\';');
    t.line('');
    t.line('import { RootQuery } from \'./types/RootQuery\';');
    if (options.hasMutation) {
      t.line('import { RootMutation } from \'./types/RootMutation\';');
    }
    t.line('');
    t.block('export default new GraphQLSchema({', function (s) {
      if (options.hasMutation) {
        s.line('query: RootQuery,');
        s.line('mutation: RootMutation');
      } else {
        s.line('query: RootQuery');
      }
    }, '});');
  });
};

var _writeText = require('../writeText');

var _writeText2 = _interopRequireDefault(_writeText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }