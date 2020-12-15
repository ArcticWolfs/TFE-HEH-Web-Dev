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

        //////////////////////
        // Create a subject //
        //////////////////////

app.get("/getSubject/:employee_id",async(req, res) =>
{
    await Subject.getSubject(req,res);
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

app.get("/getClassByName/:name",async(req, res) =>
{
    await Class.getClassByName(req,res);
});

app.listen(5000, () => 
{
    console.log("Server has started on port 5000");
});
