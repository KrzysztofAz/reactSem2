import { initialShopingListState } from "./initialState";

export const shopingListReducer = (state = initialShopingListState, action) => {
  switch (action.type) {
    case "SET_INITIAL_SHOPING_LIST":
      return { ...state, shopingList: action.value };
    case "ADD_PRODUCT":
      return { ...state, shopingList: [...state.shopingList, action.value] };
    case "REMOVE_PRODUCT_BY_ID":
      return {
        ...state,
        shopingList: state.shopingList.filter(
          (product) => product.id !== action.value
        ),
      };
    case "SET_PRODUCTS_LOADING_STATE":
      return { ...state, loadingStatus: action.value };
    default:
      return state;
  }
};
