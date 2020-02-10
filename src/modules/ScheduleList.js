import React, { Component } from 'react';
import { graphql, StaticQuery } from "gatsby"


export default props => (
    <StaticQuery
        query = {graphql `
          query ScheduleQuery {
            allAgilityContentEventSession(sort: {fields: myFields___sessionStartTime, order: ASC}) {
              group(field: myFields___sessionDay) {
                nodes {
                  id
                  myFields {
                    timeRange
                    sessionDay
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
                    sessionStartTime
                    sessionEndTime
                  }
                }
              }
            }
          }                         
        `}
        render={queryData =>  {
            const viewModel = {
                item: props.item,
                scheduleGroup: queryData.allAgilityContentEventSession.group
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
                  <img src={eventSession.myFields.speaker.fields.headshot.url} alt={eventSession.myFields.speaker.fields.name} />
                  <p>
                    <strong>{eventSession.myFields.speaker.fields.name}</strong>
                    {eventSession.myFields.speaker.fields.companyName}
                  </p>
                </div>
                
      
                <div className="info">
                  <p className="time">
                    <i className="fa fa-clock"></i>  
                    {parseTime(eventSession.myFields.sessionStartTime)} 
                    to {parseTime(eventSession.myFields.sessionEndTime)}
                  </p>
      
                  <p className="title">{eventSession.myFields.topicTitle}</p>
      
                  <div dangerouslySetInnerHTML={this.renderHtmlContent(eventSession.myFields.topicDescription)}></div>
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
                  Day {eventSessionGroup.nodes[0].myFields.sessionDay} Schedule
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
                    <i className={this.props.item.fields.titleIcon}></i>
                    <span dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.fields.title)}></span>
                </h3>

                {this.renderScheduleGroup()}
              </div>
            </div>
          </section>
      );
  }
}