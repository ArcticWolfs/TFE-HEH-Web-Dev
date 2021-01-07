const index = require("../index.js");
const pool = require("../database/db");

class Absence
{

    constructor()
    {

    }

    async createAbsence(req, res)
    {
        try {
            let {user_id} = req.body;
            let {date} = req.body;

            ////////////////
            //   REQUEST  //
            ////////////////

            try {
                const newAbsence = await pool.query(
                    "INSERT INTO table_absence (user_id,date) VALUES($1,$2) RETURNING * ",
                    [user_id,date]
                );
                //Allow us to see the response in postman
                res.json(newAbsence.rows);
            } catch (error) {
                console.log("error while doing the querry" + error)
            }
        }
        catch (error){
            console.log("Can't create an absence")
        }
    }

    async getAbsence(req, res)
    {
        try
        {
            let {params} = req.params;
            params = params.split(".",2)
            let user_id = params[0]
            let date = params[1]
            date = date.replace("_","/")
            date = date.replace("_","/")

            ////////////////
            //   REQUEST  //
            ////////////////
            try
            {
                const getAbsence = await pool.query(
                    "SELECT * FROM table_absence WHERE user_id = $1 AND date = $2", [user_id, date]);
                //Allow us to see the response in postman
                res.json(getAbsence.rows);
            }
            catch (error)
            {
                console.log("error while doing the query" + error)
            }
        }
        catch (error)
        {
            console.log("Error while getting an absence " + error);
        }
    }

    async deleteAbsence(req, res)
    {
        try
        {
            let {params} = req.params;
            params = params.split(".",2)
            let user_id = params[0]
            let date = params[1]
            date = date.replace("_","/")
            date = date.replace("_","/")

            const deleteAbsence = await pool.query("DELETE FROM table_absence WHERE user_id = $1 AND date = $2", [user_id, date]);

            res.json("Absence deleted")
        }
        catch (err)
        {
            console.error("Error while deleting an Absence : " + err.message)
        }
    }
}

module.exports = Absence;
