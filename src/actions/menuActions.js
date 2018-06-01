export const menuConstants = {
  SHOW: 'SHOW_MENU'
}

export const menuActions = {
  showMenu
}

function showMenu(show = true) {
  console.log(`showMenu called`);
  return {type: menuConstants.SHOW, show}
}
