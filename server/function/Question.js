const index = require("../index.js");
const pool = require("../database/db");
const securityQuestion = require("./QuestionSecurity");
const securityQuestions = new securityQuestion();

class Grade
{
    constructor()
    {

    }

    async createQuestion(req, res)
    {
        try {
            let {question} = req.body;
            let {image} = 0
            if (req.body.image !== "")
            {
                image = req.body.image;
            }
            let {subject} = req.body;
            let {time} = req.body;

            ////////////////
            //   REQUEST  //
            ////////////////
            if (!securityQuestions.questionVerification(question,res))
            {
                if (!securityQuestions.subjectVerification(subject,res))
                {
                    if (!securityQuestions.timeVerification(time,res))
                    {
                        try {
                            const newQuestion = await pool.query(
                                "INSERT INTO table_question (question,image,subject,time) VALUES($1,$2,$3,$4) RETURNING * ",
                                [question,image,subject,time]
                            );
                            //Allow us to see the response in postman
                            res.json(newQuestion.rows[0]);
                        } catch (error) {
                            console.log("error while doing the querry" + error)
                        }
                    }
                }
            }
        }
        catch (error){
            console.log("Can't create a grade")
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

module.exports = Grade;
