import React from 'react';
import { PersistGate } from 'redux-persist/es/integration/react'
import Helmet from '../../components/helmets';
import Footer from '../../components/footer/';
import { connect } from 'react-redux';
import Language from '../../config/languages/Language';
import ScreenLoader from '../../components/screenLoader/';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  Link
} from "react-router-dom";
import TirangaBorder from '../../components/tiranga/';
import { OTPStatus, SubmitMobileNumberStatus } from '../../redux/actions/user';
import { toggleLoader } from '../../redux/actions/settings';
import { SendOTPToLogin } from '../../services/api.service';
import './style.scss';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: ""
        }
    }

    mobileValidate = evt => {
        const phoneNumber = (evt.target.validity.valid) ? evt.target.value : this.state.phoneNumber;    
        if(phoneNumber.length <= 10) {
            this.setState({ phoneNumber });
        }
    }
    joinUser = async () => {
        this.props.toggleLoader();
        const { phoneNumber } = this.state;
        if(phoneNumber) {
            await SendOTPToLogin(phoneNumber).then( res => {
                if(res && res.data && res.data.status === "pass" && res.status === 200) {
                    console.log(res)
                    this.props.toggleLoader();
                    this.props.SubmitMobileNumberStatus(res.data.status,phoneNumber)
                    this.props.history.push('/otp');
                }
            })
        }
    }
    render() {
        let currentLanguage = this.props.settings.language;
        return (
            <React.Fragment>
                <TirangaBorder/>
                <div className="container">
                    <Helmet title="Shramik Setu - Connecting 100 Million Workers in India" link="http://shramiksetu.in/" />
                    <div className="row txt-center ">
                        <div className="col-sm-12 col-lg-6 m-x-auto">
                            <h1 className="main-title">{Language.get("title","name",currentLanguage)}</h1>
                            <p>
                                <img src="./womenworking.jpg"/>
                            </p>
                            <h2 className="subtitle">
                                {Language.get("title","moto",currentLanguage)}
                            </h2>
                            <p className="m-t-lg rel">
                                <input pattern="[0-9]*" value={this.state.phoneNumber} onChange={this.mobileValidate} placeholder={Language.get("inputs","phoneNumber",currentLanguage)} className="full input-text phoneNumber" />
                            </p>
                            <p>
                                <button onClick={() => this.joinUser()} className="btn btn-primary full btn-lg">{Language.get("inputs","submitPhoneNumber",currentLanguage)}</button>
                            </p>
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
      settings: state.settingsReducer.settings
    };
  };
  
const mapDispatchToProps = (dispatch) => {
    return {
        SubmitMobileNumberStatus: (status, phoneNumber) => dispatch(SubmitMobileNumberStatus(status, phoneNumber)),
        toggleLoader: () => dispatch(toggleLoader())
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);