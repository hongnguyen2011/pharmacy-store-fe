import requestApi from "../utils/requestApi";
const token = JSON.parse(localStorage.getItem("token"));

export const getAllProductService = async () => {
    try {
        const respone = await requestApi({
            method: "get",
            url: "product/all",
        });
        return respone.data;
    } catch (error) {
        return error;
    }
};

export const getDetailService = async (id) => {
    try {
        const respone = await requestApi({
            method: "get",
            url: `product?id=${id}`,
        });
        return respone.data;
    } catch (error) {
        return error;
    }
};
export const deleteProduct = async (id, tokenCurrent) => {
    try {
        const respone = await requestApi({
            method: "delete",
            url: `product/delete`,
            data: JSON.stringify(id),
            headers: {
                "Content-Type": "application/json",
                Authorization: tokenCurrent,
            }
        });
        return respone.data;
    } catch (error) {
        return error;
    }
};
export const addProductService = (formData) => {
    return requestApi({
        url: "product/add",
        method: "post",
        data: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    });
};

export const editProductService = (formData) => {
    return requestApi({
        url: `product/edit`,
        method: "put",
        data: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    });
};

export const changeStatusProductService = (idProduct, status_number) => {
    return requestApi({
        url: `product/change_status/${idProduct}`,
        method: "put",
        data: { status_number },
        headers: {
            Authorization: JSON.parse(localStorage.getItem("token")),
        },
    });
};
