
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
            case "400.0":
                message = ("/!\\ Class id verification went wrong cause of Invalid character /!\\");
                break;
            case "400.1":
                message = ("/!\\ Class id verification went wrong because it's empty or too small /!\\");
                break;
            case "401.0":
                message = ("/!\\ Firstname verification went wrong because of invalid characters /!\\");
                break;
            case "401.1":
                message = ("/!\\ Firstname verification went wrong because it's empty or too small /!\\");
                break;
            case "402.0":
                message = ("/!\\ Lastname verification went wrong because of invalid characters /!\\");
                break;
            case "402.1":
                message = ("/!\\ Lastname verification went wrong because it's empty or too small /!\\");
                break;
            case "403.0.1":
                message = ("/!\\ Email verification went wrong because the first part of email contain invalid characters /!\\");
                break;
            case "403.0.2":
                message = ("/!\\ Email verification went wrong because the second part of email contain invalid characters /!\\");
                break;
            case "403.1":
                message = ("/!\\ Email verification went wrong because email is too short or empty or doesn't contain an '@'/!\\");
                break;
            case "403.2":
                message = ("/!\\ This email address already exist in the database /!\\");
                break;
            case "403.3":
                message = ("/!\\ Email verification went wrong because the second part doesn't contain a '.' /!\\");
                break;
            case "403.4":
                message = ("/!\\ Email address doesn't exist /!\\");
                break;
            case "404.4":
                message = ("/!\\ Password doesn't match /!\\");
                break;
            case "404.0":
                message = ("/!\\ Student boolean verification went wrong because it's not a boolean /!\\");
                break;
            case "405.0":
                message = ("/!\\ Address verification went wrong because of invalid characters /!\\");
                break;
            case "405.1":
                message = ("/!\\ Address verification went wrong because it's empty or too small /!\\");
                break;
            case "406.0":
                message = ("/!\\ Phone verification went wrong because it contains invalid characters /!\\");
                break;
            case "406.1":
                message = ("/!\\ Phone verification went wrong because it's too short or empty /!\\");
                break;
            case "500":
                message = ("/!\\ Error while verifying data for connection /!\\");
                break;

        }
        console.log(message);
        res.send("ERROR : " + idError);
    }
}

module.exports = ErrorAlert;