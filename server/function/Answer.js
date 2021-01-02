const index = require("../index.js");
const pool = require("../database/db");
const securityQuestion = require("./QuestionSecurity");
const securityQuestions = new securityQuestion();

class Answer
{
    constructor()
    {

    }

    async createAnswer(req, res)
    {
        try {
            let {answer} = req.body;
            let {trueanswerornot} = req.body;
            let {question_id} = req.body;

            ////////////////
            //   REQUEST  //
            ////////////////

            try {
                const newAnswer = await pool.query(
                    "INSERT INTO table_answer (answer,trueanswerornot,question_id) VALUES($1,$2,$3) RETURNING * ",
                    [answer,trueanswerornot,question_id]
                );
                //Allow us to see the response in postman
                res.json(newAnswer.rows);
            } catch (error) {
                console.log("error while doing the querry" + error)
            }
        }
        catch (error){
            console.log("Can't create an answer")
        }
    }

    async getAllQuestion(req,res)
    {
        try
        {

            ////////////////
            //   REQUEST  //
            ////////////////
            try
            {
                const allGrade = await pool.query("SELECT * FROM table_question");
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
            console.log("Error while getting question ! " + error);
        }
    }

    async getQuestionByID(req,res)
    {
        try
        {
            let { question_id } = req.params;

            ////////////////
            //   REQUEST  //
            ////////////////
            try
            {
                const allGrade = await pool.query("SELECT * FROM table_question WHERE question_id = $1", [question_id]);
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
            console.log("Error while getting a question ! " + error);
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

module.exports = Answer;
