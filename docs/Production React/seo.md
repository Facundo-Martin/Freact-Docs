---
sidebar_position: 6
---

# SEO

Implementing SEO best practices with Next.js

It builds your site as simple **static HTML, JavaScript and CSS files**.

## Build your site

Build your site **for production**:

```bash
npm run build
```

The static files are generated in the `build` folder.

## Deploy your site

Test your production build locally:

```bash
npm run serve
```

The `build` folder is now served at [http://localhost:3000/](http://localhost:3000/).

You can now deploy the `build` folder **almost anywhere** easily, **for free** or very small cost (read the **[Deployment Guide](https://docusaurus.io/docs/deployment)**).

## SEO Audit

If you already have a web application and want to assess its SEO performance, you can audit your site using lighthouse.

This is a simple and straight forward process, since lighthouse is built into the ChromeDevTools.

Keep in mind that SEO and Accesibility go hand in hand, so in order to boost your SEO performance you will need to work on accessibility as well. This include alt tags for images, relevant headings, support for screen readers, and more. We will be going over these on the next guide.

Accesibility -> semantic html, main, etc

## SEO Component in Next.js

Next.js provides us with an optimized [next/head](https://nextjs.org/docs/api-reference/next/head) component to handle our meta tags. In this section, we will be leveraging this component to build a highly reusbale SEO component. We will then implement this component in each of our pages to boos SEO performance.

Here is an updated version of the Next.js SEO component that includes the next/head component and additional Twitter and Facebook meta tags:

```tsx
// Reusable SEO component
import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  image: string;
  url: string;
  twitterHandle: string;
  author?: string;
  keywords?: string[];
  language?: string;
  country: string;
}

export default function SEO(props: SEOProps) {
  const {
    title,
    description,
    image,
    url,
    twitterHandle,
    author,
    keywords,
    language = "en",
    country,
  } = props;

  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="description" name="description" content={description} />
      <meta key="image" name="image" content={image} />
      <meta key="og_title" property="og:title" content={title} />
      <meta
        key="og_description"
        property="og:description"
        content={description}
      />
      <meta key="og_image" property="og:image" content={image} />
      <meta key="og_url" property="og:url" content={url} />
      <meta key="og_type" property="og:type" content="website" />
      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta key="twitter_title" name="twitter:title" content={title} />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={description}
      />
      <meta key="twitter_image" name="twitter:image" content={image} />
      <meta
        key="twitter_creator"
        name="twitter:creator"
        content={twitterHandle}
      />
      <meta key="author" name="author" content={author} />
      {keywords.length > 0 && (
        <meta key="keywords" name="keywords" content={keywords.join(", ")} />
      )}
      {language && <meta key="language" name="language" content={language} />}
      {country && <meta key="country" name="country" content={country} />}
      <meta property="og:locale" content="en_US" />
    </Head>
  );
}
```

To use this component, you can import it into your Next.js page and include it as part of the page's element. For example:

```TypeScript
import SEO from './SEO';

const MyPage = () => (
<>
<SEO
title="My Page"
description="This is my page"
image="https://my-page.com/image.jpg"
url="https://my-page.com"
twitterHandle="@mypage"
author="John Doe"
keywords={['my', 'page', 'example']}
language="en"
country="US"
/>
</>
);

```

In this example, the SEO component will add the appropriate meta tags to the page's element, using the provided props to populate the values of the tags. This will help ensure that search engines can properly index your page and provide the right information to users who share your page on social media.
