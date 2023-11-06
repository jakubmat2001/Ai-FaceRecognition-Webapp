import React from "react";
import ReactDOM from "react-dom";

const ModalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
    constructor(props) {
        super(props)
        this.element = document.createElement('div');
    }

    componentDidMount() {
        ModalRoot.appendChild(this.element)
    }

    componentWillUnmount() {
        ModalRoot.removeChild(this.element)
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.element)
    }
}

export default Modal;