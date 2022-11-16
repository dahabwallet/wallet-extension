const privatekey_exists = () => {

  // window.localStorage.removeItem('ETH_privateKey');
  // window.localStorage.removeItem('ETH_publicKey');

  // window.localStorage.removeItem('CSPR_privateKey');
  // window.localStorage.removeItem('CSPR_publicKey');

  // window.localStorage.removeItem('SOL_privateKey');
  // window.localStorage.removeItem('SOL_publicKey');

  // window.localStorage.removeItem('MATIC_privateKey');
  // window.localStorage.removeItem('MATIC_publicKey');

  let privateKey = window.localStorage.getItem('ETH_privateKey');
  if (privateKey) {
    return true
  }
  return false;
}

export default privatekey_exists
