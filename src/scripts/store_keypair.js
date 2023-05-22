/**
 * Stores a keypair (public key and private key) in the local storage of the browser.
 * The keypair is associated with a chain prefix.
 * @param {string} chain_prefix - The chain prefix to associate with the keypair.
 * @param {string} publicKey - The public key to store.
 * @param {string} privateKey - The private key to store.
 * @returns {boolean} - Returns true if the keypair is successfully stored, false otherwise.
 */
const store_keypair = (chain_prefix, publicKey, privateKey) => {
  try {
    // Creating local storage keys for the public key and private key
    let pub_key_local = `${chain_prefix}_publicKey`;
    let priv_key_local = `${chain_prefix}_privateKey`;

    // Storing the public key and private key in the local storage
    window.localStorage.setItem(pub_key_local, publicKey);
    window.localStorage.setItem(priv_key_local, privateKey);

    return true;
  } catch (err) {
    return false;
  }
}

// Exporting the store_keypair function as the default export of the module
export default store_keypair;
