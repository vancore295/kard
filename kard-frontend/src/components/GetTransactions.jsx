import React, { Component } from 'react';
import $ from 'jquery';
import Transactions from './Transactions';

class GetTransactions extends Component {
    constructor() {
        super();
        this.state = {
            transactions: null,
            total_transactions: null
        };
    }

    getTransactions() {
        let access_token = this.props.accessToken;
        $.ajax({
            type: 'POST',
            url: 'http://localhost:9000/api/plaid/transactions',
            data: { access_token: access_token },
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({
                    transactions: data.transactions,
                    total_transactions: data.total_transactions,
                }, function (){
                    console.log(data);
                })
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
                {this.props.accessToken && <button className="btn btn-primary" onClick={this.handleClick.bind(this)}>Get Transactions</button>}
                {this.state && this.state.total_transactions && <h3>Total Transactions: {this.state.total_transactions}</h3>}
                {this.state && this.state.transactions && <Transactions transactions={this.state.transactions}/>}
            </div>
        );
    }
}

export default GetTransactions;
