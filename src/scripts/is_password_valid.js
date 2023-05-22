import CryptoJS from "crypto-js";

/**
 * Checks if a provided password is valid by decrypting a stored cipher using the password and comparing the decrypted value to a secret key.
 * @param {string} password - The password to validate.
 * @returns {boolean} - Returns true if the password is valid, false otherwise.
 */
function is_password_valid(password) {
    // Retrieving the stored cipher from local storage
    var cipher = window.localStorage.getItem('passFile');

    // Decrypting the cipher using the provided password
    var decipher = CryptoJS.AES.decrypt(cipher, password);

    // Converting the decrypted value to a UTF-8 string
    decipher = decipher.toString(CryptoJS.enc.Utf8);

    // Comparing the decrypted value to the secret key
    if (decipher === "DahabIsTheSecretKey") {
        return true;
    } else {
        return false;
    }
}

// Exporting the is_password_valid function as the default export of the module
export default is_password_valid;
