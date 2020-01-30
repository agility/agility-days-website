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
            allAgilitySitemapNode {
              nodes {
                pageID
                path
                menuText
                visible {
                  menu
                }
              }
            }
          }          
        `}
        render={queryData => {
            const viewModel = {
                item: queryData.allAgilityContentGlobalHeader.nodes[0],
                menuLinks: queryData.allAgilitySitemapNode.nodes.filter(sitemapNode => {
                    //only return top level links
                    return sitemapNode.path.split('/').length == 2
                })
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
                <div class="container">
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

                        <Link
                            to="/"
                            title=""
                            className="btn"
                        >
                            Buy Tickets
                        </Link>

                    </nav>
                </div>

                    <div className="registration-cta">
                    <div className="content">
                        <div dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.myFields.primaryContent)}></div>

                        <Link
                            to={this.props.item.myFields.primaryButton.href}
                            title={this.props.item.myFields.primaryButton.text}
                            className="btn btn-sec"
                        >
                            {this.props.item.myFields.primaryButton.text}
                        </Link>
                    </div>

                    <div className="form">
                        <div class="inner-form">
                            <h5>Register Now</h5>
                            <form>
                            <div className="form-group">
                                <input type="text" placeholder="Your Name" />
                            </div>

                            <div className="form-group">
                                <input type="text" placeholder="Email Address" />
                            </div>

                            <div className="form-group">
                                <input type="text" placeholder="Phone Number" />
                            </div>

                            <div className="form-group">
                                <select>
                                <option disabled selected>How Many Tickets?</option>
                                <option>1</option>
                                </select>
                            </div>

                            <button class="btn" title="Register Now">Register Now</button>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </header>
        );
    }
}


