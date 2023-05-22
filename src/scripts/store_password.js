import CryptoJS from "crypto-js";

/**
 * Encrypts and stores a password in the local storage of the browser.
 * @param {string} password - The password to encrypt and store.
 * @returns {boolean} - Returns true if the password is successfully encrypted and stored, false otherwise.
 */
function store_password(password) {
    // Secret key used for encryption
    let key = "DahabIsTheSecretKey";

    // Encrypting the key using the provided password
    var cipher = CryptoJS.AES.encrypt(key, password);
    cipher = cipher.toString();

    try {
        // Storing the encrypted cipher in the local storage with the key 'passFile'
        window.localStorage.setItem('passFile', cipher);
        
        // Checking if the stored cipher matches the encrypted cipher
        if (window.localStorage.getItem('passFile') !== cipher) {
            return false;
        }
    } catch (e) {
        return false;
    }
    
    // Returning true to indicate successful encryption and storage of the password
    return true;
}

// Exporting the store_password function as the default export of the module
export default store_password;
