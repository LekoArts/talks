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
-->