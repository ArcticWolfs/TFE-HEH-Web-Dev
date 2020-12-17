const index = require("../index.js");
const pool = require("../database/db");

class Subject
{
    constructor()
    {

    }

    async getSubSubject(req, res)
    {
        try
        {
            const {subject_id} = req.params;

            ////////////////
            //   REQUEST  //
            ////////////////
            try
            {
                const subSubject = await pool.query(
                    "SELECT * FROM table_subsubject WHERE subject_id = $1", [subject_id]);
                //Allow us to see the response in postman
                res.json(subSubject.rows);
            }
            catch (error)
            {
                console.log("error while doing the querry" + error)
            }
        }
        catch (error)
        {
            console.log("Error while getting all the subSubject ! " + error);
        }
    }

    async getSubSubjectById(req, res)
    {
        try
        {
            const {sub_subject_id} = req.params;

            ////////////////
            //   REQUEST  //
            ////////////////
            try
            {
                const subSubject = await pool.query(
                    "SELECT * FROM table_subsubject WHERE sub_subject_id = $1", [sub_subject_id]);
                //Allow us to see the response in postman
                res.json(subSubject.rows);
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

    async getSubSubjectByNameOnly(req, res) {
        try {
            const {subject_id} = req.body;
            const {sub_subject_name} = req.body;

            ////////////////
            //   REQUEST  //
            ////////////////
            try {
                const subSubject = await pool.query(
                    "SELECT * FROM table_subsubject WHERE subject_id = $1 AND sub_subject_name = $2", [subject_id, sub_subject_name]);
                //Allow us to see the response in postman
                res.json(subSubject.rows);
            } catch (error) {
                console.log("error while doing the querry" + error)
            }
        } catch (error) {
            console.log("Error while getting all the subSubject ! " + error);
        }

    }


    async getSubSubjectByName(req, res)
    {
        try
        {
            const {subject_id} = req.body;
            const {sub_subject_name} = req.body;

            ////////////////
            //   REQUEST  //
            ////////////////
            try
            {
                const subSubject = await pool.query(
                    "SELECT * FROM table_subsubject WHERE subject_id = $1 AND sub_subject_name = $2", [subject_id,sub_subject_name]);
                //Allow us to see the response in postman
                res.json(subSubject.rows);
            }
            catch (error)
            {
                console.log("error while doing the querry" + error)
            }
        }
        catch (error)
        {
            console.log("Error while getting all the subSubject ! " + error);
        }
    }
}

module.exports = Subject;
