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

```json {3|4-5|7-8}
{
  "scripts": {
    "test": "npm-run-all -c -s test:always test:never",
    "test:always": "cross-env OPTION=always npm run test-script",
    "test:never": "cross-env OPTION=never npm run test-script",
    "//": "Other scripts...",
    "cy:config": "cross-env-shell cypress run --config-file \"cypress/configs/$OPTION.ts\"",
    "build:opt": "cross-env-shell TRAILING_SLASH=$OPTION npm run build",
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
Ideally these scripts are used both locally and in CI so that the test setup stays the same.
Also makes onboarding new people easier.
-->