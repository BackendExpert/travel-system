const {
    ErrorResDTO,
    CreateAuthDTO,
    VerifyPasswordDTO
} = require("../dtos/auth.dto");
const AuthService = require("../services/auth.service");

const AuthController = {
    createAuth: async (req, res) => {
        try {
            const { email } = req.body

            const dto = CreateAuthDTO(email)

            const result = await AuthService.createAuth(dto.email, req)

            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    },

    verifypassword: async (req, res) => {
        try {
            const {
                email,
                otp
            } = req.body 

            const dto = VerifyPasswordDTO(email, otp)

            const result = await AuthService.verifyPassword(
                dto.email,
                dto.otp,
                req
            )

            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    }
};

module.exports = AuthController;