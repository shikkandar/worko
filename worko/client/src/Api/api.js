import axios from "axios";

axios.defaults.baseURL = "https://worko-uml4.onrender.com/";

export async function RegiterUser(data) {
  try {
    const response = await axios.post("/auth/register", data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function LoginUser(data) {
  try {
    const response = await axios.post("/auth/login", data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMe(token) {
  try {
    const response = await axios.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

export async function referUser(data, token) {
  console.log(data);

  try {
    const response = await axios.post("/api/refer", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

export async function getReferrals(token) {
  try {
    const response = await axios.get("/api/referrals", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching referrals:", error);
    throw error;
  }
}

export async function getAllUsers(token) {
  try {
    const response = await axios.get("/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
}
