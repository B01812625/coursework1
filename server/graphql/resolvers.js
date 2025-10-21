const User = require('../models/User');

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error('Error fetching users');
      }
    },
    user: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        throw new Error('Error fetching user');
      }
    }
  },
  Mutation: {
    createUser: async (_, { name, email, age }) => {
      try {
        const user = new User({ name, email, age });
        await user.save();
        console.log("save user")
        return user;
      } catch (error) {
        throw new Error('Error creating user');
      }
    },
    updateUser: async (_, { id, name, email, age }) => {
      try {
        const user = await User.findByIdAndUpdate(
          id,
          { name, email, age },
          { new: true, runValidators: true }
        );
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        throw new Error('Error updating user');
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
          throw new Error('User not found');
        }
        return true;
      } catch (error) {
        throw new Error('Error deleting user');
      }
    }
  }
};

module.exports = resolvers;