import React, { Component } from 'react';
import { graphql, StaticQuery } from "gatsby"


export default props => (
    <StaticQuery
        query = {graphql `
        query SpeakerListQuery {
            allAgilitySpeaker {
                nodes {
                  agilityFields {
                    name
                    companyName
                    jobTitle
                    biography
                    headshot {
                        url
                    }
                  }
                }
              }
          }                         
        `}
        render={queryData =>  {

            let speakers = [];

            const viewModel = {
                item: props.item,
                speakers: queryData.allAgilitySpeaker.nodes
            }
            return(
                <SpeakersList {...viewModel}/>  
            );
        }}
    /> 
)

class SpeakersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentSpeaker: props.speakers[0]
        }
    }

    renderHtmlContent(html) {
        return { __html: html };
    }

    selectSpeaker(speaker) {
        console.log(speaker);

        this.setState(state => ({
            currentSpeaker: speaker
        }));

    }

    renderSpeakers() {
        console.log('speaker', this.props);

        if (this.props.speakers != null) {

            let speakers = [];

            this.props.speakers.forEach(speaker => {
                speakers.push(
                    <li key={speaker.contentID} onClick={(e) => this.selectSpeaker(speaker, e)}>
                        {speaker.agilityFields.headshot && 
                            <img src={speaker.agilityFields.headshot.url} alt={speaker.agilityFields.name} />
                        }
                        <p>
                            {speaker.agilityFields.name}
                        </p>
                        <p className="title">{speaker.agilityFields.companyName}</p>
                    </li>
                )
            })

            return speakers;
        }
    }

    render() {    
        return (
            <section id="sectionSpeakers" className="body-section section-speakers">
                <div className="container">
                    <div className="row">
                        <h3>
                            <i className={this.props.item.agilityFields.titleIcon}></i>
                            <span dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.agilityFields.title)}></span>
                        </h3>

                        <div className="all-speakers">
                            <div className="speaker-info">
                                <div className="inner">
                                <h5>{this.state.currentSpeaker.agilityFields.name}</h5>
                                <p className="title">{this.state.currentSpeaker.agilityFields.jobTitle} at {this.state.currentSpeaker.agilityFields.companyName}</p>

                                <div dangerouslySetInnerHTML={this.renderHtmlContent(this.state.currentSpeaker.agilityFields.biography)}></div>

                                <button className="btn" title="Get Tickets">Get Tickets</button>
                                </div>
                            </div>

                            <div className="speaker-list">
                                <ul>
                                    {this.renderSpeakers()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


