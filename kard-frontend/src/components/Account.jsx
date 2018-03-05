import React, { Component } from 'react';

class Account extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>Account: {this.props.account.official_name}</h1>
                <h3>{this.props.account.subtype}: {this.props.account.mask}</h3>
                <h3>Blanaces</h3>
                <ul>
                    {(this.props.account.subtype === "savings" || this.props.account.subtype === "checking")}<li><strong>available: </strong>{this.props.account.balances.available}</li>
                    <li><strong>current: </strong>{this.props.account.balances.current}</li>
                    {this.props.account.type === "credit" && <li><strong>limit: </strong>{this.props.account.balances.limit}</li>}
                </ul>
            </div>
        );
    }
}

export default Account;
