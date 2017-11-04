import Link from 'next/link';
import Page from '../layouts/main';
import markProtected from '../components/protected';

class ConfigurePage extends Component {
  render() {
    return (
      <Page>
        <div className="tc mt5 mb5">
          
        </div>
      </Page>
    )
  } 
}

  export default markProtected(ConfigurePage);