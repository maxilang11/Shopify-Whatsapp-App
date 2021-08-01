import "./CustomButton.css";

class CustomButton extends React.Component {
    render() {
        return(
            <button className={`custom-btn`} 
            onClick={this.props.onClick} 
            >
            </button>
        );
    }
    
}

export default CustomButton;