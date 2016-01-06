'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = definitionsFromTypeString;

var _language = require('graphql/language');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function definitionsFromTypeString(typeString) {
  var _visit;

  return (0, _language.visit)((0, _language.parse)(typeString), (_visit = {}, _defineProperty(_visit, _language.Kind.NAMED_TYPE, {
    leave: function leave(ctx) {
      return {
        name: ctx.name.value,
        toString: function toString() {
          if (ctx.name.value === 'ID') {
            return 'GraphQLID';
          } else if (ctx.name.value === 'String') {
            return 'GraphQLString';
          } else if (ctx.name.value === 'Boolean') {
            return 'GraphQLBoolean';
          } else if (ctx.name.value === 'Int') {
            return 'GraphQLInt';
          } else if (ctx.name.value === 'Float') {
            return 'GraphQLFloat';
          } else {
            return ctx.name.value + 'Type';
          }
        }
      };
    }
  }), _defineProperty(_visit, _language.Kind.NON_NULL_TYPE, {
    leave: function leave(ctx) {
      return _extends({}, ctx.type, {
        required: true,
        toString: function toString() {
          return 'new GraphQLNonNull(' + ctx.type.toString() + ')';
        }
      });
    }
  }), _defineProperty(_visit, _language.Kind.LIST_TYPE, {
    leave: function leave(ctx) {
      return _extends({}, ctx.type, {
        list: true,
        toString: function toString() {
          return 'new GraphQLList(' + ctx.type.toString() + ')';
        }
      });
    }
  }), _defineProperty(_visit, _language.Kind.INPUT_VALUE_DEFINITION, {
    leave: function leave(ctx) {
      return {
        name: ctx.name.value,
        type: ctx.type
      };
    }
  }), _defineProperty(_visit, _language.Kind.FIELD_DEFINITION, {
    leave: function leave(ctx) {
      return {
        name: ctx.name.value,
        type: ctx.type,
        arguments: ctx.arguments
      };
    }
  }), _defineProperty(_visit, _language.Kind.ENUM_VALUE_DEFINITION, {
    leave: function leave(ctx) {
      return {
        name: ctx.name.value
      };
    }
  }), _defineProperty(_visit, _language.Kind.ENUM_TYPE_DEFINITION, {
    leave: function leave(ctx) {
      return {
        generator: 'enums',
        name: ctx.name.value,
        values: ctx.values.map(function (val, index) {
          val.value = index;
          return val;
        })
      };
    }
  }), _defineProperty(_visit, _language.Kind.INTERFACE_TYPE_DEFINITION, {
    leave: function leave(ctx) {
      return {
        generator: 'interfaces',
        name: ctx.name.value,
        fields: ctx.fields
      };
    }
  }), _defineProperty(_visit, _language.Kind.OBJECT_TYPE_DEFINITION, {
    leave: function leave(ctx) {
      return {
        generator: 'types',
        name: ctx.name.value,
        interfaces: ctx.interfaces,
        fields: ctx.fields
      };
    }
  }), _defineProperty(_visit, _language.Kind.DOCUMENT, {
    leave: function leave(node) {
      return node.definitions;
    }
  }), _visit));
};