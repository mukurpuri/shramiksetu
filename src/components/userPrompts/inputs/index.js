import React from 'react';
import './style.scss';

class PromptInputs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: ""
        }
    }

    render() {
        if(!this.props.showError) {
            return null;
        }
        //let currentLanguage = this.props.settings.language;
        return (
            <p className={`${this.props.type}`}>
                {this.props.text}
            </p>
        );   
    }
}
  
export default PromptInputs;