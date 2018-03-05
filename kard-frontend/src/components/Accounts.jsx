import React, { Component } from 'react';
import $ from 'jquery';
import Account from './Account';


class Accounts extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        let accounts;
        if(this.props.accounts) {
            accounts = this.props.accounts.map(account => {
                return(
                    <Account key={account.account_id} account={account} />
                )
            })
        }
        return (
            <div>
                <h1>Accounts</h1>
                {accounts}
            </div>
        );
    }
}

export default Accounts;
