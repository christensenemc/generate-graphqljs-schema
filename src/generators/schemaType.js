import writeText from '../writeText';

export default function(definition,options){
  return writeText( t => {
    t.line(`import { GraphQLSchema } from 'graphql/type';`)
    t.line(``)
    t.line(`import RootQueryType from './types/RootQuery';`)
    if(options.hasMutation){
      t.line(`import RootMutationType from './types/RootMutation';`)
    }
    t.line(``)
    t.block(`export default new GraphQLSchema({`,s => {
      if(options.hasMutation){
        s.line(`query: RootQueryType,`)
        s.line(`mutation: RootMutationType`)        
      }else{
        s.line(`query: RootQueryType`)
      }
    },`});`);
  })
}