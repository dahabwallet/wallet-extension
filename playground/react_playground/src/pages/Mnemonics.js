

// import colors from "../includes/colors"

// import { argon2d } from "argon2";
const argon2= require('argon2-browser')

async function hash_password(){


}


const  Mnemon =  () => {

  return (
   
    <div>
    <p>hello from the other side</p>

    <script src="node_modules/argon2-browser/lib/argon2.js"></script>
    <script src="node_modules/argon2-browser/dist/argon2-bundled.min.js"></script>

    <button onClick= {argon2.hash()} > Change color</button>

    <p>Ended the function</p>

    </div>

  );
}
  

// const styles = {
//   parentStyle: {
//     height: "100vh",
//     width: "100vw",
//     backgroundColor: colors['grey-background'],
//     flexDirection: "column",
//     "font-family": 'Montserrat Alternates',
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   btnStyle: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     color: "white",
//     backgroundColor: colors['orange'],
//     border: "none",
//     marginBottom: 20
//   },
//   imgStyle: {
//     width: 240,
//     height: 200
//   }
// }
export default Mnemon;
