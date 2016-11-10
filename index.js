(() => {
  'use strict';

  let pagemark;
  init();

  // Scroll to saved position
  function getPagemark () {
    window.scrollTo(0, pagemark);
  }

  // Add event listener; if possible, scroll to saved position
  function init () {
    window.addEventListener('scroll', setPagemark);
    pagemark = localStorage.getItem('pagemark');
    if (pagemark !== null && typeof pagemark !== 'undefined' && pagemark !== '') { // localStorage key exists and not empty
      getPagemark();
    } else {
      return;
    }
  }

  // Save scrolled posiiton
  function setPagemark () {
    localStorage.setItem('pagemark', document.body.scrollTop);
  }

})();
