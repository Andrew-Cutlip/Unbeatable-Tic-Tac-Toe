import React from 'react';

class Error extends React.Component {
    render() {
        if (this.props.message !== null) {
            return (
                <div className="error">
                    <p>
                        {this.props.message}
                    </p>
                    <button onClick={
                       () => this.props.clear()}>X</button>
                </div>
            )
        }
        else {
            return null;
        }
    }
}

export default Error;