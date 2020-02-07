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

  renderHtmlContent(html) {
      return { __html: html };
  }

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
                      <strong>{eventSession.myFields.speaker.fields.name}</strong>
                      {eventSession.myFields.speaker.fields.companyName}
                    </p>
                  </div>
                  
        
                  <div className="info">
                    <p className="time"><i className="fa fa-clock"></i> {eventSession.myFields.timeRange}</p>
        
                    <p className="title">{eventSession.myFields.topicTitle}</p>
        
                    <p dangerouslySetInnerHTML={this.renderHtmlContent(eventSession.myFields.topicDescription)}></p>
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
            <div className="container">
              <div className="row">
                <h3>
                    <i className={this.props.item.fields.titleIcon}></i>
                    <span dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.fields.title)}></span>
                </h3>

                {this.renderSchedule()}
              </div>
            </div>
          </section>
      );
  }
}