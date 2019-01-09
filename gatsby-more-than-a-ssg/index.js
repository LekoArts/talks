import Intro from './sections/01-intro.mdx'
import Introduction from './sections/02-introduction.mdx'
import Community from './sections/03-community.mdx'
import Playground from './sections/04-playground.mdx'
import Demo from './sections/05-demo.mdx'

export { default as theme } from './theme'

export default [
  ...Intro,
  ...Introduction,
  ...Community,
  ...Playground,
  ...Demo
]