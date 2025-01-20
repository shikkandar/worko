import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { getReferrals, getAllUsers } from "../Api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyReferrals = () => {
  const [referrals, setReferrals] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [referralPage, setReferralPage] = useState(1);
  const [userPage, setUserPage] = useState(1);
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

      const [referralsResponse, usersResponse] = await Promise.all([
        getReferrals(token),
        getAllUsers(token),
      ]);

      setReferrals(referralsResponse.referrals);
      setUsers(usersResponse.users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data. Please try again.");
      setLoading(false);
    }
  };

  const handleDownloadResume = (resumeUrl) => {
    window.open(resumeUrl, "_blank");
  };

  const handleReferralPageChange = (event, newPage) => {
    setReferralPage(newPage);
  };

  const handleUserPageChange = (event, newPage) => {
    setUserPage(newPage);
  };

  if (loading) {
    return <CircularProgress />;
  }

  const indexOfLastReferral = referralPage * itemsPerPage;
  const indexOfFirstReferral = indexOfLastReferral - itemsPerPage;
  const currentReferrals = referrals.slice(
    indexOfFirstReferral,
    indexOfLastReferral
  );
  const referralPageCount = Math.ceil(referrals.length / itemsPerPage);

  const indexOfLastUser = userPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const userPageCount = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Referrals</h1>
      <TableContainer
        component={Paper}
        className="mb-8">
        <Table
          sx={{ minWidth: 650 }}
          aria-label="referrals table">
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
                Job Title
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Resume
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Status
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
                <TableCell>{referral.referred.name}</TableCell>
                <TableCell>{referral.referred.email}</TableCell>
                <TableCell>{referral.referred.jobTitle}</TableCell>
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
                <TableCell>{referral.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-4 mb-8 flex justify-center">
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
                Job Title
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Role
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
                <TableCell>{user.jobTitle}</TableCell>
                <TableCell>{user.role}</TableCell>
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

export default MyReferrals;
