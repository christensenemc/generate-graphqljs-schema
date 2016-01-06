# generate-graphqljs-schema
Simple CLI Tool for generating graphqljs boilerplate from a schema types file.

##Installation

```
npm install generate-grapqhljs-schema -g
```

Currently generates GraphQLObjectTypes, GraphQLInterfaceTypes, and GraphQLEnumTypes.  Support for GraphQLInputTypes and GraphQLScalars is forthcoming. 

##Usage

given a typedef file at typedef.graphql:
```
interface Node {
  id: ID!
}

type User implements Node {
  id: ID!
  name: String!
  age: Int!
  friends: [User]
}

type RootQuery {
  viewer: User
}
```

generate graphljs code for those types. An example at /types/User.js:
```js
import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType
} from 'graphql/type;'


import NodeInterfaceType from '../interfaces/Node;'

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'TODO: describe object UserType',
  interfaces: [NodeInterfaceType],
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'TODO: describe field UserType.id',
      resolve(root){
        return root.id
      }
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'TODO: describe field UserType.name',
      resolve(root){
        return root.name
      }
    },
    age: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'TODO: describe field UserType.age',
      resolve(root){
        return root.age
      }
    },
    friends: {
      type: new GraphQLList(UserType),
      description: 'TODO: describe field UserType.friends',
      resolve(root){
        return root.friends
      }
    },
  })
});

export default UserType;

```


