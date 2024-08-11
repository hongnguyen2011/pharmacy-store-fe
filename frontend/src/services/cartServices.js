import requestApi from "../utils/requestApi";

export const addProductToCartService = async (dataCart) => {
  try {
    const respone = await requestApi({
      method: "post",
      url: "cartItem",
      data: {
        product_id: `${dataCart.id}`,
        price_product: `${dataCart.price}`,
        quantity: `${dataCart.quantity}`,
      },
      headers: {
        Authorization: "Bearer " + `${dataCart.accessToken}`,
      },
    });
    return respone;
  } catch (error) {
    return error;
  }
};

export const getAllCartItemService = async (accessToken) => {
  try {
    const respone = await requestApi({
      method: "get",
      url: "cartItem",
      headers: {
        Authorization: "Bearer " + `${accessToken}`,
      },
    });
    return respone;
  } catch (error) {
    return error.response.data
  }
};

export const deleteCartItemService = async (dataCartDelete) => {
    try {
      const respone = await requestApi({
        method: "delete",
        url: `cartItem/${dataCartDelete.id}`,
        headers: {
          Authorization: "Bearer " + `${dataCartDelete.accessToken}`,
        },
      });
      return respone;
    } catch (error) {
      return error
    }
  };