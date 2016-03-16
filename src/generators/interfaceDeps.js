export default function renderInterfaceDeps(definition){
  let interfaceDeps = new Set();

  definition.interfaces.forEach(i => {
    interfaceDeps.add(i.name);
  });

  let str = '';
  interfaceDeps.forEach(dep => {
    str += `import ${dep}InterfaceType from '../interfaces/${dep}';\n`
  });
  return str
}