const privatekey_exists = () => {
  // window.localStorage.removeItem('ETH_privateKey');
  // window.localStorage.removeItem('ETH_publicKey');

  let privateKey = window.localStorage.getItem('ETH_privateKey');
  if (privateKey) {
    return true
  }
  return false;
}

export default privatekey_exists
