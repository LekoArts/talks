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
layout: section
---

# Why?

<!--
So why is it important to test the reliablity of your framework? I want to show you some examples.
-->

---
layout: quote
hideInToc: true
---

# “I can rebuild this framework in a weekend”

<!--
You surely have seen such comments on the internet. But I'm then always thinking...
-->

---
layout: default
---

## What could possibly go wrong?

<br />

<v-clicks>

- Inconsistencies between operating systems & browsers
- Browser extensions like Ad-Blockers
- Flaky, slow internet
- Deployment of new artifacts
- Framework Bugs 🐞

</v-clicks>

<!--
... A lot of things can go wrong
-->

---
layout: fact
---

## Building a reliable framework is hard

<v-click>

But you can automate a lot of testing

</v-click>

<!--
And your testing coverage won't be perfect right from the start...
-->

---
layout: section
---

# Foundations

<!--
Independent on how you view the testing pyramid (listen to the talk "The Pyramid is Dead, Long Live the Pyramid" later), you can give yourself a solid foundation by going the extra mile during initial test setup.
-->

---
layout: default
---

## Foundations

<br />

<v-clicks>

- Unit test core functionalities
- Build out test utilities and patterns
- Run your tests on all supported versions and platforms
- Enjoy your testing setup

</v-clicks>

<!--
These are things that work well for Gatsby
-->

---
layout: default
hideInToc: true
---

## Operating Systems

Different path separators:

```shell
# Linux
/some/path

# Windows
\\some\\path
```

You can use libraries like [pathe](https://github.com/unjs/pathe) for path normalization.

ESM loader:

```js
/* Linux */
await import(somePath)

/* Windows */
await import(pathToFileURL(somePath).href)
```

---
layout: default
hideInToc: true
---

## Operating Systems

<br />

```yaml {3-6}
jobs:
  unit-tests:
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest]
    runs-on: ${{ matrix.os }}
	steps:
    - run: 'Your tests'
```

---
layout: default
hideInToc: true
---

## Node.js versions

<br />

```yaml {3-5,12}
jobs:
  build:
    strategy:
      matrix:
        node: [16, 18, 20]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup node
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node }}
      - run: 'Your tests'
```

---
layout: default
hideInToc: true
---

## Different browsers

<br />

```yaml {3-5,11}
jobs:
  build:
    strategy:
      matrix:
        browser: [chrome, firefox]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: cypress-io/github-action@v5
        with:
          browser: ${{ matrix.browser }}
```

---
layout: fact
---

## 🧂 Adjust to your situation accordingly

<!--
You might not need different browsers, you might not need all different versions. Choose a setup that makes you productive and trust into the CI
-->

---
layout: section
---

# Configurations

<!--
Your framework will have options and different code paths
-->

---
layout: default
hideInToc: true
---

## Configurations

<br />

<v-clicks>

- Behavior might depend on:
  - `NODE_ENV`
  - Environment variables
  - JS runtime
- 

</v-clicks>

<!--
TODO
-->

---
layout: section
---

# Expected behaviors

<!--
TODO
-->

---
layout: default
hideInToc: true
---

## TODO

TODO

---
layout: section
---

# Unknowns 👻

<!--
TODO
-->

---
layout: default
hideInToc: true
---

## TODO

TODO

---
layout: end
hideInToc: true
---

# Thank You!

Slides on [lekoarts.de](https://www.lekoarts.de?utm_source=reliability-testing-for-meta-frameworks)

<!--
That's all for my talk. The slides can be found on my website. Thank you!
-->