exports.CreateAuthDTO = (email) => ({ email })

exports.CreateAccountResDTO = (message="Welcome to System") => ({ success:true, message })

exports.CreateLoginResDTO = (message="OTP send to email") => ({ success: true, message })

exports.VerifyPasswordDTO = (email, otp) => ({ email, otp })

exports.VerifyPasswordResDTO = (token, message="Login Success") => ({ success: true, token, message})

exports.ErrorResDTO = (message = "Something went wrong") => ({ success: false, message })
