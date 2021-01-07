const index = require("../index.js");
const pool = require("../database/db");

class Intertable
{

    constructor()
    {

    }

    async createIntertable(req, res)
    {
        try {
            let {employee_id} = req.body;
            let {class_id} = req.body;

            ////////////////
            //   REQUEST  //
            ////////////////

            try {
                const newIntertable = await pool.query(
                    "INSERT INTO table_intertable (employee_id,class_id) VALUES($1,$2) RETURNING * ",
                    [employee_id,class_id]
                );
                //Allow us to see the response in postman
                res.json(newIntertable.rows);
            } catch (error) {
                console.log("error while doing the querry" + error)
            }
        }
        catch (error){
            console.log("Can't create an intertable")
        }
    }

    async getIntertable(req, res)
    {
        try
        {
            let {params} = req.params;
            params = params.split(".",2)
            let employee_id = params[0]
            let class_id = params[1]

            ////////////////
            //   REQUEST  //
            ////////////////
            try
            {
                const getintertable = await pool.query(
                    "SELECT * FROM table_intertable WHERE employee_id = $1 AND class_id = $2", [employee_id, class_id]);
                //Allow us to see the response in postman
                res.json(getintertable.rows);
            }
            catch (error)
            {
                console.log("error while doing the query" + error)
            }
        }
        catch (error)
        {
            console.log("Error while getting an intertable " + error);
        }
    }

    async deleteIntertable(req, res)
    {
        try
        {
            let {params} = req.params;
            params = params.split(".",2)
            let employee_id = params[0]
            let class_id = params[1]

            const deleteintertable = await pool.query("DELETE FROM table_intertable WHERE employee_id = $1 AND class_id = $2", [employee_id, class_id]);

            res.json("intertable deleted")
        }
        catch (err)
        {
            console.error("Error while deleting an intertable : " + err.message)
        }
    }
}

module.exports = Intertable;
