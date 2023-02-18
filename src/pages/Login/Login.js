import { useState } from 'react';
import colors from "../../includes/colors"
import { MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import is_password_valid from "../../scripts/is_password_valid"

const login = (navigate, dispatch, password) => {
  if (
    is_password_valid(password)
  ) {
    dispatch({ type: 'SET_PASSWORD', payload: password });
    navigate("/wallet", { replace: true });
  } else {
    alert("Invalid Password")
  }
}
const LoginPage = () => {
  const [password, set_password] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div style={styles.parentStyle}>

      <img src={require('../../images/jewel.png')} alt="jewel" style={styles.imgStyle} />
      <h1 className="display-3" style={{ color: colors["black-text"] }}>DAHAB</h1>
      <MDBInput label='Password' type='password' size='lg' onChange={e => set_password(e.target.value)} />
      <button className='btn' style={styles.btnStyle} onClick={() => login(navigate, dispatch, password)}>
        Login
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
    border: "none"
  },
  imgStyle: {
    width: 240,
    height: 200
  }
}
export default LoginPage;
