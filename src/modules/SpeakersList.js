import React, { Component } from 'react';
import { graphql, StaticQuery } from "gatsby"


export default props => (
    <StaticQuery
        query = {graphql `
        query SpeakerListQuery {
            allAgilitySpeaker {
                nodes {
                  customFields {
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
                        {speaker.customFields.headshot && 
                            <img src={speaker.customFields.headshot.url} alt={speaker.customFields.name} />
                        }
                        <p>
                            {speaker.customFields.name}
                        </p>
                        <p className="title">{speaker.customFields.companyName}</p>
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
                            <i className={this.props.item.customFields.titleIcon}></i>
                            <span dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.customFields.title)}></span>
                        </h3>

                        <div className="all-speakers">
                            <div className="speaker-info">
                                <div className="inner">
                                <h5>{this.state.currentSpeaker.customFields.name}</h5>
                                <p className="title">{this.state.currentSpeaker.customFields.jobTitle} at {this.state.currentSpeaker.customFields.companyName}</p>

                                <div dangerouslySetInnerHTML={this.renderHtmlContent(this.state.currentSpeaker.customFields.biography)}></div>

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


