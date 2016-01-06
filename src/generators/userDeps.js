const primitiveDeps = ['String','Int','Float','Boolean','ID'];


function extractUserDepsIntoSet(type,set){
  if(primitiveDeps.indexOf(type.name) !== -1) return set;
  set.add(type.name);
  return set
}

export default function renderUserDeps(definition){
  let userDeps = new Set();

  definition.fields.forEach( field => {
    extractUserDepsIntoSet(field.type,userDeps);
    field.arguments.forEach( argField => {
      extractUserDepsIntoSet(argField.type,userDeps);
    });
  });

  if(userDeps.has(definition.name)){
    userDeps.delete(definition.name);
  }
  
  let str = '';
  userDeps.forEach(dep => {
    str += `import ${dep} from './${dep};'\n`
  });
  return str
}