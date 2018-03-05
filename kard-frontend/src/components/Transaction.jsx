import React, { Component } from 'react';

class Transaction extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>{this.props.transaction.name}</h1>
                ${this.props.transaction.amount}<br/>
                {this.props.transaction.date}
            </div>
        );
    }
}

export default Transaction;
