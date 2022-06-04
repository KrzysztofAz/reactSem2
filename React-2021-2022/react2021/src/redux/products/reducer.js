import { initialProductState } from "./initialState";

export const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case "SET_INITIAL_PRODUCTS_LIST":
      return { ...state, productsList: action.value };
    default:
      return state;
  }
};
