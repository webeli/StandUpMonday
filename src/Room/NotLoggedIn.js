import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Form, Icon, Input, Button, Checkbox, Col } from 'antd';
const FormItem = Form.Item;

@inject('globalStore')
@observer
class NotLoggedIn extends Component {

  signIn(e) {
    e.preventDefault();
    const email = document.querySelector(".emailInput").value;
    const pass = document.querySelector(".passInput").value;
    console.log({ email }, { pass })
    this.props.globalStore.signIn(email, pass);
  }

  createUser(e) {
    e.preventDefault();
    this.props.globalStore.createUser({
      displayName: document.querySelector(".newDisplayNameInput").value,
      email: document.querySelector(".newEmailInput").value,
      password: document.querySelector(".newPassInput").value
    })
  }

  render() {
    return (
      <Col offset={8} span={8} style={{ marginTop: '20px' }}>
        <Form onSubmit={(e) => this.signIn(e)} style={{ maxWidth: '300px' }}>
          <FormItem>
            <Input addonBefore={<Icon type="mail" />} type="email" placeholder="Email" className="emailInput" required />
          </FormItem>
          <FormItem>
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" className="passInput" required />
          </FormItem>
          <FormItem>
            <Checkbox>Remember me</Checkbox>
            <a style={{ float: 'right' }}>Forgot password</a>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Log in
            </Button>
            Or <a>register now!</a>
          </FormItem>
        </Form>

        <Form onSubmit={(e) => this.createUser(e)} style={{ maxWidth: '300px' }}>
          <FormItem>
            <Input addonBefore={<Icon type="user" />} type="text" placeholder="Display Name" className="newDisplayNameInput" required />
          </FormItem>
          <FormItem>
            <Input addonBefore={<Icon type="mail" />} type="email" placeholder="Email" className="newEmailInput" required />
          </FormItem>
          <FormItem>
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" className="newPassInput" required />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Create user
            </Button>
          </FormItem>
        </Form>
      </Col>
    );
  }
}

export default NotLoggedIn;