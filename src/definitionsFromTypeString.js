import {parse,visit,Kind} from 'graphql/language';

export default function definitionsFromTypeString(typeString){
  return visit(parse(typeString),{
    [Kind.NAMED_TYPE]:{
      leave(ctx){
        return {
          name:ctx.name.value,
          toString(){
            if(ctx.name.value === 'ID'){
              return 'GraphQLID'
            }else if(ctx.name.value === 'String'){
              return 'GraphQLString'
            }else if(ctx.name.value === 'Boolean'){
              return 'GraphQLBoolean'
            }else if(ctx.name.value === 'Int'){
              return 'GraphQLInt'
            }else if(ctx.name.value === 'Float'){
              return 'GraphQLFloat'
            }else{
              return `${ctx.name.value}Type`
            }
          }
        }
      }
    },
    [Kind.NON_NULL_TYPE]:{
      leave(ctx){
        return {
          ...ctx.type,
          required:true,
          toString(){
            return `new GraphQLNonNull(${ctx.type.toString()})`
          }
        }
      }
    },
    [Kind.LIST_TYPE]:{
      leave(ctx){
        return {
          ...ctx.type,
          list:true,
          toString(){
            return `new GraphQLList(${ctx.type.toString()})`
          }
        }
      }
    },
    [Kind.INPUT_VALUE_DEFINITION]:{
      leave(ctx){
        return {
          name:ctx.name.value,
          type:ctx.type
        }
      }
    },
    [Kind.FIELD_DEFINITION]:{
      leave(ctx){
        return {
          name:ctx.name.value,
          type:ctx.type,
          arguments:ctx.arguments
        }
      }
    },
    [Kind.ENUM_VALUE_DEFINITION]:{
      leave(ctx){
        return {
          name:ctx.name.value
        }
      }
    },
    [Kind.ENUM_TYPE_DEFINITION]:{
      leave(ctx){
        return {
          generator:'enums',
          name:ctx.name.value,
          values:ctx.values.map((val,index) => {
            val.value = index;
            return val;
          })
        }
      }
    },
    [Kind.INTERFACE_TYPE_DEFINITION]:{
      leave(ctx){
        return {
          generator:'interfaces',
          name:ctx.name.value,
          fields:ctx.fields
        }
      }
    },
    [Kind.OBJECT_TYPE_DEFINITION]:{
      leave(ctx){
        return {
          generator:'types',
          name:ctx.name.value,
          interfaces:ctx.interfaces,
          fields:ctx.fields
        }
      }
    },
    [Kind.DOCUMENT]:{
      leave(node){
        return node.definitions
      }
    }
  })
};