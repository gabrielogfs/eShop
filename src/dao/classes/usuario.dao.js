const User = require('../models/User');

class userDAO {

    static async getUsers() {
        return await User.find();
    };

    static async getUsersbyId(id) {
        return await User.findById(id);
    };

    static async createUser(user) {
        return await User.create(user);
    };

    static async updateUser(id, updatedUser) {
        return await User.findByIdAndUpdate(id, updatedUser);
    }

    static async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    };

    static async registro() {
        return await User.registro();
    }
};

module.exports = userDAO;