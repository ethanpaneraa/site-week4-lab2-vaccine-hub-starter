const { UnauthorizedError } = require("../utils/errors"); 

class User {

    static async login(credentials) {



        throw new UnauthorizedError("Invalid email/password combo"); 
    }

    static async reigster(credentials) {



    }
}

module.exports = User; 