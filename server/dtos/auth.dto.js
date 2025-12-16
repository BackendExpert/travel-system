exports.CreateAuthDTO = (email) => ({ email })

exports.CreateAccountResDTO = (token, message="Welcome to System") => ({ success:true, token, message })

exports.CreateLoginResDTO = (token, message="Logn Success") => ({ success: true, token, message })

exports.ErrorResDTO = (message = "Something went wrong") => ({ success: false, message })
