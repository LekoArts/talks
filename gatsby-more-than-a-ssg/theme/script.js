if (typeof document !== 'undefined') {
  require('style-loader!css-loader!./style.css')

  // make it easier to navigate the slides via the keyboard
  document.body.tabIndex = '-1'
  window.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
      document.body.focus()
    }
  })
}