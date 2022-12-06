---
sidebar_position: 6
---

# SEO

Implementing SEO best practices with Next.js

In this guide we will go over the following configurations:

- Using metadata following Open Graph protocols
- Auditing and testing our web application's SEO performance
- Build a reusable SEO component in Next.js
- Configuring additional files

## SEO Introduction

The [SEO metadata tags](https://www.w3schools.com/tags/tag_meta.asp) are very important and improve your Google ranking and performance across the web. **A high-ranking website attracts more organic traffic from Google** and leads to more users for your blog & application.

[Open Graph](https://ogp.me/) is an internet protocol that was originally created by Facebook to standardize the use of metadata within a webpage to represent the content of a page.
Within it, you can provide details as simple as the title of a page or as specific as the duration of a video. These pieces all fit together to form a representation of each individual page of the internet.

In this guide we will learn how to leverage these tools to improve the SEO performance of our web application.

## SEO Auditing

If you already have a web application and want to assess its SEO performance, you can audit your site using [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/).

> Lighthouse is an open-source, automated tool for improving the quality of web pages. You can run it against any web page, public or requiring authentication. It has audits for performance, accessibility, progressive web apps, SEO and more.

You can run Lighthouse in Chrome DevTools, from the command line, or as a Node module. **You give Lighthouse a URL to audit, it runs a series of audits against the page, and then it generates a report on how well the page did**. From there, use the failing audits as indicators on how to improve the page. Each audit has a reference doc explaining why the audit is important, as well as how to fix it.

I recommend running Lighthouse from the ChromeDevTools. This is a very straightforward process and the feedback is quite insightful and user-friendly. You can run it by heading to:

```
Chrome Settings -> More Tools -> Developer Tools -> Lighthouse -> Analyze page load
```

> Keep in mind that **SEO** and **Accesibility** go hand in hand, so in order to boost your SEO performance you will need to work on accessibility as well. This include alt tags for images, semantic HTML, support for screen readers, and more. We will be going over these on the next guide.

If you don't have a web application yet, you can follow the steps in this guide and then come back to audit your site.

## SEO Component in Next.js

Next.js provides us with an optimized [next/head](https://nextjs.org/docs/api-reference/next/head) component to handle our meta tags. In this section, we will be leveraging this component as well as meta tags to build a highly reusbale SEO component. We will then implement this component in each of our pages to boost SEO performance.

Our component should take props such as title, description, image, etc and then handle them accordignly.

This is what an optimized SEO Component looks like:

```tsx
// SEO.tsx component
import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  image: string;
  url: string;
  type?: string;
  twitterHandle?: string;
  author?: string;
  keywords?: string[];
  language?: string;
  country?: string;
}

export default function SEO(props: SEOProps) {
  const {
    title,
    description,
    image,
    type = "website",
    url = "https://www.mysite.com",
    twitterHandle,
    author,
    keywords,
    language = "en",
    country = "US",
  } = props;

  const defaultImage = "https://somesite.com/image.jpg";

  return (
    <Head>
      <title key="title">{title}</title>
      // Basic Open Graph tags
      <meta property="og:title" key="og_title" content={title} />
      <meta
        property="og:description"
        key="og_description"
        content={description}
      />
      <meta property="og:type" key="og_type" content={type} />
      <meta
        property="og:image"
        key="og_image"
        content={image || defaultImage}
      />
      <meta property="og:url" key="og_url" content={url} />
      // Twitter tags
      <meta
        name="twitter:card"
        key="twitter_card"
        content="summary_large_image"
      />
      <meta name="twitter:title" key="twitter_title" content={title} />
      <meta
        name="twitter:description"
        key="twitter_description"
        content={description}
      />
      <meta
        name="twitter:image"
        key="twitter_image"
        content={image || defaultImage}
      />
      <meta
        name="twitter:creator"
        key="twitter_creator"
        content={twitterHandle}
      />
      // Optional tags
      <meta name="author" key="author" content={author} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" key="keywords" content={keywords.join(", ")} />
      )}
      <meta name="language" key="language" content={language} />
      <meta name="country" key="country" content={country} />
    </Head>
  );
}
```

In this example, the SEO component will add the appropriate meta tags to the page's element, using the provided props to populate the values of the tags. This will help ensure that search engines can properly index your page and provide the right information to users who share your page on social media.

```tsx
import SEO from "./SEO";

export default function Home() {
  return (
    <>
      <SEO
        title="My Page"
        description="This is my page"
        image="https://my-page.com/image.jpg"
        url="https://my-page.com"
        twitterHandle="@mypage"
        author="John Doe"
        keywords={["my", "page", "example"]}
      />
    </>
  );
}
```

This might seem overwhelming, but once you have the initial configuration for your SEO component you just need to pass down a few props to start boosting your SEO performance.

## SEO Testing Tools

There are many tools to test SEO performance and metatags, from Chrome extension to specific social media debuggers. Here are a few recommendations

- [SEO Minion Chrome Extension](https://chrome.google.com/webstore/detail/seo-minion/giihipjfimkajhlcilipnjeohabimjhi)

  - SEO Minion helps you in your daily SEO tasks such as On-Page SEO analysis, Broken Link Checking, SERP Preview and more

- [Accesibility Insights Chrome Extension](https://chrome.google.com/webstore/detail/accessibility-insights-fo/pbjjkligggfmakdaogkfomddhfmpjeni?hl=en) (more on this later)

  - Accessibility Insights for Web helps developers quickly find and fix accessibility issues.

- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

  - Discover how to optimize your content for better engagement on LinkedIn

- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

  - Optimize Tweets with Twitter Card

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

  - You can use the Sharing Debugger to see the information that is used when your website content is shared on Facebook, Messenger and other places

## Next.js App Metadata

Some times we will just have some meta tags that will be used across the entire application. We can create another component called AppMetadata (or any name of your choice) and then use it in our \_app.tsx.

```tsx
// AppMetadata.tsx
import Head from "next/head";

export default function AppMetadata() {
  return (
    <Head>
      {/* Viewport tag https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag*/}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* Define charset for HTML5 Doctype */}
      <meta charSet="utf-8" />
      {/* Add the name of your site here */}
      <meta
        key="og_sitename"
        property="og:site_name"
        content="Your Site Name Here"
      />
      {/* Location */}
      <meta property="og:locale" content="en_US" />
    </Head>
  );
}
```

Then, we can simply import it into our app_tsx component.

```tsx
// _app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppMetadata from "../components/AppMetadata";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppMetadata />
      <Component {...pageProps} />
    </>
  );
}
```

> You can also add these meta tags directly into your \_app.tsx component. However, once you start adding different providers such as GraphQL and Apollo, your \_app.tsx file gets quite long.

## Next.js Custom Document

Next.js gives us the possibility to add a [Custom Document](https://nextjs.org/docs/advanced-features/custom-document) at the page level.

> A custom Document can update the **html** and **body** tags used to render a Page. Custom attributes are allowed as props. For example, we might want to add lang="en" to the **html** tag.

We are just going to add the language settings into this document, but you can add other scripts and features such as [Google Analytcis](https://analytics.google.com/analytics/web/provision/#/provision).

```tsx
// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

## Crawling and Indexing

When working on Search Engine Optimization, there are several key parts that impact Crawling and Indexing.

> With the above SEO component and implementation, we have provided our web application with solid SEO principles. Nonetheless, there are scenarios where you might want to **add further configurations**.

An example of this is if you want to disable crawlers for specific API routes.

Since these files are quite specific to each project and needs, we will not be covering them in this guide. But Next.js has a Crawling and Indexing tutorial where they
topics such as how to [create a robots.txt file](https://nextjs.org/learn/seo/crawling-and-indexing/robots-txt) and how to [create an XML sitemap](https://nextjs.org/learn/seo/crawling-and-indexing/xml-sitemaps).

**Keep in mind that these are very specific files**.

If you implement the right SEO tags and your Lighthouse scores are good, then there's probably no need to dive into these.

## What's next?

Metatags, custom documents, and SEO testing tools can help us boost our web application's SEO.

Nonetheless, SEO performance and Google rankings are heavily tied to accesibility and overall site performance. The speed and accesibility of our web application will play a large role in how search engines index and rank our pages.

In the next guide, we will explore how to improve web accesibility following best practices and [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) standards.
