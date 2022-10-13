// (A) LOAD ENCRYPT LIBRARY
import CryptoJS from "crypto-js";
// (D) DECRYPT

function is_password_valid(PasswordParameter){

    var cipher;
    cipher = window.localStorage.getItem('passFile');
    var decipher = CryptoJS.AES.decrypt(cipher, PasswordParameter);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    if (decipher === "DahabIsTheSecretKey"){
     return true;
    }
    else {
        return false
    }
}

export default is_password_valid;