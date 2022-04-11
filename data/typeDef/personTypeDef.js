const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Upload

  type Person {
    id: ID
    username: String
    password: String
    firstName: String
    lastName: String
    image: String
  }

  type Response {
    status: Boolean
    message: String
  }

  input SavePersonInput {
    username: String! @constraint(minLength: 3, maxLength: 100)
    firstName: String! @constraint(minLength: 3, maxLength: 100)
    lastName: String! @constraint(minLength: 3, maxLength: 100)
    image: Upload
    password: String! @constraint(minLength: 3, maxLength: 100)
  }

  input RemovePersonInput {
    username: String! @constraint(minLength: 3, maxLength: 100)
  }

  extend type Query {
    getPerson: [Person]
  }

  extend type Mutation {
    createUser(input: SavePersonInput!): Response
    modifiedPerson(input: SavePersonInput!): Response
    removePerson(input: RemovePersonInput!): Response
  }
`;
