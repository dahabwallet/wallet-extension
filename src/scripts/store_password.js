// (A) LOAD ENCRYPT LIBRARY
import CryptoJS from "crypto-js";

function store_password(PasswordParameter){
// (B) SECRET KEY
    var key = "DahabIsTheSecretKey";

    // (C) ENCRYPT
    var cipher = CryptoJS.AES.encrypt(key, PasswordParameter);
    cipher = cipher.toString();
    window.localStorage.setItem('passFile', cipher);

    return true;
}


export default store_password;