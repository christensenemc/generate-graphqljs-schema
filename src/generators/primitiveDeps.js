function extractPrimitiveDepsIntoSet(type,set){
  if(type.name === 'ID'){
    set.add('GraphQLID');
  }

  if(type.name === 'String'){
    set.add('GraphQLString');
  }

  if(type.name === 'Int'){
    set.add('GraphQLInt');
  }

  if(type.name === 'Object'){
    set.add('GraphQLObjectType');
  }

  if(type.name === 'Boolean'){
    set.add('GraphQLBoolean');
  }

  if(type.name === 'Float'){
    set.add('GraphQLFloat');
  }

  if(type.required){
    set.add('GraphQLNonNull');
  }

  if(type.list){
    set.add('GraphQLList');
  }

  return set;
}

export default function renderPrimitiveDeps(definition){
  let primitiveDeps = new Set();

  definition.fields.forEach( field => {
    extractPrimitiveDepsIntoSet(field.type,primitiveDeps);
    field.arguments.forEach( argField => {
      extractPrimitiveDepsIntoSet(argField.type,primitiveDeps);
    });
  });

  if(definition.generator === 'types'){
    primitiveDeps.add('GraphQLObjectType')
  }

  if(definition.generator === 'interfaces'){
    primitiveDeps.add('GraphQLInterfaceType')
  }

  if(definition.generator === 'enums'){
    primitiveDeps.add('GraphQLEnumType')
  }

  let str = '';
  str += `import {\n`
  str += `\t${Array.from(primitiveDeps).join(',\n\t')}\n`
  str += `} from 'graphql/type';\n`
  return str
}

