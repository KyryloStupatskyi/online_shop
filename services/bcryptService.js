const bcrypt = require("bcrypt");

class BcryptService {
  async generateSalt(rounds = 6) {
    return await bcrypt.genSalt(rounds);
  }

  async hashPassword(password, salt) {
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(password, hashPassword) {
    return await bcrypt.compare(password, hashPassword);
  }
}

module.exports = new BcryptService();
