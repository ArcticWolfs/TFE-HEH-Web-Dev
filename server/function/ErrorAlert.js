
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
            case "400.4.4":
                message = ("/!\\ Password doesn't match /!\\");
                break;
            case "400.4.0":
                message = ("/!\\ Student boolean verification went wrong because it's not a boolean /!\\");
                break;
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
            default: break;

        }
        console.log("ERROR " + idError + " : " + message);
        res.send("ERROR " + idError + " : " + message);
    }
}

module.exports = ErrorAlert;