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

                            <div className="event-media">
                                <div><img src={this.props.item.fields.primaryImage.url} /></div>
                            </div>
                        </div>
                    </div>
                </div>   
            </section>
        );
    }
}


