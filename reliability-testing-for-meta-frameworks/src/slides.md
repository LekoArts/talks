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
hideInToc: true
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
hideInToc: true
---

## Never assume things behave the same everywhere & <br />
## test your core logic extensively

<!--
You might not need different browsers, you might not need all different versions. Choose a setup that makes you productive and trust into the CI

SUMMARY:
- Utils to handle paths and other system inconsistencies
- Spend extra time in CI to check on all relevant platforms
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
- Different ways of defining a configuration
- Handling deprecated/legacy APIs

</v-clicks>

<!--
API design is hard and you'll make mistakes. But if you have solid test coverage you can at least move forward with some piece of mind.
-->

---
layout: default
hideInToc: true
---

## Checking `NODE_ENV`

<br />

```ts {2-4}
function nonDeterministicOutput(inputs) {
  if (process.env['NODE_ENV'] === 'test') {
    return 'stable output'
  }

  work(inputs)

  return inputs
}
```

<!--
Be careful with this one as you don't want your actual functionality to be different. This should just be used for codepaths that otherwise need to be mocked anyways, e.g. creating a random ID.
-->

---
layout: default
hideInToc: true
---

## Testing environment variables

<br />

```ts {2-4,10-12}
describe('Testing TRAILING_SLASH env var', () => {
  beforeAll(() => {
    process.env.TRAILING_SLASH = 'true'
  })

  it('should add trailing slash to url', () => {#
    expect(modifyUrl('http://example.com')).toBe('http://example.com/')
  })

  afterAll(() => {
    delete process.env.TRAILING_SLASH
  })
})
```

---
layout: default
hideInToc: true
---

### How would you test all variations in an E2E test suite?

<br />

```ts
type Config = {
  trailingSlash: 'always' | 'never'
}

const config: Config =  {
  trailingSlash: 'always',
}

export default config
```

---
layout: default
hideInToc: true
---

## The shell is your friend

<br />

```ts {1}
const trailingSlash = process.env.TRAILING_SLASH || 'always'

const config: Config =  {
  trailingSlash,
}

export default config
```

Set the environment variable inside the scripts you run:

```json {all|3-4|5|6|7|8-10}
{
  "scripts": {
    "build": "gatsby build",
    "serve": "gatsby serve",
    "cy:config": "cross-env-shell cypress run --config-file \"cypress/configs/$OPTION.ts\"",
    "build:opt": "cross-env-shell TRAILING_SLASH=$OPTION npm run build",
    "ssat:opt": "cross-env-shell OPTION=$OPTION TRAILING_SLASH=$OPTION ssat serve http://localhost:9000 cy:config",
    "test:always": "cross-env OPTION=always npm run build:opt && cross-env OPTION=always npm run ssat:opt",
    "test:never": "cross-env OPTION=never npm run build:opt && cross-env OPTION=never npm run ssat:opt",
    "test": "npm-run-all -c -s test:always test:never"
  }
}
```

<!--
Here's how we do it at Gatsby
-->

---
layout: fact
hideInToc: true
---

## Add test coverage for each new feature & <br />
## programatically run your tests e.g. via shell scripts

<!--
TODO
-->

---
layout: section
---

# Expected behaviors

<!--
Now that we went through the different configs, let's see how you can test functionalities of your meta-framework that should definitely work and that you control.
-->

---
layout: default
hideInToc: true
---

## Expected behaviors

<br />

<v-clicks>

- Client-side navigation. Did it reload?
- `console.log` information
- Hot Module Replacement (HMR)
- Accessibility checks (a11y)
- Generated artifacts
- Image components

</v-clicks>

<!--
The sky is the limit here. But you probably want to focus on important, widely used features.
-->

---
layout: default
hideInToc: true
---

## Did it reload?

<br />

```ts {5-11}
describe('Client-side navigation', () => {
  it('did not reload', () => {
    cy.visit('/')

    cy.window().then(win => {
      win.__didNotReload = true
    })

    cy.findByText('Page 2').click()

    cy.window().its('__didNotReload').should('equal', true)
  })
})
```

<!--
If there would be a reload, didNotReload would not exist on the window object
-->

---
layout: default
hideInToc: true
---

## `console.log` information

<br />

