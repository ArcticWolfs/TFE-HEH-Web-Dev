const express = require("express");
const app = express();
const cors = require("cors");
const Function = require("./function/Functions");

    //////////////////
    //  MIDDLEWARE  //
    //////////////////

app.use(cors());

app.use(express.json());

    //////////////
    //  Class  ///
    //////////////

const user = new Function.User;
const interrogation = new Function.Interrogation();
const Subject = new Function.Subject();
const Sub_Subject = new Function.Sub_Subject();
const Class = new Function.Class();
const employee = new Function.Employee;
const Grade = new Function.Grade();

     //////////
     // Test //
     //////////

const security = new Function.Security;

    //////////////
    //  ROUTES  //
    //////////////

            ///////////////////
            // Create a user //
            ///////////////////

app.post("/createUser",async(req, res) =>
{
    await user.addUser(req,res);
});

app.get("/getUser/:id", async(req, res) =>
{
    await user.getUser(req,res);
});

app.get("/getUserByEmail/:email", async(req, res) =>
{
    await user.getUserByEmail(req,res);
});

app.get("/getAllUsers", async(req, res) =>
{
    await user.getAllUser(req,res);
});

app.put("/modifyUser/:id", async(req, res) =>
{
    await user.modifyUser(req,res);
});

app.delete("/deleteUser/:id", async(req,res) =>
{
    await user.deleteUser(req,res);
});

app.post("/connect", async(req,res) =>
{
    await security.connectVerification(req,res);
});

        ///////////////////
        // Create a test //
        ///////////////////

app.post("/createInterro",async(req, res) =>
{
    await interrogation.addInterro(req,res);
});

app.get("/getInterro/:employee_id",async(req, res) =>
{
    await interrogation.getAllInterroForAnEmployee(req,res);
});

app.get("/getInterroFiltered/:employee_id",async(req, res) =>
{
    await interrogation.getInterroFiltered(req,res);
});

app.get("/getInterroByID/:interro_id",async(req, res) =>
{
    await interrogation.getInterroByID(req,res);
});

app.put("/modifyInterro",async(req, res) =>
{
    await interrogation.modifyInterro(req,res);
});

app.get("/getInterroId",async(req, res) =>
{
    await interrogation.getInterroID(req,res);
});

        ///////////////////
        // Create a Grade //
        ///////////////////

app.post("/addGrade",async(req, res) =>
{
    await Grade.addGrade(req,res);
});

app.get("/getGradeByInterroID/:interro_id",async(req, res) =>
{
    await Grade.getGradeByInterroID(req,res);
});


        //////////////////////
        // Create a subject //
        //////////////////////

app.get("/getSubject/:employee_id",async(req, res) =>
{
    await Subject.getSubject(req,res);
});

app.get("/getSubjectById/:subject_id",async(req, res) =>
{
    await Subject.getSubjectById(req,res);
});

app.post("/getSubjectByName",async(req, res) =>
{
    await Subject.getSubjectByName(req,res);
});

        //////////////////////////
        // Create a sub subject //
        //////////////////////////

app.get("/getSubSubject/:subject_id",async(req, res) =>
{
    await Sub_Subject.getSubSubject(req,res);
});

app.get("/getSubSubjectByNameOnly",async(req, res) =>
{
    await Sub_Subject.getSubSubjectByNameOnly(req,res);
});

app.get("/getSubSubjectById/:sub_subject_id",async(req, res) =>
{
    await Sub_Subject.getSubSubjectById(req,res);
});

app.post("/getSubSubjectByName",async(req, res) =>
{
    await Sub_Subject.getSubSubjectByName(req,res);
});

        //////////////////////
        // Create a class ////
        //////////////////////

app.get("/getClass/:employee_id",async(req, res) =>
{
    await Class.getClassByEmployee(req,res);
});

app.get("/getClassById/:class_id",async(req, res) =>
{
    await Class.getClassById(req,res);
});

app.get("/getClassByName/:name",async(req, res) =>
{
    await Class.getClassByName(req,res);
});

app.get("/getWholeClass/:class_id",async(req, res) =>
{
    await Class.getWholeClass(req,res);
});

        //////////////////////////
        // Create an employee ////
        //////////////////////////

app.post("/createEmployee",async(req, res) =>
{
    await employee.addEmployee(req,res);
});

app.get("/getEmployee/:id", async(req, res) =>
{
    await employee.getEmployee(req,res);
});

app.get("/getEmployeeByEmail/:email", async(req, res) =>
{
    await employee.getEmployeeByEmail(req,res);
});

app.get("/getAllEmployees", async(req, res) =>
{
    await employee.getAllEmployees(req,res);
});

app.put("/modifyEmployee/:id", async(req, res) =>
{
    await employee.modifyEmployee(req,res);
});

app.delete("/deleteEmployee/:id", async(req,res) =>
{
    await employee.deleteEmployee(req,res);
});

app.listen(5000, () => 
{
    console.log("Server has started on port 5000");
});
