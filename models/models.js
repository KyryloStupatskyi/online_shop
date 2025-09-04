const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbConnection");

const User = sequelize.define("users", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  salt: { type: DataTypes.STRING, allowNull: false, unique: true },
  avatarUrl: { type: DataTypes.STRING, allowNull: true },
});

const Role = sequelize.define("roles", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const UserRoles = sequelize.define("user_roles");

Role.belongsToMany(User, { through: UserRoles });
User.belongsToMany(Role, { through: UserRoles });

module.exports = {
  User,
  Role,
};
