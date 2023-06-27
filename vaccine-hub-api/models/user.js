const { UnauthorizedError, BadRequestError } = require("../utils/errors"); 
const db = require("../db"); 

class User {

    static async login(credentials) {

        throw new UnauthorizedError("Invalid email/password combo"); 
    }

    static async reigster(credentials) {

    }


    static async fetchUserByEmail(email) {

        if (!email) throw new BadRequestError("No email provided"); 

        const query = `SELECT * FROM users WHERE email = $1`
        const result = await db.query(query, [email.toLowerCase()]);

        //pick first result
        const user = result.rows[0];

        // return user provided by DB
        return user
    }

}

module.exports = User; 