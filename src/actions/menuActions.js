export const menuConstants = {
  SHOW: 'SHOW_MENU'
}

export const menuActions = {
  showMenu
}

function showMenu(show = true) {
  return {type: menuConstants.SHOW, show}
}
