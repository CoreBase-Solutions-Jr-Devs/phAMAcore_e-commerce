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

// export const signInMutationFn = async (data) => {
//   const response = await API.post("/identity/sign-in", data);
//   return response.data;
// };

export const GetBasketQueryFn = async (data) => {
  const response = await API.get("/basket", data);
  return response.data;
};

export const AddItemBasketMutationFn = async (data) => {
  const response = await API.post("/basket/items", data);
  return response.data;
};

export const RemoveItemBasketMutationFn = async (productId) => {
  const response = await API.delete(`/basket/items/${productId}`);
  return response.data;
};

export const UpdateItemQuantityMutationFn = async (data) => {
  const response = await API.put("/basket/items", data);
  return response.data;
};

export const CheckoutBasketMutationFn = async (data) => {
  const response = await API.post("/basket/checkout", data);
  return response.data;
};

export const getCurrentUserQueryFn = async () => {
  const response = await API.get("/identity/current-client");
  return response.data;
};

export const getProductByCategoryQueryFn = async (
  pageIndex = 0,
  pageSize = 20
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

export const getCategoriesFlatQueryFn = async () => {
  const response = await API.get("/categories", {
    withCredentials: false,
  });
  return response.data;
}
export const DeleteBasketMutationFn = async (data) => {
  const response = await API.delete("/basket", data);
  return response.data;
};

export const getOrderByIdQueryFn = async (orderId) => {
  const response = await API.get(`/orders/${orderId}`);
  return response.data;
};

export const getOrdersByCustomerQueryFn = async ({ customerId, pageIndex = 0, pageSize = 10 }) => {
  const response = await API.get(
    `/orders/customer/${customerId}?PageIndex=${pageIndex}&PageSize=${pageSize}`
  );
  return response.data;
};