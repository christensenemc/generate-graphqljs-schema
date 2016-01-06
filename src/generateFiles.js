import fs from 'fs';
import {argv} from 'optimist'
import renderObjectType from './generators/objectType';
import renderEnumType from './generators/enumType';
import renderInterfaceType from './generators/interfaceType';
import renderSchemaType from './generators/schemaType';

export default function generateFiles(definitions){

  const hasMutation = definitions.filter(d => d.name === argv.m) > 1

  if(!fs.existsSync('./interfaces')){
    fs.mkdirSync('./interfaces');
  }

  if(!fs.existsSync('./types')){
    fs.mkdirSync('./types');
  }

  definitions.forEach(definition => {
    if(definition.generator === 'types'){
      const fileName = `./types/${definition.name}.js`
      fs.writeFileSync(fileName,renderObjectType(definition));
    }else if(definition.generator === 'enums'){
      const fileName = `./types/${definition.name}.js`
      fs.writeFileSync(fileName,renderEnumType(definition));
    }else if(definition.generator === 'interfaces'){
      const fileName = `./interfaces/${definition.name}.js`
      fs.writeFileSync(fileName,renderInterfaceType(definition));      
    }
  });

  fs.writeFileSync(`./index.js`,renderSchemaType(null,{hasMutation}));  
}