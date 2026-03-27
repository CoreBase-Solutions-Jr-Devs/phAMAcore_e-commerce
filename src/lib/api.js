import API from "./axios-client";


// Identity ************

export const signUpMutationFn = async (data) => {
  const response = await API.post("/identity/sign-up", data);
  return response.data;
};

export const signInMutationFn = async (data) => {
  const response = await API.post("/identity/sign-in", data, {
    withCredentials: false,
  });
  return response.data;
};

export const signOutMutationFn = async (data) => {
  const response = await API.post("/identity/sign-out", data);
  return response.data;
};

export const refreshTokenMutationFn = async (data) => {
  const response = await API.post("/identity/refresh-token", data, {
    withCredentials: false,
  });
  return response.data;
};

export const getCurrentUserQueryFn = async () => {
  const response = await API.get("/identity/current-user");
  return response.data;
};

export const updateCurrentUserMutationFn = async (data) => {
  const response = await API.put("/identity/current-user", data);

  return response.data;
}

// Catalog ************

export const getProductByCategoryQueryFn = async (
  categoryName,
  pageIndex = 0,
  pageSize = 20
) => {
  const response = await API.get(`/products/category/${categoryName}`, {
    params: { pageIndex, pageSize },
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

export const getCategoriesFlatQueryFn = async () => {
  const response = await API.get("/categories", {
    withCredentials: false,
  });
  return response.data;
}