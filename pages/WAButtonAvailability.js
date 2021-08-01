import {
    Card,
    Layout,
    Checkbox,
    Stack,
  } from '@shopify/polaris';

class WAButtonDAvailability extends React.Component {

    render() {
        

        return(
            <Layout.AnnotatedSection
                title="Chat Button Availability"
                description="Change the Appearance in the Store"
            >
                <Card title="Pages to display the Chat Button" sectioned={true}>
                <Stack alignment='center' distribution='center'>
                    <Checkbox label="Article" checked={this.props.articlePage} onChange={(value) => this.props.handleFieldInput('articlePage')(value)} />
                    <Checkbox label="Collection" checked={this.props.collectionPage} onChange={(value) => this.props.handleFieldInput('collectionPage')(value)} />
                    <Checkbox label="Product" checked={this.props.productPage} onChange={(value) => this.props.handleFieldInput('productPage')(value)} />
                    <Checkbox label="Thank You Page" checked={this.props.thankYouPage} onChange={(value) => this.props.handleFieldInput('thankYouPage')(value)} />
                    <Checkbox label="Search Page" checked={this.props.searchPage} onChange={(value) => this.props.handleFieldInput('searchPage')(value)} />
                    <Checkbox label="Blog" checked={this.props.blogPage} onChange={(value) => this.props.handleFieldInput('blogPage')(value)} />
                    <Checkbox label="Home" checked={this.props.homePage} onChange={(value) => this.props.handleFieldInput('homePage')(value)} />
                    <Checkbox label="Pages" checked={this.props.pagesPage} onChange={(value) => this.props.handleFieldInput('pagesPage')(value)} />
                    <Checkbox label="Cart Page" checked={this.props.cartPage} onChange={(value) => this.props.handleFieldInput('cartPage')(value)} />
                </Stack>
                </Card>
                
            </Layout.AnnotatedSection>
                        
        ); 
    }
 
}

export default WAButtonDAvailability;