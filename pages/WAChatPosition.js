import {
    Button,
    Card,
    Layout,
    TextField,
    FormLayout,
    ButtonGroup,
    SettingToggle,
    TextStyle,
    Stack,
    Collapsible,
  } from '@shopify/polaris';

class WAChatPosition extends React.Component {

    render() {
        const mobileStatus = this.props.mobile ? 'Disable' : 'Enable';
        const desktopStatus = this.props.desktop ? 'Disable' : 'Enable';
        const textStatusD = this.props.desktop ? 'enabled' : 'disabled';
        const textStatusM = this.props.mobile ? 'enabled' : 'disabled';

        return(

            <Layout.AnnotatedSection
                title="Chat Button Position"
                description="Change the Position of the Chat Button"
            >

                <Card title="Chat Button Position" sectioned={true}>
                <FormLayout.Group condensed>
                    <Stack alignment='center' distribution='equalSpacing'>
                    <p>On wich side should the Button appear?</p>
                    <ButtonGroup segmented>
                    <Button pressed={this.props.chatSide == 0} onClick={() => this.props.handleChatPosition(0)()}>
                        Left
                    </Button>
                    <Button pressed={this.props.chatSide == 1} onClick={() => this.props.handleChatPosition(1)()}>
                        Right
                    </Button>
                    </ButtonGroup>
                    </Stack>
                    </FormLayout.Group>
                </Card>
                
                <Card title="Chat Button (Desktop)" sectioned>
                        <SettingToggle
                            action={{
                            content: desktopStatus,
                            onAction: () => this.props.handleToggle("desktop")(),
                            }}
                            enabled={this.props.desktop}
                        >
                            Whatsapp Chat Button on Desktop is currently {' '}
                            <TextStyle variation="strong">{textStatusD}</TextStyle>.
                            <Collapsible
                                open={this.props.desktop}
                                id="basic-collapsible"
                                transition={{duration: '300ms', timingFunction: 'ease'}}
                            >
                                <FormLayout>
                                <Stack>
                                <TextField type="number" value={this.props.horizontalDesktop} onChange={(value) => this.props.handleFieldInput('horizontalDesktop')(value)} label="horizontal offset"/>
                                <TextField type="number" value={this.props.verticalDesktop} onChange={(value) => this.props.handleFieldInput('verticalDesktop')(value)} label="vertical offset"/>
                                </Stack>
                                </FormLayout>
                            </Collapsible>
                        </SettingToggle> 
                </Card>

                <Card title="Chat Button (Mobile)" sectioned>
                        <SettingToggle
                            action={{
                            content: mobileStatus,
                            onAction: () => this.props.handleToggle("mobile")(),
                            }}
                            enabled={this.props.mobile}
                        >
                            Whatsapp Chat Button on Mobile is currently {' '}
                            <TextStyle variation="strong">{textStatusM}</TextStyle>.
                            <Collapsible
                                open={this.props.mobile}
                                id="basic-collapsible"
                                transition={{duration: '300ms', timingFunction: 'ease'}}
                            >
                                <FormLayout>
                                <Stack>
                                    <TextField type="number" value={this.props.horizontalMobile} onChange={(value) => this.props.handleFieldInput('horizontalMobile')(value)} label="horizontal offset"/>
                                    <TextField type="number" value={this.props.verticalMobile} onChange={(value) => this.props.handleFieldInput('verticalMobile')(value)} label="vertical offset"/>
                                </Stack>
                                </FormLayout>
                            </Collapsible>
                        </SettingToggle>   
                </Card>
                
            </Layout.AnnotatedSection>
                        
        ); 
    } 
}

export default WAChatPosition;