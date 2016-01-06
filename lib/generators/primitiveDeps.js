'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderPrimitiveDeps;
function extractPrimitiveDepsIntoSet(type, set) {
  if (type.name === 'ID') {
    set.add('GraphQLID');
  }

  if (type.name === 'String') {
    set.add('GraphQLString');
  }

  if (type.name === 'Int') {
    set.add('GraphQLInt');
  }

  if (type.name === 'Object') {
    set.add('GraphQLObjectType');
  }

  if (type.name === 'Boolean') {
    set.add('GraphQLBoolean');
  }

  if (type.name === 'Float') {
    set.add('GraphQLFloat');
  }

  if (type.required) {
    set.add('GraphQLNonNull');
  }

  if (type.list) {
    set.add('GraphQLList');
  }

  return set;
}

function renderPrimitiveDeps(definition) {
  var primitiveDeps = new Set();

  definition.fields.forEach(function (field) {
    extractPrimitiveDepsIntoSet(field.type, primitiveDeps);
    field.arguments.forEach(function (argField) {
      extractPrimitiveDepsIntoSet(argField.type, primitiveDeps);
    });
  });

  if (definition.generator === 'types') {
    primitiveDeps.add('GraphQLObjectType');
  }

  if (definition.generator === 'interfaces') {
    primitiveDeps.add('GraphQLInterfaceType');
  }

  if (definition.generator === 'enums') {
    primitiveDeps.add('GraphQLEnumType');
  }

  var str = '';
  str += 'import {\n';
  str += '\t' + Array.from(primitiveDeps).join(',\n\t') + '\n';
  str += '} from \'graphql/type;\'\n';
  return str;
}