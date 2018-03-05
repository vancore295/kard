import React, { Component } from 'react';
import $ from 'jquery';
import Accounts from './Accounts';


class GetAccounts extends Component {
    constructor() {
        super();
        this.state = {
            accounts: null
        };
    }

    getAccounts() {
        let access_token = this.props.accessToken;
        $.ajax({
            type: 'POST',
            url: 'http://localhost:9000/api/plaid/accounts',
            data: { access_token: access_token },
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({accounts: data.accounts}, function() {
                    console.log(data.accounts);
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    }

    handleClick() {
        this.getAccounts();
    }


    render() {
        return (
            <div>
                {this.props.accessToken && <button onClick={this.handleClick.bind(this)}>Get Accounts</button>}
                {this.state && this.state.accounts && <Accounts accounts={this.state.accounts} />}
            </div>
        );
    }
}

export default GetAccounts;
