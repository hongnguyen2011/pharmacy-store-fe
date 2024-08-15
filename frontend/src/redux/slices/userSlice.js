import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser, loginServices } from "../../services/loginServices";
import { signupServices } from "../../services/signupService";
import {
    editProfileService,
    getInforUserService,
    uploadAvatarService,
} from "../../services/userService";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        status: "idle",
        message: "logout",
        token: {},
        currentUser: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userLoginApi.pending, (state) => {
                state.status = "loading";
            })
            .addCase(userLoginApi.fulfilled, (state, action) => {
                action.payload.accessToken === undefined
                    ? (state.message = "Đăng nhập thất bại!")
                    : (state.message = "Đăng nhập thành công!");
                state.token = action.payload.accessToken;
                if (state.message === "Đăng nhập thành công!") {
                    state.currentUser = action.payload.currentUser;
                    localStorage.setItem(
                        "currentUser",
                        JSON.stringify(action.payload.currentUser)
                    );
                    localStorage.setItem("token", JSON.stringify(state.token));
                    state.status = 200;
                }
            })
            .addCase(userSignupApi.pending, (state) => {
                state.status = "loading";
            });
    },
});

export const userLoginApi = createAsyncThunk(
    "user/userLogin",
    async (dataLogin) => {
        const responeToken = await loginServices(dataLogin);
        const accessToken = responeToken.token;
        const responeCurrenUser = await getCurrentUser(accessToken);
        const respone = {
            accessToken,
            currentUser: responeCurrenUser.data,
        };
        return respone;
    }
);

export const userSignupApi = createAsyncThunk(
    "user/userSignup",
    async (dataSignup) => {
        const response = await signupServices(dataSignup);
        return response;
    }
);
export const editProfileApi = createAsyncThunk(
    "user/userEdit",
    async (userEdit) => {
        const response = await editProfileService( userEdit);
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        return response;
    }
);

export const uploadAvatarApi = (idUser, formData) => {
    return async (dispatch) => {
        try {
            await uploadAvatarService(idUser, formData);
            const { data } = await getInforUserService();
            localStorage.setItem("currentUser", JSON.stringify(data));
        } catch (error) {
            console.log(error);
        }
    };
};
