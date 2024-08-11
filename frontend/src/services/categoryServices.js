import requestApi from "../utils/requestApi";

export const getAllCategoryServices = () => {
  return requestApi({
    url: "category",
    method: "get",
  });
};
