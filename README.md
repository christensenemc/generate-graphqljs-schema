# generate-graphqljs-schema
Simple CLI Tool for generating graphqljs boilerplate from a schema types file.

##Installation

```
npm install generate-grapqhljs-schema -g
```

Currently generates GraphQLObjectTypes, GraphQLInterfaceTypes, and GraphQLEnumTypes.  Support for GraphQLInputTypes and GraphQLScalars is forthcoming. 

##Usage

given a typedef file
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

Generate /interfaces/Node.js, /types/User.js, and /types/RootQuery.js 


