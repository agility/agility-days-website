import React, { Component } from 'react';



class RichTextArea extends Component {
    componentDidMount() {

    }
    setHTML = () => {
        return {__html: this.props.item.fields.textblob};
    }
    render() {    
        const setHTML = this.setHTML();
        return (
            <section className="container">
                <div className="row">
                    <div dangerouslySetInnerHTML={setHTML}></div>
                </div>
            </section>
        );
    }
}

export default RichTextArea;
