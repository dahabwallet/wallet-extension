import { useState } from 'react';
import colors from "../../includes/colors";
import { MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import is_password_valid from "../../scripts/is_password_valid";

/**
 * Performs the login action.
 * Validates the provided password and navigates to the "/wallet" page if the password is valid.
 * @param {function} navigate - The navigation function from react-router-dom.
 * @param {string} password - The password for the login.
 */
const login = (navigate, password) => {
  if (is_password_valid(password)) {
    // Validate the password
    navigate("/wallet", { replace: true }); // Navigate to the "/wallet" page
  } else {
    alert("Invalid Password");
  }
}

/**
 * React component for the Login page.
 * Renders a form for entering a password and logging in.
 */
const LoginPage = () => {
  const [password, set_password] = useState(""); // State to store the password
  let navigate = useNavigate(); // Navigation function from react-router-dom

  return (
    <div style={styles.parentStyle}>
      <img src={require('../../images/jewel.png')} alt="jewel" style={styles.imgStyle} />
      <h1 className="display-3" style={{ color: colors["black-text"] }}>DAHAB</h1>
      <MDBInput label='Password' type='password' size='lg' onChange={e => set_password(e.target.value)} />
      <button className='btn' style={styles.btnStyle} onClick={() => login(navigate, password)}>
        Login
      </button>
    </div>
  );
}

// Styles for the LoginPage component
const styles = {
  parentStyle: {
    height: "100vh",
    width: "100vw",
    backgroundColor: colors['grey-background'],
    flexDirection: "column",
    fontFamily: 'Montserrat Alternates',
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

export default LoginPage;
