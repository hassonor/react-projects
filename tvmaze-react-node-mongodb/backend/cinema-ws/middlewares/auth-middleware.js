import expressJwt from "express-jwt"

export const requireSignIn = expressJwt({
    secret: config.JWT_SECRET,
    algorithms: ["HS256"],
})

