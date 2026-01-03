import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEditProfileMutation } from "../../../redux/features/auth/authApi";
import { updateUser } from "../../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const [editProfile, { isLoading }] = useEditProfileMutation();

  const [formData, setFormData] = useState({
    username: user?.username || "",
    profession: user?.profession || "",
    bio: user?.bio || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await editProfile(formData).unwrap();
      dispatch(updateUser(res.user));
      alert("Profile updated successfully ✅");
      navigate("/dashboard/user/profile");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile ❌");
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
          placeholder="Username"
          className="w-full border p-2 rounded"
        />

        <input
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          placeholder="Profession"
          className="w-full border p-2 rounded"
        />

        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows="4"
          placeholder="Bio"
          className="w-full border p-2 rounded"
        />

        <button
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
