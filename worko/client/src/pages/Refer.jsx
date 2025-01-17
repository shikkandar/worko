import { useState } from "react";
import { toast } from "react-hot-toast";
import { referUser } from "../Api/api";
import { Toaster } from "react-hot-toast";

const Refer = () => {
  const [referredUserId, setReferredUserId] = useState("");

  const handleInputChange = (e) => {
    setReferredUserId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!referredUserId.trim()) {
      toast.error("User ID is required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to refer a user");
      return;
    }

    try {
      await referUser({ referredUserId }, token);
      toast.success("User referred successfully!");
      setReferredUserId(""); // Clear the input field
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while referring the user"
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
              Refer a User
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Enter the email address of the user you want to refer.
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
                    type="text"
                    placeholder="user@example.com"
                    value={referredUserId}
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
            Refer User
          </button>
        </div>
      </form>
    </div>
  );
};

export default Refer;
