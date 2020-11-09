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
const security = new Function.Security;
//console.log(security.nameVerification("Marc"));

    //////////////
    //  ROUTES  //
    //////////////

            ///////////////////
            // Create a user //
            ///////////////////

app.post("/users",async(req, res) =>
{
    await user.addUser(req,res);
});

app.listen(5000, () => 
{
    console.log("Server has started on port 5000");
});