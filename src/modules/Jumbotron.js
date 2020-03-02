import React, { Component } from 'react';

export default class Jumbotron extends Component {
    renderHtmlContent(html) {
        return { __html: html };
    }

    render() {    
        const jumbotronStyle = {
            backgroundImage: 'url(' + this.props.item.customFields.backgroundImage.url + ')'
        };
        return (
            <section id="sectionContact" className="body-section section-jumbotron" style={jumbotronStyle}>
                <div className="container">
                    <div className="row">
                        <h5>{this.props.item.customFields.title}</h5>

                        <div dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.customFields.primaryContent)}></div>
                        
                        <button className="btn" href={this.props.item.customFields.primaryButton.url} title={this.props.item.customFields.primaryButton.title}>
                            {this.props.item.customFields.primaryButton.text}
                        </button>
                    </div>
                </div>
            </section>
        );
    }
}


