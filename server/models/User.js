import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    address: {
      phone: {
        type: String,
        default: "",
      },

      address: {
        type: String,
        default: "",
      },

      city: {
        type: String,
        default: "",
      },

      postalCode: {
        type: String,
        default: "",
      },

      country: {
        type: String,
        default: "Bangladesh",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);