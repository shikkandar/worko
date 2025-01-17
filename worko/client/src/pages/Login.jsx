import { useState } from "react";
import { LoginUser } from "../Api/api";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await LoginUser(formData);
      if (
        response &&
        response.message === "Login successful" &&
        response.token
      ) {
        // Store the token in local storage
        localStorage.setItem("token", response.token);

        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000); // Short delay to allow the success toast to be visible
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center p-10">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <form
        className="bg-slate-200 p-7 w-[50%]"
        onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Login to dashboard
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              This is your private dashboard.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="mohammedshik3@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm/6 font-semibold text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex rounded-md border border-transparent bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 hover:bg-indigo-700">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
