import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Pagination,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import {
  getAllUsers,
  updateUserRole,
  getAllReferralsAdmin,
  updateReferralStatus,
} from "../Api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateStatus = () => {
  const [users, setUsers] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPage, setUserPage] = useState(1);
  const [referralPage, setReferralPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to view this page");
        setLoading(false);
        return;
      }

      const [usersResponse, referralsResponse] = await Promise.all([
        getAllUsers(token),
        getAllReferralsAdmin(token),
      ]);

      setUsers(usersResponse.users);
      setReferrals(referralsResponse.referrals);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data. Please try again.");
      setLoading(false);
    }
  };

  const handleUserPageChange = (event, newPage) => {
    setUserPage(newPage);
  };

  const handleReferralPageChange = (event, newPage) => {
    setReferralPage(newPage);
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to update roles");
        return;
      }

      await updateUserRole(token, userId, newRole);
      toast.success("User role updated successfully");
      fetchData(); // Refresh the user list
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update user role. Please try again.");
    }
  };

  const handleReferralStatusChange = async (referralId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to update referral status");
        return;
      }

      await updateReferralStatus(token, referralId, newStatus);
      toast.success("Referral status updated successfully");
      fetchData(); // Refresh the referral list
    } catch (error) {
      console.error("Error updating referral status:", error);
      toast.error("Failed to update referral status. Please try again.");
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  const indexOfLastUser = userPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const userPageCount = Math.ceil(users.length / itemsPerPage);

  const indexOfLastReferral = referralPage * itemsPerPage;
  const indexOfFirstReferral = indexOfLastReferral - itemsPerPage;
  const currentReferrals = referrals.slice(
    indexOfFirstReferral,
    indexOfLastReferral
  );
  const referralPageCount = Math.ceil(referrals.length / itemsPerPage);
  const handleDownloadResume = (resumeUrl) => {
    window.open(resumeUrl, "_blank");
  };
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 mt-8">All Referrals</h2>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="referrals table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Referrer
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Referred
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Resume
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Update Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentReferrals.map((referral) => (
              <TableRow
                key={referral._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" },
                }}>
                <TableCell
                  component="th"
                  scope="row">
                  {referral._id}
                </TableCell>
                <TableCell>{referral.referrer.name}</TableCell>
                <TableCell>{referral.referred.name}</TableCell>
                <TableCell>{referral.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleDownloadResume(referral.referred.resumeUrl)
                    }>
                    Download Resume
                  </Button>
                </TableCell>
                <TableCell>
                  <Select
                    value={referral.status}
                    onChange={(e) =>
                      handleReferralStatusChange(referral._id, e.target.value)
                    }
                    size="small">
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="accepted">Accepted</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-4 flex justify-center">
        <Pagination
          count={referralPageCount}
          page={referralPage}
          onChange={handleReferralPageChange}
          color="primary"
        />
      </div>
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="users table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Role
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Update Role
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" },
                }}>
                <TableCell
                  component="th"
                  scope="row">
                  {user._id}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    size="small">
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="employee">Employee</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-4 flex justify-center">
        <Pagination
          count={userPageCount}
          page={userPage}
          onChange={handleUserPageChange}
          color="primary"
        />
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default UpdateStatus;
