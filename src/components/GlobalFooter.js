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
                  }
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
    render() {
        console.log('footer', this.props);
        return (
            <footer className="footer">
                <div className="container">
                    <p>{this.props.item.myFields.copyrightText}</p>
                </div>
            </footer>
        );
    }
}


