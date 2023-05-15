import colors from "../../includes/colors"

const make_python_request = (file_name) => {
  const formData = new FormData();
  formData.append('file_name', file_name);

  fetch('http://localhost:5000/upload', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      // Process the response data
      console.log(data);
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
}

const Python = () => {
  return (
    <div style={styles.parentStyle}>
      <button className='btn' style={styles.btnStyle} onClick={() => make_python_request('my_file_name')} >
        Make python request
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
    justifyContent: "center",
  },
  btnStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: "white",
    border: "none",
    backgroundColor: colors.orange
  }
}
export default Python;
