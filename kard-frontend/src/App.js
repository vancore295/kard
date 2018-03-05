import React, { Component } from 'react';
import PlaidLink from 'react-plaid-link';
import $ from 'jquery';
import GetAccounts from './components/GetAccounts';
import GetTransactions from './components/GetTransactions';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            public_token: null,
            access_token: null,
            item_id: null,
        };
    }

    handleOnSuccess(token, metadata) {
        // send token to client server
        this.setState({public_token: token});
        $.ajax({
            type: 'POST',
            url: 'http://localhost:9000/api/plaid/get_access_token',
            data: {public_token: token},
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({
                    access_token: data.access_token,
                    item_id: data.item_id
                }, function () {
                    console.log("public token: ", token);
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err);
            }
        });
    }
    handleOnExit() {
        // handle the case when your user exits Link
    }
    getPublicEnvData(){
        $.ajax({
            type: 'GET',
            url: 'http://localhost:9000/api/plaid/get_public_token',
            dataType: 'json',
            cache: false,
            success: function(token) {
                this.setState({env_data: token}, function () {
                    console.log(token);
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err);
            }
        });
    }

    componentWillMount(){
        this.getPublicEnvData();
    }

  render() {
    return (
      <div className="App">
      <h1>Hello World</h1>

      {this.state && this.state.env_data && 
          <PlaidLink
          clientName="Kard code test"
          env={this.state.env_data.PLAID_ENV}
          product={["transactions"]}
          publicKey={this.state.env_data.PLAID_PUBLIC_KEY}
          onExit={this.handleOnExit.bind(this)}
          onSuccess={this.handleOnSuccess.bind(this)}>
          Open Link and connect your bank!
        </PlaidLink>}

        {this.state && this.state.access_token && <GetAccounts accessToken={this.state.access_token} />}
        {this.state && this.state.access_token && <GetTransactions accessToken={this.state.access_token} />}
      </div>
    );
  }
}

export default App;
