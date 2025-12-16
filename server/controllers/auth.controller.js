const {
    ErrorResDTO,
    CreateAuthDTO
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
    }
};

module.exports = AuthController;