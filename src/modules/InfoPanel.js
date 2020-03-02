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
                            <i className={this.props.item.customFields.titleIcon}></i>
                            <span dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.customFields.title)}></span>
                        </h3>

                        <div className="about-event">
                            <div className="event-info">
                                <div className="content-panel">
                                    <div dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.customFields.primaryContent)}></div>
                                
                                    <div className="cta">
                                        <a className="btn" href={this.props.item.customFields.primaryButton.href} title={this.props.item.customFields.primaryButton.text}>{this.props.item.customFields.primaryButton.text}</a>

                                        <div className="date-location">
                                            <i className={this.props.item.customFields.subContentIcon}></i>
                                            <div dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.customFields.subContent)}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="event-media">
                                { this.props.item.customFields.primaryImage.url && 
                                    <div><img src={this.props.item.customFields.primaryImage.url} /></div>
                                }
                            </div>
                        </div>
                    </div>
                </div>   
            </section>
        );
    }
}


