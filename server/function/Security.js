const index = require("../index");

class Security
{
    constructor()
    {

    }

    classIdVerification(class_id)
    {
        let format = /[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?]+/;
        return format.test(class_id);
    }

    nameVerification(name)
    {
        let format = /[!@#$%&*()_+=\[\]{};':"\\|,.<>\/?0123456789]+/;
        return format.test(name);
    }

    surnameVerification(surname)
    {
        let format = /[!@#$%&*()_+=\[\]{};':"\\|,.<>\/?0123456789]+/;
        return format.test(surname);
    }

    addressVerification(address)
    {
        let format = /[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?]+/;
        return format.test(address);
    }

    emailVerification(email)
    {
        let format = /[!#$%^*()+=\[\]{};':"\\|,<>\/?]+/;
        return format.test(email);
    }

    passwordVerification(password)
    {
        let format = /[$^&*()=\[\]{};':"\\|,.<>\/?]+/;
        return format.test(password);
    }

    studentVerification(student)
    {
        let format = /[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?23456789]+/;
        return format.test(student);
    }

    phoneVerification(phone)
    {
        let format = /[]+/;
        return format.test(phone);
    }

}

module.exports = Security;

