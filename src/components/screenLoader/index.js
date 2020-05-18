import React from 'react';
import { connect } from 'react-redux';
import './style.scss';

class ScreenLoader extends React.Component {
    render() {
        let screenloading = this.props.settings.screenloading;
        if(!screenloading) {
            return null;
        }
        return (
            <div className="screenLoading">
                <div className="loading"></div>
            </div>
        );   
    }
}
const mapStateToProps = state => {
    return {
      settings: state.settingsReducer.settings
    };
};
  
export default connect(mapStateToProps)(ScreenLoader);