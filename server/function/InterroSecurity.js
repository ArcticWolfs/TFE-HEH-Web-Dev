const LowerCase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const UpperCase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const AllLetters = LowerCase.concat(UpperCase);
const SpecialLetters = ["â","ä","à","á","é","è","ë","ê","ç","û","ü","ù","ú","ï","î","ö","ô"];
const Numbers = ["0","1","2","3","4","5","6","7","8","9"];
const ErrorAlert = require("./ErrorAlert");
const error = new ErrorAlert;

class InterroSecurity
{
    constructor()
    {

    }

    nameVerification(name,res)
    {
        if (name.length > 1)
        {
            let nameCharactersSup = ["-"," "];
            let goodNameCharacters = AllLetters.concat(nameCharactersSup.concat(Numbers.concat(SpecialLetters)));
            for (let c=0;c<name.length;c++)
            {
                let testName = goodNameCharacters.includes(name.charAt(c));
                if (testName === false)
                {
                    error.errorMessage("400.10.0",res);
                    return true
                }
            }
            return false;
        }
        else
        {
            error.errorMessage("400.10.1",res);
            return true;
        }
    }

    totalVerification(total, res)
    {
        if (total >= 0 && total <= 100)
        {
            return false;
        }
        else
        {
            error.errorMessage("400.11.0",res);
            return true;
        }
    }

}

module.exports = InterroSecurity;
