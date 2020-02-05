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

    renderSpeakers() {
        console.log('speaker', this.props);

        if (this.props.speakers != null) {

            let speakers = [];

            this.props.speakers.forEach(speaker => {
                speakers.push(
                    <li key={speaker.contentID}>
                        {speaker.myFields.headshot && 
                            <img src={speaker.myFields.headshot.url} alt={speaker.myFields.name} />
                        }
                        <p>{speaker.myFields.name}</p>
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
                        <span>Meet Our <strong>Speakers</strong></span>
                    </h3>

                    <div className="all-speakers">
                        <div className="speaker-info">
                            <div class="inner">
                            <h5>Mike Johnson</h5>
                            <p className="title">VP of Technology at Agility CMS</p>

                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer consequat mauris pellentesque lacinia viverra. Proin sollicitudin posuere auctor. Ut eu dignissim urna, at congue nunc. Pellentesque egestas, velit pellentesque egestas dictum, lectus sem gravida augue, consectetur congue lacus erat vel leo. Sed sed aliquet urna, sit amet suscipit elit. Aliquam ut cursus risus. </p>

                            <button className="btn" title="Get Tickets">Get Tickets</button>
                            </div>
                        </div>

                        <div className="speaker-list">
                            <ul>
                                {/* <li>
                                    <img src="https://static.agilitycms.com/agility-days-2020/speakers/mike-johnson.jpg" alt="Mike Johnson" />
                                    <p>Mike Johnson</p>
                                    <p className="title">Agility CMS</p>
                                </li> */}

                                {this.renderSpeakers()}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


