const jwt = require("jsonwebtoken");

const generarJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
      name,
    };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      { expiresIn: process.env.JWT_EXPIRES_IN },
      (err, token) => {
        if (err) {
          reject("Error al crear token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generarJWT };
