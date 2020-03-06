require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

//configure your agility plugin with environment variables so that
//your agility api credentials stay secure
const agilityConfig = {
  guid: process.env.AGILITY_GUID,
  accessToken: process.env.AGILITY_API_KEY,
  isPreview: process.env.AGILITY_API_ISPREVIEW
}

module.exports = {
  siteMetadata: {
    title: "A 2-Day Event Covering All Things Agility",
  },
  plugins: [
    {
      resolve: "@agility/gatsby-source-agilitycms", //the name of the plugin
      options: {
        guid: agilityConfig.guid, //your Agility Content Fetch API Guid
        apiKey: agilityConfig.accessToken, //your Agility Content Fetch API Key
        isPreview: agilityConfig.isPreview, //set this to true if you are using the preview API Key
        debug: true,
        sharedContent: ["speakers", "schedule", "globalheader", "globalfooter"], //a list of reference names you want to include in your GraphQL store
        languages: [{
          // The name of the language code
          name: "English",
          // The actual language code set in Agility CMS
          code: "en-us", 
          // The name to be used in the URL path that represents the current language
          path: "en", 
          // The path to the Agility CMS page that you want to use as your root/home page
          homePagePath: "/home" 
        }], 
        // The channels you want to include
        channels: [{
          // The reference name for the website channel as it is defined in Agility CMS
          referenceName: "website"
        }],
        masterPageTemplate: "./src/templates/AgilityPage.js", //the page template that will be used to render Agility CMS pages
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Agility Days Website`,
        short_name: `agility-days-website`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/agility-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
