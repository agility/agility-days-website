import React, { Component } from 'react';

export default class Jumbotron extends Component {
    renderHtmlContent(html) {
        return { __html: html };
    }

    render() {    
        const jumbotronStyle = {
            backgroundImage: 'url(' + this.props.item.fields.backgroundImage.url + ')'
        };
        return (
            <section id="sectionContact" className="body-section section-jumbotron" style={jumbotronStyle}>
                <div className="container">
                    <div className="row">
                        <h5>{this.props.item.fields.title}</h5>

                        <div dangerouslySetInnerHTML={this.renderHtmlContent(this.props.item.fields.primaryContent)}></div>
                        
                        <button className="btn" href={this.props.item.fields.primaryButton.href} title={this.props.item.fields.primaryButton.title}>
                            {this.props.item.fields.primaryButton.text}
                        </button>
                    </div>
                </div>
            </section>
        );
    }
}


