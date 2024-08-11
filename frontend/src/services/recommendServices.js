// import axios from "axios";
import requestApi from "../utils/requestApi";

export const getAllProductRecommend = async () => {
  try {
    const respone = await requestApi({
      method: "get",
      url: "recommend",
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    });
    return respone.data;
  } catch (error) {
    return error;
  }
};

// export const getAllProductRecommend = async () => {
//     try {
//       const respone = await axios({
//         method: "get",
//         url: "http://192.168.1.80:8000/api/v1/recommend",
//         headers: {
//           Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
//         },
//       });
//       return respone.data;
//     } catch (error) {
//       return error;
//     }
//   };