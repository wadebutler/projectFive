import React, { Component } from 'react';

class Header extends Component {
    render() {
        // console.log(this.props)
        return (
            <header>
                <h1 style={{ color: this.props.color }} >Quick Chat</h1>
                
            </header>
        )
    }
}

export default Header;