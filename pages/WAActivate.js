import {
    Layout,
    SettingToggle,
    TextStyle,
    Collapsible,
    TextContainer,
    Stack,
    
  } from '@shopify/polaris';

  import CustomButton from "./CustomButton";

class WAActivate extends React.Component {

    render() {
        const contentStatus = this.props.enableWA ? 'Disable' : 'Enable';
        const textStatus = this.props.enableWA ? 'enabled' : 'disabled';

        return(

            <Layout.AnnotatedSection
                title="Activate WhatsApp"
                description="Enable or Disable WhatsApp-Support on your Store"
            >
                
                <SettingToggle
                action={{
                    content: contentStatus,
                    onAction: () => this.props.handleToggle("enableWA")(),
                }}
                enabled={this.props.enableWA}
                >

                Whatsapp is currently {' '}
                <TextStyle variation="strong">{textStatus}</TextStyle>

                <Layout.Section>
                <Collapsible
                  open={this.props.enableWA}
                  id="basic-collapsible"
                  transition={{duration: '300ms', timingFunction: 'ease'}}
                >
                  <TextContainer>
                    <Stack>
                      <CustomButton size={"large"} pressed={this.props.buttonIndex == 0} onClick={() => this.props.handleButtonChange(0)} />
                      <CustomButton size={"large"} pressed={this.props.buttonIndex == 1} onClick={() => this.props.handleButtonChange(1)} />
                      <CustomButton size={"large"} pressed={this.props.buttonIndex == 2} onClick={() => this.props.handleButtonChange(2)} />
                      <CustomButton size={"large"} pressed={this.props.buttonIndex == 3} onClick={() => this.props.handleButtonChange(3)} />
                    </Stack>
                    <Stack>
                    <CustomButton size={"large"} pressed={this.props.buttonIndex == 4} onClick={() => this.props.handleButtonChange(4)} />
                    <CustomButton size={"large"} pressed={this.props.buttonIndex == 5} onClick={() => this.props.handleButtonChange(5)} />
                    <CustomButton size={"large"} pressed={this.props.buttonIndex == 6} onClick={() => this.props.handleButtonChange(6)} />
                    <CustomButton size={"large"} pressed={this.props.buttonIndex == 7} onClick={() => this.props.handleButtonChange(7)} />
                    </Stack>
                  </TextContainer>
                </Collapsible>
                </Layout.Section>
                </SettingToggle>
                
                
            </Layout.AnnotatedSection>
                        
        ); 
    }

}

export default WAActivate;