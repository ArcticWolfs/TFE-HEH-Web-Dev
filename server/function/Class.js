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

    async getWholeClass(req, res)
    {
        try
        {
            const {class_id} = req.params;

            ////////////////
            //   REQUEST  //
            ////////////////
            try
            {
                const wholeClass = await pool.query("SELECT * FROM table_user WHERE class_id = $1", [class_id]
                )
                //Allow us to see the response in postman
                res.json(wholeClass.rows);
            }
            catch (error)
            {
                console.log("error while doing the querry" + error)
            }
        }
        catch (error)
        {
            console.log("Error while getting a whole class " + error);
        }
    }

    async getClassById(req, res)
    {
        try
        {
            const {class_id} = req.params;

            ////////////////
            //   REQUEST  //
            ////////////////
            try
            {
                const subject = await pool.query(
                    "SELECT * FROM table_class WHERE class_id = $1", [class_id]);
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

    async getAllClass(req,res)
    {
        try
        {
            const getAllClass = await pool.query("SELECT * FROM table_class");

            //Allow us to see the response in postman
            res.json(getAllClass.rows);
        }
        catch (err)
        {
            console.error("Error while getting all the class : " + err.message)
        }
    }
}

module.exports = Class;
