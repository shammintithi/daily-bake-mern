import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FaUser,
  FaMapMarkerAlt,
  FaKey,
  FaHistory,
  FaEdit,
} from "react-icons/fa";

import {
  getProfile,
  updateUserProfile,
  changeUserPassword,
  updateUserAddress,
} from "../services/authService";

export default function Profile() {
  const { user, login } = useAuth();

  // Profile state must be declared before using profile?.name
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("info");
  const [isEditing, setIsEditing] = useState(false);

  const userName =
    profile?.name ||
    user?.user?.name ||
    user?.name ||
    "";

  const userEmail =
    profile?.email ||
    user?.user?.email ||
    user?.email ||
    "";

  const isAdmin =
    profile?.isAdmin ||
    user?.user?.isAdmin ||
    user?.isAdmin ||
    false;

  const [personalInfo, setPersonalInfo] = useState({
  name: user?.user?.name || user?.name || "",
  email: user?.user?.email || user?.email || "",
});
  const [addressInfo, setAddressInfo] = useState(() => {
    const saved = localStorage.getItem("userAddress");

    return saved
      ? JSON.parse(saved)
      : {
          address: "",
          city: "",
          postalCode: "",
          country: "Bangladesh",
          phone: "",
        };
  });

  const [passwordInfo, setPasswordInfo] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch profile from backend
// Fetch profile from backend
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const savedUser = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const token = savedUser?.token;

      if (!token) {
        setLoading(false);
        return;
      }

      const data = await getProfile(token);

      setProfile(data);

      setPersonalInfo({
        name: data.name || "",
        email: data.email || "",
      });

      // Load saved address from MongoDB
      if (data.address) {
        setAddressInfo(data.address);
      }

    } catch (error) {
      console.error(
        "Failed to fetch profile:",
        error
      );

      toast.error("Failed to load profile");

    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);

  // Sync local user information
  useEffect(() => {
  if (!profile) {
    setPersonalInfo({
      name: userName,
      email: userEmail,
    });
  }
}, [profile, userName, userEmail]);

  // Save personal information
const handleInfoSave = async (e) => {
  e.preventDefault();

  if (!personalInfo.name || !personalInfo.email) {
    toast.error("Name and Email are required");
    return;
  }

  try {
    const savedUser = JSON.parse(
      localStorage.getItem("userInfo")
    );

    const token = savedUser?.token;

    if (!token) {
      toast.error("Authentication token not found");
      return;
    }

    const data = await updateUserProfile(
      {
        name: personalInfo.name,
        email: personalInfo.email,
      },
      token
    );

    const updatedUser = {
      ...user,
      ...data.user,
    };

    login(updatedUser);

    setProfile(data.user);

    setIsEditing(false);

    toast.success(
      "Profile details updated successfully!"
    );

  } catch (error) {
    console.error(
      "Profile update failed:",
      error
    );

    toast.error(
      error.response?.data?.message ||
      "Failed to update profile"
    );
  }
};

  // Save address
  const handleAddressSave = async (e) => {
  e.preventDefault();

  try {
    const savedUser = JSON.parse(
      localStorage.getItem("userInfo")
    );

    const token = savedUser?.token;

    if (!token) {
      toast.error(
        "Authentication token not found"
      );

      return;
    }

    const data = await updateUserAddress(
      addressInfo,
      token
    );

    setAddressInfo(data.address);

    toast.success(
      "Address saved successfully!"
    );

  } catch (error) {
    console.error(
      "Address update failed:",
      error
    );

    toast.error(
      error.response?.data?.message ||
      "Failed to save address"
    );
  }
};
  // Change password
