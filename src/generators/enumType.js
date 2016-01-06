import writeText from '../writeText';

export default function(definition){
  return writeText(t => {
    t.line(`import { GraphQLEnumType } from 'graphql/type'`);
    t.line(``);
    t.block(`const ${definition.name}Type = new GraphQLEnumType({`,e => {
      e.line(`name: '${definition.name}',`);
      e.line(`description: 'TODO: describe enum ${definition.name}',`);
      e.block(`values: {`,v => {
        definition.values.forEach( enumValue => {
          v.line(`${enumValue.name}: {value: ${enumValue.value}},`)
        })
      },`}`);
    },`});`);
    t.line(``);
    t.line(`export default ${definition.name}Type`);
  });
}