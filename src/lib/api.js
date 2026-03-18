import API from "./axios-client";


// Identity ************

export const signUpMutationFn = async (data) => {
  const response = await API.post("/identity/sign-up", data);
  return response.data;
};

export const signInMutationFn = async (data) => {
  const response = await API.post("/identity/sign-in", data);
  return response.data;
};

export const getCurrentUserQueryFn = async () => {
  const response = await API.get("/identity/current-client");
  return response.data;
};

export const getProductByCategoryQueryFn = async (
  pageIndex = 0,
  pageSize = 10
) => {

  const response = await API.get(`/products/category`, {
    params: {
      pageIndex,
      pageSize,
    },
    withCredentials: false,
  });

  return response.data;
};

export const getProductByIdQueryFn = async (productId) => {
  if (!productId) throw new Error("Product ID is required");

  const response = await API.get(`/products/${productId}`,{
    withCredentials: false,
  });
  return response.data;
};

export const getProductsWithPaginationQueryFn = async ({
  pageIndex = 0,
  pageSize = 20,
}) => {
  const response = await API.get(`/products`, {
    params: {
      pageIndex,
      pageSize,
    },
    withCredentials: false,
  });

  return response.data;
};

export const getCategoriesHierarchyQueryFn = async () => {
  const response = await API.get("/categories/hierarchy", {
    withCredentials: false,
  });
  return response.data;
};