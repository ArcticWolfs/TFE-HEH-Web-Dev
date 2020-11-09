const index = require("../index");
const pool = require("../database/db");


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

            const { class_id } = req.body;
            const { name } = req.body;
            const { surname } = req.body;
            const { birthdate } = req.body;
            const { address } = req.body;
            const { phoneNumber } = req.body;
            const { emailAddress } = req.body;
            const { password } = req.body;

            ////////////////
            //   REQUEST  //
            ////////////////

            const newUser = await pool.query(
                "INSERT INTO table_user (class_id,name,surname,birthdate,address,phoneNumber,emailAddress,password) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING * ",
                [class_id,name,surname,birthdate,address,phoneNumber,emailAddress,password]
            );

            //Allow us to see the response in postman
            res.json(newUser.rows[0]);
        }
        catch (err)
        {
            console.error("Error while creating an user" + err.message);
        }
    }



}

module.exports = User;