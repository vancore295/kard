import React, { Component } from 'react';
import PlaidLink from 'react-plaid-link';

import './App.css';

class App extends Component {
  handleOnSuccess(token, metadata) {
    // send token to client server
  }
  handleOnExit() {
    // handle the case when your user exits Link
  }

  render() {
    return (
      <div className="App">
      <h1>Hello World</h1>
      <PlaidLink
        clientName="Krad code test"
        env="sandbox"
        product={["auth", "transactions"]}
        publicKey="PLAID_PUBLIC_KEY"
        onExit={this.handleOnExit}
        onSuccess={this.handleOnSuccess}>
        Open Link and connect your bank!
      </PlaidLink>
      </div>
    );
  }
}

export default App;
