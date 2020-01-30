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
    renderLinks = () => {

        let links = [];
        this.props.menuLinks.forEach(node => {
            links.push(<li key={node.pageID}><Link to={node.path}>{node.menuText}</Link></li>)
        })
        return links;
    }
    render() {
        console.log('header', this.props);
        return (
            // <header className="header">
            //     <div className="container">
            //         {this.props.item.myFields.siteName}<br />
            //         <ul>
            //             {this.renderLinks()}
            //         </ul>
            //     </div>
            // </header>

            <header className="section-header">
                <div class="container">
                    <div className="brand-nav">
                    <Link
                    to="/"
                    title={this.props.item.myFields.siteName}
                    className="logo"
                    >
                    <img src="https://static.agilitycms.com/brand/yellow-white-transparent.svg" alt={this.props.item.myFields.siteName} />
                    </Link>

                    <nav className="global-nav">
                    <ul>
                    <li>
                        <Link
                        to="#sectionAbout"
                        title="About"
                        >About
                        </Link>
                    </li>
                    <li>
                        <Link
                        to="#sectionSpeakers"
                        title="Speakers"
                        >Speakers
                        </Link>
                    </li>
                    <li>
                        <Link
                        to="#sectionSchedule"
                        title="Schedule"
                        >Schedule
                        </Link>
                    </li>
                    <li>
                        <Link
                        to="#sectionLocation"
                        title="Location"
                        >Location
                        </Link>
                    </li>
                    <li>
                        <Link
                        to="#sectionContact"
                        title="Contact Us"
                        >Contact
                        </Link>
                    </li>
                    </ul>

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
                    <h1>Agility Days <span>2020</span></h1>

                    <h2>An event for all things Agility.</h2>

                    <div className="details">
                        <p>Friday, May 15th</p>
                        <p>9:00am - 4:30pm</p>
                        <p>100 Queen St - Toronto</p>
                    </div>

                    <Link
                        to="/"
                        title="Learn More"
                        className="btn btn-sec"
                    >
                        Learn More
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


