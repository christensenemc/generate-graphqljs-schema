#! /usr/bin/env node

import fs from 'fs';
import optimist from 'optimist';
import definitionsFromTypeString from './definitionsFromTypeString';
import generateFiles from './generateFiles';

const argv = optimist
  .usage('Generate a GraphQL Server from a schema types file.\n'+
    'See http://graphql.org/docs/typesystem/ for more info.')
  .demand('t')
  .alias('t','typedef-file')
  .describe('t','Typef file name')
  .alias('q','query-name')
  .describe('q','Name of root query type')
  .default('q','RootQuery')
  .alias('m','mutation-name')
  .describe('m','Name of root mutation type')
  .default('m','RootMutation')
  .argv

if(!fs.existsSync(argv.t)){
  console.warn('Schema types file "'+argv.t+'" does not exist.');
  process.exit(1);
}
const typeString = fs.readFileSync(argv.t)
const definitions = definitionsFromTypeString(typeString);
generateFiles(definitions);