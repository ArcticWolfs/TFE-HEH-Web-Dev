const index = require("../index");
const pool = require("../database/db");
const Security = require("./Security");
const security = new Security;

class Employee {

    async addEmployee(req,res) {
        try {
            
            let { firstname } = req.body;
            let { lastname } = req.body;
            let { birthdate } = req.body;
            let { address } = req.body;
            let { emailAddress } = req.body;
            let oldEmail = null;
            let { phoneNumber } = req.body;
            let { password } = req.body;       
            let { functionEmployee } = req.body;
            let { isAdmin } = req.body;

            firstname = firstname.trim();
            lastname = lastname.trim();
            birthdate = birthdate.trim();
            address = address.trim();
            emailAddress = emailAddress.trim();
            emailAddress = emailAddress.toLowerCase();
            phoneNumber = phoneNumber.trim();
            password = password.trim();
            functionEmployee = functionEmployee.trim();

            if (security.firstNameVerification(firstname,res) === false) {
                if (security.lastNameVerification(lastname,res) === false) {
                    if (security.birthdateVerification(birthdate,res) === false) {
                        if (security.addressVerification(address,res) === false) {
                            if (await security.emailVerification(emailAddress,oldEmail,res,"employee") === false) {
                                if (security.phoneVerification(phoneNumber,res,"Employee") === false) {
                                    if (security.passwordVerification(password,res) === false) {
                                        if (security.adminVerification(isAdmin,res) === false) {
                                            if (security.functionEmployeeVerification(functionEmployee,res) === false) {
                                                password = await security.cryptingPassword(password);

                                                const newEmployee = await pool.query(
                                                    "INSERT INTO table_employee (firstname,lastname,birthdate,address,emailAddress,phoneNumber,password,functionEmployee,isAdmin) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING * ",
                                                    [firstname,lastname,birthdate,address,emailAddress,phoneNumber,password,functionEmployee,isAdmin]
                                                );
                                                res.json(newEmployee.rows[0]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        catch (err) {
            console.error("Error while creating an user : " + err.message);
        }
    }
}
module.exports = Employee;