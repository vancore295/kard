import React, { Component } from 'react';
import $ from 'jquery';


class Transaction extends Component {
    constructor() {
        super();
        this.state = {
            public_token: null,
            access_token: null,
            item_id: null,
        };
    }

    getAccount() {
        let access_token = this.state.access_token;
        $.ajax({
            type: 'GET',
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


    render() {
        return (
            <div>
                <h1>Transaction</h1>
            </div>
        );
    }
}

export default Transaction;
