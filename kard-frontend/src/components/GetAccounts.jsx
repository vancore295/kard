import React, { Component } from 'react';
import $ from 'jquery';
import Account from './Account';


class GetAccounts extends Component {
    constructor() {
        super();
        this.state = {
            public_token: null,
            access_token: null,
            item_id: null,
        };
    }

    getAccounts() {
        let access_token = this.state.access_token;
        $.ajax({
            type: 'POST',
            url: 'http://localhost:9000/api/plaid/accounts',
            data: { access_token: access_token },
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    }

    handleGetAccount() {
        this.getAccounts();
    }


    render() {
        return (
            <div>
                <button onClick={this.handleGetAccount.bind(this)}>Get Accounts</button>
            </div>
        );
    }
}

export default GetAccounts;
