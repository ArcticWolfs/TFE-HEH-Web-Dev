const index = require("../index.js");
const pool = require("../database/db");

const Security = require("./Security");
const security = new Security;

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

    async createClass(req,res)
    {
        try {
            
            let { tutor_id } = req.body;
            let { name } = req.body;
            let { year } = req.body;

            name = name.trim();
            year = year.trim();
            if (await security.nameClassVerification(name,res) === false) {
                if (await security.yearClassVerification(year,res) === false) {
                    const newClass = await pool.query(
                        "INSERT INTO table_class (tutor_id, name, year) VALUES($1,$2,$3) RETURNING * ",
                        [tutor_id,name,year]
                    );
                    res.json(newClass.rows[0]);
                }
            }
        }
        catch (err) {
            console.error("Error while creating a class : " + err.message);
        }
    }

    async modifyClass(req,res)
    {
        try {
            
            let { tutor_id } = req.body;
            let { class_id } = req.body;
            let { year } = req.body;

            year = year.trim();

            if (await security.yearClassVerification(year,res) === false) {
                const updateClass = await pool.query(
                    "UPDATE table_class SET tutor_id=$1, year=$2 WHERE class_id=$3",
                    [tutor_id,year,class_id]
                );
                res.json("Class Updated");
            }
        }
        catch (err) {
            console.error("Error while modify a class : " + err.message);
        }
    }

    async deleteClass(req,res)
    {
        try
        {
            const {id} = req.params;
            const deleteClass = await pool.query("DELETE FROM table_class WHERE class_id = $1", [id]);

            res.json("Class deleted")
        }
        catch (err)
        {
            console.error("Error while deleting a Class : " + err.message)
        }
    }
}

module.exports = Class;
