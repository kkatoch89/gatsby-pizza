import dotenv from 'dotenv'; // For Gatsby, if you want to make your .env data private, you NEED to use dotenv

dotenv.config({ path: '.env' });

export default {
	siteMetadata: {
		title: "Slick's Slices",
		siteUrl: 'https://gatsby.pizza',
		description: 'The best pizza in Ontario!',
		twitter: '@slicksSlices',
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-styled-components',
		{
			// This is the name of the plugin you are adding
			resolve: 'gatsby-source-sanity',
			options: {
				projectId: 'huf59ein',
				dataset: 'production',
				watchMode: true, // Realtime editing on sanity will reflect on Gatsby (don't need to rebuild)
				token: process.env.SANITY_TOKEN,
			},
		},
	],
};
