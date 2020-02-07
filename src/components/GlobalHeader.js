import React, { Component } from 'react';
import { Link, graphql, StaticQuery } from "gatsby"

export default props => (
    <StaticQuery
        query={graphql`
        query GlobalHeaderQuery {
            allAgilityContentGlobalHeader {
              nodes {
                myFields {
                    siteName
                    primaryContent
                    siteNavigation
                    primaryButton {
                        href
                        text
                    }
                    backgroundImage {
                        url
                    }
                    logo {
                        url
                        label
                    }
                    secondaryButton {
                        href
                        text
                    }
                }
              }
            }
          }          
        `}
        render={queryData => {
            const viewModel = {
                item: queryData.allAgilityContentGlobalHeader.nodes[0]
            }
            return (
                <GlobalHeader {...viewModel} />
            );
        }}
    />
)

class GlobalHeader extends Component {
    renderHtmlContent(html) {
        return { __html: html };
    }

    render() {
        console.log('header', this.props);

        const headerStyle = {
            backgroundImage: 'url(' + this.props.item.myFields.backgroundImage.url + ')'
        };

        return (

            <header className="section-header" style={headerStyle}>
                <div className="container">
                    <div className="row">

                        <div className="brand-nav">
                            <Link
                            to="/"
                            title={this.props.item.myFields.siteName}
                            className="logo"
                            >
                                <img src={this.props.item.myFields.logo.url} alt={this.props.item.myFields.siteName} />
                            </Link>

                            <nav className="global-nav">
                                <div dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.myFields.siteNavigation)}></div>

                                <button
                                    id="eventbrite-widget-modal-trigger-91225037543"
                                    className="btn"
                                >
                                    Buy Tickets
                                </button>

                            </nav>
                        </div>

                        <div className="registration-cta">
                            <div className="content">
                                <div dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.myFields.primaryContent)}></div>

                                <button class="btn" id="example-widget-trigger" type="button">{this.props.item.myFields.primaryButton.text}</button>
                            </div>
                        </div>
                    </div>

                </div>
            </header>
        );
    }

    componentDidMount() {

        setTimeout(
            function() {
                var exampleCallback = function() {
                    console.log('Order complete!');
                };
        
                window.EBWidgets.createWidget({
                    widgetType: 'checkout',
                    eventId: '91225037543',
                    modal: true,
                    modalTriggerElementId: 'eventbrite-widget-modal-trigger-91225037543',
                    onOrderComplete: exampleCallback
                });
            }, 1000
        )
    }
}


