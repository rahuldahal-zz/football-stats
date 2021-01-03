let loader;

function setLoader() {
  loader = document.querySelector(".loader");
}

export function showLoader() {
  !loader && setLoader();
  loader && loader.classList.remove("loader--hidden");
}

export function hideLoader() {
  !loader && setLoader();

  loader && loader.classList.add("loader--loaded");
  setTimeout(() => {
    loader && loader.classList.add("loader--hidden");
  }, 300);
}