const handlePasswordSave = async (e) => {
  e.preventDefault();

  if (
    !passwordInfo.oldPassword ||
    !passwordInfo.newPassword ||
    !passwordInfo.confirmPassword
  ) {
    toast.error(
      "Please fill in all password fields"
    );

    return;
  }

  if (
    passwordInfo.newPassword !==
    passwordInfo.confirmPassword
  ) {
    toast.error(
      "New passwords do not match"
    );

    return;
  }

  if (
    passwordInfo.newPassword.length < 6
  ) {
    toast.error(
      "New password must be at least 6 characters"
    );

    return;
  }

  try {
    const savedUser = JSON.parse(
      localStorage.getItem("userInfo")
    );

    const token = savedUser?.token;

    if (!token) {
      toast.error(
        "Authentication token not found"
      );

      return;
    }

    await changeUserPassword(
      {
        oldPassword:
          passwordInfo.oldPassword,

        newPassword:
          passwordInfo.newPassword,
      },
      token
    );

    toast.success(
      "Password changed successfully!"
    );

    setPasswordInfo({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  } catch (error) {
    console.error(
      "Password change failed:",
      error
    );

    toast.error(
      error.response?.data?.message ||
      "Failed to change password"
    );
  }
};

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-bakery-burgundy font-semibold">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-16 px-6">

      {/* Profile Overview Card */}
      <div className="bg-white border border-bakery-cream/35 shadow-sm rounded-3xl p-8 mb-10 flex flex-col md:flex-row items-center gap-6">

        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-bakery-burgundy to-bakery-terracotta text-white flex items-center justify-center text-4xl font-serif font-black shadow-lg shadow-bakery-burgundy/10">
          {userName
            ? userName.charAt(0).toUpperCase()
            : "U"}
        </div>

        <div className="text-center md:text-left flex-grow">

          <h1 className="text-3xl font-black font-serif text-bakery-burgundy">
            {userName || "User"}
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            {userEmail}
          </p>

          <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">

            <span className="inline-block px-3 py-1 bg-bakery-creamLight text-bakery-terracotta border border-bakery-cream text-xs font-bold rounded-full uppercase tracking-wider">
              {isAdmin
                ? "👑 Administrator"
                : "🥯 Registered Customer"}
            </span>

          </div>

        </div>

        <Link
          to="/my-orders"
          className="flex items-center gap-2 px-6 py-3.5 bg-bakery-creamLight text-bakery-burgundy hover:bg-bakery-cream border border-bakery-creamDark/20 rounded-2xl text-xs font-bold uppercase tracking-wider transition"
        >
          <FaHistory />
          Order History
        </Link>

      </div>


      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">

        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 bg-white border border-bakery-cream/35 rounded-3xl p-6 space-y-2 shadow-sm">

          <button
            onClick={() => setActiveTab("info")}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition ${
              activeTab === "info"
                ? "bg-bakery-burgundy text-white"
                : "text-gray-600 hover:bg-bakery-creamLight hover:text-bakery-burgundy"
            }`}
          >
            <FaUser className="text-sm" />
            Personal Info
          </button>


          <button
            onClick={() => setActiveTab("address")}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition ${
              activeTab === "address"
                ? "bg-bakery-burgundy text-white"
                : "text-gray-600 hover:bg-bakery-creamLight hover:text-bakery-burgundy"
            }`}
          >
            <FaMapMarkerAlt className="text-sm" />
            Saved Address
          </button>


          <button
            onClick={() => setActiveTab("password")}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition ${
              activeTab === "password"
                ? "bg-bakery-burgundy text-white"
                : "text-gray-600 hover:bg-bakery-creamLight hover:text-bakery-burgundy"
            }`}
          >
            <FaKey className="text-sm" />
            Security Settings
          </button>

        </div>


        {/* Tab Contents */}
        <div className="lg:col-span-3 bg-white border border-bakery-cream/35 rounded-3xl p-8 shadow-sm">


          {/* PERSONAL INFORMATION */}
          {activeTab === "info" && (

            <form
              onSubmit={handleInfoSave}
              className="space-y-6"
            >

              <h2 className="text-2xl font-bold font-serif text-bakery-burgundy border-b pb-3 mb-6 flex items-center gap-2">
                Personal Information
                <FaEdit className="text-sm text-bakery-terracotta" />
              </h2>


              <div className="space-y-4">

                <div>

                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={personalInfo.name}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        name: e.target.value,
                      })
                    }
                    className="w-full border border-bakery-creamDark/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bakery-terracotta text-sm disabled:bg-gray-50"
                    disabled={!isEditing}
                    required
                  />

                </div>


                <div>

                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        email: e.target.value,
                      })
                    }
                    className="w-full border border-bakery-creamDark/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bakery-terracotta text-sm disabled:bg-gray-50"
                    disabled={!isEditing}
                    required
                  />

                </div>

              </div>


              <div className="flex gap-3 pt-4 border-t border-bakery-cream/20">

                {isEditing ? (

                  <>

                    <button
                      type="submit"
                      className="px-6 py-3 bg-bakery-burgundy hover:bg-bakery-terracotta text-white rounded-xl font-bold text-xs uppercase tracking-wider transition"
                    >
                      Save Changes
                    </button>


                    <button
                      type="button"
                      onClick={() => {
                        setPersonalInfo({
                          name: userName,
                          email: userEmail,
                        });

                        setIsEditing(false);
                      }}
                      className="px-6 py-3 border border-bakery-creamDark text-gray-600 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>

                  </>

                ) : (

                  <button
  type="button"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
  }}
  className="px-6 py-3 bg-bakery-terracotta hover:bg-bakery-burgundy text-white rounded-xl font-bold text-xs uppercase tracking-wider transition"
>
  Edit Profile
</button>

                )}

              </div>

            </form>

          )}


          {/* SAVED ADDRESS */}
          {activeTab === "address" && (

            <form
              onSubmit={handleAddressSave}
              className="space-y-6"
            >

              <h2 className="text-2xl font-bold font-serif text-bakery-burgundy border-b pb-3 mb-6">
                Saved Shipping Address
              </h2>


              <div className="space-y-4">

                <div>

                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Contact Phone
                  </label>

                  <input
                    type="text"
                    value={addressInfo.phone}
                    onChange={(e) =>
                      setAddressInfo({
                        ...addressInfo,
                        phone: e.target.value,
                      })
                    }
                    placeholder="Phone number"
                    className="w-full border border-bakery-creamDark/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bakery-terracotta text-sm"
                  />

                </div>


                <div>

                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Street Address
                  </label>

                  <textarea
                    value={addressInfo.address}
                    onChange={(e) =>
                      setAddressInfo({
                        ...addressInfo,
                        address: e.target.value,
                      })
                    }
                    placeholder="Apartment, building, street address"
                    rows="3"
                    className="w-full border border-bakery-creamDark/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bakery-terracotta text-sm"
                  />

                </div>


                <div className="grid grid-cols-2 gap-4">

                  <div>

                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                      City
                    </label>

                    <input
                      type="text"
                      value={addressInfo.city}
                      onChange={(e) =>
                        setAddressInfo({
                          ...addressInfo,
                          city: e.target.value,
                        })
                      }
                      placeholder="City"
                      className="w-full border border-bakery-creamDark/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bakery-terracotta text-sm"
                    />

                  </div>


                  <div>

                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                      Postal Code
                    </label>

                    <input
                      type="text"
                      value={addressInfo.postalCode}
                      onChange={(e) =>
                        setAddressInfo({
                          ...addressInfo,
                          postalCode: e.target.value,
                        })
                      }
                      placeholder="Postal Code"
                      className="w-full border border-bakery-creamDark/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bakery-terracotta text-sm"
                    />

                  </div>

                </div>


                <div>

                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Country
                  </label>

                  <input
                    type="text"
                    value={addressInfo.country}
                    onChange={(e) =>
                      setAddressInfo({
                        ...addressInfo,
                        country: e.target.value,
                      })
                    }
                    placeholder="Country"
                    className="w-full border border-bakery-creamDark/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bakery-terracotta text-sm"
                  />

                </div>

              </div>


              <div className="pt-4 border-t border-bakery-cream/20">

                <button
                  type="submit"
                  className="px-6 py-3 bg-bakery-burgundy hover:bg-bakery-terracotta text-white rounded-xl font-bold text-xs uppercase tracking-wider transition"
                >
                  Save Address
                </button>

              </div>

            </form>

          )}


          {/* SECURITY SETTINGS */}
          {activeTab === "password" && (

            <form
              onSubmit={handlePasswordSave}
              className="space-y-6"
            >

              <h2 className="text-2xl font-bold font-serif text-bakery-burgundy border-b pb-3 mb-6">
                Change Password Security
              </h2>


              <div className="space-y-4">

                <div>

                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Current Password
                  </label>

                  <input
                    type="password"
                    value={passwordInfo.oldPassword}
                    onChange={(e) =>
                      setPasswordInfo({
                        ...passwordInfo,
                        oldPassword: e.target.value,
                      })
                    }
                    placeholder="••••••••"
                    className="w-full border border-bakery-creamDark/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bakery-terracotta text-sm"
                  />

                </div>


                <div>

                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    New Password
                  </label>

                  <input
                    type="password"
                    value={passwordInfo.newPassword}
                    onChange={(e) =>
                      setPasswordInfo({
                        ...passwordInfo,
                        newPassword: e.target.value,
                      })
                    }
                    placeholder="••••••••"
                    className="w-full border border-bakery-creamDark/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bakery-terracotta text-sm"
                  />

                </div>


                <div>

                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Confirm New Password
                  </label>

                  <input
                    type="password"
                    value={passwordInfo.confirmPassword}
                    onChange={(e) =>
                      setPasswordInfo({
                        ...passwordInfo,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="••••••••"
                    className="w-full border border-bakery-creamDark/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bakery-terracotta text-sm"
                  />

                </div>

              </div>


              <div className="pt-4 border-t border-bakery-cream/20">

                <button
                  type="submit"
                  className="px-6 py-3 bg-bakery-burgundy hover:bg-bakery-terracotta text-white rounded-xl font-bold text-xs uppercase tracking-wider transition"
                >
                  Update Password
                </button>

              </div>

            </form>

          )}

        </div>

      </div>

    </div>
  );
}