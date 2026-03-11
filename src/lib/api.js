import API from "./axios-client";


// Identity ************

export const signUpMutationFn = async (data) => {
  const response = await API.post("/identity/sign-up", data);
  return response.data;
};

export const getCurrentUserQueryFn = async () => {
  const response = await API.get("/identity/current-client");
  return response.data;
};