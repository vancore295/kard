import React, { Component } from 'react';
import $ from 'jquery';
import Transaction from './Transaction';


class Transactions extends Component {
    constructor() {
        super();
        this.state = {
            transactions: null
        };
    }

    handleSortByDate() {
        this.setState({ transactions: this.state.transactions.sort(this.sortByDate) });
    }
    handlSortByName() {
        this.setState({ transactions: this.state.transactions.sort(this.sortByName) });
    }
    handlSortByAmmount() {
        this.setState({ transactions: this.state.transactions.sort(this.sortByAmmount) });
    }

    sortByName(a, b) {
        var aName = a.name.toLowerCase();
        var bName = b.name.toLowerCase();
        return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
    }
    sortByDate(a, b) {
        var aDate = new Date(a.date);
        var bDate = new Date(b.date);
        return ((aDate < bDate) ? -1 : ((aDate > bDate) ? 1 : 0));
    }
    sortByAmmount(a, b) {
        var aAmmount = a.amount;
        var bAmmount = b.amount;
        return ((aAmmount < bAmmount) ? -1 : ((aAmmount > bAmmount) ? 1 : 0));
    }

    componentWillMount() {
        this.state.transactions = this.props.transactions;
    }

    render() {

        let transactions;
        if (this.state.transactions) {
            transactions = this.state.transactions.map(transaction => {
                return (
                    <Transaction key={transaction.transaction_id} transaction={transaction} />
                )
            })
        }
        return (
            <div>
                <h1>Transactions</h1>
                {this.state && this.state.transactions && <buttton className="btn btn-primary" onClick={this.handleSortByDate.bind(this)}>Sort By Date</buttton>}
                {this.state && this.state.transactions && <buttton className="btn btn-primary" onClick={this.handlSortByName.bind(this)}>Sort By Name</buttton>}
                {this.state && this.state.transactions && <buttton className="btn btn-primary" onClick={this.handlSortByAmmount.bind(this)}>Sort By Ammount</buttton>}
                {transactions}
            </div>
        );
    }
}

export default Transactions;
