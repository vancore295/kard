import React, { Component } from 'react';
import PlaidLink from 'react-plaid-link';
import $ from 'jquery';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            public_token: null
        };
    }

    handleOnSuccess(token, metadata) {
        // send token to client server
    }
    handleOnExit() {
        // handle the case when your user exits Link
    }
    getPublicToken(){
        $.ajax({
            url: 'http://localhost:9000/api/get_public_token',
            dataType: 'json',
            cache: false,
            success: function(token) {
                this.setState({public_token: token}, function () {
                    console.log(token);
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err);
            }
        });
    }
    
    componentWillMount(){
        this.getPublicToken();
    }

  render() {
    return (
      <div className="App">
      <h1>Hello World</h1>

      {this.state && this.state.public_token && 
          <PlaidLink
          clientName="Krad code test"
          env={this.state.public_token.PLAID_ENV}
          product={["auth", "transactions"]}
          publicKey={this.state.public_token.PLAID_PUBLIC_KEY}
          onExit={this.handleOnExit}
          onSuccess={this.handleOnSuccess}>
          Open Link and connect your bank!
        </PlaidLink>
    }

      </div>
    );
  }
}

export default App;
