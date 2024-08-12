import requestApi from "../utils/requestApi";

const user = JSON.parse(localStorage.getItem("currentUser"))?.data;
const token = JSON.parse(localStorage.getItem("token"));

// Thêm mới 1 order detail
export const addProductToCartService = async (dataCart) => {
    let data = dataCart.data;
    let idOrder = "";
    try {
        const respon = await getOrderNotPayment(token);
        if (respon.status === 400) {
            const _respon = await createNewOrrder(token);
            idOrder = _respon.data.id;
        } else {
            idOrder = respon.data.id;
        }
        data = { ...data, idOrder };
        const respon_1 = await createNewDetailOrrder(token, data);
        return {
            result: respon_1,
            idOrder
        };

    } catch (error) {
        return error;
    }
};
export const createNewDetailOrrder = async (accessToken, _data) => {
    try {
        const respone = await requestApi({
            method: "post",
            url: `order/detail/add`,
            headers: {
                "Content-Type": "application/json",
                Authorization: accessToken,
            },
            data: JSON.stringify(_data),
        });
        return respone.data;
    } catch (error) {
        return error.response.data
    }
}
//Tạo mới 1 order
export const createNewOrrder = async (accessToken) => {
    const _data = {
        idUser: user.id
    }
    try {
        const respone = await requestApi({
            method: "post",
            url: `order/add`,
            headers: {
                "Content-Type": "application/json",
                Authorization: accessToken,
            },
            data: JSON.stringify(_data),
        });
        return respone.data;
    } catch (error) {
        return error.response.data
    }
}
//lấy order chưa thanh toán
export const getOrderNotPayment = async (accessToken) => {

    try {
        const respone = await requestApi({
            method: "get",
            url: `order/getOrderNotPay?idUser=${user.id}`,
            headers: {
                Authorization: accessToken,
            },
        });
        return respone.data;
    } catch (error) {
        return error.response.data
    }
}
//Lấy danh sách detail order
export const getAllCartItemService = async (accessToken) => {
    try {
        const idOrder = (await getOrderNotPayment(accessToken))?.data.id;
        const respone = await requestApi({
            method: "get",
            url: `order/detail/getAllByOrder?idOrder=${idOrder}`,
            headers: {
                Authorization: accessToken,
            },
        });
        return respone.data;
    } catch (error) {
        return error.response.data
    }
};
//Xóa 1 detail order
export const deleteCartItemService = async (accessToken, dataCartDelete) => {
    try {
        const respone = await requestApi({
            method: "delete",
            url: `order/detail/delete`,
            headers: {
                "Content-Type": "application/json",
                Authorization: accessToken,
            },
            data: JSON.stringify(dataCartDelete.id),
        });
        return respone;
    } catch (error) {
        return error
    }
};