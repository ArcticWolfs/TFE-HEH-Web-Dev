const index = require("../index.js");
const InterroSecurity = require("./InterroSecurity");
const security = new InterroSecurity;
const pool = require("../database/db");

class Interrogation
{
    constructor()
    {

    }

    async addInterro(req, res)
    {
        try
        {
            let { employee_id } = req.body;
            let { subject_id } = req.body;
            let { sub_subject_id} = req.body;
            let { class_id } = req.body;
            let { name } = req.body;
            let { total } = req.body;


                //////////////
                //   TRIM   //
                //////////////

            name = name.trim();

            if (security.nameVerification(name, res) === false)
            {
                if (security.totalVerification(total, res) === false)
                {
                    ////////////////
                    //   REQUEST  //
                    ////////////////
                    try
                    {
                        const newInterro = await pool.query(
                            "INSERT INTO table_interro (employee_id,class_id,subject_id,sub_subject_id,name,total) VALUES($1,$2,$3,$4,$5,$6) RETURNING * ",
                            [employee_id,class_id,subject_id,sub_subject_id,name,total]
                        );
                        //Allow us to see the response in postman
                        res.json(newInterro.rows[0]);
                    }
                    catch (error)
                    {
                        console.log("error while doing the querry" + error)
                    }
                }
            }
        }
        catch (error)
        {
            console.log("Error while creating an interro ! " + error);
        }

    }
}

module.exports = Interrogation;
