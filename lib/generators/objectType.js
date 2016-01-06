'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (definition) {
  return (0, _writeText2.default)(function (t) {
    t.line((0, _primitiveDeps2.default)(definition));
    t.line((0, _userDeps2.default)(definition));
    t.line((0, _interfaceDeps2.default)(definition));
    t.block('const ' + definition.name + ' = new GraphQLObjectType({', function (o) {
      o.line('name: \'' + definition.name + '\',');
      o.line('description: \'TODO: describe object ' + definition.name + '\',');
      if (definition.interfaces.length > 0) {
        o.line('interfaces: [' + definition.interfaces.map(function (i) {
          return i.name;
        }).join(', ') + '],');
      }
      o.block('fields: () => ({', function (fb) {
        definition.fields.forEach(function (field) {
          fb.block(field.name + ': {', function (f) {
            f.line('type: ' + field.type.toString() + ',');
            f.line('description: \'TODO: describe field ' + definition.name + '.' + field.name + '\',');
            if (field.arguments.length > 0) {
              f.block('args: {', function (ab) {
                field.arguments.forEach(function (arg) {
                  ab.block(arg.name + ': {', function (a) {
                    a.line('type: ' + arg.type.toString() + ',');
                    a.line('description: \'TODO: describe argument ' + arg.name + ' for field ' + definition.name + '.' + field.name + '\'');
                  }, '},');
                });
              }, '},');
              f.block('resolve(root,args){', function (r) {
                r.line('return root.' + field.name);
              }, '}');
            } else {
              f.block('resolve(root){', function (r) {
                r.line('return root.' + field.name);
              }, '}');
            }
          }, '},');
        });
      }, '})');
    }, '});');
    t.line('');
    t.line('export default ' + definition.name + ';');
  });
};

var _writeText = require('../writeText');

var _writeText2 = _interopRequireDefault(_writeText);

var _primitiveDeps = require('./primitiveDeps');

var _primitiveDeps2 = _interopRequireDefault(_primitiveDeps);

var _userDeps = require('./userDeps');

var _userDeps2 = _interopRequireDefault(_userDeps);

var _interfaceDeps = require('./interfaceDeps');

var _interfaceDeps2 = _interopRequireDefault(_interfaceDeps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }