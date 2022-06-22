import React from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { connect } from "react-redux";
import axios from "axios";
import { Stack, Paper } from "@mui/material";

function ProductsList({
  productsFromStore,
  addToShopingList,
  setLoadingProductStatus,
}) {
  const addProduct = async (product) => {
    console.log();
    try {
      const response = await axios.post(
        "http://localhost:9000/products/shopingList/new",
        product
      );

      addToShopingList(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={commonColumnsStyles.App}>
      <header className={commonColumnsStyles.AppHeader}>
        <p>Products list</p>

        {/* Poniżej znajduje się ostylowany aktywny produkt do zadania 5 */}
        {/* <span
          style={{
            backgroundColor: "white",
            border: "1px black solid",
            borderRadius: "16px",
            padding: "6px",
          }}
        >
          Przykładowy aktywny produkt
        </span> */}
        <Stack spacing={2}>
          {productsFromStore?.map((product, i) => (
            <Paper key={i} onClick={() => addProduct(product)}>
              {`${product.id}. ${product.name}`}
            </Paper>
          ))}
        </Stack>
      </header>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToShopingList: (value) =>
      dispatch({ type: "ADD_PRODUCT", value: value }),
    setLoadingProductStatus: (value) =>
      dispatch({ type: "SET_PRODUCTS_LOADING_STATE", value: value }),
  };
};

const mapStateToProps = (state) => {
  return {
    productsFromStore: state.products.filteredProductsList,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
