import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import styles from "../../common/styles/Headers.module.scss";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

function ProductsFilters({ filterProductsByText, filterProductsByFood }) {
  const [textFilter, setTextFilter] = useState("");
  const [foodOnly, setFoodOnly] = useState(false);

  useEffect(() => {
    filterProductsByText({ text: textFilter, foodOnly: foodOnly });
  }, [textFilter, foodOnly]);

  return (
    <div className={styles.filtersHeaderWrapper}>
      <Typography variant="h4">Filtruj produkty: </Typography>
      <FormGroup>
        <div className={styles.filtersForm}>
          <FormControlLabel
            control={
              <TextField
                margin="dense"
                label="Nazwa"
                variant="outlined"
                onChange={(e) => setTextFilter(e.target.value)}
                value={textFilter}
              />
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => setFoodOnly(!foodOnly)}
                checked={foodOnly}
              />
            }
            label="Tylko produkty spożywcze"
          />
        </div>
      </FormGroup>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterProductsByText: (value) =>
      dispatch({ type: "FILTER_PRODUCTS_LIST", value: value }),
  };
};

export default connect(null, mapDispatchToProps)(ProductsFilters);
