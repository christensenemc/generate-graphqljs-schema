'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderUserDeps;
var primitiveDeps = ['String', 'Int', 'Float', 'Boolean', 'ID'];

function extractUserDepsIntoSet(type, set) {
  if (primitiveDeps.indexOf(type.name) !== -1) return set;
  set.add(type.name);
  return set;
}

function renderUserDeps(definition) {
  var userDeps = new Set();

  definition.fields.forEach(function (field) {
    extractUserDepsIntoSet(field.type, userDeps);
    field.arguments.forEach(function (argField) {
      extractUserDepsIntoSet(argField.type, userDeps);
    });
  });

  if (userDeps.has(definition.name)) {
    userDeps.delete(definition.name);
  }

  var str = '';
  userDeps.forEach(function (dep) {
    str += 'import ' + dep + 'Type from \'./' + dep + ';\'\n';
  });
  return str;
}