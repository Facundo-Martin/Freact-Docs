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

## SEO Component in Next.js

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
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="author" content={author} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      {language && <meta name="language" content={language} />}
      {country && <meta name="country" content={country} />}
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
