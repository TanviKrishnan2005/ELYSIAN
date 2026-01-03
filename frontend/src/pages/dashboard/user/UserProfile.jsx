import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) return null;

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Profession:</strong> {user.profession || "—"}</p>
      <p><strong>Bio:</strong> {user.bio || "—"}</p>

      <Link
        to="/dashboard/user/profile/edit"
        className="inline-block mt-4 text-blue-600 font-medium"
      >
        Edit Profile →
      </Link>
    </div>
  );
};

export default UserProfile;
