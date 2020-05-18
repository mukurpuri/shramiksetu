import React from 'react';
import { PersistGate } from 'redux-persist/es/integration/react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { connect } from 'react-redux';
import { setLanguage } from '../../redux/actions/settings';
import './style.scss';


class Footer extends React.Component {
    constructor(props) {
        super(props)
    }
    isActive = lang => {
        const { settings } = this.props;
        return lang === settings.language ? "active" : ""
    }
    render() {
        return (
            <React.Fragment>
                <div className="txt-center footer">
                    <ul className="flat-list language-list">
                        <li onClick={ () => { this.props.setLanguage("en")}} className={this.isActive("en")} >English</li>
                        <li>&bull;</li>
                        <li onClick={ () => { this.props.setLanguage("hi")}} className={this.isActive("hi")}>हिन्दी</li>
                    </ul>
                </div>
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
        setLanguage: language => dispatch(setLanguage(language))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Footer);