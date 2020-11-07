const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database/db");


    //////////////////
    //  MIDDLEWARE  //
    //////////////////

app.use(cors());
app.use(express.json());

    //////////////
    //  ROUTES  //
    //////////////

            ///////////////////
            // Create a user //
            ///////////////////

app.post("/users",async(req, res) =>
{
    try
    {
        //Permet d'afficher la requete qui est faite au Body//
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

       //Permet de voir dans postman ce qui a été envoyé
        res.json(newUser.rows[0]);
    }
    catch (err)
    {
        console.error(err.message);
    }
});

app.listen(5000, () => 
{
    console.log("Server has started on port 5000");
});