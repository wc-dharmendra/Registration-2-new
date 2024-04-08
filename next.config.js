/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // experimental:{
  //   forceSwcTransforms:true
  // },
  images: {
    domains: [
      "s3.us-west-2.amazonaws.com",
      "diy-registration-and-ticketing.s3.ap-south-1.amazonaws.com",
      "google.com",
    ],
  },
  basePath: `/${process.env.NEXT_PUBLIC_BASE_URL}`,
  devIndicators: {
    buildActivity: false
  },
  // webpack:false
  // trailingSlash:true
};

module.exports = nextConfig;
