import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../../../redux/features/auth/authApi";
import { setUser } from "../../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    username: user?.username || "",
    bio: user?.bio || "",
    profession: user?.profession || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile(formData).unwrap();
      dispatch(setUser({ user: res.user }));
      toast.success("Profile updated successfully ✨");
      navigate("/dashboard/user/profile");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile ❌");
    }
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Username"
        />

        <input
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Profession"
        />

        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows="4"
          placeholder="Bio"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
