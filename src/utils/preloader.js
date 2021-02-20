let loader;

function setLoader() {
  loader = document.querySelector(".loader");
}

export function showLoader() {
  !loader && setLoader();
  loader && loader.classList.remove("loader--loaded");
  loader && loader.classList.add("loader--shown");
}

export function hideLoader() {
  !loader && setLoader();

  loader && loader.classList.add("loader--loaded");
  setTimeout(() => {
    loader && loader.classList.remove("loader--shown");
    loader && loader.classList.remove("loader--loaded");
  }, 600);
}
