import requestApi from "../utils/requestApi";

export const createOrderService = async (dataCreateOrder) => {
  try {
    const respone = await requestApi({
      method: "post",
      url: "order",
      data: {
        fullName: `${dataCreateOrder.name}`,
        receiving_address: `${dataCreateOrder.address}`,
        phone_number: `${dataCreateOrder.number}`,
      },
      headers: {
        Authorization: "Bearer " + `${dataCreateOrder.accessToken}`,
      },
    });
    return respone;
  } catch (error) {
    return error;
  }
};

export const getAllOrderAnUserService = async (accessToken) => {
  try {
    const respone = await requestApi({
      method: "get",
      url: "order",
      headers: {
        Authorization: "Bearer " + `${accessToken}`,
      },
    });
    return respone;
  } catch (error) {
    return error;
  }
};

export const getDetailsOrderService = async (dataOrderDetail) => {
  try {
    const respone = await requestApi({
      method: "get",
      url: `orderItem/${dataOrderDetail.id}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    });
    return respone;
  } catch (error) {
    return error;
  }
};

export const getAllOrderService = () => {
  return requestApi({
    method: "get",
    url: `order/get_all_order`,
  });
};


export const changeStatusOrderService = (idOrder,status_order)=>{
  return requestApi({
    method: "put",
    url: `order/change_status_order/${idOrder}`,
    data:{status_order},
    headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
  });
}
