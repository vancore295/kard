import React, { Component } from 'react';
import $ from 'jquery';
import Account from './Transaction';


class GetTransactions extends Component {
    constructor() {
        super();
        this.state = {
            public_token: null,
            access_token: null,
            item_id: null,
        };
    }

    getTransactions() {
        let access_token = this.state.access_token;
        $.ajax({
            type: 'POST',
            url: 'http://localhost:9000/api/plaid/transactions',
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

    handleClick() {
        this.getTransactions();
    }


    render() {
        return (
            <div>
                <button onClick={this.handleClick.bind(this)}>Get Transactions</button>
            </div>
        );
    }
}

export default GetTransactions;
