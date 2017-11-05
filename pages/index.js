import Link from 'next/link';
import Page from '../layouts/main';

export default () => (
  <Page>
    <div className="tc mt5 mb5">
      <h1>Samlify Service Provider</h1>
      <div className="mb3">
        <Link href="/login"><a>Credential Login</a></Link>
      </div>
    </div>
  </Page>
)
