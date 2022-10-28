const store_keypair = (chain_prefix, publicKey, privateKey) => {
  try {
    let pub_key_local= `${chain_prefix}_publicKey`
    let priv_key_local= `${chain_prefix}_privateKey`

    window.localStorage.setItem(pub_key_local, publicKey);
    window.localStorage.setItem(priv_key_local, privateKey);
    return true;
  } catch (err) {
    return false;
  }
}

export default store_keypair
