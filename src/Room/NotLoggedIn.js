import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('globalStore')
@observer
class NotLoggedIn extends Component {

  signIn(e) {
    e.preventDefault();
    this.props.globalStore.signIn(this.emailInput.value, this.passInput.value);
  }

  render() {
    return (
      <div>
        NotLoggedIn
        <form onSubmit={(e) => this.signIn(e, this)}>
          <input ref={(input) => { this.emailInput = input; }} type="email" required />
          <input ref={(input) => { this.passInput = input; }} type="password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default NotLoggedIn;