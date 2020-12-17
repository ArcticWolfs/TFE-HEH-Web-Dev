const index = require("../index.js");
const pool = require("../database/db");

class Subject
{
    constructor()
    {

    }

    async getSubject(req, res)
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
                    "SELECT * FROM table_subject WHERE employee_id = $1", [employee_id]);
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

    async getSubjectById(req, res)
    {
        try
        {
            const {subject_id} = req.params;

            ////////////////
            //   REQUEST  //
            ////////////////
            try
            {
                const subject = await pool.query(
                    "SELECT * FROM table_subject WHERE subject_id = $1", [subject_id]);
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

    async getSubjectByName(req, res)
    {
        try
        {
            const {employee_id} = req.body;
            const {name} = req.body;

            ////////////////
            //   REQUEST  //
            ////////////////

            try
            {
                const Subject = await pool.query(
                    "SELECT * FROM table_subject WHERE employee_id = $1 AND name = $2", [employee_id,name]);
                //Allow us to see the response in postman
                res.json(Subject.rows);
            }
            catch (error)
            {
                console.log("error while doing the querry" + error)
            }
        }
        catch (error)
        {
            console.log("Error while getting all the Subject ! " + error);
        }
    }
}

module.exports = Subject;
