import React, { Component } from 'react';

class Transaction extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="col-md-3">
                <div className="card text-white bg-info mb-3">
                    <div className="card-body">
                        <label>Name: {this.props.transaction.name}</label><br/>
                        <label>Ammount:${this.props.transaction.amount}</label><br/>
                        <label>Date:{this.props.transaction.date}</label>
                    </div>
                </div>
            </div>
        );
    }
}

export default Transaction;
