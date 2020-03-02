import React, { Component } from 'react';
import { graphql, StaticQuery } from "gatsby"


export default props => (
    <StaticQuery
        query = {graphql `
          query ScheduleQuery {
            allAgilityEventSession(sort: {fields: agilityFields___sessionStartTime, order: ASC}) {
              group(field: agilityFields___sessionDay) {
                nodes {
                  id
                  agilityFields {
                    timeRange
                    sessionDay
                    topicDescription
                    topicTitle
                    speaker {
                      contentid
                    }
                    sessionStartTime
                    sessionEndTime
                  }
                }
              }
            },
            allAgilitySpeaker {
              nodes {
                agilityFields {
                  biography
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
        `}
        render={queryData =>  {
            const viewModel = {
                item: props.item,
                scheduleGroup: queryData.allAgilityEventSession.group
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

  renderSchedule(scheduleGroup) {
    console.log('schedule', this.props);

    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }

    function parseTime(timeStamp) {
      let time = new Date(timeStamp);

      var hours = addZero(time.getHours());
      var AmOrPm = hours >= 12 ? 'pm' : 'am';
      hours = (hours % 12) || 12;
      var minutes = addZero(time.getMinutes());
      var finalTime = hours + ":" + minutes + "" + AmOrPm + " ";
      return finalTime
    }

    if (scheduleGroup && scheduleGroup.nodes) {

        let schedule = [];

        scheduleGroup.nodes.forEach(eventSession => {
          schedule.push(
            <div className="content-panel schedule-item">
              <div className="item-info">
                <div className="image">
                  <img src={eventSession.agilityFields.speaker.agilityFields.headshot.url} alt={eventSession.agilityFields.speaker.agilityFields.name} />
                  <p>
                    <strong>{eventSession.agilityFields.speaker.agilityFields.name}</strong>
                    {eventSession.agilityFields.speaker.agilityFields.companyName}
                  </p>
                </div>
                
      
                <div className="info">
                  <p className="time">
                    <i className="fa fa-clock"></i>  
                    {parseTime(eventSession.agilityFields.sessionStartTime)} 
                    to {parseTime(eventSession.agilityFields.sessionEndTime)}
                  </p>
      
                  <p className="title">{eventSession.agilityFields.topicTitle}</p>
      
                  <div dangerouslySetInnerHTML={this.renderHtmlContent(eventSession.agilityFields.topicDescription)}></div>
                </div>

              </div>
            </div>
          )
        })

        return schedule;
    }

  }

  renderScheduleGroup() {
      console.log('schedule', this.props);

      if (this.props.scheduleGroup != null) {

          let scheduleGroup = [];

          this.props.scheduleGroup.forEach(eventSessionGroup => {
            scheduleGroup.push(
              <div className="event-session-groups">
                <h4 className="session-group-title">
                  Day {eventSessionGroup.nodes[0].agilityFields.sessionDay} Schedule
                </h4>

                {this.renderSchedule(eventSessionGroup)}
              </div>
            )
          })

          return scheduleGroup;
      }
  }

  render() {    
      return (
          <section id="sectionSchedule" className="body-section section-schedule">
            <div className="container">
              <div className="row">
                <h3>
                    <i className={this.props.item.agilityFields.titleIcon}></i>
                    <span dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.agilityFields.title)}></span>
                </h3>

                {this.renderScheduleGroup()}
              </div>
            </div>
          </section>
      );
  }
}