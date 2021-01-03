const ErrorAlert = require("./ErrorAlert");
const error = new ErrorAlert();
const LowerCase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const UpperCase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const AllLetters = LowerCase.concat(UpperCase);
const SpecialLetters = ["â","ä","à","á","é","è","ë","ê","ç","û","ü","ù","ú","ï","î","ö","ô"];
const Numbers = ["0","1","2","3","4","5","6","7","8","9"];
const NumbersClass = ["1","2","3","4","5","6"];

class Security
{

    classIdVerification(class_id)
    {
        if (class_id >= 1)
        {
            for (let c=0;c<class_id.length;c++)
            {
                let testClass_id = Numbers.includes(class_id.charAt(c));
                if (testClass_id === false)
                {
                    error.errorMessage("400.0.0");
                    return true;
                }
            }
            return false;
        }
        else
        {
            error.errorMessage("400.0.1");
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
                    error.errorMessage("400.1.0");
                    return true;
                }
            }
            return false;
        }
        else
        {
            error.errorMessage("400.1.1");
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
                    error.errorMessage("400.2.0");
                    return true;
                }
            }
            return false;
        }
        else
        {
            error.errorMessage("40.2.1");
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
                    error.errorMessage("400.5.0");
                    return true;
                }
            }
            return false;
        }
        else
        {
            error.errorMessage("400.5.1");
            return true;
        }
    }

    emailVerification(email,emailType)
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
                    error.errorMessage("400.3.0.1");
                    return true;
                }
            }
            for (let c=0;c<part[1].length;c++)
            {
                let testEmail2 = goodEmailCharactersPart2.includes(part[1].charAt(c));
                if (testEmail2 === false)
                {
                    error.errorMessage("400.3.0.2");
                    return true
                }
                // Test to know if there is a point in the second part
                if (!part[1].includes("."))
                {
                    error.errorMessage("400.3.3");
                    return true
                }
            }
            return false;
        }
        else
        {
            if (emailType === "parent2")
            {
                return false;
            }
            else
            {
                error.errorMessage("400.3.1");
                return true;
            }
        }
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
            error.errorMessage("400.4.0");
            return true;
        }
    }

    phoneVerification(phone,phoneType)
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
                    error.errorMessage("400.6.0");
                    return true;
                }
            }
            return false;
        }
        else
        {
            if (phoneType === "parent2")
            {
                return false;
            }
            else
            {
                error.errorMessage("400.6.1");
                return true;
            }
        }
    }

    birthdateVerification(birthdate) 
    {
        if (birthdate.length > 9)
        {
            for (let c=0;c<birthdate.length;c++)
            {
                let birthdateCharactersSup = ["/"];
                let goodBirthdateCharacters = Numbers.concat(birthdateCharactersSup);
                let testBirthdate = goodBirthdateCharacters.includes(birthdate.charAt(c));
                if (testBirthdate === false)
                {
                    error.errorMessage("400.8.0");
                    return true;
                }
            }
            return false;
        }
        else
        {
            error.errorMessage("400.8.1");
            return true;
        }
    }

    adminVerification(isAdmin) 
    {
        if (isAdmin === true || isAdmin === false || isAdmin === 1 || isAdmin === 0 || isAdmin === "1" || isAdmin === "0")
        {
            return false;
        }
        else
        {
            error.errorMessage("400.7.0");
            return true;
        }
    }

    functionEmployeeVerification(functionEmployee) 
    {
        if (functionEmployee.length > 1)
        {
            let functionEmployeeCharactersSup = ["-"," "];
            let goodFunctionEmployeeCharacters = AllLetters.concat(functionEmployeeCharactersSup.concat(SpecialLetters));
            for (let c=0;c<functionEmployee.length;c++)
            {
                let testFunctionEmployee = goodFunctionEmployeeCharacters.includes(functionEmployee.charAt(c));
                if (testFunctionEmployee === false)
                {
                    error.errorMessage("400.9.0");
                    return true
                }
            }
            return false;
        }
        else
        {
            error.errorMessage("400.9.1");
            return true;
        }
    }

    nameClassVerification(name)
    {
        if (name.length === 2)
        {
            let goodNameCharacters = NumbersClass.concat(UpperCase);
            for (let c=0;c<name.length;c++)
            {
                let testName = goodNameCharacters.includes(name.charAt(c));
                if (testName === false)
                {
                    error.errorMessage("400.12.0");
                    return true;
                }
            }
            return false;
        }
        else
        {
            error.errorMessage("400.12.1");
            return true;
        }
    }

    yearClassVerification(yearClass)
    {
        if (yearClass.length === 9)
        {
            for (let c=0;c<yearClass.length;c++)
            {
                let yearClassCharactersSup = ["-"];
                let goodYearClassCharacters = Numbers.concat(yearClassCharactersSup);
                let testYearClass = goodYearClassCharacters.includes(yearClass.charAt(c));
                if (testYearClass === false)
                {
                    error.errorMessage("400.13.0");
                    return true;
                }
            }
            return false;
        }
        else
        {
            error.errorMessage("400.13.1");
            return true;
        }
    }
}

module.exports = Security;

