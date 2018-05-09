function getUrl (url) {
  return `/v3/${url}`
}

export { getUrl }

// auth
export const LOGIN_NORMAL = 'auth/signin/phone'
export const LOGIN_AD = 'auth/signin/ad'
export const REGISTER = 'signup'
export const SEND_VERIFY_CODE = 'sendVerifyCode'
export const VERIFY_CODE = 'verifyCode'
export const RESET_PASSWORD = 'resetPassword'

// user
export const GET_USER_INFO = 'users/detail'

// team
// room

// member
