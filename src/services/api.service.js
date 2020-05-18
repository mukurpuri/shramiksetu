import axios from 'axios';
import { getBackendAPI } from '../config/config';
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const SendOTPToLogin = phoneNumber => {
    return axios.post( getBackendAPI() +'/user/login',{ 
      "phoneNumber": phoneNumber
    })
    .then(function (response) {
      // handle success
      return response;
    })
    .catch(function (error) {
      // handle error
      return error;
    })
    .then(function (status) {
      return status;
    })
}

export const SubmitOTPToLogin = (OTP, phoneNumber) => {
  return axios.post( getBackendAPI() +'/user/otp-submit',{ 
    "OTP": OTP,
    "phoneNumber": phoneNumber
  })
  .then(function (response) {
    // handle success
    return response;
  })
  .catch(function (error) {
    // handle error
    return error;
  })
  .then(function (status) {
    return status;
  })
}