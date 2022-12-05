---
sidebar_position: 6
---

# SEO

Implementing SEO best practices with Next.js

In this guide we will go over the following configurations:

- Using metadata following Open Graph protocol
- Build a reusable SEO component in Next.js
- Auditing and testing our web application's SEO performance

## SEO Introduction

The [SEO metadata tags](https://ogp.me/#metadata) are very important and improve your Google ranking and performance across the web. **A high-ranking website attracts more organic traffic from Google** and leads to more users for your blog & application.

[Open Graph](https://ogp.me/) is an internet protocol that was originally created by Facebook to standardize the use of metadata within a webpage to represent the content of a page.
Within it, you can provide details as simple as the title of a page or as specific as the duration of a video. These pieces all fit together to form a representation of each individual page of the internet.

In this guide we will learn how to leverage these tools to improve the SEO performance of our web application.

## SEO Auditing

If you already have a web application and want to assess its SEO performance, you can audit your site using [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/).

> Lighthouse is an open-source, automated tool for improving the quality of web pages. You can run it against any web page, public or requiring authentication. It has audits for performance, accessibility, progressive web apps, SEO and more.

You can run Lighthouse in Chrome DevTools, from the command line, or as a Node module. **You give Lighthouse a URL to audit, it runs a series of audits against the page, and then it generates a report on how well the page did**. From there, use the failing audits as indicators on how to improve the page. Each audit has a reference doc explaining why the audit is important, as well as how to fix it.

I recommend running Lighthouse from the ChromeDevTools. This is a straightforward process and their feedback is very user-friendly. You can run it by heading to:

```
Chrome Settings -> More Tools -> Developer Tools -> Lighthouse -> Analyze page load
```

Keep in mind that **SEO** and **Accesibility** go hand in hand, so in order to boost your SEO performance you will need to work on accessibility as well. This include alt tags for images, semantic HTML, support for screen readers, and more. We will be going over these on the next guide.

If you don't have a web application yet, you can build the SEO component with this guide and then come back to this section to audit your site.

## SEO Component in Next.js

Next.js provides us with an optimized [next/head](https://nextjs.org/docs/api-reference/next/head) component to handle our meta tags. In this section, we will be leveraging this component to build a highly reusbale SEO component. We will then implement this component in each of our pages to boost SEO performance.

Here is an updated version of the Next.js SEO component that includes the next/head component and additional Twitter and Facebook meta tags:

```tsx
// Reusable SEO component
import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  siteName: string;
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
    siteName,
    image,
    url,
    twitterHandle,
    author,
    keywords,
    language = "en",
    country,
  } = props;

  const DOMAIN = "https://www.jimraptis.com";
  const DEFAULT_OG_IMAGE =
    "https://storage.googleapis.com/brandflow-bucket/personal/blog/portfolio-og.jpg";

  return (
    <Head>
      <title key="title">{title}</title>
      // Basic Open Graph tags
      <meta key="og_title" property="og:title" content={title} />
      <meta key="description" name="description" content={description} />
      <meta
        key="og_description"
        property="og:description"
        content={description}
      />
      <meta key="og_type" property="og:type" content="website" />
      <meta key="og_image" property="og:image" content={image} />
      <meta key="image" name="image" content={image} />
      <meta key="og_url" property="og:url" content={url} />
      // Twitter tags
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
      // Optional tags
      <meta key="author" name="author" content={author} />
      {keywords.length > 0 && (
        <meta key="keywords" name="keywords" content={keywords.join(", ")} />
      )}
      {language && <meta key="language" name="language" content={language} />}
      {country && <meta key="country" name="country" content={country} />}
    </Head>
  );
}
```

To use this component, you can import it into your Next.js page and include it as part of the page's element. For example:

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

In this example, the SEO component will add the appropriate meta tags to the page's element, using the provided props to populate the values of the tags. This will help ensure that search engines can properly index your page and provide the right information to users who share your page on social media.

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

## Crawling and Indexing

When working on Search Engine Optimization, there are several key parts that impact Crawling and Indexing.

> With the above SEO component and implementation, we have provided our web application with solid SEO principles. Nonetheless, there are scenarios where you might want to **add further configurations**.

Since these files are quite specific to each project and needs, we will not be covering them in this guide. But Next.js has a Crawling and Indexing tutorial where they
topics such as how to [create a robots.txt file](https://nextjs.org/learn/seo/crawling-and-indexing/robots-txt) and how to [create an XML sitemap](https://nextjs.org/learn/seo/crawling-and-indexing/xml-sitemaps).

An example of this is if you want to disable crawlers for specific API routes.

**Keep in mind that these are very specific files**.

If you implement the right SEO tags and your Lighthouse scores are good, then there's probably no need to dive into these.

## Next.js Custom Document

Next.js gives us the possibility to add a [Custom Document](https://nextjs.org/docs/advanced-features/custom-document) at the page level.

> A custom Document can update the **html** and **body** tags used to render a Page. Custom attributes are allowed as props. For example, we might want to add lang="en" to the **html** tag.

To override the default Document, create the file pages/\_document.tsx as shown below:

```tsx
// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

Once we create the Custom Document component, we can start adding custom props to our website. Here is my recommended Custom Document configuration:

```tsx
// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
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
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

## What's next?

```

```
