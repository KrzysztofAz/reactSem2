import { initialProductState } from "./initialState";

export const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case "SET_INITIAL_PRODUCTS_LIST":
      return {
        ...state,
        productsList: action.value,
        filteredProductsList: action.value,
      };

    case "FILTER_PRODUCTS_LIST":
      console.log(action.value);
      let filteredProducts = state.productsList.filter((product) =>
        product.name.toLowerCase().includes(action.value.text.toLowerCase())
      );

      if (action.value.foodOnly) {
        // console.log("test");
        filteredProducts = filteredProducts.filter((product) => product.isFood);
      }
      // console.log(filteredProducts);
      return { ...state, filteredProductsList: filteredProducts };

    case "SET_SELECTED_PRODUCT":
      return { ...state, selectedProduct: action.value };

    default:
      return state;
  }
};
