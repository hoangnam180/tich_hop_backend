const userService = require("../services/userService");
class UserController {
  // [GET] REGISTER
  register = async (req, res) => {
    const body = req.body;
    if (!body) {
      return res.status(500).json({
        errCode: 1,
        message: "Missing inputs parameter!",
      });
    }
    // console.log(body);
    let userData = await userService.handleUserRegister(body);
    // const userData = {};
    return res.status(200).json({
      errCode: userData?.errCode,
      message: userData?.errMessage,
      user: userData.user ? userData.user : {},
    });
  };

  login = async (req, res) => {
    const { user_name, password } = req.body;

    if (!user_name || !password) {
      return res.status(500).json({
        errCode: 1,
        message: "Missing inputs parameter!",
      });
    }

    let userData = await userService.handleUserLogin(user_name, password);
    //check email exist
    //password nhap vao ko dung
    //return userInfor
    // access_token :JWT json web token
    return res.status(200).json({
      errCode: userData.errCode,
      message: userData.errMessage,
      user: userData.user ? userData.user : {},
    });
  };
}

module.exports = new UserController();
