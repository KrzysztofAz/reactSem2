import React from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { connect } from "react-redux";
import axios from "axios";

function ProductsList({productsFromStore}) {
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

        {productsFromStore?.map((element, i) => <li key={i}>{element.name}</li>)}

      </header>
    </div>
  );
}

const mapStateToProps = (state) => {
  
  return {
    productsFromStore: state.products.productsList,
  };
};

// export default ProductsList;
export default connect(mapStateToProps)(ProductsList);
