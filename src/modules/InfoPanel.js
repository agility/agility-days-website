import React, { Component } from 'react';

export default class InfoPanel extends Component {

    renderHtmlContent(html) {
        return { __html: html };
    }

    render() {    
        return (
            <section id="sectionAbout" className="body-section section-about">
                <div className="container">
                    <h3>
                        <i className={this.props.item.fields.titleIcon}></i>
                        <span dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.fields.title)}></span>
                    </h3>

                    <div className="about-event">
                        <div className="event-info">
                            <div className="content-panel">
                                <div dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.fields.primaryContent)}></div>
                            
                                <div className="cta">
                                    <button className="btn" href={this.props.item.fields.primaryButton.href} title={this.props.item.fields.primaryButton.text}>{this.props.item.fields.primaryButton.text}</button>

                                    <div className="date-location">
                                        <i className={this.props.item.fields.subContentIcon}></i>
                                        <div dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.fields.subContent)}></div>
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


