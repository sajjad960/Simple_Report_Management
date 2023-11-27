const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utilies/AppError");
const { promisify } = require("util");

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  // Remove some feild from output
  (user.password = undefined),
    (user.passwordResetExpires = undefined),
    (user.passwordResetToken = undefined);

  res.status(statusCode).json({
    status: "success",
    token,
    user: user,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const {
      name,
      email,
      address,
      phone,
      profession,
      favoriteColors,
      password,
      passwordConfirm,
    } = req.body;

    const body = {
      name,
      email,
      address,
      phone,
      profession,
      favoriteColors,
      password,
      passwordConfirm,
    };
    // create user
    const newUser = await Users.create(body);

    // create token,
    createSendToken(newUser, 201, req, res);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if email and password exist
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }

    // check if user exist && password is correct
    const user = await Users.findOne({ email }).select("+password");

    if (!user || !(await user.currectPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 403));
    }

    // if everything ok, send token to client
    createSendToken(user, 201, req, res);
  } catch (err) {
    next(err);
  }
};

exports.protect = async (req, res, next) => {
  try {
    // Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new AppError("You are not log in! Please log in to get access", 401)
      );
    }
    // Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // Check if user still exists
    const currentUser = await Users.findById(decoded.id);

    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does n longer exist",
          401
        )
      );
    }
    // // Check if user changed password after the token was issued.
    // if(currentUser.changedPasswordAfter(decoded.iat)) {
    //     return next(new AppError('User recently change password. Please log in again', 400))
    // }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };

exports.refreshToken = async (req, res, next) => {
  try {
    // Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new AppError("You are not log in! Please log in to get access", 401)
      );
    }
    // Verify token before genarating new token.
    let decodedPayload = null;

    try {
      decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        // If the token has expired, capture the decoded payload before throwing the error
        decodedPayload = jwt.decode(token);
      } else {
        return res.status(401).json({ message: "Token is invalid" });
      }
    } 
    // Check if user still exists with toked decoded id
    const currentUser = await Users.findById(decodedPayload?.id);

    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does n longer exist",
          401
        )
      );
    }

    // genarate new token and send to client
    createSendToken(currentUser, 201, req, res);
  } catch (err) {
    next(err);
  }
};
