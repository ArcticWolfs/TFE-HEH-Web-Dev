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
            //   CONST  //
            //////////////

            let { class_id } = req.body;
            let { name } = req.body;
            let { surname } = req.body;
            let { address } = req.body;
            let { emailAddress } = req.body;
            let { password } = req.body;
            let { student } = req.body;
            let { phoneNumberTutor1 } = req.body;
            let { phoneNumberTutor2 } = req.body;

            /////////////////
            //   Security  //
            /////////////////

            let testOk = false;

            if (security.nameVerification(name) === false)
            {
                if (security.surnameVerification(surname) === false)
                {
                    if (security.addressVerification(address) === false)
                    {
                        if (security.emailVerification(emailAddress) === false)
                        {
                            if (security.passwordVerification(password) === false)
                            {
                                if (security.studentVerification(student) === false)
                                {
                                    if (security.phoneVerification(phoneNumberTutor1) === false)
                                    {
                                        if (security.phoneVerification(phoneNumberTutor2) === false)
                                        {
                                            if (security.classIdVerification(class_id) === false)
                                            {
                                                testOk = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            ////////////////
            //   REQUEST  //
            ////////////////

            if (testOk === true)
            {
                const newUser = await pool.query(
                    "INSERT INTO table_user (class_id,name,surname,address,emailAddress,password,student,phoneNumberTutor1,phoneNumberTutor2) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING * ",
                    [class_id,name,surname,address,emailAddress,password,student,phoneNumberTutor1,phoneNumberTutor2]
                );

                //Allow us to see the response in postman
                res.json(newUser.rows[0]);
            }
            else
            {
                console.log("Bad character detected aborting the query, please try again!")
            }
        }
        catch (err)
        {
            console.error("Error while creating an user" + err.message);
        }
    }
}

module.exports = User;
