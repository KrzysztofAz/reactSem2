import React from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { connect } from "react-redux";
import axios from "axios";

function ProductsList({ productsFromStore, addToShopingList }) {
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

        {productsFromStore?.map((element, i) => (
          <li onClick={() => addProduct(element)} key={i}>
            {element.name}
          </li>
        ))}
      </header>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToShopingList: (value) =>
      dispatch({ type: "ADD_PRODUCT", value: value }),
  };
};

const mapStateToProps = (state) => {
  return {
    productsFromStore: state.products.filteredProductsList,
  };
};

// export default ProductsList;
export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
