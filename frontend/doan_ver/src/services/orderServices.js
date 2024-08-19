import requestApi from "../utils/requestApi";

const token = JSON.parse(localStorage.getItem("token"));
const user = JSON.parse(localStorage.getItem("currentUser"))?.data;

export const createOrderService = async (id, type) => {
    try {
        const respone = await requestApi({
            method: "get",
            url: `order/confirm?idUser=${user.id}&status=${id}&type=${type}`,
            headers: {
                Authorization: token,
            },
        });
        return respone.data;
    } catch (error) {
        return error;
    }
};

export const getAllOrderAnUserService = async (id, tokenUser) => {
    try {
        const respone = await requestApi({
            method: "get",
            url: `order/getAllOrder?idUser=${id}`,
            headers: {
                Authorization: tokenUser,
            },
        });
        return respone;
    } catch (error) {
        return error;
    }
};
export const deleteOrder = async (id, tokenCurrent) => {
    try {
        const respone = await requestApi({
            method: "delete",
            url: `order/delete`,
            data: JSON.stringify(id),
            headers: {
                "Content-Type": "application/json",
                Authorization: tokenCurrent,
            },
        });
        return respone.data;
    } catch (error) {
        return error;
    }
};
export const getDetailsOrderService = async (dataOrderDetail, tokenCurrent) => {
    try {
        const respone = await requestApi({
            method: "get",
            url: `order/detail/getAllByOrder?idOrder=${dataOrderDetail}`,
            headers: {
                Authorization: tokenCurrent,
            },
        });
        return respone.data;
    } catch (error) {
        return error;
    }
};

export const getAllOrderService = () => {
    return requestApi({
        method: "get",
        url: `order/all`,
        headers: {
            Authorization: token,
        },
    });
};


export const changeStatusOrderService = async (idOrder, status, tokenCurrent) => {
    return requestApi({
        method: "get",
        url: `order/confirmOrder?idOrder=${idOrder}&status=${status}`,
        headers: {
            Authorization: tokenCurrent,
        },
    });
}

export const getAllDoanhThu = () => {
    return requestApi({
        method: "get",
        url: `thongke/doanhthu`,
        headers: {
            Authorization: token,
        },
    });
};
