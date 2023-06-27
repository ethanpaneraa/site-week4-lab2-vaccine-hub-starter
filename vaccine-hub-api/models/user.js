const { UnauthorizedError, BadRequestError } = require("../utils/errors"); 
const bcrypt = require('bcrypt');
const db = require("../db"); 
const { hash } = require("bcrypt");

class User {


    static makePublicUser(user) {
        return {
            id: user.id,
            firstName : user.firstName, 
            lastName: user.lastName, 
            email : user.email, 
            location : user.location, 
            data : user.date, 
        }
    }

    static async fetchUserByEmail(email) {

        if (!email) throw new BadRequestError("No email provided"); 

        const query = `SELECT * FROM users WHERE email = $1`
        const result = await db.query(query, [email.toLowerCase()]);

        //pick first result
        const user = result.rows[0];

        return user
    }

    static async register(credentials) {

        const requiredUserData = ["firstName", "secondName", "email", "password", "location"]; 
        requiredUserData.forEach((field) => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body!`)
            }
        })

        if (credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError("Email is invalid, please type in a correct email:", credentials.email)
        }

        const doesUserExist = await User.fetchUserByEmail(credentials.email); 

        if (doesUserExist) {
            throw new BadRequestError(`Email ${credentials.email} already exists`); 
        }

        const hashedUserPassword = await bcrypt.compare(credentials.password, 10); 

        const lowerCasedUserEmail = credentials.email.toLowerCase(); 

        const newUser = await db.query( 
            `INSERT INTO users (
                email,
                password,
                first_name,
                last_name,
                location,
                data
            )
            
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, email, first_name, last_name, location, data;`, 
            [lowerCasedUserEmail, hashedUserPassword, credentials.firstName, credentials.lastName, credentials.location, credentials.data]
        );

        const user = newUser.rows[0]; 

        return this.makePublicUser(user); 
        

    }

}

module.exports = User; 