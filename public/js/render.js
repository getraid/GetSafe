/* global page, swal */

page.renderRoot = 'render/al/'
page.renderArray = [
  'stop.jpg'
]
page.render = null

page.doRenderSwal = function () {
  const div = document.createElement('div')
  div.innerHTML = `
    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input id="swalRender" type="checkbox" ${localStorage.render === '0' ? '' : 'checked'}>
          Enable random render of ship waifu~
        </label>
      </div>
      <p class="help">If disabled, you will still be able to see a small button on the bottom right corner of the screen to re-enable it.</p>
    </div>
  `

  swal({
    content: div,
    buttons: {
      confirm: true
    }
  }).then(function (value) {
    if (!value) return
    const newValue = div.querySelector('#swalRender').checked ? undefined : '0'
    if (newValue !== localStorage.render) {
      newValue ? localStorage.render = newValue : localStorage.removeItem('render')
      swal('Success!', `Render is now ${newValue ? 'disabled' : 'enabled'}.`, 'success')
      const element = document.querySelector('body > .render')
      element.remove()
      page.doRender()
    }
  })
}

page.getRenderVersion = function () {
  const renderScript = document.getElementById('renderScript')
  if (renderScript && renderScript.dataset.version)
    return `?v=${renderScript.dataset.version}`
  return ''
}

page.doRender = function () {
  if (!page.renderRoot || !page.renderArray || !page.renderArray.length) return

  let element
  if (localStorage.render === '0') {
    element = document.createElement('a')
    element.className = 'button is-breeze is-hidden-mobile'
    element.title = 'ship waifu~'
    element.innerHTML = '<i class="icon-picture-1"></i>'
  } else {
    // Let us just allow people to get new render when toggling the option
    page.render = page.renderArray[Math.floor(Math.random() * page.renderArray.length)]
    element = document.createElement('img')
    element.alt = element.title = 'ship waifu~'
    element.className = 'is-hidden-mobile'
    element.src = `${page.renderRoot}${page.render}${page.getRenderVersion()}`
  }

  element.classList.add('render')
  element.addEventListener('click', page.doRenderSwal)
  document.body.appendChild(element)
}

page.doRender()
