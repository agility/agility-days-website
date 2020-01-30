import React, { Component } from 'react';

export default class Jumbotron extends Component {
    render() {    
        return (
            <section id="sectionContact" className="body-section section-jumbotron">
                <div class="container">
                    <h5>{this.props.item.fields.title}</h5>

                    <p>{this.props.item.fields.subTitle}</p>
                    <button className="btn" href={this.props.item.fields.primaryButton.href} title={this.props.item.fields.primaryButton.title}>
                        {this.props.item.fields.primaryButton.text}
                    </button>
                </div>
            </section>
        );
    }
}


