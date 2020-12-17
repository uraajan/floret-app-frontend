import { Component } from 'react'

class LabelComponent extends Component {

    render() {
        console.log("LabelComponent: render")
        return (
            <div className={ this.props.lbRow }>
                <span className="labelKey"><label align="center">{this.props.lbKey}</label></span>
                <span className="labelValue"><label>{this.props.lbValue}</label></span>
            </div>
        )
    }

}

export default LabelComponent