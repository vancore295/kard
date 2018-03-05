import React, { Component } from 'react';
import $ from 'jquery';


class Account extends Component {
    constructor() {
        super();
        this.state = {
            public_token: null,
            access_token: null,
            item_id: null,
        };
    }

    render() {
        return (
            <div>
                <h1>Account</h1>
            </div>
        );
    }
}

export default Account;
