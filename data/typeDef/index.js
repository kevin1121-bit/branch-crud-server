const { constraintDirectiveTypeDefs } = require("graphql-constraint-directive");
const DefaultTypeDef = require("./default");
const PersonTypeDef = require("./personTypeDef");

module.exports = [constraintDirectiveTypeDefs, DefaultTypeDef, PersonTypeDef];
