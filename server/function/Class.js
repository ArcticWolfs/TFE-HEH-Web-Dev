const index = require("../index.js");
const pool = require("../database/db");

class Class
{
    constructor()
    {

    }

    async getClassByEmployee(req, res)
    {
        try
        {
            const {employee_id} = req.params;

            ////////////////
            //   REQUEST  //
            ////////////////
            try
            {
                const subject = await pool.query(
                    "SELECT * FROM table_class WHERE class_id IN (SELECT class_id FROM table_intertable where employee_id = $1 )", [employee_id]);
                //Allow us to see the response in postman
                res.json(subject.rows);
            }
            catch (error)
            {
                console.log("error while doing the querry" + error)
            }
        }
        catch (error)
        {
            console.log("Error while getting a subject " + error);
        }
    }

    async getClassByName(req, res)
    {
        try
        {
            const {name} = req.params;

            ////////////////
            //   REQUEST  //
            ////////////////
            try
            {
                const subject = await pool.query(
                    "SELECT * FROM table_class WHERE name = $1", [name]);
                //Allow us to see the response in postman
                res.json(subject.rows);
            }
            catch (error)
            {
                console.log("error while doing the querry" + error)
            }
        }
        catch (error)
        {
            console.log("Error while getting a subject " + error);
        }
    }
}

module.exports = Class;
