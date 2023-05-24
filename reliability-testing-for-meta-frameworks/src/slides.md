---
# Defaults for all slides
theme: default
title: Reliability Testing for Meta-Frameworks
titleTemplate: '%s'
info: |
  ## Reliability Testing for Meta-Frameworks

  Ever wondered how meta-frameworks test that their software is reliable against OS and browser differences, ad blockers, slow network speeds or other disturbances? That configuration options and core functionalities work in all cases, end-to-end on all platforms? That's what the makers of Gatsby, one of the largest React meta-frameworks, did to ensure resilience and reliability. In this talk you'll learn from their experiences and discover some techniques you can also adopt in your own web projects.

  Visit the author's website at [lekoarts.de](https://www.lekoarts.de?utm_source=reliability-testing-for-meta-frameworks)
download: false
highlighter: shiki
lineNumbers: false
colorSchema: light
fonts:
  sans: 'Mulish'
  serif: 'Roboto Slab'
  mono: 'Fira Code'
drawings:
  persist: false
css: unocss
selectable: true
transition: fade-out

# Slide config
hideInToc: true
layout: cover
---

<h1 flex="~ col">
  <b text-gradient font-bold>Reliability Testing</b>
  <div>for Meta-Frameworks</div>
</h1>

<div uppercase text-sm tracking-widest>
  Lennart Jörgens
</div>

<div abs-br mx-10 my-12 flex="~ col" text-sm text-right>
  <div>Front-End Test Fest</div>
  <div text-sm opacity-50>June 7, 2023</div>
</div>

---
layout: intro
growX: 10
growY: 90
hideInToc: true
---

# Lennart Jörgens

<div class="leading-10 opacity-80">
  Core maintainer of Gatsby<br>
  Working at Netlify<br>
</div>

[lekoarts.de](https://www.lekoarts.de?utm_source=reliability-testing-for-meta-frameworks) - @lekoarts

<img src="https://raw.githubusercontent.com/LekoArts/portfolio-v2/main/www/src/pages/about/lennart-profile-pic.jpg" rounded-full w-40 abs-tr mt-32 mr-40 />

---
layout: default
hideInToc: true
---

# Table of contents

<Toc></Toc>

<!--
Please note: This talk will contain examples using GitHub Actions, Jest, and Cypress.
The principles and functionalities can all be applied to other software like CircleCI, Vitest, or Playwright.

I want to give you inspiration on things you can test in combination with actionable examples on how to implement it.
-->

---
src: ./pages/01_why.md
---

---
src: ./pages/02_foundations.md
---

---
src: ./pages/03_configurations.md
---

---
src: ./pages/04_expected-behaviors.md
---

---
src: ./pages/05_unknowns.md
---

---
layout: default
hideInToc: true
class: summary-screen
---

<br />

- Test your core logic on different platforms & versions
- Consider your complete API surface when testing features, including environment variables
- Read up on advanced features like network request interception, stubbing, script execution to simulate and test behaviors
- Use community packages for things like a11y and snapshot testing
- Leverage bug reports to add tests for edge-cases

<!--
Reliability testing for your meta-framework is never done
-->

---
layout: end
hideInToc: true
---

# Thank You!

Slides on [lekoarts.de](https://www.lekoarts.de/appearances?utm_source=reliability-testing-for-meta-frameworks)

<!--
That's all for my talk. The slides can be found on my website. Thank you!
-->
