import React, { Component } from 'react';
import { Link, graphql, StaticQuery } from "gatsby"

export default props => (
    <StaticQuery
        query={graphql`
        query GlobalFooterQuery {
            allAgilityContentGlobalFooter {
              nodes {
                myFields {
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
                item: queryData.allAgilityContentGlobalFooter.nodes[0],
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
                    <p className="brand"><img src={this.props.item.myFields.logo.url} alt="Agility CMS" /></p>
                    <div dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.myFields.socialLinks)}></div>
                    <p>{this.props.item.myFields.copyrightText}</p>
                </div>
            </footer>
        );
    }
}


