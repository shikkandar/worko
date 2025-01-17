import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { RegiterUser } from "../Api/api";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    jobTitle: "",
    password: "",
    confirmPassword: "",
    resumeUrl: "",
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
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    toast.promise(RegiterUser(formData), {
      loading: "Registering...",
      success: (res) => {
        if (res.message === "User registered successfully") {
          navigate("/login");
          return "Registration successful!";
        } else {
          throw new Error("Unexpected response from server");
        }
      },
      error: (err) => {
        console.error("Registration failed:", err);
        return (
          err.response?.data?.message ||
          "Registration failed. Please try again."
        );
      },
    });
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
            <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              This information will be displayed publicly, so be careful what
              you share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Shikkandar"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
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
                  htmlFor="jobTitle"
                  className="block text-sm/6 font-medium text-gray-900">
                  Job Role
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                    <option value="">Select</option>
                    <option value="developer">Developer</option>
                    <option value="manager">Manager</option>
                    <option value="director">Director</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="resumeUrl"
                  className="block text-sm/6 font-medium text-gray-900">
                  Resume URL
                </label>
                <div className="mt-2">
                  <input
                    id="resumeUrl"
                    name="resumeUrl"
                    type="url"
                    placeholder="Enter resume URL"
                    value={formData.resumeUrl}
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
              <div className="sm:col-span-full">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm/6 font-medium text-gray-900">
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
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
            Register
          </button>
        </div>
        <p className="text-center">
          Already have account please{" "}
          <span
            className=" text-blue-800 cursor-pointer"
            onClick={() => navigate("/login")}>
            login now
          </span>
        </p>
      </form>
    </div>
  );
}
