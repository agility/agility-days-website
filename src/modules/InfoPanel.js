import React, { Component } from 'react';

export default class InfoPanel extends Component {

    renderHtmlContent(html) {
        return { __html: html };
    }

    render() {    
        return (
            <section id="sectionAbout" className="body-section section-about">
                <div className="container">
                    <div className="row"> 
                        <h3>
                            <i className={this.props.item.agilityFields.titleIcon}></i>
                            <span dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.agilityFields.title)}></span>
                        </h3>

                        <div className="about-event">
                            <div className="event-info">
                                <div className="content-panel">
                                    <div dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.agilityFields.primaryContent)}></div>
                                
                                    <div className="cta">
                                        <button className="btn" href={this.props.item.agilityFields.primaryButton.href} title={this.props.item.agilityFields.primaryButton.text}>{this.props.item.agilityFields.primaryButton.text}</button>

                                        <div className="date-location">
                                            <i className={this.props.item.agilityFields.subContentIcon}></i>
                                            <div dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.agilityFields.subContent)}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="event-media">
                                { this.props.item.agilityFields.primaryImage.url && 
                                    <div><img src={this.props.item.agilityFields.primaryImage.url} /></div>
                                }
                            </div>
                        </div>
                    </div>
                </div>   
            </section>
        );
    }
}


