import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack, Paper } from "@mui/material";

import commonColumnsStyles from "../../common/styles/Columns.module.scss";

function ShopingList({
  setInitialShopingList,
  shopingListFromRedux,
  setLoadingProductStatus,
  productStatus,
  // removeProductFromShopingList,
}) {
  const getShoppingList = async () => {
    try {
      setLoadingProductStatus("loading");
      const response = await axios.get(
        "http://localhost:9000/products/shopingList"
      );
      setInitialShopingList(response.data);
      setLoadingProductStatus("initial");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      setLoadingProductStatus("loading");
      await axios
        .delete(`http://localhost:9000/products/shopingList/${productId}`)
        .then((res) => {
          getShoppingList();
          setLoadingProductStatus("initial");
          // removeProductFromShopingList(productId)
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getShoppingList();
  }, []);

  return (
    <div className={commonColumnsStyles.App}>
      <header className={commonColumnsStyles.AppHeader}>
        <p>Shoping List</p>
        <Stack spacing={2}>
          {productStatus === "loading" ? (
            <CircularProgress />
          ) : (
            shopingListFromRedux?.map((product, i) => (
              <Paper key={i} onClick={() => deleteProduct(product.id)}>
                {`${product.id}. ${product.name}`}
              </Paper>
            ))
          )}
        </Stack>
      </header>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setInitialShopingList: (value) =>
      dispatch({ type: "SET_INITIAL_SHOPING_LIST", value: value }),
    removeProductFromShopingList: (value) =>
      dispatch({ type: "REMOVE_PRODUCT_BY_ID", value: value }),
    setLoadingProductStatus: (value) =>
      dispatch({ type: "SET_PRODUCTS_LOADING_STATE", value: value }),
  };
};

const mapStateToProps = (state) => {
  return {
    shopingListFromRedux: state.shopingList.shopingList,
    productStatus: state.products.loadingStatus,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopingList);
