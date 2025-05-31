/** @format */

import {
  axiosInstance,
  axiosInstanceWithFormData,
} from "@/config/axios-config";

export const getPosts = async () => {
  try {
    const response = await axiosInstance.get("/posts");

    const data = response.data;

    return { data, success: true };
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message || error.message,
    };
  }
};

export const postPost = async (body) => {
  try {
    const response = await axiosInstance.post("/posts", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

export const updatePost = async (params, body) => {
  try {
    const response = await axiosInstance.put("/posts/" + params, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

export const deletePost = async (postId) => {
  try {
    const response = await axiosInstance.delete(`/posts/${postId}`);
    return { data: response.data, success: true };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
