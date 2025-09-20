import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/UserProfile.css";
import { asyncDeleteUser, asyncUpdateUser } from "../../services/userService.jsx";
import { asyncDeleteProduct } from "../../services/productService.jsx";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const user = useSelector((state) => state.userReducer.data);
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave =  () => {
     dispatch(asyncUpdateUser(formData));
    setEditMode(false);
  };
  const handleDelete =  () => {
     dispatch(asyncDeleteUser(user.id));
     navigate("/login");
    setEditMode(false);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">User Profile</h2>

      <div className="profile-card">
        {/* Username */}
        <div className="profile-row">
          <label>Name:</label>
          {editMode ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          ) : (
            <span>{user?.username}</span>
          )}
        </div>

        {/* Email */}
        <div className="profile-row">
          <label>Email:</label>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          ) : (
            <span>{user?.email}</span>
          )}
        </div>

        {/* Phone */}
        <div className="profile-row">
          <label>Phone:</label>
          {editMode ? (
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          ) : (
            <span>{user?.phone}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="profile-actions">
          {editMode ? (
            <>
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
                <button className="Delete-btn" onClick={handleDelete}>
                Delete Profile
              </button>
              <button className="cancel-btn" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </>
          ) : (
            <button className="edit-btn" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
