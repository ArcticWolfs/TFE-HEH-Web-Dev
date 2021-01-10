const index = require("../index.js");
const pool = require("../database/db");

class JournalClass
{

    constructor()
    {

    }

    async createJournalClass(req, res)
    {
        try {
            let {class_id} = req.body;
            let {date} = req.body;
            let {hour} = req.body;
            let {activity} = req.body;

            ////////////////
            //   REQUEST  //
            ////////////////

            try {
                const newJournalClass = await pool.query(
                    "INSERT INTO table_journalclass (class_id,date,hour,activity) VALUES($1,$2,$3,$4) RETURNING * ",
                    [class_id,date,hour,activity]
                );
                //Allow us to see the response in postman
                res.json(newJournalClass.rows);
            } catch (error) {
                console.log("error while doing the querry" + error)
            }
        }
        catch (error){
            console.log("Can't create a JournalClass")
        }
    }

    async getJournalClass(req, res)
    {
        try
        {
            let {params} = req.params;
            params = params.split(".",2)
            let class_id = params[0]
            let date = params[1]
            date = date.replace("_","/")
            date = date.replace("_","/")

            ////////////////
            //   REQUEST  //
            ////////////////
            try
            {
                const getJournalClass = await pool.query(
                    "SELECT * FROM table_journalclass WHERE class_id = $1 AND date = $2", [class_id, date]);
                //Allow us to see the response in postman
                res.json(getJournalClass.rows);
            }
            catch (error)
            {
                console.log("error while doing the query" + error)
            }
        }
        catch (error)
        {
            console.log("Error while getting a journalClass " + error);
        }
    }

    async modifyJournalClass(req,res)
    {
        try
        {
            let {params} = req.params;
            params = params.split(".",3)
            let class_id = params[0]
            let date = params[1]
            date = date.replace("_","/")
            date = date.replace("_","/")
            let hour = params[2]
            let {activity} = req.body;

            const modifyJournalClass = await pool.query("UPDATE table_journalclass SET activity = $4 WHERE class_id = $1 AND date = $2 AND hour = $3", [class_id, date,hour,activity]);

            res.json("JournalClass modified")
        }
        catch (err)
        {
            console.error("Error while modify a journalCLass : " + err.message)
        }

    }

    async deleteJournalClass(req, res)
    {
        try
        {
            let {params} = req.params;
            params = params.split(".",3)
            let class_id = params[0]
            let date = params[1]
            date = date.replace("_","/")
            date = date.replace("_","/")
            let hour = params[2]

            const deleteJournalClass = await pool.query("DELETE FROM table_journalclass WHERE class_id = $1 AND date = $2 AND hour = $3", [class_id, date,hour]);

            res.json("JournalClass deleted")
        }
        catch (err)
        {
            console.error("Error while deleting a journalCLass : " + err.message)
        }
    }
}

module.exports = JournalClass;
