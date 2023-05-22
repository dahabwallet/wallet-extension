/**
 * Checks if a private key exists in the local storage for the Ethereum wallet.
 * @returns {boolean} - Returns true if a private key exists, false otherwise.
 */
const privatekey_exists = () => {
  // Retrieving the private key from the local storage
  let privateKey = window.localStorage.getItem('ETH_privateKey');

  // Checking if a private key exists
  if (privateKey) {
    return true;
  }

  return false;
}

// Exporting the privatekey_exists function as the default export of the module
export default privatekey_exists;
