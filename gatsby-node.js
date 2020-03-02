//gatsy-node.js
//CREATE RESOLVERS *******************************************************************************************
exports.createResolvers = (args) => {

	const { createResolvers, getNode, createNodeId, createNode, createContentDigest, configOptions } = args;

	const resolvers = {
        //on the 'agilityPost' node type...
        agilityEventSession: {
            //when you call the 'author' property, resolve it!
            speaker: {
                //we are telling it is going to return the 'agilityAuthor' node type
                type: 'agilitySpeaker',
                //this is the function that is going to resolve it
                resolve: async (source, args, context, info) => {
                    //query the graphql nodes to find the item you want to return
                    const node = context.nodeModel.runQuery({
                        //find the author that matches our ID and language code
                        query: { 
                            filter: { 
                                contentID: { eq: source.customFields.speaker.contentid },
                                languageCode: { eq: source.languageCode}
                            }
                        },
                        type: `agilitySpeaker`,
                        //tell it to stop searching once we found our item
                        firstOnly: true,
                    })
                    return node;
                }
            },
            
            //when you call the 'sitemapNode' property on an 'agilityPost', get the corresponding sitemapNode from 'agilitySitemapNode'
            //this is useful when you need to get the pagePath/URL of an 'agilityPost'
            /*
                query MyQuery {
                    allAgilityPost {
                        nodes {
                        sitemapNode {
                            pagePath
                        }
                        customFields {
                            title
                        }
                        }
                    }
                }
            */
            // sitemapNode: {
            //     type: 'agilitySitemapNode',
            //     resolve: async (source, args, context, info) => {
            //         const node = context.nodeModel.runQuery({
            //             query: { 
            //                 filter: { 
            //                     contentID: { eq: source.contentID },
            //                     languageCode: { eq: source.languageCode}
            //                 }
            //             },
            //             type: `agilitySitemapNode`,
            //             firstOnly: true
            //         })
            //         return node;
            //     }
            // }            
        }
    }
	createResolvers(resolvers)
}