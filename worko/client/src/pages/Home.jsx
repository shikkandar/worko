import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[90vh] gap-4">
      <h1 className="text-9xl font-bold">WORKO</h1>
      <p className="text-3xl font-semibold">
        Apply for Jobs with Our Trusted Job Referral Platform
      </p>
      <Button
        variant="outlined"
        onClick={() => navigate("/register")}>
        Apply Now
      </Button>
    </div>
  );
};

export default Home;
