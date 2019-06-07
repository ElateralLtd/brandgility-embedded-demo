const { BRANDGILITY_URL } = process.env;

// Expect this to be overridden by Netlify
const { brandgilityUrlGlobal } = window;
const env = { brandgilityUrl: brandgilityUrlGlobal || BRANDGILITY_URL };

export default env;
