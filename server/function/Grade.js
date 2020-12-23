const index = require("../index.js");
const pool = require("../database/db");

class Grade
{
    constructor()
    {

    }

    async addGrade(req, res)
    {
        try {
            let {interro_id} = req.body;
            let {user_id} = req.body;
            let {grade} = req.body;
            let {total} = req.body;
            let {absent} = req.body;


            ////////////////
            //   REQUEST  //
            ////////////////
            try {
                const newGrade = await pool.query(
                    "INSERT INTO table_grade (interro_id, user_id, grade, total, absent) VALUES($1,$2,$3,$4,$5) RETURNING * ",
                    [interro_id, user_id, grade, total, absent]
                );
                //Allow us to see the response in postman
                res.json(newGrade.rows[0]);
            } catch (error) {
                console.log("error while doing the querry" + error)
            }


        }
        catch (error){
            console.log("Can't create a grade")
        }
    }

    async getGradeByInterroID(req,res)
    {
        try
        {
            let { interro_id } = req.params;

            ////////////////
            //   REQUEST  //
            ////////////////
            try
            {
                const allGrade = await pool.query("SELECT * FROM table_grade WHERE interro_id = $1", [interro_id]);
                //Allow us to see the response in postman
                res.json(allGrade.rows);
            }
            catch (error)
            {
                console.log("error while doing the querry" + error)
            }
        }
        catch (error)
        {
            console.log("Error while getting the grade ! " + error);
        }
    }

    async getGradeByID(req,res)
    {
        try
        {
            let { grade_id } = req.params;

            ////////////////
            //   REQUEST  //
            ////////////////
            try
            {
                const Grade = await pool.query("SELECT * FROM table_grade WHERE grade_id = $1", [grade_id]);
                //Allow us to see the response in postman
                res.json(Grade.rows);
            }
            catch (error)
            {
                console.log("error while doing the querry" + error)
            }
        }
        catch (error)
        {
            console.log("Error while getting the grade ! " + error);
        }
    }

    async modifyGradeByID(req, res)
    {
        try {
            let {grade_id} = req.body;
            let {grade} = req.body;
            let {total} = req.body;
            let {absent} = req.body;

            ////////////////
            //   REQUEST  //
            ////////////////
            try {
                const modifyGrade = await pool.query(
                    "UPDATE table_grade SET grade = $2, total = $3, absent = $4 WHERE grade_id = $1",
                    [grade_id, grade,total,absent]
                );
                //Allow us to see the response in postman
                res.json(modifyGrade.rows[0]);
            } catch (error) {
                console.log("error while doing the querry" + error)
            }
        }
        catch (error){
            console.log("Can't modify a grade")
        }
    }
}

module.exports = Grade;
