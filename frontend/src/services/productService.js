import requestApi from "../utils/requestApi";

export const getAllProductService = async () => {
  try {
    const respone = await requestApi({
      method: "get",
      url: "product",
    });
    return respone;
  } catch (error) {
    return error;
  }
};

export const getDetailService = async (id) => {
  try {
    const respone = await requestApi({
      method: "get",
      url: `product/${id}`,
    });
    return respone;
  } catch (error) {
    return error;
  }
};

export const addProductService = (formData) => {
  return requestApi({
    url: "product",
    method: "post",
    data: formData,
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  });
};

export const editProductService = (formData, id) => {
  return requestApi({
    url: `product/${id}`,
    method: "put",
    data: formData,
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  });
};

export const changeStatusProductService = (idProduct,status_number) => {
  return requestApi({
    url: `product/change_status/${idProduct}`,
    method: "put",
    data: {status_number},
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  });
};
