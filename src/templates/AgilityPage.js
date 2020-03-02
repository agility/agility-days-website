import React, { Component } from 'react';
import ScrollUpButton from "react-scroll-up-button";

import '../assets/css/stylesheet.css'

//You need to pass-down the available modules to the app because they will be rendered dynamically
import modules from '../modules/_allModules.js'
import pageTemplates from './_allPageTemplates.js'

import SEO from '../components/SEO.js'
import GlobalHeader from '../components/GlobalHeader.js'
import GlobalFooter from '../components/GlobalFooter.js'

export const query = graphql`
  query($pageID: Int!, $contentID: Int!, $languageCode: String!) {

    agilitypage(languageCode: { eq: $languageCode }, itemID: { eq: $pageID }) {
		pageJson
	}
    agilityitem(languageCode: {eq: $languageCode}, itemID: {eq: $contentID}) {
		itemJson
    }
}
`

export default class AgilityPage extends Component {
    render() {
        const contentID = this.props.pageContext.contentID;

		const pageJSON = this.props.data.agilitypage.pageJson;
		const page = JSON.parse(pageJSON);
		const title = this.props.pageContext.title;
		const isPreview = this.props.pageContext.isPreview;

		let dynamicPageItem = null;

		if (contentID > 0) {
			if (this.props.data.agilityitem && this.props.data.agilityitem.itemJson) {
				const contentJSON = this.props.data.agilityitem.itemJson;
				dynamicPageItem = JSON.parse(contentJSON);

			}
		}

		// //get the page template name that we need to render
		const pageTemplateName = page.templateName.replace(/[^0-9a-zA-Z]/g, '');

		// //build the  props
		const propsForPageTemplate = {
			page: page,
			dynamicPageItem: dynamicPageItem,
			modules: modules
		}
		const PageTemplateComponentToRender = pageTemplates[pageTemplateName];


        return (
            <div id="inner-body">
                <SEO />
                <ScrollUpButton />
                <GlobalHeader />
                <div className="page-body">
                    <PageTemplateComponentToRender {...propsForPageTemplate} />
                </div>

                <GlobalFooter />
            </div>
        );
    }
}