```ts {9,17}
Cypress.Commands.overwrite('visit', (orig, url, options = {}) => {
  const newOptions = {
    ...options,
    onBeforeLoad: win => {
      if (options.onBeforeLoad) {
        options.onBeforeLoad(win)
      }

      cy.spy(win.console, 'log').as('hmrConsoleLog')
    },
  }

  return orig(url, newOptions)
})

Cypress.Commands.add('waitForHmr', (message = 'App is up to date') => {
  cy.get('@hmrConsoleLog').should('be.calledWithMatch', message)
  cy.wait(1000)
})
```

<!--
You don't need to overwrite "visit", you can also alias it inside your test. This is just Gatsby's setup.

We use this to inspect the browser console. "App is up to date" comes from our webpack implementation and is printed, when HMR is done.

We also use this to check if ESLint rules work, since their warnings are printed to the console.
-->

---
layout: default
hideInToc: true
---

## HMR utility

Your testing suite can also invoke npm scripts. Use that to your advantage!

[Example script](https://github.com/gatsbyjs/gatsby/blob/ccbbda5c6ae4cc9dfcbbf07891e9c74461c6ed55/e2e-tests/development-runtime/scripts/update.js)

```ts
// Pseudo code

async function update() {
  // Setup global history to track changes
  // Parse CLI args
  // Restore object if input is given
  // Create file if it doesn't exist
}

update()
```

In Cypress you then can call it like this:

```ts
cy.exec('npm run update -- --file path/to/file.tsx --replacements "REPLACE_ME:Hello World"')
```

<!--
TODO
-->

---
layout: default
hideInToc: true
---

## HMR

React component:

```tsx {2}
export default function Title() {
  return <h1 data-testid="title">{'%TITLE%'}</h1>
}
```

Test:

```ts {4-6,8-9}
describe('HMR: React components', () => {
  it('updates on change', () => {
    const text = `Hello World`
    cy.exec(
      `npm run update -- --file src/components/title.tsx --replacements "TITLE:${text}"`
    )

    cy.waitForHmr()
    cy.findByTestId('title').should('have.text', text)
  })
})
```

<!--
TODO
-->

---
layout: default
hideInToc: true
---

## Accessibility checks

There are many great talks and articles about this! Please watch/read those to learn more.

For automated testing I can recommend:

- [cypress-axe](https://github.com/component-driven/cypress-axe)
- [cypress-real-events](https://github.com/dmtrKovalenko/cypress-real-events)

But automated testing should only be a **part** of your a11y strategy.

<!--
TODO
-->

---
layout: default
hideInToc: true
---

## Generated artifacts

<br />

```ts {3-4,9-11,15-17}
describe(`Webpack Assets`, () => {
  beforeEach(() => {
    cy.intercept("/static/font-name-**.woff2").as("font-regular")
    cy.intercept("/image-file.png").as("static-folder-image")
    cy.visit(`/assets`)
  })

  it(`should create font file`, () => {
    cy.wait("@font-regular").should(req => {
      expect(req.response.url).to.match(/font-name-/i)
    })
  })

  it(`should load static folder asset`, () => {
    cy.wait("@static-folder-image").should(req => {
      expect(req.response.statusCode).to.be.gte(200).and.lt(400)
    })
  })
})
```

<!--
TODO
-->

---
layout: default
hideInToc: true
---

## Image components

Use a tool like [@simonsmith/cypress-image-snapshot](https://github.com/simonsmith/cypress-image-snapshot) to visually test components.

[Example test suite](https://github.com/gatsbyjs/gatsby/tree/ccbbda5c6ae4cc9dfcbbf07891e9c74461c6ed55/e2e-tests/visual-regression)

<br />

<img src="/image-diff-react-php.png" alt="Three screenshots side by side. The left one says 'Welcome to React' and shows the React logo. The right one says 'Welcome to PHP' and show the PHP logo. The middle image is the diff of those two images. So where they are different, it shows red overlays." />

<!--
TODO
-->

---
layout: fact
hideInToc: true
---

## Spend time learning advanced features of your testing tool & <br />
## look out for community resources

<!--
TODO
-->

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

## Unknowns 👻

<br />

<v-clicks>

- Ad-Blocker
- Deploys between page navigations
- Internet speed
- Bots

</v-clicks>

<!--
TODO
-->

---
layout: default
hideInToc: true
---

## Missing/Blocked page resources

<br />

- Ad-Blockers can arbitrarily block deployed files e.g. because they contain banned words
- Visitors can browse the website while a new deploy happened in the background
- Deployment of files might be misbehaving

These are all edge-cases but you can still make your framework resilient against those things.

<!--
Ad-Blocker and deploys between page navigations can be grouped into "missing/blocked page resources"
-->

---
layout: full
hideInToc: true
class: code-scroll
---

```ts
/* --- Cypress Configuration --- */
import { defineConfig } from "cypress"
// Utilties later used on "task"
import { blockResourcesUtils } from "./cypress/utils/block-resources"

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on(`task`, {
        ...blockResourcesUtils
      })
    },
  },
})

/* --- Test File --- */

function runTests(testNameSuffix) {
  it(`Loads index - ${testNameSuffix}`, () => {
    cy.visit(`/`).waitForAPIorTimeout(`onRouteUpdate`, waitForAPIOptions)
    cy.getTestElement(`dom-marker`).contains(`index`)
  })
}

const runBlockedScenario = ({ filter, pagePath }) => {
  beforeEach(() => {
    cy.task("getAssetsForPage", { pagePath, filter }).then(urls => {
      for (const url of urls) {
        cy.intercept(url, {
          statusCode: 404,
          body: "",
        })
        cy.log(`intercept ${url}`)
      }
    })
  })

  afterEach(() => {
    cy.task("getAssetsForPage", { pagePath, filter }).then(urls => {
      expect(Object.keys(cy.state("routes")).length).to.equal(urls.length)
    })
  })

  runTests(`Blocked "${filter}" for "${pagePath}"`)
}

const runSuiteForPage = (label, pagePath) => {
  describe(`Missing "${label}" resources`, () => {
    describe(`Missing all "${label}" page assets`, () => {
      runBlockedScenario({
        pagePath,
        filter: `all`,
      })
    })
  })
}

runSuiteForPage(`Index`, `/`)
```

---
layout: default
hideInToc: true
---

## Internet speed

Your front-end can have checks like these:

```ts {3,6,14-17}
const isSlow = () => {
  if ('connection' in navigator && typeof navigator.connection !== 'undefined') {
    if ((navigator.connection.effectiveType || '').includes('2g')) {
      return true
    }
    if (navigator.connection.saveData) {
      return true
    }
  }
  return false
}

class Loader {
  shouldPrefetch(pagePath) {
    if (isSlow()) {
      return false
    }

    return true
  }
}
```

<!--
TODO
-->

---
layout: default
hideInToc: true
---

## Internet speed

<br />

```ts {8,15,19}
Cypress.Commands.add('visitWith2G', (url, effectiveType = '2g') => {
  cy.visit(url, {
    onBeforeLoad(win) {
      const connection = {
        effectiveType,
        addEventListener: () => {},
      }
      cy.stub(win.navigator, 'connection', connection);
    },
  })
})

describe('Loading indicator', () => {
  beforeEach(() => {
    cy.visitWith2G('/')
  })

  it('shown on 2G speed', () => {
    cy.findByTestId('loading-indicator').should('be.visible')
  })
})
```

<!--
TODO
-->

---
layout: default
hideInToc: true
---

## Bots

Similarly you can also check for bots:

```ts
const BOT_REGEX = /bot|crawler|spider|crawling/i

class Loader {
  shouldPrefetch(pagePath) {
    if (navigator.userAgent && BOT_REGEX.test(navigator.userAgent)) {
      return false
    }

    return true
  }
}
```

<!--
TODO
-->

---
layout: default
hideInToc: true
---

## Bots

<br />

```json
{
  "scripts": {
    "cy:run:bot": "CYPRESS_CONNECTION_TYPE=bot cypress run",
  }
}
```

<br />

```ts
{
  setupNodeEvents(on) {
    on('before:browser:launch', (browser = {}, opts) => {
      if (process.env.CYPRESS_CONNECTION_TYPE === `bot`) {
        opts.args.push('--user-agent="Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"')
      }
  
      return opts
    })
  },
},
```

<!--
TODO
-->

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
- Leverage bug reports to add test cases for _those_ edge-cases

<!--
TODO
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
