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

app.listen(5000, () => 
{
    console.log("Server has started on port 5000");
});