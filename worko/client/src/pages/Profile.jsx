import { useMyContext } from "../context/ContextProvider";

export default function Profile() {
  const { userdata } = useMyContext();
  console.log(userdata);

  // Function to handle resume download
  const handleDownload = () => {
    if (userdata && userdata.resumeUrl) {
      window.open(userdata.resumeUrl, "_blank");
    } else {
      alert("No resume URL found!");
    }
  };

  // Map over the userdata keys and render input fields dynamically
  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {userdata &&
              Object.keys(userdata).map((key) => (
                <div
                  key={key}
                  className="sm:col-span-4">
                  <label
                    htmlFor={key}
                    className="block text-sm/6 font-medium text-gray-900">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        id={key}
                        name={key}
                        type="text"
                        value={userdata[key]}
                        readOnly
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Resume download button */}
          {userdata && userdata.resumeUrl && (
            <div className="mt-8">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Download Resume
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
