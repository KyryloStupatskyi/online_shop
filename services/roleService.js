const { Role } = require("../models/models");
const ErrorHandler = require("../utils/extra/errorHandler");

class RoleService {
  async createRole(roleValue) {
    try {
      const checkRole = await Role.findOne({ where: { value: roleValue } });

      if (checkRole) {
        throw new ErrorHandler("Such role already exist", 400);
      }

      const newRole = await Role.create({ value: roleValue });

      return newRole;
    } catch (error) {
      throw error;
    }
  }

  async getRoleByValue(roleValue) {
    try {
      const role = await Role.findOne({ where: { value: roleValue } });

      if (!role || role === null) {
        throw new ErrorHandler("Role not found", 404);
      }

      return role;
    } catch (error) {
      throw error;
    }
  }

  async getAllRoles() {
    try {
      const roles = await Role.findAll();

      if (!roles || roles.length === 0) {
        throw new ErrorHandler("No roles found", 404);
      }

      return roles;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new RoleService();
