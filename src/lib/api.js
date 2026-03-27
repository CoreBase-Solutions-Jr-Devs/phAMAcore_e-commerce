import API, { ConfirmAPI } from "./axios-client";


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

export const GetCartQueryFn = async (data) => {
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
  const response = await API.post("/basket/items", data);
  return response.data;
};

export const CheckoutBasketMutationFn = async (data) => {
  const response = await API.post("/basket/checkout", data);
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

export const getCurrentLocationQueryFn = async ({ latitude, longitude }) => {
  const response = await API.get(
    `/locations/current?latitude=${latitude}&longitude=${longitude}`
  );
  return response.data;
};

export const InitiatePaymentMutationFn = async (orderId) => {
  const response = await API.post(
    `/orders/${orderId}/payments/initiate`,);
  return response.data;
};

export const postConfirmMpesaPaymentMutationFn = async ({ cuscode, transid = "" }) => {
  const response = await ConfirmAPI.post('/CashBookReceipt/AutoConfirmMpesaPayment', null, {
    params: { cuscode, transid }, 
     headers: { 
        dbname: "P9999DB",
      },
  });
  return response.data;
};