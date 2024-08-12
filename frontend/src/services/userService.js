import requestApi from "../utils/requestApi";
const token = JSON.parse(localStorage.getItem("token"));

export const editProfileService = (userEdit, token) => {
    return requestApi({
        method: "put",
        url: `user/edit`,
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        data: JSON.stringify(userEdit)
    });
};

export const uploadAvatarService = (idUser, formData) => {
    return requestApi({
        method: "put",
        url: `user/upload-avatar/${idUser}`,
        headers: {
            Authorization: token,
        },
        data: formData
    });
};


export const getInforUserService = () => {
    return requestApi({
        method: "get",
        url: `user/get_infor`,
        headers: {
            Authorization: token,
        },

    });
};
export const getAllUserService = (token) => {
    console.log(token);
    return requestApi({
        method: "get",
        url: `user/all`,
        headers: {
            Authorization: token,
        },

    });
};
export const getAllRoleService = () => {
    return requestApi({
        method: "get",
        url: `role/all`,
        headers: {
            //Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },

    });
};
export const deleteUser = async (id) => {
    try {
        const respone = await requestApi({
            method: "delete",
            url: `user/delete`,
            data: JSON.stringify(id),
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });
        return respone.data;
    } catch (error) {
        return error;
    }
};

