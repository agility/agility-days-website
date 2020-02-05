import React, { Component } from 'react';
import { graphql, StaticQuery } from "gatsby"


export default props => (
    <StaticQuery
        query = {graphql `
          query ScheduleQuery {
            allAgilityContentEventSession {
              nodes {
                myFields {
                  timeRange
                  topicDescription
                  topicTitle
                  speaker {
                    fields {
                      companyName
                      headshot {
                        url
                      }
                      jobTitle
                      name
                    }
                  }
                }
              }
            }
          }                         
        `}
        render={queryData =>  {

            let schedule = [];

            const viewModel = {
                item: props.item,
                schedule: queryData.allAgilityContentEventSession.nodes
            }
            return(
                <ScheduleList {...viewModel}/>  
            );
        }}
    /> 
)

class ScheduleList extends Component {

    renderSchedule() {
        console.log('schedule', this.props);

        if (this.props.schedule != null) {

            let schedule = [];

            this.props.schedule.forEach(eventSession => {
              schedule.push(
                <div className="content-panel schedule-item">
                  <div className="item-info">
                    <div className="image">
                      <img src={eventSession.myFields.speaker.fields.headshot.url} alt={eventSession.myFields.speaker.fields.name} />
                      <p>
                        <strong>{eventSession.myFields.speaker.fields.name}</strong><br />
                        {eventSession.myFields.speaker.fields.companyName}
                      </p>
                    </div>
                    
          
                    <div className="info">
                      <p className="time"><i class="fa fa-clock"></i> {eventSession.myFields.timeRange}</p>
          
                      <p className="title">{eventSession.myFields.topicTitle}</p>
          
                      <p>{eventSession.myFields.topicDescription}</p>
                    </div>
                  </div>
                </div>
              )
            })

            return schedule;
        }
    }

    render() {    
        return (
            <section id="sectionSchedule" className="body-section section-schedule">
              <div class="container">
                <h3>
                  <i class="fad fa-clipboard-list"></i>
                  <span>Event <strong>Schedule</strong></span>
                </h3>

                {this.renderSchedule()}
               </div>
            </section>
        );
    }
}