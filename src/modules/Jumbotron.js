import React, { Component } from 'react';

export default class Jumbotron extends Component {
    renderHtmlContent(html) {
        return { __html: html };
    }

    render() {    
        const jumbotronStyle = {
            backgroundImage: 'url(' + this.props.item.agilityFields.backgroundImage.url + ')'
        };
        return (
            <section id="sectionContact" className="body-section section-jumbotron" style={jumbotronStyle}>
                <div className="container">
                    <div className="row">
                        <h5>{this.props.item.agilityFields.title}</h5>

                        <div dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.agilityFields.primaryContent)}></div>
                        
                        <button className="btn" href={this.props.item.agilityFields.primaryButton.href} title={this.props.item.agilityFields.primaryButton.title}>
                            {this.props.item.agilityFields.primaryButton.text}
                        </button>
                    </div>
                </div>
            </section>
        );
    }
}


