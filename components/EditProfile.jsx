"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import updateProfile from "@/app/actions/updateProfile";

const EditProfileForm = ({ profile }) => {
//   console.log(profile);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const updateHandler = async (e) => {
    e.preventDefault(); // prevent default form submission
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form); // collect form inputs
    try {
      await updateProfile(formData);
      setLoading(false);
      setShowConfirm(false);
      toast.success("user updated successfully");
      router.push(`/profile/${profile.id}`);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("User could not be updated");
    }
  };
  return (
    <>
      {" "}
      <form
        id="edit-user-form"
        onSubmit={updateHandler}
        className="max-w-lg mx-auto bg-white shadow-md rounded-2xl p-8 mt-10 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Edit Profile
        </h2>

        <div className="flex flex-col">
          <label htmlFor="title" className="text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            disabled
            defaultValue={profile.username}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="salary" className="text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            disabled
            defaultValue={profile.email}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="location" className="text-gray-700 font-medium mb-2">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            defaultValue={profile.company || `No company added`}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-gray-700 font-medium mb-2"
          >
            Role
          </label>
          <textarea
            name="description"
            id="description"
            // defaultValue={job.description}
            className="border border-gray-300 rounded-lg px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div> */}

        <div className="flex flex-col">
          <label htmlFor="company" className="text-gray-700 font-medium mb-2">
            Role
          </label>
          <input
            id="role"
            name="role"
            type="text"
            defaultValue={profile.role || `No role added`}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-cyan-600 transition"
        >
          Update Profile
        </button>

        <button className="w-full bg-cyan-500 text-white font-semibold py-2 rounded-lg hover:bg-cyan-600 transition">
          Go back
        </button>
      </form>
      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to update your information?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                form="edit-user-form"
                type="submit"
                // onClick={() => updateHandler}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                {loading ? "Updating..." : "Yes, Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfileForm;
