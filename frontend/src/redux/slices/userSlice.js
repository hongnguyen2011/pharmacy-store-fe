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
        state.status = "idle";
        action.payload.accessToken === undefined
          ? (state.message = "LoginFail")
          : (state.message = "LoginSuccess");
        state.token = action.payload.accessToken;
        if (state.message === "LoginSuccess") {
          state.currentUser = action.payload.currentUser;
          localStorage.setItem(
            "currentUser",
            JSON.stringify(action.payload.currentUser)
          );
          localStorage.setItem("token", JSON.stringify(state.token));
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
    const accessToken = responeToken.data.accessToken;
    const responeCurrenUser = await getCurrentUser(accessToken);
    const respone = {
      accessToken,
      currentUser: responeCurrenUser.data,
    };
    console.log(respone);
    return respone;
  }
);

export const userSignupApi = createAsyncThunk(
  "user/userSignup",
  async (dataSignup) => {
    await signupServices(dataSignup);
  }
);
export const editProfileApi = (userId, userEdit, token) => {
  return async (dispatch) => {
    const { data } = await editProfileService(userId, userEdit, token);

    localStorage.setItem("currentUser", JSON.stringify(data));
  };
};

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
