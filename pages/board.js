/* This page is a protected page */

import React, { Component } from 'react';
import Link from 'next/link';
import markProtected from '../components/protected';
import { Row, Col } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
import { Radio } from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const { TextArea } = Input;

class Board extends Component {

  static async getInitialProps(ctx) {
    /*
      won't run there because it's invoked in parent's one
      unless invoke ComposedComponent.getInitialProps
    */
  }

  constructor(props) {
    super(props);
    const formData = {
      metadata: '',
      privateKey: '',
      privateKeyPass: '',
      isAssertionEncrypted: false,
      wantLogoutRequestSigned: false,
      wantLogoutResponseSigned: false,
      encPrivateKey: '',
      encPrivateKeyPass: ''
    };
    this.state = { formData };
  } 

  componentDidMount() {
    this.setState({ 
      formData: Object.assign(this.state.formData, this.getCachedFormData())
    });
    window.state = this.state;
  }

  getCachedFormData() {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('spconfig') || '{}');
    }
    return {};
  }

  async save() {
    const config = JSON.stringify(this.state.formData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('spconfig', config);
    }
    await this.props.authService.fetch('/sp/edit', { method: 'POST', body: { config } });
  }

  handleFormChange(e, field) {
    console.log(e.target.value, e.target.name, field);
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name || field]: e.target.value
      }
    })
  }

  btoa(context) {
    if (typeof window !== 'undefined') {
      // browser
      return btoa(context);
    }
    // server side
    return Buffer.from(context).toString('base64');
  }

  render() {
    const formData = this.state.formData;
    const {
      metadata,
      privateKey,
      privateKeyPass,
      isAssertionEncrypted,
      wantLogoutRequestSigned,
      wantLogoutResponseSigned,
      encPrivateKey,
      encPrivateKeyPass
    } = formData;
    return (
      <div>
        <div className="ma3 tc center w-60 pa3 bg-light-yellow">
          {
            `In this protected page, you can configure your service provider and the associated identity providers. To keep it simple and easy, we will store all the information in local storage, so it's highly recommended that not to include the secret key used in any dev/staging/production environment, in other words, it is only for testing purpose.`
          }
        </div>
        <div className="mt4 ml4 mr4 mb4 tc">
          <div className="mt3 mb5">
            <Button className="mr3" onClick={() => this.save()}>Save</Button>
            <Button className="mr3" disabled onClick={() => {}}>Metadata</Button>
            <Button className="mr3" disabled onClick={() => {}}>Export</Button>
            <Button className="mr3" disabled onClick={() => {}}>Import</Button>
          </div>
          <Row gutter={24}>
            <Col className="mb3" xs={24} sm={12}>
              <div className="mb3">
                <p className="tl pb2 b">Metadata for Service Provider</p>
                <TextArea name="metadata" value={metadata} rows={6} placeholder="Paste your metadata here" onChange={(e) => this.handleFormChange(e)} />
              </div>
              <div className="mb3 pb4">
                <Col xs={12} sm={12}>
                  <p className="tl pb2 b">Encrypted assertion (SLO)</p>
                </Col>
                <Col className="tr" xs={12} sm={12}>
                  <RadioGroup value={isAssertionEncrypted} name="isAssertionEncrypted" onChange={(e) => this.handleFormChange(e, 'isAssertionEncrypted')}>
                    <RadioButton value={true}>Encrypted</RadioButton>
                    <RadioButton value={false}>Ignore</RadioButton>
                  </RadioGroup>
                </Col>
              </div>
              <div className="mb3 pb4">
                <Col xs={12} sm={12}>
                  <p className="tl pb2 b">Signed Request (for SP-initiated SLO)</p>
                </Col>
                <Col className="tr" xs={12} sm={12}>
                  <RadioGroup value={wantLogoutRequestSigned} name="wantLogoutRequestSigned" onChange={(e) => this.handleFormChange(e, 'wantLogoutRequestSigned')}>
                    <RadioButton value={true}>Signed</RadioButton>
                    <RadioButton value={false}>Non-signed</RadioButton>
                  </RadioGroup>
                </Col>
              </div>
              <div className="mb3">
                <Col xs={12} sm={12}>
                  <p className="tl pb2 b">Signed Response (for IdP-initiated SLO)</p>
                </Col>
                <Col className="tr" xs={12} sm={12}>
                  <RadioGroup value={wantLogoutResponseSigned} name="wantLogoutResponseSigned" onChange={(e) => this.handleFormChange(e, 'wantLogoutResponseSigned')}>
                    <RadioButton value={true}>Signed</RadioButton>
                    <RadioButton value={false}>Non-signed</RadioButton>
                  </RadioGroup>
                </Col>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div className="mb3">
                <p className="tl pb2 b">Secret Key (Signature), if has</p>
                <TextArea value={privateKey} name="privateKey" rows={5} placeholder="Paste your secret key here" onChange={(e) => this.handleFormChange(e)} />
              </div>
              <div className="mb3">
                <p className="tl pb2 b">Secret Key (Signature) Passphrase</p>
                <Input value={privateKeyPass} name="privateKeyPass" placeholder="Passphrase for secret key" onChange={(e) => this.handleFormChange(e)} />
              </div>
              <div className="mb3">
                <p className="tl pb2 b">Secret Key (Encryption), if has</p>
                <TextArea value={encPrivateKey} name="encPrivateKey" rows={5} placeholder="Paste your secret key here" onChange={(e) => this.handleFormChange(e)} />
              </div>
              <div className="mb3">
                <p className="tl pb2 b">Secret Key (Encryption) Passphrase</p>
                <Input value={encPrivateKeyPass} name="encPrivateKeyPass" placeholder="Passphrase for secret key" onChange={(e) => this.handleFormChange(e)} />
              </div>
            </Col>
          </Row>
        </div>

      </div>
    );
  }
}

export default markProtected(Board);