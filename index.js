(() => {
  'use strict';

  let bookmarkLocal;
  init();

  // Scroll to saved position
  function getBookmark () {
    window.scrollTo(0, bookmarkLocal);
  }

  // Add event listener; if possible, scroll to saved position
  function init () {
    window.addEventListener('scroll', setBookmark);
    bookmarkLocal = localStorage.getItem('bookmarkLocal');
    if (bookmarkLocal !== null && typeof bookmarkLocal !== 'undefined' && bookmarkLocal !== '') { // localStorage key exists and not empty
      getBookmark();
    } else {
      return;
    }
  }

  // Save scrolled posiiton
  function setBookmark () {
    localStorage.setItem('bookmarkLocal', document.body.scrollTop);
  }

})();
