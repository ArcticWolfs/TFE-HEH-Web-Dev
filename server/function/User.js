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
            password = password.trim();

            /////////////////
            //   Security  //
            /////////////////

            let testOk = false;

            if (security.firstNameVerification(firstname) === false)
            {
                if (security.lastNameVerification(lastname) === false)
                {
                    if (security.addressVerification(address) === false)
                    {
                        if (security.emailVerification(emailAddress) === false)
                        {
                            if (security.passwordVerification(password) === false)
                            {
                                if (security.studentVerification(student) === false)
                                {
                                    if (student === 1 || student === true || student === "1")
                                    {
                                        if (security.phoneVerification(phoneNumberTutor1) === false)
                                        {
                                            if (security.phoneVerification(phoneNumberTutor2) === false)
                                            {
                                                if (security.emailVerification(emailTutor1) === false)
                                                {
                                                    if (security.emailVerification(emailTutor2) === false)
                                                    {
                                                        testOk = true;
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
                                        testOk = true;
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
                if (student === 1 || student === true || student === "1")
                {
                    const newUser = await pool.query(
                        "INSERT INTO table_user (firstname,lastname,address,emailaddress,password,student,phonenumbertutor1,phonenumbertutor2,emailtutor1,emailtutor2) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING * ",
                        [firstname,lastname,address,emailAddress,password,student,phoneNumberTutor1,phoneNumberTutor2,emailTutor1,emailTutor2]
                    );
                    //Allow us to see the response in postman
                    res.json(newUser.rows[0]);
                }
                else
                {
                    const newUser = await pool.query(
                        "INSERT INTO table_user (firstname,lastname,address,emailaddress,password,student) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING * ",
                        [firstname,lastname,address,emailAddress,password,student]
                    );
                    //Allow us to see the response in postman
                    res.json(newUser.rows[0]);
                }
            }
            else
            {
                console.log("Bad character detected aborting the query, please try again!");
            }
        }
        catch (err)
        {
            console.error("Error while creating an user" + err.message);
        }
    }
}

module.exports = User;
