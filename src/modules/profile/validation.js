export const signupValidation = {
  email: {
    presence: {
      message: '^Please enter an email address'
    },
    email: {
      message: '^Please enter a valid email address'
    }
  },
  password: {
    presence: {
      message: '^Please enter a password'
    },
    length: {
      minimum: 5,
      message: '^Your password must be at least 5 characters'
    }
  },
}

export const changePasswordValidation = {
  currentPassword: {
    presence: {
      message: '^Please enter your password'
    },
  },
  newPassword: {
    presence: {
      message: '^Please enter a new password'
    },
    length: {
      minimum: 5,
      message: '^Your password must be at least 5 characters'
    }
  }
}

export const editProfileValidation = {
  newName: {
    presence: {
      message: '^Please enter what you wish your name to be updated to'
    },
  }
}

export const forgotPasswordValidation = {
  email: {
    presence: {
      message: '^Please enter your email address'
    },
    email: {
      message: '^Invalid email address'
    }
  },
}
