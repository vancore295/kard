import React, { Component } from 'react';

class Account extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="col-md-3">
                <div className="card text-white bg-primary mb-3">
                    <div className="card-header bg-primary">
                        Account: {this.props.account.official_name} <br />
                        {this.props.account.subtype}: {this.props.account.mask}
                    </div>
                    <div className="card-body">
                        <div className="container">
                            <h5 className="card-title">Blanaces</h5>
                            <ul>
                                {(this.props.account.subtype === "savings" || this.props.account.subtype === "checking")}<li><strong>available: </strong>{this.props.account.balances.available}</li>
                                <li><strong>current: </strong>{this.props.account.balances.current}</li>
                                {this.props.account.type === "credit" && <li><strong>limit: </strong>{this.props.account.balances.limit}</li>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Account;
