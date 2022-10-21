const privatekey_exists = () => {
  // window.localStorage.removeItem('privateKey');
  // window.localStorage.removeItem('publicKey');

  let privateKey = window.localStorage.getItem('privateKey');
  if (privateKey) {
    return true
  }
  return false;
}

export default privatekey_exists
