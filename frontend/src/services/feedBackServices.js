import requestApi from "../utils/requestApi";

export const getProductDetailFeedBackService = async (id) => {
  try {
    const respone = requestApi({
      method: "get",
      url: `feedback/get_all_feedback_product?idProduct=${id}`,
    });
    return respone;
  } catch (error) {
    return error;
  }
};

export const postFeedBackService = async (dataFeedBack) => {
    try {
        const respone = await requestApi({
            method: "post", 
            url: "feedback", 
            data: {
                product_id: `${dataFeedBack.id}`,
                comment_text: `${dataFeedBack.comment}`, 
                rating: `${dataFeedBack.rating}`,
            },
            headers: {
              Authorization: "Bearer " + `${dataFeedBack.accessToken}`,
            },
        })
        return respone
    } catch (error) {
        return error
    }
}