const store_keypair = (publicKey, privateKey) => {
  try {
    window.localStorage.setItem('publicKey', publicKey);
    window.localStorage.setItem('privateKey', privateKey);
    return true;
  } catch (err) {
    return false;
  }
}

export default store_keypair
