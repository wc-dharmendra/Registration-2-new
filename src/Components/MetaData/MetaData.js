import Head from "next/head";

const MetaData = ({
    title = "Registration",
    description = "",
    image = "",
    url = ""
}) => {

    return (
        <Head>
            <meta charSet="utf-8" />
            <meta property="og:url" content={title} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            {/* <meta property="og:image:width" content="300" /> */}
            <meta property="og:image:height" content="300" />
            <meta name="twitter:card" content="summary" />
            {/* <meta name="twitter:creator" content="@abc" />*/}
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:url" content={url} />
            {/* <meta name="twitter:creator" content={"metaData.twitter_cards_creator"} />
            <meta name="twitter:url" content={'metaData.twitter_cards_page_url'} />
            <meta name="twitter:site" content={"metaData.twitter_cards_site"} />
            <meta name="twitter:siteId" content={"metaData.twitter_cards_site_id"} />
            <meta name="twitter:cardType" content={"metaData.twitter_cards_type"} /> */}
            <title>{title}</title>
        </Head>
    )
}
export default MetaData;