const pagemark = (() => {
  'use strict';

  let pagemark = {
    pages: []
  };
  init();
  getPagemark();

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

  // Retrieve pagemark from localStorage; add event listener
  function init () {
    const storage = localStorage.getItem('pagemark');
    if (storage !== null && typeof storage !== 'undefined' && storage !== '') { // localStorage key exists and not empty
      pagemark = JSON.parse(storage);
    }
    window.addEventListener('scroll', setPagemark);
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

  return {
    get: getPagemark
  };

})();
