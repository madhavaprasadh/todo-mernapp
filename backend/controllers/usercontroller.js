import { users } from "../data/users.js";

export const getuserdata = async (req, res) => {
  try {
    const userId = req.userId;
    const user = users.find((item) => item.id === userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      userdata: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
