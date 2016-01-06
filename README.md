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

generate graphljs code for those types at /types/User.js:
```
import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType
} from 'graphql/type;'


import Node from '../interfaces/Node;'

const User = new GraphQLObjectType({
  name: 'User',
  description: 'TODO: describe object User',
  interfaces: [Node],
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'TODO: describe field User.id',
      resolve(root){
        return root.id
      }
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'TODO: describe field User.name',
      resolve(root){
        return root.name
      }
    },
    age: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'TODO: describe field User.age',
      resolve(root){
        return root.age
      }
    },
    friends: {
      type: new GraphQLList(User),
      description: 'TODO: describe field User.friends',
      resolve(root){
        return root.friends
      }
    },
  })
});

export default User;

```


