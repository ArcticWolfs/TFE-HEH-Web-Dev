const express = require("express");
const session = require("express-session");
const app = express();
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const Function = require("./function/Functions");

    //////////////////
    //  MIDDLEWARE  //
    //////////////////

app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session(
    {
        secret: "159753",
        resave: true,
        saveUninitialized: true
    }
));

app.use(cookieParser("159753"))

    //////////////
    //  Class  ///
    //////////////

const user = new Function.User;
const employee = new Function.Employee;

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
})

app.listen(5000, () => 
{
    console.log("Server has started on port 5000");
});

app.post("/createEmployee",async(req, res) =>
{
    await employee.addEmployee(req,res);
});