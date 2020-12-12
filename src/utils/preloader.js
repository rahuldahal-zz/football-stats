let loader;

function setLoader() {
  loader = document.querySelector(".loader");
}

export function showLoader() {
  !loader && setLoader();
  loader && loader.classList.remove("loader__hidden");
}

export function hideLoader() {
  !loader && setLoader();

  loader && loader.classList.add("loader__hidden");
}
