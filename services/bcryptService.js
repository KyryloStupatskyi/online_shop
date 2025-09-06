const bcrypt = require("bcrypt");
const crypto = require("crypto");

class BcryptService {
  generateSalt(saltLength) {
    return crypto.randomBytes(saltLength).toString("hex");
  }

  async hashPassword(password, salt) {
    const pepper = process.env.PASSWORD_PEPPER;
    const passwordToHash = password + pepper + salt;
    return await bcrypt.hash(passwordToHash, 6);
  }

  async comparePassword(password, hashPassword, salt) {
    const pepper = process.env.PASSWORD_PEPPER;
    const combined = password + pepper + salt;
    return await bcrypt.compare(combined, hashPassword);
  }
}

module.exports = new BcryptService();
