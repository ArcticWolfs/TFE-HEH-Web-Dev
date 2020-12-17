
class ErrorAlert
{
    constructor()
    {

    }

    errorMessage(idError,res)
    {
        let message;

        switch (idError)
        {
            case "400":
                message = ("/!\\ Error while verifying data for connection /!\\");
                break;
            case "400.0.0":
                message = ("/!\\ Class id verification went wrong cause of Invalid character /!\\");
                break;
            case "400.0.1":
                message = ("/!\\ Class id verification went wrong because it's empty or too small /!\\");
                break;
            case "400.1.0":
                message = ("/!\\ Firstname verification went wrong because of invalid characters /!\\");
                break;
            case "400.1.1":
                message = ("/!\\ Firstname verification went wrong because it's empty or too small /!\\");
                break;
            case "400.2.0":
                message = ("/!\\ Lastname verification went wrong because of invalid characters /!\\");
                break;
            case "400.2.1":
                message = ("/!\\ Lastname verification went wrong because it's empty or too small /!\\");
                break;
            case "400.3.0.1":
                message = ("/!\\ Email verification went wrong because the first part of email contain invalid characters /!\\");
                break;
            case "400.3.0.2":
                message = ("/!\\ Email verification went wrong because the second part of email contain invalid characters /!\\");
                break;
            case "400.3.1":
                message = ("/!\\ Email verification went wrong because email is too short or empty or doesn't contain an '@'/!\\");
                break;
            case "400.3.2":
                message = ("/!\\ This email address already exist in the database /!\\");
                break;
            case "400.3.3":
                message = ("/!\\ Email verification went wrong because the second part doesn't contain a '.' /!\\");
                break;
            case "400.3.4":
                message = ("/!\\ Email address doesn't exist /!\\");
                break;
            case "400.4.0":
                message = ("/!\\ Student boolean verification went wrong because it's not a boolean /!\\");
                break;
            case "400.4.4":
                message = ("/!\\ Password incorrect /!\\");
            case "400.5.0":
                message = ("/!\\ Address verification went wrong because of invalid characters /!\\");
                break;
            case "400.5.1":
                message = ("/!\\ Address verification went wrong because it's empty or too small /!\\");
                break;
            case "400.6.0":
                message = ("/!\\ Phone verification went wrong because it contains invalid characters /!\\");
                break;
            case "400.6.1":
                message = ("/!\\ Phone verification went wrong because it's too short or empty /!\\");
                break;
          case "400.7.0":
                message = ("/!\\ Admin boolean verification went wrong because it's not a boolean /!\\");
                break;
            case "400.8.0":
                message = ("/!\\ Birthdate verification went wrong because of invalid characters /!\\");
                break;
            case "400.8.1":
                message = ("/!\\ Birthdate verification went wrong because it's empty or too small /!\\");
                break;
            case "400.9.0":
                message = ("/!\\ FunctionEmployee verification went wrong because of invalid characters /!\\");
                break;
            case "400.9.1":
                message = ("/!\\ FunctionEmployee verification went wrong because it's empty or too small /!\\");
                break;
            case "400.10.0":
                message = ("/!\\ Name contains invalide characters  /!\\");
                break;
            case "400.10.1":
                message = ("/!\\ Name is too short  /!\\");
                break;
            case "400.11.0":
                message = ("/!\\ Value of total is invalid (not between 0 and 100)  /!\\");
            default: break;
        }
        console.log("ERROR " + idError + " : " + message);
        res.send("ERROR " + idError + " : " + message);
    }
}

module.exports = ErrorAlert;
