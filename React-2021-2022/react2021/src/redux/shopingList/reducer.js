import { initialShopingListState } from "./initialState";

export const shopingListReducer = (state = initialShopingListState, action) => {
  switch (action.type) {
    case "SET_INITIAL_SHOPING_LIST":
      return { ...state, shopingList: action.value };

      // case "SET_SHOPING_LIST_LOADING_STATE":
      //   return { ...state, isLoading: action.value };
      // case "SET_SHOPING_LIST_LOADING_ERROR":
      //   return { ...state, isError: action.value };

      case "ADD_PRODUCT":
        return { ...state, shopingList: [...state.shopingList, action.value] };
      case "REMOVE_PRODUCT_BY_ID":
        return {
          ...state,
          shopingList: state.shopingList.filter(
            (product) => product.id !== action.value
          ),
        };
      
    default:
      return state;
  }
};
