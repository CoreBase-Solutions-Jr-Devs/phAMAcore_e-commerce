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
  const response = await API.get("/identity/current-client");
  return response.data;
};