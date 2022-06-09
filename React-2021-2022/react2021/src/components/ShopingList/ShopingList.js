import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import commonColumnsStyles from "../../common/styles/Columns.module.scss";

function ShopingList({
  setInitialShopingList,
  shopingListFromRedux,
  removeProductFromShopingList,
}) {
  const getShoppingList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/products/shopingList"
      );
      setInitialShopingList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios
        .delete(`http://localhost:9000/products/shopingList/${productId}`)
        .then((res) => {
          getShoppingList();
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
        {shopingListFromRedux?.map((element, i) => (
          <li
            onClick={() => {
              console.log("sddd");
              deleteProduct(element.id);
            }}
            key={i}
          >
            {element.name}
          </li>
        ))}
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
  };
};

const mapStateToProps = (state) => {
  return {
    shopingListFromRedux: state.shopingList.shopingList,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopingList);
