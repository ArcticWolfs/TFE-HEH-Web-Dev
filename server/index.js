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
let class_id = "1";
let password = "lol";
//let surname = "Martin-Jean";
//let name = "Dupont ";
//let student = 1;
//let email = "Baptiste@gmail.com";
//let phone = "+32 494 47 35 33";
//let address = "47 Rue Saint-Donat 7110 Houdeng-Goegnies";
console.log("Class_id : " + security.classIdVerification(class_id));
console.log("Password : " + security.passwordVerification(password));
//console.log("Surname : " + security.surnameVerification(surname));
//console.log("Name : " + security.nameVerification(name));
//console.log("Student : " + security.studentVerification(student));
//console.log("Email : " + security.emailVerification(email));
//console.log("Phone : " + security.phoneVerification(phone));
//console.log("Address : " + security.addressVerification(address));



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