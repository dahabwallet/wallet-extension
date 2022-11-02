const privatekey_exists = () => {
  //window.localStorage.removeItem('CSPR_privateKey');
  //window.localStorage.removeItem('CSPR_publicKey');

  let privateKey = window.localStorage.getItem('CSPR_privateKey');
  let privateKey2 = window.localStorage.getItem('private_key_cspr');

  if (privateKey) {
    return true
  }
  return false;
}

export default privatekey_exists
