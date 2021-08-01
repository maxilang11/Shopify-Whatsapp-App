import {
    Layout,
    CalloutCard,
  } from '@shopify/polaris';

class WACalloutCard extends React.Component {
    state = {
        
      };

    render() {
        

        return(

            <Layout.Section>

                <CalloutCard
                title="Rate Us"
                illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
                primaryAction={{
                    content: 'Click here to rate',
                    url: 'https://www.shopify.com',
                }}
                >

                <p>Rate your Experience with our App</p>
                
                </CalloutCard>
            
          </Layout.Section>
                        
        ); 
    }
    
}

export default WACalloutCard;