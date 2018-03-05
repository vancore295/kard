import React, { Component } from 'react';
import $ from 'jquery';
import Transaction from './Transaction';


class Transactions extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        let transactions;
        if(this.props.transactions) {
            transactions = this.props.transactions.map(transaction => {
                return(
                    <Transaction key={transaction.transaction_id} transaction={transaction} />
                )
            })
        }
        return (
            <div>
                <h1>Transactions</h1>
                {transactions}
            </div>
        );
    }
}

export default Transactions;
