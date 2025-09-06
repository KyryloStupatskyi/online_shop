const { User } = require("../models/models");
const ErrorHandler = require("../utils/extra/errorHandler");
const bcryptService = require("./bcryptService");

class UserService {
  async createUser(email, hashedPassword) {
    try {
      const candidate = await User.findOne({ where: { email } });

      if (candidate) {
        throw new ErrorHandler("User with this email already exist", 400);
      }

      const salt = await bcryptService.generateSalt(6);
      const user = await User.create({ email, password: hashedPassword, salt });

      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
