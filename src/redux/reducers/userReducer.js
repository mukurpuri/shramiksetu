import _ from 'lodash';
const initialState = {
    user: {
      phoneNumber: null,
      token: null,
      id: null,
      isRegistered: null
    }
};
const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'OTP_STATUS': {
          return {
            ...state,
          }
        }

        case 'SEND_OTP_STATUS': {
          return {
            ...state,
            user: setUserMobileNumber(state.user, action.status, action.phoneNumber),
          }
        }

        case 'SET_USER': {
          return {
            ...state,
            user: setUser(state.user, action.params),
          }
        }

        default: {
            return state;
        }
    }
}
function setUserMobileNumber(data, status, phoneNumber) {
  const newData = Object.assign({}, data);
  newData.phoneNumber = phoneNumber;
  return newData;
}
function setUser(user, params) {
  const newUser = Object.assign({}, user);
  newUser.token = params.token;
  newUser.id = params.id;
  newUser.isRegistered = params.isRegistered;
  return newUser;
}
export default userReducer;