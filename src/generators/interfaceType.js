import writeText from '../writeText';
import renderPrimitiveDeps from './primitiveDeps'
import renderUserDeps from './userDeps'

export default function(definition){
  return writeText( t => {
    t.line(renderPrimitiveDeps(definition));
    t.line(renderUserDeps(definition));
    t.block(`const ${definition.name}InterfaceType = new GraphQLInterfaceType({`,o => {
      o.line(`name: '${definition.name}',`);
      o.line(`description: 'TODO: describe interface ${definition.name}',`);
      o.block(`fields: () => ({`,fb => {
        definition.fields.forEach(field => {
          fb.block(`${field.name}: {`,f => {
            f.line(`type: ${field.type.toString()},`);
            f.line(`description: 'TODO: describe field ${definition.name}.${field.name}',`);
            if(field.arguments.length > 0){
              f.block(`args: {`,ab => {
                field.arguments.forEach(arg => {
                  ab.block(`${arg.name}: {`,a => {
                    a.line(`type: ${arg.type.toString()},`);
                    a.line(`description: 'TODO: describe argument ${arg.name} for field ${definition.name}.${field.name}'`)
                  },`},`);
                });
              },`},`);
            }
          },`},`);
        });
      },`})`);
    },`});`);
    t.line(``);
    t.line(`export default ${definition.name}InterfaceType;`)
  })
}