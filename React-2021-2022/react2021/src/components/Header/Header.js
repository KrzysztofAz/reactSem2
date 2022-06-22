import React from "react";
import styles from "../../common/styles/Headers.module.scss";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import axios from "axios";
import { connect } from "react-redux";

function Header(props) {
  const currentUser = JSON.parse(window.localStorage.getItem("user"));

  //------------------------------------------------

  const setInitialValues = async () => {
    try {
      const response = await axios.get("http://localhost:9000/products");
      // debugger
      props.setInitialProductsList(response.data);
    } catch (e) {
      // debugger
      console.log("ERROR", e);
    }
  };

  //--------------------------------------------------
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.signedUserInfo}>
        <Typography sx={{ m: 2 }} variant="h5">
          Zalogowany:{" "}
          {`${currentUser.userfirstName} ${currentUser.userLastName}`}
        </Typography>
        <Button onClick={setInitialValues} variant="contained">
          Załaduj
        </Button>
        <Link to="/">
          <Button variant="contained" color="error">
            Wyloguj
          </Button>
        </Link>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setInitialProductsList: (value) =>
      dispatch({ type: "SET_INITIAL_PRODUCTS_LIST", value: value }),
  };
};

// export default Header;
export default connect(null, mapDispatchToProps)(Header);
