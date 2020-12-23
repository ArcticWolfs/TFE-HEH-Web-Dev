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
                        res.json(newInterro.rows);
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

    async getAllInterroForAnEmployee(req,res)
    {
        try
        {
            let { employee_id } = req.params;

                ////////////////
                //   REQUEST  //
                ////////////////
                try
                {
                    const allInterro = await pool.query("SELECT * FROM table_interro WHERE employee_id = $1", [employee_id]);
                    //Allow us to see the response in postman
                    res.json(allInterro.rows);
                }
                catch (error)
                {
                    console.log("error while doing the querry" + error)
                }
        }
        catch (error)
        {
            console.log("Error while creating an interro ! " + error);
        }
    }

    async getInterroID(req,res)
    {
        try
        {
            let { employee_id } = req.body;
            let {class_id} = req.body;
            let {name} = req.body;

            ////////////////
            //   REQUEST  //
            ////////////////
            try
            {
                const interroID = await pool.query(
                    "SELECT interro_id FROM table_interro WHERE class_id = $1 AND name = $2 AND employee_id = $3",
                    [class_id,name,employee_id]
                )
                res.json(interroID.rows);
            }
            catch (error)
            {
                console.log("error while doing the querry" + error)
            }
        }
        catch (error)
        {
            console.log("Error while getting the id of an interro ! " + error);
        }
    }

    async getInterroFiltered(req,res)
    {
        try
        {
            let { employee_id } = req.params;
            let { subject_id } = req.body;
            let { sub_subject_id } = req.body;

            ////////////////
            //   REQUEST  //
            ////////////////
            try
            {
                const interroFiltered = await pool.query("SELECT * FROM table_interro WHERE employee_id = $1 AND subject_id = $2 AND sub_subject_id = $3", [employee_id,subject_id,sub_subject_id]);
                //Allow us to see the response in postman
                res.json(interroFiltered.rows);
            }
            catch (error)
            {
                console.log("error while doing the querry" + error)
            }
        }
        catch (error)
        {
            console.log("Error while creating an interro ! " + error);
        }
    }

    async getInterroByID(req,res)
    {
        try
        {
            let { interro_id } = req.params;

            ////////////////
            //   REQUEST  //
            ////////////////
            try
            {
                const interro = await pool.query("SELECT * FROM table_interro WHERE interro_id = $1", [interro_id]);
                //Allow us to see the response in postman
                res.json(interro.rows);
            }
            catch (error)
            {
                console.log("error while doing the querry" + error)
            }
        }
        catch (error)
        {
            console.log("Error while modifying an interro ! " + error);
        }
    }

    async deleteInterroByID(req,res)
    {
        try
        {
            let { interro_id } = req.params;

            ////////////////
            //   REQUEST  //
            ////////////////
            try
            {
                const deleteInterro = await pool.query("DELETE FROM table_interro WHERE interro_id = $1", [interro_id]);
                const deleteGrade = await pool.query("DELETE FROM table_grade WHERE interro_id = $1", [interro_id]);
                //Allow us to see the response in postman
                res.json("Deleted");
            }
            catch (error)
            {
                console.log("error while doing the querry" + error)
            }
        }
        catch (error)
        {
            console.log("Error while modifying an interro ! " + error);
        }
    }

    async modifyInterro(req,res)
    {
        try
        {
            let { interro_id } = req.body;
            let { employee_id } = req.body;
            let { name } = req.body;
            let { total } = req.body;
            let { subject_id } = req.body;
            let { sub_subject_id } = req.body;
            let { class_id } = req.body;

            ////////////////
            //   REQUEST  //
            ////////////////
            try
            {
                const interro = await pool.query("UPDATE table_interro SET name = $1, total = $2, subject_id = $3, sub_subject_id = $4, class_id = $5 WHERE interro_id = $6 AND employee_id = $7", [name,total,subject_id,sub_subject_id,class_id,interro_id,employee_id]);
                //Allow us to see the response in postman
                res.json(interro.rows);
            }
            catch (error)
            {
                console.log("error while doing the querry" + error)
            }
        }
        catch (error)
        {
            console.log("Error while modifying an interro ! " + error);
        }
    }


}

module.exports = Interrogation;
