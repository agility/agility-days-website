import React, { Component } from 'react';
import { Link, graphql, StaticQuery } from "gatsby"

export default props => (
    <StaticQuery
        query={graphql`
        query GlobalFooterQuery {
            allAgilityGlobalFooter {
              nodes {
                customFields {
                  copyrightText,
                  logo {
                      url
                  },
                  socialLinks
                }
              }
            }
          }          
        `}
        render={queryData => {
            const viewModel = {
                item: queryData.allAgilityGlobalFooter.nodes[0],
            }
            return (
                <GlobalFooter {...viewModel} />
            );
        }}
    />
)

class GlobalFooter extends Component {
    renderHtmlContent(html) {
        return { __html: html };
    }
    render() {
        console.log('footer', this.props);
        return (
            <footer className="section-footer">
                <div className="container">
                    <div className="row">
                        <p className="brand"><img src={this.props.item.customFields.logo.url} alt="Agility CMS" /></p>
                        <div dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.customFields.socialLinks)}></div>
                        <p>{this.props.item.customFields.copyrightText}</p>
                    </div>
                </div>
            </footer>
        );
    }
}


