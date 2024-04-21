import { useEffect } from "react";
// https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes/75699736#75699736
function usePageChange() {
  let oldHref = document.location.href;

  function handlePageChange() {
    let bodyList = document.body;

    let observer = new MutationObserver(function (mutations) {
      if (oldHref !== document.location.href) {
        oldHref = document.location.href;
        console.log(`页面发生了切换，当前的页面链接为${oldHref}`);
      }
    });

    let config = {
      childList: true,
      subtree: true,
    };

    observer.observe(bodyList, config);
  }

  useEffect(() => {
    handlePageChange();
  }, []);

  return {
    handlePageChange,
  };
}

export default usePageChange;
