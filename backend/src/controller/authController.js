const userModel = require("../module/UserModule");
const refreshTokens = require("../module/refreshTokens");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = {
  getUser: async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user.id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },

  getUsers: async (req, res, next) => {
    try {
      const users = await userModel.find();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      await userModel.findByIdAndDelete(req.params.id);
      res.status(200).send("delete user success");
    } catch (error) {
      next(error);
    }
  },
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
        user_type: user.user_type,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "365d" }
    );
  },
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
        user_type: user.user_type,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },

  isRegister: async (req, res, next) => {
    try {
      const existingUser = await userModel.findOne({
        username: req.body.username,
      });
      if (existingUser) {
        return res.status(500).json("User already exists");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        user_type: req.body.user_type,
      });

      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },

  isLogin: async (req, res, next) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(301).send("User does not exist");
      }

      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) {
        return res.status(404).send("Wrong username or password");
      }

      const accessToken = userController.generateAccessToken(user);
      const refreshToken = userController.generateRefreshToken(user);

      //save mongodb
      const newRefreshTokenDB = new refreshTokens({
        refreshToken: refreshToken,
        accessToken: accessToken,
        // token: refreshToken
      });
      await newRefreshTokenDB.save();
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Chỉ gửi cookie qua HTTPS trong production
        path: "/",
        sameSite: "strict",
      });

      const { password, ...others } = user._doc;
      res.status(200).json({ ...others, accessToken, refreshToken });
    } catch (err) {
      next(err);
    }
  },

  refreshAccessToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("You're not authenticated");

    const dbToken = await refreshTokens.findOne({ refreshToken });
    if (!dbToken) return res.status(403).json("Refresh Token is not valid!");

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
      if (err) return res.status(403).json("Token is not valid!");

      const newAccessToken = userController.generateAccessToken(user);
      const newRefreshToken = userController.generateRefreshToken(user);

      // Xóa refreshToken cũ sau khi tạo thành công token mới
      await refreshTokens.findByIdAndDelete(dbToken._id);

      // Lưu refreshToken mới vào cơ sở dữ liệu
      const newRefreshTokenDB = new refreshTokens({
        refreshToken: newRefreshToken,
        accessToken: newAccessToken,
      });
      await newRefreshTokenDB.save();

      // Gửi refreshToken mới qua cookie
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Sử dụng secure cookie nếu ở môi trường production
        path: "/",
        sameSite: "strict",
      });

      res
        .status(200)
        .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    });
  },
  changePassword: async (req, res, next) => {
    try {
      const { username, oldPassword, newPassword } = req.body;
      
      const user = await userModel.findOne({ username: username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Mật khẩu cũ không đúng" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: "Mật khẩu đã được thay đổi" });
    } catch (err) {
      next(err);
    }
  },
  logOut: async (req, res) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) return res.status(401).json("No authorization header");
    const token = authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json("No token to logout");
  
    const deletedToken = await refreshTokens.deleteOne({ accessToken: token });
  
    if (deletedToken.deletedCount === 0) {
      return res.status(404).json("Token not found");
    }
  
    res.status(200).json("Logged out successfully!");
  },
};

module.exports = userController;
