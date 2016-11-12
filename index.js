const pagemark = (() => {
  'use strict';

  let pagemark = {
    pages: []
  };

  init();
  getPagemark();


  // --- Event listeners ---

  window.addEventListener('beforeunload', setPagemark);


  // --- Functions ---

  // Scroll to saved position if possible
  function getPagemark () {
    for (let i = 0; i < pagemark.pages.length; i++) {
      if (pagemark.pages[i].url === window.location.href) {
        window.scrollTo(0, pagemark.pages[i].mark);
        console.log('Got mark; you\'re back.');
        break;
      }
    }
  }

  // Attempt to retrieve pagemark from localStorage; return true if found and false otherwise
  function init () {
    const storage = localStorage.getItem('pagemark');
    if (storage !== null && typeof storage !== 'undefined' && storage !== '') { // localStorage key exists and not empty
      pagemark = JSON.parse(storage);
      for (let i = 0; i < pagemark.pages.length; i++) {
        if (pagemark.pages[i].url === window.location.href) {
          return true;
        }
      }
      return false;
    }
    return false;
  }

  // Save scrolled posiiton
  function setPagemark () {
    const newMark = {
      url: window.location.href,
      mark: document.body.scrollTop
    };
    if (pagemark.pages.length === 0) {
      pagemark.pages.push(newMark);
    } else {
      for (let i = 0; i < pagemark.pages.length; i++) {
        if (pagemark.pages[i].url === window.location.href) {
          pagemark.pages[i].mark = newMark.mark;
          break;
        } else if (i === pagemark.pages.length - 1) {
          pagemark.pages.push(newMark);
        }
      }
    }
    localStorage.setItem('pagemark', JSON.stringify(pagemark));
  }


  // --- Expose ---

  return {
    get: getPagemark,
    set: setPagemark
  };

})();
