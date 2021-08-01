import {
    Layout,
    Page,
    FooterHelp,
    Stack,
    Spinner,
    Frame,
} from '@shopify/polaris';

import { TitleBar, Toast } from '@shopify/app-bridge-react';

import WABasicSettings from './WABasicSettings';
import WAChatPosition from './WAChatPosition';
import WAActivate from './WAActivate';
import WAButtonAvailability from './WAButtonAvailability';
import WACalloutCard from './WACalloutCard';
import WAGreeting from './WAGreeting';

class index extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      //WAActivate
      enableWA: false,
      buttonIndex: 0,

      //WABasicSettings
      modalOpen: false,
      agents: [],
      
      //WAChatPosition
      desktop: false,
      mobile: false,
      chatSide: 1,
      horizontalDesktop: '0',
      verticalDesktop: '0',
      horizontalMobile: '0',
      verticalMobile: '0',

      //WAGreeting
      enableGreeting: false,
      grettingMessage: 'Hi there! How can we help you?',

      //WAButtonAvailibility
      articlePage: true,
      collectionPage: true,
      productPage: true,
      thankYouPage: true,
      searchPage: true,
      blogPage: true,
      homePage: true,
      pagesPage: true,
      cartPage: true,

      //TitleBar
      loading: true,
      updated: false,
    }

    /*
    this.handleToggle = this.handleToggle.bind(this)
    this.handleAgentChange = this.handleAgentChange.bind(this)
    this.handleButtonChange = this.handleButtonChange.bind(this)
    this.handleChatPosition = this.handleChatPosition.bind(this)
    this.handleFieldInput = this.handleFieldInput.bind(this)*/
    
  }

  updateConfig = () => {
    this.setState({loading : true});
    fetch('/config', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        config: {
          //WAActivate
          enableWA: this.state.enableWA,
          buttonIndex: this.state.buttonIndex,

          //WABasicSettings
          modalOpen: this.state.modalOpen,
          agents: this.state.agents,

          //WAChatPosition
          desktop: this.state.desktop,
          mobile: this.state.mobile,
          chatSide: this.state.chatSide,
          horizontalDesktop: this.state.horizontalDesktop,
          verticalDesktop: this.state.verticalDesktop,
          horizontalMobile: this.state.horizontalMobile,
          verticalMobile: this.state.verticalMobile,

          //WAGreeting
          enableGreeting: this.state.enableGreeting,
          grettingMessage: this.state.grettingMessage,

          //WAButtonAvailibility
          articlePage: this.state.articlePage,
          collectionPage: this.state.collectionPage,
          productPage: this.state.productPage,
          thankYouPage: this.state.thankYouPage,
          searchPage: this.state.searchPage,
          blogPage: this.state.blogPage,
          homePage: this.state.homePage,
          pagesPage: this.state.pagesPage,
          cartPage: this.state.cartPage,
        }
        
      }),
    })
    .then(response => response.json())
    .then((response) => {
      if (response.success) {
        this.setState({
          ...response.config,
          loading : false,
          updated: true,
        });
      } else {
        console.error(response);
        this.setState({loading : false});
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  fetchConfig = () => {
    this.setState({loading : true});
    fetch('/config')
    .then(response => response.json())
    .then((response) => {
      console.log(response);
      if (response.success) {
        this.setState({
          ...response.config,
          loading : false,
        });
      } else {
        console.error(response);
        this.setState({loading : false});
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  componentDidMount() {
    this.fetchConfig();
  }

  handleAgentChange = ({index, avatarUrl, name, phonenumber}) => {
    if(index ===  -1) {
      this.state.agents.push(
          {
              avatarUrl,
              name,
              phonenumber,
          }
      );
      
    } else {
      // update
      console.log("udpate");
      this.state.agents[index] = {
        avatarUrl,
        name,
        phonenumber,
      }
    }
      // TODO refresh to server
  }

  deleteAgent = (index) => {
    let agents = [...this.state.agents];
    agents.splice(index, 1);

    this.setState({ agents });
  }

  
  handleToggle = (field) => {
    return () => {
      this.setState(({ [field]: value }) => {
        return { [field]: !value };
      });
    }
  };

  handleButtonChange = (value) => {
    this.setState({ buttonIndex: value });
  };

  handleChatPosition = (value) => {
    return () => {
      this.setState({ chatSide: value });
      
    }
  };

  handleFieldInput = (field) => {
    return (value) => {
      this.setState({ [field]: value });
      
    }
  };

  render() {
    const settingsContent = this.state.enableWA ? (
      <Frame>
        <WABasicSettings
          modalOpen={this.state.modalOpen}
          agents={this.state.agents}
          handleAgentChange={this.handleAgentChange.bind(this)}
          deleteAgent={this.deleteAgent.bind(this)}/>
        <WAChatPosition 
          desktop={this.state.desktop}
          mobile={this.state.mobile}
          chatSide={this.state.chatSide}
          horizontalDesktop={this.state.horizontalDesktop}
          verticalDesktop={this.state.verticalDesktop}
          horizontalMobile={this.state.horizontalMobile}
          verticalMobile={this.state.verticalMobile}
          handleChatPosition={this.handleChatPosition.bind(this)}
          handleFieldInput={this.handleFieldInput.bind(this)}
          handleToggle={this.handleToggle.bind(this)}/>

        <WAGreeting
          greeting={this.state.enableGreeting}
          grettingMessage={this.state.grettingMessage}
          handleToggle={this.handleToggle.bind(this)}
          handleFieldInput={this.handleFieldInput.bind(this)}/>

        <WAButtonAvailability
          articlePage={this.state.articlePage}
          collectionPage={this.state.collectionPage}
          productPage={this.state.productPage}
          thankYouPage={this.state.thankYouPage}
          searchPage={this.state.searchPage}
          blogPage={this.state.blogPage}
          homePage={this.state.homePage}
          pagesPage={this.state.pagesPage}
          cartPage={this.state.cartPage}
          handleFieldInput={this.handleFieldInput.bind(this)} />
        <FooterHelp>
          You need help or want to give feedback? Just contact us here:
        </FooterHelp>
        <WACalloutCard />
      </Frame>
    ) : null;

    const content = this.state.loading ? (
      <Layout.Section>
        <Stack alignment="center" vertical={true}>
          <Spinner></Spinner>
        </Stack>
      </Layout.Section>) : (
      <Layout.Section>
        <WAActivate 
          enableWA={this.state.enableWA}
          buttonIndex={this.state.buttonIndex}
          handleToggle={this.handleToggle.bind(this)}
          handleButtonChange={this.handleButtonChange.bind(this)}/>
          {settingsContent}
      </Layout.Section>)
    
    const toastMarkup = this.state.updated ? (<Toast durantion={1000} content="Settings saved" onDismiss={() => this.setState({ updated: false })}></Toast>) : null;

    return (
      <Page>
        <TitleBar
            title="WhatsApp Chat Button Configurator"
            primaryAction={{
                content: 'Save Changes',
                onAction: this.updateConfig,
                disabled: this.state.loading,
            }}
        />
        <Layout>
            {content}
        </Layout>
        {toastMarkup}
      </Page>
    );
  }
}

export default index;
