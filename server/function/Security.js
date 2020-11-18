const bcrypt = require("bcrypt");
const pool = require("../database/db");
const LowerCase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const UpperCase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const AllLetters = LowerCase.concat(UpperCase);
const SpecialLetters = ["â","ä","à","á","é","è","ë","ê","ç","û","ü","ù","ú","ï","î","ö","ô"];
const Numbers = ["0","1","2","3","4","5","6","7","8","9"];
const saltRounds = 10;

class Security
{
    constructor()
    {

    }

    classIdVerification(class_id)
    {
        if (class_id >= 1)
        {
            for (let c=0;c<class_id.length;c++)
            {
                let testClass_id = Numbers.includes(class_id.charAt(c));
                if (testClass_id === false)
                {
                    console.log("/!\\ Class id verification went wrong /!\\");
                    return true;
                }
            }
            return false;
        }
        else
        {
            console.log("/!\\ Class id verification went wrong /!\\");
            return true;
        }
    }

    firstNameVerification(name)
    {
        if (name.length > 1)
        {
            let nameCharactersSup = ["-"," "];
            let goodNameCharacters = AllLetters.concat(nameCharactersSup.concat(SpecialLetters));

            for (let c=0;c<name.length;c++)
            {
                let testName = goodNameCharacters.includes(name.charAt(c));
                if (testName === false)
                {
                    console.log("/!\\ Firstname verification went wrong because of invalid characters /!\\");
                    return true;
                }
            }
            return false;
        }
        else
        {
            console.log("/!\\ Firstname verification went wrong because it's empty or too small /!\\");
            return true;
        }
    }

    lastNameVerification(surname)
    {
        if (surname.length > 1)
        {
            let surnameCharactersSup = ["-"," "];
            let goodSurnameCharacters = AllLetters.concat(surnameCharactersSup.concat(SpecialLetters));

            for (let c=0;c<surname.length;c++)
            {
                let testSurname = goodSurnameCharacters.includes(surname.charAt(c));
                if (testSurname === false)
                {
                    console.log("/!\\ Lastname verification went wrong because of invalid characters /!\\");
                    return true;
                }
            }
            return false;
        }
        else
        {
            console.log("/!\\ Lastname verification went wrong because it's empty or too small /!\\");
            return true;
        }
    }

    addressVerification(address)
    {
        if (address.length > 5)
        {
            let addressCharactersSup = [".","-"," ",","];
            let goodAddressCharacters = AllLetters.concat(Numbers.concat(addressCharactersSup.concat(SpecialLetters)));

            for (let c=0;c<address.length;c++)
            {
                let testAddress = goodAddressCharacters.includes(address.charAt(c));
                if (testAddress === false)
                {
                    console.log("/!\\ Address verification went wrong because of invalid characters /!\\");
                    return true;
                }
            }
            return false;
        }
        else
        {
            console.log("/!\\ Address verification went wrong because it's empty or too small /!\\");
            return true;
        }
    }

    async emailVerification(email,emailType)
    {
        if (await this.emailAlreadyExist(email) === false || emailType === "parent")
        {
            if (email.includes("@") && email.length > 5)
            {
                let part = email.split("@");
                let emailCharactersSupPart1 = ["-","_","."];
                let emailCharactersSupPart2 = [".","-"];
                let goodEmailCharactersPart1 = AllLetters.concat(Numbers.concat(emailCharactersSupPart1));
                let goodEmailCharactersPart2 = AllLetters.concat(Numbers.concat(emailCharactersSupPart2));

                for (let c=0;c<part[0].length;c++)
                {
                    let testEmail = goodEmailCharactersPart1.includes(part[0].charAt(c));
                    if (testEmail === false)
                    {
                        console.log("/!\\ Email verification went wrong because the first part of email contain invalid characters /!\\");
                        return true;
                    }
                }
                for (let c=0;c<part[1].length;c++)
                {
                    let testEmail2 = goodEmailCharactersPart2.includes(part[1].charAt(c));
                    if (testEmail2 === false)
                    {
                        console.log("/!\\ Email verification went wrong because the second part of email contain invalid characters /!\\");
                        return true
                    }
                    // Test to know if there is a point in the second part
                    if (!part[1].includes("."))
                    {
                        console.log("/!\\ Email verification went wrong because the second part doesn't contain a '.' /!\\");
                        return true
                    }
                }
                return false;
            }
            else
            {
                console.log("/!\\ Email verification went wrong because email is too short or empty /!\\");
                return true;
            }
        }
        else
        {
            console.log("/!\\ This email address already exist in the database /!\\");
            return true;
        }
    }

    async emailAlreadyExist(email)
    {
        const emailExist = await pool.query("SELECT all emailaddress FROM table_user WHERE emailAddress = $1", [email]);
        if(emailExist.rowCount === 0)
        {
            return false;
        }
        else return true;
    }

    passwordVerification(password)
    {
        return false;
    }

    studentVerification(student)
    {
        if (student === true || student === false || student === 1 || student === 0 || student === "1" || student === "0")
        {
            return false;
        }
        else
        {
            console.log("/!\\ Student boolean verification went wrong because it's not a boolean /!\\");
            return true;
        }
    }

    phoneVerification(phone)
    {
        if (phone.length > 8)
        {
            // Allow to delete all the extra space
            phone = phone.replace(/ /g,"");

            for (let c=0;c<phone.length;c++)
            {
                let phoneCharactersSup = ["+","#"," ",".","/"];
                let goodPhoneCharacters = Numbers.concat(phoneCharactersSup);
                let testPhone = goodPhoneCharacters.includes(phone.charAt(c));
                if (testPhone === false)
                {
                    console.log("/!\\ Phone verification went wrong because it contains invalid characters /!\\");
                    return true;
                }
            }
            return false;
        }
        else
        {
            console.log("/!\\ Phone verification went wrong because it's too short or empty /!\\");
            return true;
        }
    }

    async cryptingPassword(password)
    {
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(password,salt);

        return hash;
    }

    async connectVerification(req,res)
    {
       let { email } = req.body;
       let { password } = req.body;
       console.log(email,password);

        if (await this.emailAlreadyExist(email))
        {
            try
            {
                let userData = await pool.query("SELECT * FROM table_user WHERE emailAddress = $1", [email]);
                let passwordHash = userData.rows[0].password;

                if (bcrypt.compareSync(password,passwordHash) === true)
                {
                    res.json(userData.rows[0]);
                }
                else
                {
                    res.send("Password doesn't match");
                }
            }
            catch (error)
            {
                console.log("Error while verifying data for connection")
            }
        }
        else res.send("Email address doesn't exist");
    }
}

module.exports = Security;

