---
layout: section
---

# Unknowns 👻

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
And anything else that might come up one day in your issue tracker
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

const runBlockedScenario = ({ filter, pagePath }) => {
  beforeEach(() => {
    // "getAssetsForPage" is our own utility
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

  runTests(`Blocked "${filter}" for "${pagePath}"`)
}
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

---
layout: default
hideInToc: true
---

## Internet speed

<br />

```ts {8,15,19}
Cypress.Commands.add('visitWithType', (url, effectiveType) => {
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
    cy.visitWithType('/', '2g')
  })

  it('shown on 2G speed', () => {
    cy.findByTestId('loading-indicator').should('be.visible')
  })
})
```

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

```ts {4-6}
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