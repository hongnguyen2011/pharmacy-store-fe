import requestApi from "../utils/requestApi";

export const loginServices = async (dataLogin) => {
  try {
    const respone = await requestApi({
      method: "post",
      url: "user/login",
      data: {
        user_name: `${dataLogin.name}`,
        password: `${dataLogin.password}`,
      },
    });
    return respone;
  } catch (error) {
    return error;
  }
};


export const getCurrentUser = async (accessToken) => {
  try {
    const respone = await requestApi({
      method: "get", 
      url: "user/get_infor", 
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return respone
  } catch (error) {
    return error
  }
}