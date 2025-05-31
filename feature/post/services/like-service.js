import { axiosInstance } from "@/config/axios-config";

export const postLike = async (body,postId) => {
    try {
      const response = await axiosInstance.post(`/posts/${postId}/likes`, body);
      const data = response.data;
  
      return {
        data,
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error.response.data.message || error.message,
      };
    }
  };


  export const getLike = async (body,postId) => {
    try {
      const response = await axiosInstance.post(`/posts/${postId}/likes`, body);
      const data = response.data;
  
      return {
        data,
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error.response.data.message || error.message,
      };
    }
  };