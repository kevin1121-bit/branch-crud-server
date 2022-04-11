const { Person } = require("../db");
const fs = require("fs");
const { finished } = require("stream/promises");

const resolvers = {
  Query: {
    getPerson: async (_) => {
      try {
        const findPerson = await Person.find(
          {},
          { username: 1, password: 1, firstName: 1, lastName: 1, image: 1 }
        ).exec();
        if (findPerson) {
          return findPerson.map((re) => {
            return {
              ...re._doc,
            };
          });
        } else {
          throw new Error("Error, empty");
        }
      } catch (err) {
        return err;
      }
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        let result = {
          message: "",
          status: false,
        };
        const findPersonEquals = await Person.findOne(
          { username: input.username },
          { username: 1 }
        ).exec();
        if (findPersonEquals) {
          result.status = false;
          result.message = "User already exists";
        } else {
          const file = input.image;
          let newFileName = "";
          if (file) {
            const { filename, createReadStream } = await file.file;
            const fileStream = createReadStream();
            let extension = filename.split(".").pop();
            newFileName = `${input.username}.${extension}`;
            const out = fs.createWriteStream(
              `files/imageProfile/${newFileName}`
            );
            fileStream.pipe(out);
            await finished(out);
          } else {
            newFileName = "default_1.jpg";
          }
          const personSchema = new Person({
            username: input.username,
            password: input.password,
            firstName: input.firstName,
            lastName: input.lastName,
            image: newFileName,
          });
          const savePersonSchema = personSchema.save();
          if (savePersonSchema) {
            result.message = "successfully";
            result.status = true;
          } else {
            throw new Error("Imposilble update");
          }
        }
        return result;
      } catch (err) {
        return err;
      }
    },
    modifiedPerson: async (_, { input }) => {
      try {
        let results = { message: "", status: false, error: "" };
        const file = input.image;
        let newFileName = undefined;
        if (file) {
          const { filename, createReadStream } = await file.file;
          const fileStream = createReadStream();
          let extension = filename.split(".").pop();
          newFileName = `${input.username}.${extension}`;
          const out = fs.createWriteStream(`files/imageProfile/${newFileName}`);
          fileStream.pipe(out);
          await finished(out);
        }
        if (newFileName) {
          const updatePerson = await Person.updateOne(
            { username: input.username },
            {
              $set: {
                firstName: input.firstName,
                lastName: input.lastName,
                password: input.password,
                image: newFileName,
              },
            }
          ).exec();
          if (updatePerson) {
            results.message = "successfully";
            results.status = true;
          } else {
            throw new Error("Imposible update");
          }
        } else {
          const updatePerson = await Person.updateOne(
            { username: input.username },
            {
              $set: {
                firstName: input.firstName,
                lastName: input.lastName,
                password: input.password,
              },
            }
          ).exec();
          if (updatePerson) {
            results.message = "successfully";
            results.status = true;
          } else {
            throw new Error("Imposible update");
          }
        }

        return results;
      } catch (err) {
        return err;
      }
    },
    removePerson: async (_, { input }) => {
      try {
        let results = { message: "", status: false };
        const personRemove = await Person.deleteMany({
          username: input.username,
        }).exec();
        if (personRemove) {
          results.message = "Successfully";
          results.status = true;
        } else {
          throw new Error("Remove imposible");
        }
        return results;
      } catch (err) {
        return err;
      }
    },
  },
};

module.exports = resolvers;
