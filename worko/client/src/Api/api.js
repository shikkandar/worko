import axios from "axios";

axios.defaults.baseURL = "https://worko-uml4.onrender.com";

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

export const getAllReferralsAdmin = async (token) => {
  try {
    const response = await axios.get("/api/admin/referrals", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch all referrals");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching all referrals:", error);
    throw error;
  }
};

export const updateUserRole = async (token, userId, newRole) => {
  try {
    const response = await axios.put(
      "/api/admin/user-role",
      {
        userId: userId,
        newRole: newRole,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to update user role");
    }

    return response.data;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};
export const updateReferralStatus = async (token, referralId, newStatus) => {
  try {
    const response = await axios.put(
      "/api/admin/referral-status",
      {
        referralId: referralId,
        newStatus: newStatus,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to update referral status");
    }

    return response.data;
  } catch (error) {
    console.error("Error updating referral status:", error);
    throw error;
  }
};
