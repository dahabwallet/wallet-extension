

import  {two_fish_main} from '../scripts/twofish_test'
import colors from "../includes/colors"
import { useNavigate } from "react-router-dom";




const  TwoFishPage =  () => {

  // (async ()=>{

  //   let pbkdf2_hash="pbkdf2"
  //   let argon2_hash= "argon2"

  //   await two_fish_main(pbkdf2_hash);

  // })();
  const navigate = useNavigate()

  console.log ("hello from two fish page")
  return (
   
    <div style={styles.parentStyle}>
           
            {/* <script src="node_modules/argon2-browser/dist/argon2-bundled.min.js"> </script>
            <script>
            console.log(argon2)
            </script> */}
            
            <button className='btn' style={styles.btnStyle} onClick={() => {
              console.log ("hello from your wallet")
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
export default TwoFishPage;
