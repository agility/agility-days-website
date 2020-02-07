import React, { Component } from 'react';
import { graphql, StaticQuery } from "gatsby"


export default props => (
    <StaticQuery
        query = {graphql `
        query SpeakerListQuery {
            allAgilityContentSpeaker {
                nodes {
                  myFields {
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
                speakers: queryData.allAgilityContentSpeaker.nodes
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
                        {speaker.myFields.headshot && 
                            <img src={speaker.myFields.headshot.url} alt={speaker.myFields.name} />
                        }
                        <p>
                            {speaker.myFields.name}
                        </p>
                        <p className="title">{speaker.myFields.companyName}</p>
                    </li>
                )
            })

            return speakers;
        }
    }

    render() {    
        return (
            <section id="sectionSpeakers" className="body-section section-speakers">
                <div class="container">
                    <h3>
                        <i class="fad fa-microphone-stand"></i>
                        <span>Meet Oursdads <strong>Speakers</strong></span>
                    </h3>

                    <div className="all-speakers">
                        <div className="speaker-info">
                            <div class="inner">
                            <h5>{this.state.currentSpeaker.myFields.name}</h5>
                            <p className="title">{this.state.currentSpeaker.myFields.jobTitle} at {this.state.currentSpeaker.myFields.companyName}</p>

                            <p dangerouslySetInnerHTML={this.renderHtmlContent(this.state.currentSpeaker.myFields.biography)}></p>

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
            </section>
        );
    }
}


