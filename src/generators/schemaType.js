import writeText from '../writeText';

export default function(definition,options){
  return writeText( t => {
    t.line(`import { GraphQLSchema } from 'graphql/type';`)
    t.line(``)
    t.line(`import { RootQuery } from './types/RootQuery';`)
    if(options.hasMutation){
      t.line(`import { RootMutation } from './types/RootMutation';`)
    }
    t.line(``)
    t.block(`export default new GraphQLSchema({`,s => {
      if(options.hasMutation){
        s.line(`query: RootQuery,`)
        s.line(`mutation: RootMutation`)        
      }else{
        s.line(`query: RootQuery`)
      }
    },`});`);
  })
}