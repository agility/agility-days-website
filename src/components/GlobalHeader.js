import React, { Component } from 'react';
import { Link, graphql, StaticQuery } from "gatsby"

export default props => (
    <StaticQuery
        query={graphql`
        query GlobalHeaderQuery {
            allAgilityGlobalHeader {
              nodes {
                agilityFields {
                    siteName
                    primaryContent
                    siteNavigation
                    cTAText
                    backgroundImage {
                        url
                    }
                    logo {
                        url
                        label
                    }
                }
              }
            }
          }          
        `}
        render={queryData => {
            const viewModel = {
                item: queryData.allAgilityGlobalHeader.nodes[0]
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
            backgroundImage: 'url(' + this.props.item.agilityFields.backgroundImage.url + ')'
        };

        return (

            <header className="section-header" style={headerStyle}>
                <div className="container">
                    <div className="row">

                        <div className="brand-nav">
                            <Link
                            to="/"
                            title={this.props.item.agilityFields.siteName}
                            className="logo"
                            >
                                <img src={this.props.item.agilityFields.logo.url} alt={this.props.item.agilityFields.siteName} />
                            </Link>

                            <nav className="global-nav">
                                <div dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.agilityFields.siteNavigation)}></div>

                                <button
                                    id="eventbrite-widget-modal-trigger-97206781099"
                                    className="btn"
                                >
                                    {this.props.item.agilityFields.cTAText}
                                </button>

                            </nav>
                        </div>

                        <div className="registration-cta">
                            <div className="content">
                                <div dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.agilityFields.primaryContent)}></div>

                                <button class="btn" id="eventbrite-widget-modal-trigger-97206781099" type="button">
                                    {this.props.item.agilityFields.cTAText}
                                </button>
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
                    eventId: '97206781099',
                    modal: true,
                    modalTriggerElementId: 'eventbrite-widget-modal-trigger-97206781099',
                    onOrderComplete: exampleCallback
                });
            }, 1000
        )
    }
}


