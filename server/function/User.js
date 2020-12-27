const index = require("../index");
const pool = require("../database/db");
const Security = require("./Security");
const security = new Security;

class User
{
    constructor()
    {

    }

    async addUser(req,res)
    {
        try
        {
            //Allow us to see the request in the console log
            //console.log(req.body);

            //////////////
            //    Var   //
            //////////////

            let { lastname } = req.body;
            let { firstname } = req.body;
            let { address } = req.body;
            let { emailAddress } = req.body;
            let oldEmail = null;
            let { password } = req.body;
            let { student } = req.body;
            let { phoneNumberTutor1 } = req.body;
            let { phoneNumberTutor2 } = req.body;
            let { emailTutor1 } = req.body;
            let { emailTutor2 } = req.body;

            if (student === 1 || student === true || student === "1")
            {
                try
                {
                    //////////////
                    //   TRIM   //
                    //////////////
                    phoneNumberTutor1 = phoneNumberTutor1.trim();
                    phoneNumberTutor2 = phoneNumberTutor2.trim();
                    emailTutor1 = emailTutor1.trim();
                    emailTutor2 = emailTutor2.trim();
                    emailTutor1 = emailTutor1.toLowerCase();
                    emailTutor2 = emailTutor2.toLowerCase();
                }
                catch (error)
                {
                    console.log("trying to trim nonexistent data");
                }
            }

            firstname = firstname.trim();
            lastname = lastname.trim();
            address = address.trim();
            emailAddress = emailAddress.trim();
            emailAddress = emailAddress.toLowerCase();
            password = password.trim();

            /////////////////
            //   Security  //
            /////////////////

            if (security.firstNameVerification(firstname,res) === false)
            {
                if (security.lastNameVerification(lastname,res) === false)
                {
                    if (security.addressVerification(address,res) === false)
                    {
                        if (await security.emailVerification(emailAddress,oldEmail,res,"student") === false)
                        {
                            if (security.passwordVerification(password,res) === false)
                            {
                                if (security.studentVerification(student,res) === false)
                                {
                                    if (student === 1 || student === true || student === "1")
                                    {
                                        if (security.phoneVerification(phoneNumberTutor1,res,"parent") === false)
                                        {
                                            if (security.phoneVerification(phoneNumberTutor2,res,"parent2") === false)
                                            {
                                                if (await security.emailVerification(emailTutor1,oldEmail,res,"parent") === false)
                                                {
                                                    if (await security.emailVerification(emailTutor2,oldEmail,res,"parent2") === false)
                                                    {
                                                        ////////////////
                                                        //   REQUEST  //
                                                        ////////////////

                                                        password = await security.cryptingPassword(password);

                                                        const newUser = await pool.query(
                                                            "INSERT INTO table_user (firstname,lastname,address,emailaddress,password,student,phonenumbertutor1,phonenumbertutor2,emailtutor1,emailtutor2) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING * ",
                                                            [firstname,lastname,address,emailAddress,password,student,phoneNumberTutor1,phoneNumberTutor2,emailTutor1,emailTutor2]
                                                        );
                                                        //Allow us to see the response in postman
                                                        res.json(newUser.rows[0]);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else
                                    {
                                        emailTutor1 = "undefined";
                                        emailTutor2 = "undefined";
                                        phoneNumberTutor1 = "undefined";
                                        phoneNumberTutor2 = "undefined";
                                        password = await security.cryptingPassword(password);

                                        ////////////////
                                        //   REQUEST  //
                                        ////////////////

                                        const newUser = await pool.query(
                                            "INSERT INTO table_user (firstname,lastname,address,emailaddress,password,student) VALUES($1,$2,$3,$4,$5,$6) RETURNING * ",
                                            [firstname,lastname,address,emailAddress,password,student]
                                        );
                                        //Allow us to see the response in postman
                                        res.json(newUser.rows[0]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        catch (err)
        {
            console.error("Error while creating an user : " + err.message);
        }
    }

    async getUser(req,res)
    {
        try
        {
            const {id} = req.params;
            const getUser = await pool.query("SELECT * FROM table_user WHERE user_id = $1", [id]);
            res.json(getUser.rows[0]);
        }
        catch (err)
        {
            console.error("Error while getting the user with a specific ID : " + err.message)
        }
    }

    async getUserByEmail(req,res)
    {
        try
        {
            const {email} = req.params;
            const getUser = await pool.query("SELECT * FROM table_user WHERE emailaddress = $1", [email]);
            res.json(getUser.rows);
        }
        catch (err)
        {
            console.error("Error while getting the user with a specific email : " + err.message)
        }
    }

    async getAllUser(req, res)
    {
        try
        {
            const getAllUsers = await pool.query("SELECT * FROM table_user");

            //Allow us to see the response in postman
            res.json(getAllUsers.rows);
        }
        catch (err)
        {
            console.error("Error while getting all the user : " + err.message)
        }
    }

    async modifyUser(req,res)
    {
        try
        {
            let { id } = req.params;
            let { firstname } = req.body;
            let { lastname } = req.body;
            let { address } = req.body;
            let { emailAddress } = req.body;
            let { oldEmail} = req.body;
            let { password } = req.body;
            let { student } = req.body;
            let { phoneNumberTutor1 } = req.body;
            let { phoneNumberTutor2 } = req.body;
            let { emailTutor1 } = req.body;
            let { emailTutor2 } = req.body;

            if (student === 1 || student === true || student === "1")
            {
                try
                {
                    //////////////
                    //   TRIM   //
                    //////////////
                    phoneNumberTutor1 = phoneNumberTutor1.trim();
                    phoneNumberTutor2 = phoneNumberTutor2.trim();
                    emailTutor1 = emailTutor1.trim();
                    emailTutor2 = emailTutor2.trim();
                    emailTutor1 = emailTutor1.toLowerCase();
                    emailTutor2 = emailTutor2.toLowerCase();
                }
                catch (error)
                {
                    console.log("trying to trim nonexistent data");
                }
            }

            firstname = firstname.trim();
            lastname = lastname.trim();
            address = address.trim();
            emailAddress = emailAddress.trim();
            emailAddress = emailAddress.toLowerCase();
            password = password.trim();

            /////////////////
            //   Security  //
            /////////////////

            if (security.firstNameVerification(firstname,res) === false)
            {
                if (security.lastNameVerification(lastname,res) === false)
                {
                    if (security.addressVerification(address,res) === false)
                    {
                        if (await security.emailVerification(emailAddress,oldEmail,res,"student") === false)
                        {
                            if (security.passwordVerification(password,res) === false)
                            {
                                if (security.studentVerification(student,res) === false)
                                {
                                    if (student === 1 || student === true || student === "1")
                                    {
                                        if (security.phoneVerification(phoneNumberTutor1,res,"parent") === false)
                                        {
                                            if (security.phoneVerification(phoneNumberTutor2,res,"parent2") === false)
                                            {
                                                if (await security.emailVerification(emailTutor1,oldEmail,res,"parent") === false)
                                                {
                                                    if (await security.emailVerification(emailTutor2,oldEmail,res,"parent2") === false)
                                                    {
                                                        ////////////////
                                                        //   REQUEST  //
                                                        ////////////////

                                                        password = await security.cryptingPassword(password,res);

                                                        const updateUser = await pool.query(
                                                            "UPDATE table_user SET firstname = $1, lastname = $2, address = $3, emailaddress = $4, password = $5, student = $6, phonenumbertutor1 = $7, phonenumbertutor2 = $8, emailtutor1 = $9, emailtutor2 = $10 WHERE user_id = $11",
                                                            [firstname,lastname,address,emailAddress,password,student,phoneNumberTutor1,phoneNumberTutor2,emailTutor1,emailTutor2,id]
                                                        );

                                                        //Allow us to see the response in postman
                                                        res.json("User Updated");
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else
                                    {
                                        emailTutor1 = "undefined";
                                        emailTutor2 = "undefined";
                                        phoneNumberTutor1 = "undefined";
                                        phoneNumberTutor2 = "undefined";
                                        password = await security.cryptingPassword(password,res);

                                        ////////////////
                                        //   REQUEST  //
                                        ////////////////

                                        const updateUser = await pool.query(
                                            "UPDATE table_user SET firstname = $1, lastname = $2, address = $3, emailaddress = $4, password = $5, student = $6 WHERE user_id = $7",
                                            [firstname,lastname,address,emailAddress,password,student,id]
                                        );

                                        //Allow us to see the response in postman
                                        res.json("User Updated");
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        catch (err)
        {
            console.error("Error while modifying an user : " + err.message)
        }
    }

    async modifyUser_admin(req,res)
    {
        try
        {
            let { id } = req.params;
            let { firstname } = req.body;
            let { lastname } = req.body;
            let { address } = req.body;
            let { student } = req.body;
            let { phoneNumberTutor1 } = req.body;
            let { phoneNumberTutor2 } = req.body;
            let { emailTutor1 } = req.body;
            let { emailTutor2 } = req.body;
            
            if (student === 1 || student === true || student === "1")
            {
                try
                {
                    //////////////
                    //   TRIM   //
                    //////////////
                    phoneNumberTutor1 = phoneNumberTutor1.trim();
                    phoneNumberTutor2 = phoneNumberTutor2.trim();
                    emailTutor1 = emailTutor1.trim();
                    emailTutor2 = emailTutor2.trim();
                    emailTutor1 = emailTutor1.toLowerCase();
                    emailTutor2 = emailTutor2.toLowerCase();
                }
                catch (error)
                {
                    console.log("trying to trim nonexistent data");
                }
            }

            firstname = firstname.trim();
            lastname = lastname.trim();
            address = address.trim();

            /////////////////
            //   Security  //
            /////////////////

            if (security.firstNameVerification(firstname,res) === false)
            {
                if (security.lastNameVerification(lastname,res) === false)
                {
                    if (security.addressVerification(address,res) === false)
                    {
                        if (security.studentVerification(student,res) === false)
                        {
                            if (student === 1 || student === true || student === "1")
                            {
                                if (security.phoneVerification(phoneNumberTutor1,res,"parent") === false)
                                {
                                    if (security.phoneVerification(phoneNumberTutor2,res,"parent2") === false)
                                    {
                                        let oldEmail="noemail";
                                        if (await security.emailVerification(emailTutor1,oldEmail,res,"parent") === false)
                                        {
                                            if (await security.emailVerification(emailTutor2,oldEmail,res,"parent2") === false)
                                            {
                                                ////////////////
                                                //   REQUEST  //
                                                ////////////////

                                                const updateUser = await pool.query(
                                                    "UPDATE table_user SET firstname = $1, lastname = $2, address = $3, student = $4, phonenumbertutor1 = $5, phonenumbertutor2 = $6, emailtutor1 = $7, emailtutor2 = $8 WHERE user_id = $9",
                                                    [firstname,lastname,address,student,phoneNumberTutor1,phoneNumberTutor2,emailTutor1,emailTutor2,id]
                                                );

                                                //Allow us to see the response in postman
                                                res.json("User Updated");
                                            }
                                        }
                                    }
                                }
                            }
                            else
                            {
                                emailTutor1 = "undefined";
                                emailTutor2 = "undefined";
                                phoneNumberTutor1 = "undefined";
                                phoneNumberTutor2 = "undefined";

                                ////////////////
                                //   REQUEST  //
                                ////////////////

                                const updateUser = await pool.query(
                                    "UPDATE table_user SET firstname = $1, lastname = $2, address = $3, student = $4 WHERE user_id = $5",
                                    [firstname,lastname,address,student,id]
                                );

                                //Allow us to see the response in postman
                                res.json("User Updated");
                            }
                        }

                    }
                }
            }
        }
        catch (err)
        {
            console.error("Error while modifying an user : " + err.message)
        }
    }

    async deleteUser(req,res)
    {
        try
        {
            const {id} = req.params;
            const deleteUser = await pool.query("DELETE FROM table_user WHERE user_id = $1", [id]);

            res.json("User deleted")
        }
        catch (err)
        {
            console.error("Error while deleting an user : " + err.message)
        }
    }
}
module.exports = User;
