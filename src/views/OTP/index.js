import React from 'react';
import { PersistGate } from 'redux-persist/es/integration/react'
import Footer from '../../components/footer/';
import { connect } from 'react-redux';
import Language from '../../config/languages/Language';
import PromptInputs from '../../components/userPrompts/inputs';
import ScreenLoader from '../../components/screenLoader/';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import TirangaBorder from '../../components/tiranga/';
import { OTPStatus, SetUser } from '../../redux/actions/user';
import { toggleLoader } from '../../redux/actions/settings';
import { SubmitOTPToLogin } from '../../services/api.service';
import './style.scss';

class OTP extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            OTP: "",
            showOTPError: false,
        }
    }

    mobileValidate = evt => {
        const OTP = (evt.target.validity.valid) ? evt.target.value : this.state.OTP;    
        if(OTP.length <= 6) {
            this.setState({ OTP });
        }
    }
    
    submitOTP = async () => {
        this.props.toggleLoader();
        const { settings, user } = this.props;
        if(!this.state.OTP) {
            this.setState({
                showOTPError: true
            })
        }
        if(user && user.phoneNumber) {
            await SubmitOTPToLogin(this.state.OTP, user.phoneNumber).then( res => {
                if(res.status === 200) {
                    const { token, id, isRegistered } = res.data;
                    this.props.SetUser(token, id, isRegistered);
                    this.props.toggleLoader();
                } else {
                    this.setState({
                        showOTPError: true
                    })
                }
            })
        }
    }

    render() {
        
        const { user, settings } = this.props;
        let currentLanguage = settings.language;
        if(!user.phoneNumber) {
            this.props.history.push('/');
        }
        return (
            <React.Fragment>
                <TirangaBorder/>
                <div className="container">
                    <div className="row txt-center ">
                        <div className="col-sm-12 col-lg-6 m-x-auto">
                            <h1 className="main-title">{Language.get("title","name",currentLanguage)}</h1>
                            <p>
                                <img width="100" src="./smsIcon.svg" />
                            </p>
                            <h2 className="subtitle">
                                {Language.get("otpPage","title",currentLanguage)}
                            </h2>
                            <h3>
                                {Language.get("otpPage","subtitle",currentLanguage)}
                            </h3>
                            <p className="m-t-lg rel">
                                <input pattern="[0-9]*" value={this.state.OTP} onChange={this.mobileValidate} placeholder={Language.get("otpPage","placeholderInputText",currentLanguage)} className="full input-text OTP phoneNumber" />
                            </p>
                                <PromptInputs showError={this.state.showOTPError} type="error" text={Language.get("otpPage","otpErrorNotreceived",currentLanguage)} />
                            <p>
                                <button onClick={this.submitOTP} className="btn btn-primary full btn-lg">{Language.get("otpPage","submitButton",currentLanguage)}</button>
                            </p>
                            {/* <hr/>
                            <p>
                                <Link to="/" className='bordered login'>{Language.get("links","createAccount",currentLanguage)}</Link>
                            </p> */}
                        </div>
                    </div>
                </div>
                <Footer/>
                <ScreenLoader/>
            </React.Fragment>
        );   
    }
}
const mapStateToProps = state => {
    return {
      settings: state.settingsReducer.settings,
      user: state.userReducer.user
    };
  };
  
const mapDispatchToProps = (dispatch) => {
    return {
        OTPStatus: status => dispatch(OTPStatus(status)),
        toggleLoader: () => dispatch(toggleLoader()),
        SetUser: (token, id, isRegistered) => dispatch(SetUser(token, id, isRegistered))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(OTP);