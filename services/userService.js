const { User } = require("../models/models");
const ErrorHandler = require("../utils/extra/errorHandler");
const bcryptService = require("./bcryptService");
const roleService = require("./roleService");

class UserService {
  async createUser(email, password) {
    try {
      const candidate = await User.findOne({ where: { email } });

      if (candidate) {
        throw new ErrorHandler("User with this email already exist", 400);
      }

      const salt = bcryptService.generateSalt(6);
      const hashedPassword = await bcryptService.hashPassword(password, salt);

      const role = await roleService.getRoleByValue("USER");
      const user = await User.create({ email, password: hashedPassword, salt });

      await user.setRoles(role);

      return { user, role };
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ where: { email }, include: ["roles"] });

      if (!user) {
        throw new ErrorHandler("User with this email does not exist", 404);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const user = await User.findByPk(userId, { include: ["roles"] });

      if (!user) {
        throw new ErrorHandler("User with this userId does not exist", 404);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUserPassword(oldPassword, newPassword, user) {
    try {
      const dbUser = await this.getUserById(user.id);
      const validatePassword = await bcryptService.comparePassword(oldPassword, dbUser.password, dbUser.salt);

      if (!validatePassword) {
        throw new ErrorHandler("Current password is incorrect, please try again!", 400);
      }

      const newSalt = bcryptService.generateSalt(6);
      const newHashedPassword = await bcryptService.hashPassword(newPassword, newSalt);

      dbUser.password = newHashedPassword;
      dbUser.salt = newSalt;

      await dbUser.save();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
