'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderInterfaceDeps;
function renderInterfaceDeps(definition) {
  var interfaceDeps = new Set();

  definition.interfaces.forEach(function (i) {
    interfaceDeps.add(i.name);
  });

  var str = '';
  interfaceDeps.forEach(function (dep) {
    str += 'import ' + dep + 'InterfaceType from \'../interfaces/' + dep + ';\'\n';
  });
  return str;
}