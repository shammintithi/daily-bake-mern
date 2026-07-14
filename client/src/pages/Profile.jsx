import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Profile() {
    const { user } = useAuth();

    const userName = user?.user?.name || user?.name || "";
    const userEmail = user?.user?.email || user?.email || "";

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: userName,
        email: userEmail,
    });

    return (
        <div className="max-w-5xl mx-auto py-12 px-6">

            <div className="bg-white shadow-xl rounded-3xl p-8">

                <div className="flex items-center gap-6">

                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-center text-4xl font-bold">
                        {userName.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold">
                            My Profile
                        </h1>

                        <p className="text-gray-500">
                            Manage your account information
                        </p>
                    </div>

                </div>

                <div className="mt-10 space-y-6">

                    <div>
                        <label className="font-semibold">
                            Full Name
                        </label>

                        <input
                            className="w-full mt-2 border rounded-xl p-3"
                            value={formData.name}
                            readOnly={!isEditing}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className="font-semibold">
                            Email
                        </label>

                        <input
                            className="w-full mt-2 border rounded-xl p-3"
                            value={formData.email}
                            readOnly={!isEditing}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                        />

                    </div>
                    ;

                    <button className="bg-amber-500 text-white px-6 py-3 rounded-xl">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="bg-amber-500 text-white px-6 py-3 rounded-xl"
                        >
                            {isEditing ? "Cancel" : "Edit Profile"}
                        </button>
                    </button>

                </div>

            </div>

        </div>
    );
}