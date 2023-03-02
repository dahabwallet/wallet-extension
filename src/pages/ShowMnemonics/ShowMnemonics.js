import colors from "../../includes/colors"
import { useNavigate } from "react-router-dom";

const ShowMnemonicsPage = () => {
  const navigate = useNavigate()

  return (
    <div style={styles.parentStyle}>

      <img src={require('../../images/jewel.png')} alt="jewel" style={styles.imgStyle} />
      <h1 class="display-3" style={{ color: colors["black-text"] }}>DAHAB</h1>
      <h4>Please save your credential phrases</h4> <br></br>

      <button className='btn' style={styles.btnStyle} onClick={() => {
        navigate('importWallet')
        
      }}>
        Import Wallet
      </button>

      <button className='btn' style={styles.btnStyle} onClick={() => {
        navigate('newWalletPassword')
      }}>
        Create New Wallet
      </button>

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
    border: "none",
    marginBottom: 20
  },
  imgStyle: {
    width: 240,
    height: 200
  }
}
export default ShowMnemonicsPage;
