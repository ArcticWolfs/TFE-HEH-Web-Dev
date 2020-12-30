const LowerCase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const UpperCase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const AllLetters = LowerCase.concat(UpperCase);
const SpecialLetters = ["â","ä","à","á","é","è","ë","ê","ç","û","ü","ù","ú","ï","î","ö","ô"];
const Numbers = ["0","1","2","3","4","5","6","7","8","9"];
const ErrorAlert = require("./ErrorAlert");
const error = new ErrorAlert;

class QuestionSecurity
{
    constructor()
    {

    }

    questionVerification(question,res)
    {
        console.log(question)
        if (question.length > 4)
        {
            let questionCharactersSup = ["-", " ", "?", ">", "<", "+", "-", "/", "*", "."];
            let goodQuestionCharacters = AllLetters.concat(questionCharactersSup.concat(Numbers.concat(SpecialLetters)));
            for (let c = 0; c < question.length; c++)
            {
                let testQuestion = goodQuestionCharacters.includes(question.charAt(c));
                if (testQuestion === false)
                {
                    error.errorMessage("400.12.0", res);
                    return true
                }
            }
            return false;
        }
        else
        {
            error.errorMessage("400.12.1", res);
            return true;
        }
    }

    subjectVerification(subject,res)
    {
        if (subject.length > 5)
        {
            let questionCharactersSup = ["-", " ", ">", "<", "/", "."];
            let goodSubjectCharacters = AllLetters.concat(questionCharactersSup.concat(SpecialLetters));
            for (let c=0;c<subject.length;c++)
            {
                let testSubject = goodSubjectCharacters.includes(subject.charAt(c));
                if (testSubject === false)
                {
                    error.errorMessage("400.13.0",res);
                    return true
                }
            }
            return false;
        }
        else
        {
            error.errorMessage("400.13.1",res);
            return true;
        }
    }

    timeVerification(time, res)
    {
        if (typeof time === 'number' && time < 600)
        {
            return false;
        }
        else
        {
            error.errorMessage("400.14.0",res);
            return true;
        }
    }
}

module.exports = QuestionSecurity;
