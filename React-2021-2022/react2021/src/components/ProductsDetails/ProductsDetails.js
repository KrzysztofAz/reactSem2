import React, { useState } from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { getSelectedProduct } from "../../redux/products/selectors";

function ProductDetails() {
  let navigate = useNavigate();
  const goBackToProductsList = () => {
    navigate(-1);
  };

  const productDetails = useSelector((store) => getSelectedProduct(store));

  return (
    <>
      <ArrowBackIcon onClick={goBackToProductsList} fontSize="large" />
      <div className={commonColumnsStyles.App}>
        <header className={commonColumnsStyles.AppHeader}>
          <p>Products Details</p>
          {productDetails && (
            <>
              <span>Nazwa: {productDetails.name}</span>
              <span>Kategoria: {productDetails.category}</span>
              <span>Jedzenie?: {productDetails.isFood ? "Tak" : "Nie"}</span>
            </>
          )}
        </header>
      </div>
    </>
  );
}

export default ProductDetails;
