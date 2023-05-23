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
If you want to know the details of the update script, open the slides afterwards and click on the link on this slide.
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
waitForHmr is what I shown in the previous "console.log" section
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
This can test if you configured your build tool correctly or your own code. Better to be safe than sorry.
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
We use this to test our gatsby-plugin-image component.
-->

---
layout: fact
hideInToc: true
---

## Spend time learning advanced features of your testing tool & <br />
## look out for community resources