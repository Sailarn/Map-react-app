import React, {Component} from 'react';
import './Layout.css';
class Layout extends Component {
    render(){
        return (
            <header>
                { this.props.children }
            </header>
        )
    }
}

export default Layout;