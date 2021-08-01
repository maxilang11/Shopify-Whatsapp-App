import {
    Button,
    Card,
    Layout,
    DataTable,
    Thumbnail,
    Modal,
    TextField,
    FormLayout,
    Form,
    Stack,
    ChoiceList,
    Avatar,
  } from '@shopify/polaris';

import {
    EditMinor,
    DeleteMinor,
} from '@shopify/polaris-icons';

class WABasicSettings extends React.Component {
    state = {
        agentModalOpen: this.props.modalOpen,
        name: '',
        phonenumber: '',
        avatarUrl: 'https://whatsappsupport.z6.web.core.windows.net/male-avatar.svg',
        index: -1,
    };

    render() {
        const { avatarUrl, phonenumber, name } = this.state;

        const handleSubmit = () => {
            this.setState({
              discount: this.state.discount,
            });
            console.log('submission', this.state);
        };

        return(
            <Layout.AnnotatedSection
            title="Basic Settings"
            description="Add numbers to your Whatsapp-Support-Team"
            >

                <Card
                sectioned='true'
                primaryFooterAction={{content: 'Add new', 
                onAction: () => {this.setState({ agentModalOpen: true });}}}
                >

                    <DataTable
                    style={{marginBottom: '2rem'}}
                    columnContentTypes={[
                        'text',
                        'text',
                        'text',
                        'text',
                    ]}
                    headings={[
                        'Avatar',
                        'Name',
                        'Phonenumber',
                        '',
                    ]}
                    rows={this.mapAgentsToArray(this.props.agents || [])}
                    verticalAlign='middle'
                    />
                </Card>

                <Modal
                open={this.state.agentModalOpen}
                onClose={() => {
                        this.closeModal()
                    }}
                title="Add new chat agent"
                >

                    <Modal.Section>
                        <Form onSubmit={handleSubmit}>
                            <FormLayout>
                                <TextField label="Name" value={name} onChange={this.handleChange('name')} placeholder="Michael Smith"/>
                                <TextField type="tel" label="Phonenumber" value={phonenumber} onChange={this.handleChange('phonenumber')} placeholder="+123456789"/>
                                <Stack>
                                    <ChoiceList title='Choose your Avatar' 
                                    choices={[
                                        {label: React.createElement(Thumbnail, { source: 'https://whatsappsupport.z6.web.core.windows.net/male-avatar.svg', size: 'small'}, React.createElement(Button, { content: 'Add new'})), value: 'https://whatsappsupport.z6.web.core.windows.net/male-avatar.svg'},
                                        {label: React.createElement(Thumbnail, { source: 'https://whatsappsupport.z6.web.core.windows.net/female-avatar.svg', size: 'small'}, React.createElement(Button, { content: 'Add new'})), value: 'https://whatsappsupport.z6.web.core.windows.net/female-avatar.svg'},
                                    ]}
                                    selected={avatarUrl}
                                    onChange={this.handleChange('avatarUrl')}
                                    />
                                </Stack>
                                <Stack distribution="trailing">
                                    <Button onClick={() => this.closeModal()}>Cancel</Button>
                                    <Button primary onClick={this.handleClick}>Save</Button>
                                </Stack>
                            </FormLayout>
                        </Form>
                    </Modal.Section>
                </Modal>
            </Layout.AnnotatedSection>
        ); 
    }

    mapAgentsToArray(agents) {
        return agents.map((agent, i) => this.agentToArray(agent, i));
    }

    agentToArray(agent, i) {
        const { name, phonenumber, avatarUrl } = agent;

        return [
            React.createElement(Avatar, {source: avatarUrl}),
            name,
            phonenumber,
        ].concat(React.createElement(Stack, {
                distribution: "trailing",
            },
            React.createElement(Button, {
                onClick: () => {
                    this.setState({ agentModalOpen: true });
                    this.setState({ name });
                    this.setState({ index: i });
                    this.setState({ phonenumber });
                    this.setState({ avatarUrl });
                },
                size: 'slim',
                plain: true,
                icon: EditMinor,
            }),
            React.createElement(Button, {
                onClick: () => this.props.deleteAgent(i),
                size: 'slim',
                plain: true,
                icon: DeleteMinor,
            })
        ))
        /*
        .concat(React.createElement(Button, {
            onClick: () => {
                this.setState({ agentModalOpen: true });
                this.setState({ name });
                this.setState({ index: i });
                this.setState({ phonenumber });
                this.setState({ avatarUrl });
            },
            size: 'slim',
            plain: true,
            icon:DeleteMinor
        }));*/
    }

    handleClick = () => {
        this.props.handleAgentChange({
            index: this.state.index,
            avatarUrl: this.state.avatarUrl,
            name: this.state.name,
            phonenumber: this.state.phonenumber,
        });
        this.closeModal();
    }

    closeModal() {
        this.setState({ agentModalOpen: false })
        this.setState({ name : ''});
        this.setState({ phonenumber: ''});
        this.setState({ avatarUrl: 'https://whatsappsupport.z6.web.core.windows.net/male-avatar.svg'});
        this.setState({ index: -1});
    }

    handleChange = (field) => {
        return (value) => this.setState({ [field]: value });
      };
}

export default WABasicSettings;