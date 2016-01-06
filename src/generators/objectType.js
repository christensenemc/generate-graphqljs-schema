import writeText from '../writeText';
import renderPrimitiveDeps from './primitiveDeps'
import renderUserDeps from './userDeps'
import renderInterfaceDeps from './interfaceDeps';

export default function(definition){
  return writeText( t => {
    t.line(renderPrimitiveDeps(definition));
    t.line(renderUserDeps(definition));
    t.line(renderInterfaceDeps(definition));
    t.block(`const ${definition.name}Type = new GraphQLObjectType({`,o => {
      o.line(`name: '${definition.name}',`);
      o.line(`description: 'TODO: describe object ${definition.name}Type',`);
      if(definition.interfaces.length > 0){
        o.line(`interfaces: [${definition.interfaces.map(i => `${i.name}InterfaceType`).join(', ')}],`);
      }
      o.block(`fields: () => ({`,fb =>{
        definition.fields.forEach(field => {
          fb.block(`${field.name}: {`,f => {
            f.line(`type: ${field.type.toString()},`);
            f.line(`description: 'TODO: describe field ${definition.name}Type.${field.name}',`);
            if(field.arguments.length > 0){
              f.block(`args: {`,ab => {
                field.arguments.forEach(arg => {
                  ab.block(`${arg.name}: {`,a => {
                    a.line(`type: ${arg.type.toString()},`);
                    a.line(`description: 'TODO: describe argument ${arg.name} for field ${definition.name}Type.${field.name}'`)
                  },`},`);
                });
              },`},`);
              f.block(`resolve(root,args){`,r => {
                r.line(`return root.${field.name}`);
              },`}`);
            }else{
              f.block(`resolve(root){`,r => {
                r.line(`return root.${field.name}`);
              },`}`);              
            }
          },`},`);
        });
      },`})`);
    },`});`);
    t.line(``);
    t.line(`export default ${definition.name}Type;`)
  })
}