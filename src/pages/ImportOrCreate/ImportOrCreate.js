import { useState } from 'react';
import colors from "../../includes/colors"
import { RotatingLines } from 'react-loader-spinner'



const ImportOrCreateWalletPage = () => {
  const [loadingRing, setLoadingRing] = useState(false)

  return (
    <div style={styles.parentStyle}>

      <img src={require('../../images/jewel.png')} alt="jewel" style={styles.imgStyle} />
      <h1 class="display-3" style={{ color: colors["black-text"] }}>DAHAB</h1>
      <h4>Import an existing wallet? or create a new one?</h4> <br></br>
      
      <RotatingLines
        strokeColor="green"
        strokeWidth="5"
        animationDuration="0.75"
        width="90"
        visible={loadingRing} />
      
      <a href="./importWallet"><button className='btn' style={styles.btnStyle} onClick={() => setLoadingRing(true)}>
        Import Wallet
      </button></a>
      <br></br>

      
      <a href="./newWalletPassword"><button className='btn' style={styles.btnStyle} onClick={() => setLoadingRing(true)}>
        Create New Wallet
      </button></a>
    </div >

  );
}
const styles = {
  parentStyle: {
    height: "100vh",
    width: "100vw",
    backgroundColor: colors['grey-background'],
    flexDirection: "column",
    "font-family": 'Montserrat Alternates',
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  btnStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: "white",
    backgroundColor: colors['orange'],
    border: "none"
  },
  imgStyle: {
    width: 240,
    height: 200
  }
}
export default ImportOrCreateWalletPage;
