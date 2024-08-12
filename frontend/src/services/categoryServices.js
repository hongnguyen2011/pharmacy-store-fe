import requestApi from "../utils/requestApi";

export const getAllCategoryServices = async () => {
    try {
        const respone = await requestApi({
            url: "category/all",
            method: "get",
        });
        return respone.data;
    } catch (error) {
        return error;
    }
};
export const addCategoryService = (formData) => {
    return requestApi({
        url: "category/add",
        method: "post",
        data: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("token")),
        },
    });
};
export const deleteCategoryServices = async (id) => {
    try {
        const respone = await requestApi({
            url: "category/delete",
            method: "delete",
            data: JSON.stringify(id),
            headers: {
                "Content-Type": "application/json",
                Authorization: JSON.parse(localStorage.getItem("token")),
            },
        });
        return respone.data;
    } catch (error) {
        return error;
    }
};
export const editCategoryService = (formData) => {
    return requestApi({
        url: `category/edit`,
        method: "put",
        data: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("token")),
        },
    });
};

