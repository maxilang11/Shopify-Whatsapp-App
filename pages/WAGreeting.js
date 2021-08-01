import {
    Layout,
    TextField,
    FormLayout,
    SettingToggle,
    TextStyle,
    Collapsible,
    
  } from '@shopify/polaris';

class WAGreeting extends React.Component {
    
    render() {
      
        const contentStatus = this.props.greeting ? 'Disable' : 'Enable';
        const textStatus = this.props.greeting ? 'enabled' : 'disabled';

        return(
            <Layout.AnnotatedSection
                title="Greeting Message"
                description="Change the Greeting Message displayed in the Widget"
            >
                <SettingToggle
                    action={{
                    content: contentStatus,
                    onAction: () => this.props.handleToggle("enableGreeting")(),
                    }}
                    enabled={this.props.greeting}
                >
                    Greetings Message is currently {' '}
                    <TextStyle variation="strong">{textStatus}</TextStyle>
                        <Collapsible
                        open={this.props.greeting}
                        id="basic-collapsible"
                        transition={{duration: '300ms', timingFunction: 'ease'}}
                        >
                            <TextField
                            type='text'
                            value={this.props.grettingMessage}
                            onChange={() => this.props.handleFieldInput('grettingMessage')()}
                            />
                        </Collapsible>
                </SettingToggle>
            </Layout.AnnotatedSection>
        ); 
    }
}

export default WAGreeting;