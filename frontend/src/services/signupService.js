import requestApi from "../utils/requestApi";

export const signupServices = async (dataSignup) => {
    try {
        const respone = await requestApi({
            method: "post",
            url: "user/add",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(dataSignup),
        });
        return respone;
    } catch (error) {
        return error;
    }
};
