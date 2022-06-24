import React from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { connect } from "react-redux";
import axios from "axios";
import { Stack, Paper } from "@mui/material";
import { useNavigate } from "react-router";

function ProductsList({
  productsFromStore,
  addToShopingList,
  setLoadingProductStatus,
  setSelectedProduct,
}) {
  const navigate = useNavigate();

  const addProduct = async (product) => {
    console.log();
    try {
      setLoadingProductStatus("loading");
      const response = await axios.post(
        "http://localhost:9000/products/shopingList/new",
        product
      );

      addToShopingList(response.data);
      setLoadingProductStatus("initial");
    } catch (err) {
      console.log(err);
    }
  };

  const showDetails = async (product) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/products/${product.id}`
      );
      setSelectedProduct(response.data);
      navigate(`/product/details/${product.id}`);
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
            <Paper
              key={i}
              onClick={() => addProduct(product)}
              onContextMenu={(e) => {
                e.preventDefault();
                showDetails(product);
              }}
            >
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
    setSelectedProduct: (value) =>
      dispatch({ type: "SET_SELECTED_PRODUCT", value: value }),
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
