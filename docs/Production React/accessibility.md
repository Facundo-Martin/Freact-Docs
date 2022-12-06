---
sidebar_position: 7
---

# Accessibility

Accessibility checklist and aspects to take into account
Improving accessibility in a Next.js web application involves making sure that the application is usable by people with disabilities. This can be achieved by following the Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA) standards.

Here are some steps you can follow to improve the accessibility of your Next.js web application:

1. Add appropriate WAI-ARIA roles to your HTML elements: WAI-ARIA roles are attributes that you can add to HTML elements to give them specific meaning and help assistive technologies (such as screen readers) understand the purpose of the element. For example, you can add the role="button" attribute to a `<div>` element to make it behave like a button.

```jsx
<div role="button" aria-label="Click me">
  Click me
</div>
```

2. Use semantic HTML tags: Semantic HTML tags are tags that clearly describe the purpose of the element they are applied to. For example, using a `<button>` tag instead of a `<div>` with the role="button" attribute will make it easier for assistive technologies to understand the purpose of the element.

```jsx
<button type="button" aria-label="Click me">
  Click me
</button>
```

3. Use descriptive alt text for images: The alt attribute specifies alternative text for an image, which is used by assistive technologies (such as screen readers) to describe the image to users. Make sure to use descriptive alt text that accurately describes the content of the image.

```jsx
<img src="my-image.jpg" alt="A picture of a beautiful mountain landscape" />
```

4. Provide labels for form controls: Form controls, such as `<input>` and `<textarea>` elements, should have associated labels that describe their purpose. This can be done by using the `<label>` element, or by using the for and id attributes.

```jsx
<label htmlFor="name">Name:</label>
<input type="text" id="name" />
```

5. Use descriptive and unique id attributes: The id attribute is used to uniquely identify an HTML element, and is often used in conjunction with the for attribute of a `<label>` element to associate a label with a form control. Make sure to use descriptive and unique id values to make it easier for assistive technologies to understand the purpose of the element.

```jsx
<label htmlFor="name">Name:</label>
<input type="text" id="name" />
```

Use appropriate keyboard interactions: Keyboard interactions are an important part of accessibility, as they allow users who cannot use a mouse to navigate and interact with the application. Make sure to use appropriate keyboard interactions, such as using the tab key to move between form controls, and using the enter key to activate buttons.

```jsx
<button type="button" onKeyDown={handleKeyDown}>
  Click me
</button>;

function handleKeyDown(event) {
  if (event.key === "Enter") {
    // Do something when the enter key is pressed
  }
}
```

Use appropriate contrast ratios for text and background colors: The contrast ratio between text and background colors should be at least 4.5:1 for normal text, and at least 3:1 for large text (18 point or larger, or 14 point or larger if bold). This ensures that the text is readable for users with low vision.

```jsx
<p style={{ color: "#000000", backgroundColor: "#FFFFFF" }}>
  This text has a contrast ratio of 21:1, which is sufficient for normal text.
</p>
```

Test your application for accessibility: The best way to ensure that your application is accessible is to test it with real users who have disabilities. This will help you identify any accessibility issues and fix them before the application is released.

```jsx
import { screen } from "@testing-library/react";

test("MyButton is accessible", () => {
  render(<MyButton label="Click me" />);

  expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
});
```
