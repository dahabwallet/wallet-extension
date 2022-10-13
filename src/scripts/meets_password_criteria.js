
    // Function takes password as input and returns string ("strong" or "weak")
    // criteria: create a strong level password that has at least one lowercase letter
    // (?=.*[a-z]), one uppercase letter (?=.*[A-Z]), one digit (?=.*[0-9]), one special character (?=.*[^A-Za-z0-9]), and is at least eight characters long(?=.{8,}).


    function meets_password_criteria(PasswordParameter){

    let password = PasswordParameter ;
    // The strong and weak password Regex pattern checker

    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

        if(strongPassword.test(password)) {
            return("strong")
        } 
        else{
            return("weak")
        }
    }

    export default meets_password_criteria;