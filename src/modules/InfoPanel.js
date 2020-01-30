import React, { Component } from 'react';
import { graphql, StaticQuery } from "gatsby"


export default class Jumbotron extends Component {
    render() {    
        return (
            <section id="sectionAbout" className="body-section section-about">
                <div className="container">
                    <h3>
                        <i className="icon-agility-triangle"></i>
                        <span>{this.props.item.fields.title}</span>
                    </h3>

                    <div className="about-event">
                        <div className="event-info">
                            <div className="content-panel">
                                {this.props.item.fields.primaryContent}
                            
                                <div className="cta">
                                    <button className="btn" href={this.props.item.fields.primaryButton.href} title={this.props.item.fields.primaryButton.title}>{this.props.item.fields.primaryButton.title}</button>
                                    
                                    <div className="date-location">
                                        <i className={this.props.item.fields.subContentIcon}></i>
                                        <p>
                                            {this.props.item.fields.subContent}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="event-video">
                            <iframe width="100%" height="291" src="https://www.youtube.com/embed/cUtY1HbykmA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>   
            </section>
        );
    }
}


