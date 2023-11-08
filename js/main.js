// Section 1: Data Fetching and Display
let productDataFromApi = [];
let carouselDataFromApi = [];

async function getData(page) {
  const FetchData = await fetch(`https://fakestoreapi.com/${page}`);
  const cardFetch = await fetch(`https://fakestoreapi.com/products`);
  const data = await FetchData.json();
  const cardfetchData = await cardFetch.json();
  productDataFromApi = data;
  carouselDataFromApi = cardfetchData;
  carouselOwl();
  await displayData(data);

  return carouselDataFromApi;
}
getData("products");

async function displayData(productDataFromApiPar) {
  document.getElementById("productsCon").innerHTML = "";
  let carton = "";

  for (let i = 0; i < productDataFromApiPar.length; i++) {
    carton = `<div class="col-lg-3 col-sm-6 overflow-hidden  cardHover">
        <div  class="card bg-info-subtle  h-100 position-relative p-sm-2 p-lg-4 rounded-5"  >
            <img src="${productDataFromApiPar[i].image}" class="card-img w-100 " style="height: 250px; " alt="...">
            <div class="card-body  px-0">
                <h6 class="card-title  ">${productDataFromApiPar[i].title}</h6>
                <p class="card-text  m-0 overflow-hidden" >${productDataFromApiPar[i].description}</p>
                <p class="mb-md-2"> category: <small>${productDataFromApiPar[i].category}</small>
               </p>
                <p class=" h6 ">price: <small>${productDataFromApiPar[i].price} EGP</small></p>
                <p class=" h6 d-none ">${productDataFromApiPar[i].id}</p>
               <div class="py-4 "><button class=" btn addBtn btn-outline-success position-absolute bottom-0 start-50 translate-middle ">add to cart </button></div>
            </div>
        </div>
    </div>`;
    document.getElementById("productsCon").innerHTML += carton;
  }
  carddisplay();
  addBtns();
}

function carddisplay() {
  const imgs = Array.from(document.querySelectorAll(".card"));
  const lightboxContainer = document.querySelector("#lightBox");
  const lightboxImg = document.querySelector(".imgs");
  const lightboxTitle = document.querySelector(".card-title");
  const lightboxDisc = document.querySelector(".card-text ");
  const lightboxCat = document.querySelector(".card-cat");
  const lightboxpri = document.querySelector(".card-prc");
  const closeIcon = document.getElementById("close");

  for (let i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener("click", async function (e) {
      if (e.target.classList[0] != "btn") {
        let currentSrc = imgs[i].children[0].src;
        let current = imgs[i].children[1];
        lightboxImg.setAttribute("src", currentSrc);
        lightboxTitle.innerHTML = current.children[0].innerHTML;
        lightboxDisc.innerHTML = current.children[1].innerHTML;
        lightboxCat.innerHTML = current.children[2].innerHTML;
        lightboxpri.innerHTML = current.children[3].innerHTML;
        lightboxContainer.classList.remove("d-none");
        document.body.style.overflow = "hidden";
      }
    });
  }

  closeIcon.addEventListener("click", closeSlider);
  function closeSlider() {
    lightboxContainer.classList.add("d-none");
    document.body.style.overflow = "auto";
  }
}
// Search Function

document.getElementById("searchInput").addEventListener("input", function (e) {
  const searchText = e.target.value.toLowerCase();
  let previousSearchText = ""; // Track the previous search text

  if (searchText !== previousSearchText) {
    previousSearchText = searchText;
    const data = productDataFromApi;
    const resultData = searchData(data, searchText);
    displayData(resultData);
    console.log(resultData);
  }
});

function searchData(data, searchText) {
  let filterData = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].title.toLowerCase().includes(searchText)) {
      filterData.push(data[i]);
    }
  }
  return filterData;
}
// Section 2: Carousel Display
async function carouselSkitter() {
  const cardData = document.getElementById("ulContainer");
  const datFromApi = await getData("products");

  let carouselData;

  for (let i = 0; i < (await datFromApi.length); i++) {
    carouselData = `<li class="w-100 " style="height: 250px; " >
                        <a class=" w-100" style="height: 250px; background-color:#18283b " >
                            <img src="${datFromApi[i].image}" class="cut d-d-block img-fluid" style="height: 250px !; "  />
                        </a>
                        <div class="label_text">
                            <p>
                                ${datFromApi[i].title}
                                
                            </p>
                        </div>
                    </li>`;
    cardData.innerHTML += carouselData;
  }
  skitter();
}

async function skitter() {
  await $(".skitter-large").skitter({
    dots: false,
    loop: true,
    animation: [
      "cube",
      "cubeRandom",
      "block",
      "cubeStop",
      "cubeStopRandom",
      "cubeHide",
      "cubeSize",
      "horizontal",
      "showBars",
      "showBarsRandom",
      "tube",
      "fade",
      "fadeFour",
      "parallel",
      "blind",
      "blindHeight",
      "blindWidth",
      "directionTop",
      "directionBottom",
      "directionRight",
      "directionLeft",
      "cubeSpread",
      "glassCube",
      "glassBlock",
      "circles",
      "circlesInside",
      "circlesRotate",
      "cubeShow",
      "upBars",
      "downBars",
      "hideBars",
      "swapBars",
      "swapBarsBack",
      "swapBlocks",
      "cut",
    ],
  });
}
carouselSkitter();
carouselOwl();

$(".dropdown-menu li").click(function (e) {
  var selectedOptionText = $(this).text();
  if (selectedOptionText == "products") {
    getData("products");
  } else {
    getData(`products/category/${selectedOptionText}`);
  }
});

function carouselOwl() {
  const datFromApi = carouselDataFromApi;
  // Initialize the Owl Carousel
  const owlCarousel = $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 20,
    dots: false,
    nav: false,
    smartSpeed: 10,
    autoplay: true,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 6,
      },
    },
  });
  datFromApi.forEach(function (item) {
    const sliderData = `<div class="item col-sm-12 ">
                <img class="img-fluid " src="${item.image}">
            </div>`;
    owlCarousel.trigger("add.owl.carousel", [sliderData]);
  });

  owlCarousel.trigger("refresh.owl.carousel");
}

/**log in and signup and log out */
const loginPage = document.querySelector("#loginPage");
const signupPage = document.querySelector("#signupPage");
const loginBox = document.querySelector("#loginBox");
const fName = document.querySelector("#name");
const password = document.querySelector("#password");
const loginPassword = document.querySelector("#loginPassword");
const email = document.querySelector("#email");
const loginEmail = document.querySelector("#loginEmail");
const login = document.querySelector("#login");
const loginBtn = document.querySelector("#loginBtn");
const signup = document.getElementById("signUp");
const signupBtn = document.querySelector("#signupBtn");
const title = document.querySelector("#title");
const errEmail = document.querySelector("#errEmail");
let usersArr = JSON.parse(localStorage.getItem("user")) || [];
let userId = "";
let cartArr = JSON.parse(localStorage.getItem("user")) || [];

// Check if userId is empty or null
if (!loginBox.classList.contains("d-none")) {
  $("body").addClass("overflow-hidden");
}

signup.addEventListener("click", navSignUp);
$("#GoToSignUp").click(() => {
  navSignUp();
  console.log("hello");
});
function navSignUp() {
  signupPage.classList.remove("d-none");
  loginPage.classList.add("d-none");
  signup.classList.add("active");
  login.classList.remove("active");
  $("#loginBox").removeClass("d-none");
}

login.addEventListener("click", function () {
  signupPage.classList.add("d-none");
  loginPage.classList.remove("d-none");
  $("#loginBox").removeClass("d-none");
  signup.classList.remove("active");
  login.classList.add("active");
});
//check inputs is valid data or not
// function checkinputs() {
//check name input is valid or not
fName.addEventListener("input", function nameCheck() {
  const namePattern = /^[A-Za-z ]{3,}$/;
  if (namePattern.test(fName.value) && fName.value.length > 3) {
    fName.classList.remove("is-invalid");
    fName.classList.add("is-valid");
  } else {
    fName.classList.remove("is-valid");
    fName.classList.add("is-invalid");
  }
});

//check password fr signup
password.addEventListener("input", function PassCheck() {
  const passwordPattern =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (passwordPattern.test(password.value)) {
    password.classList.remove("is-invalid");
    password.classList.add("is-valid");
  } else {
    password.classList.remove("is-valid");
    password.classList.add("is-invalid");
  }
});
//check email for signup
email.addEventListener("input", function emailCheck() {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (emailPattern.test(email.value)) {
    signupFun();
  } else {
    email.classList.remove("is-valid");
    email.classList.add("is-invalid");
    errEmail.classList.add("d-none"); // Hide the error message
  }
});

function signupFun() {
  var isEmailValid = true;
  for (let i = 0; i < usersArr.length; i++) {
    if (usersArr[i].userEmail === email.value) {
      isEmailValid = false;
      errEmail.classList.remove("d-none");
      email.classList.remove("is-valid");
      email.classList.add("is-invalid");
      break;
    }
  }

  if (isEmailValid) {
    email.classList.remove("is-invalid");
    email.classList.add("is-valid");
    errEmail.classList.add("d-none"); // Hide the error message
  }
}

loginEmail.addEventListener("input", function () {
  loginFun();
});
async function loginFun() {
  var isEmailValid = false;

  for (let i = 0; i < usersArr.length; i++) {
    if (usersArr[i].userEmail === loginEmail.value) {
      isEmailValid = true;
      loginEmail.classList.add("is-valid");
      loginEmail.classList.remove("is-invalid");
      loginPassword,
        addEventListener("input", function () {
          if (usersArr[i].userPassword === loginPassword.value) {
            loginPassword.classList.add("is-valid");
            loginPassword.classList.remove("is-invalid");
            userId = [i];
            // Save a value in the session storage
            sessionStorage.setItem("userId", userId);

            // Retrieve the value from the session storage
            accLogIn();
          } else {
            loginPassword.classList.remove("is-valid");
            loginPassword.classList.add("is-invalid");
            loginBtn.classList.add("disabled");
          }
        });
      break;
    }
  }

  if (!isEmailValid) {
    loginEmail.classList.add("is-invalid");
    loginEmail.classList.remove("is-valid");
  }
  accLogIn;
}

signupBtn.addEventListener("click", async function signup() {
  if (
    fName.classList.contains("is-valid") &&
    password.classList.contains("is-valid") &&
    email.classList.contains("is-valid")
  ) {
    document.getElementById("singupSuc").classList.remove("d-none");
    usersArr.push({
      userId: usersArr.length, // Set the userId as the current length of the array
      userName: fName.value,
      userPassword: password.value,
      userEmail: email.value,
      products: [],
    });

    saveInlocal();
    clearinput();
  }
});
function saveInlocal() {
  localStorage.setItem("user", JSON.stringify(usersArr));
}
$("#singupSucc").click(function () {
  // Simulate a click event on the login link in the navbar
  loginPage.click();
});
loginBtn.addEventListener("click", function () {
  for (let i = 0; i < usersArr.length; i++) {
    if (usersArr[i].userEmail === email.value) {
    }
  }
});

function accLogIn() {
  {
    loginBtn.classList.remove("disabled");
    loginBtn.addEventListener("click", function () {
      loginBox.classList.add("d-none");
      login.classList.add("d-none");
      signup.classList.add("d-none");
      $("body").removeClass("overflow-hidden");
      $("#logOut").removeClass("d-none");
      $("#cart").removeClass("d-none");
      $("#count").append(
        `<small>  ${usersArr[userId].products.length}</small>`
      );
    });
  }
}

function clearinput() {
  let inputs = document.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
  fName.classList.remove("is-valid");
  password.classList.remove("is-valid");
  email.classList.remove("is-valid");
}

$("#logOut").click(() => {
  signup.classList.remove("d-none");
  login.classList.remove("d-none");
  $("#logOut").addClass("d-none");
  $("#cart").addClass("d-none");
  sessionStorage.clear();
});
// Check if the "username" key is present in session storage and is not an empty string
$(document).ready(function () {
  // Check if the "user" key is not in session storage or is an empty string
  if (
    !sessionStorage.getItem("user") ||
    sessionStorage.getItem("user") === ""
  ) {
    // Hide the element with the id "logOut"
    $("#logOut").addClass("d-none");
  }
});

// Add an event listener to the window for the 'beforeunload' event
window.addEventListener("beforeunload", function (event) {
  // Clear the session storage when the tab or browser is closed
  sessionStorage.clear();
});

//this for session storage to get user id fro local storage
userId = sessionStorage.getItem("userId");

//  cart function
document.getElementById("cart").addEventListener("click", () => {
  $("#displayTable").removeClass("d-none");
  $("#cartTable").addClass("overflow-scroll");
  document.body.style.overflow = "hidden";
  displayCart();
});
$("#closeBtn").click(() => {
  $("#displayTable").addClass("d-none");
  document.body.style.overflow = "auto";
});

function cartData() {
  // const proArr = productDataFromApi;

  const filteredArr = usersArr[userId].products;
  // for (let i = 0; i < usersArr[userId].length; i++) {
  //   if (usersArr[userId].products[i] && usersArr[userId].products[i].productId) {
  //     idOfCart = usersArr[userId].products[i];
  //   }
  //   for (let j = 0; j < proArr.length; j++) {
  //     if (proArr[j].id == idOfCart.productId) {
  //       filteredArr.push({ data: proArr[j], qon: idOfCart.quantity });
  //     }
  //   }
  // }
  console.log(usersArr[userId].products);
  return filteredArr;
}
function displayCart() {
  $("#cartTable").empty();
  const dataTodisplay = cartData();
  let cartona = "";
  for (let i = 0; i < dataTodisplay.length; i++) {
    cartona = `<div
                  class="col-lg-4 col-md-6 d-flex  justify-content-center align-items-center col-sm-12 overflow-hidden rounded-4  ">

                  <div class=" bg-dark-subtle h-100  w-100  rounded-5 d-flex border shadow-sm my-2  ">
                      <div class="img w-50 m-3  align-self-center">
                          <img src="${dataTodisplay[i].cartImgSrc}"
                              class="cart-img imgs img-fluid  rounded-5 shadow-lg " alt="...">
                      </div>
                      <div class="cart-body cartdata shadow-lg w-75 align-self-center p-3 rounded-4">
                          <h6 class="cart-title h6">${dataTodisplay[i].cartTitle}</h6>
                          <p class="cart-text price my-md-2 overflow-hidden">price: <small>${dataTodisplay[i].cartpri} EGP</small></p>
                          <p class="cart-cat my-md-2"> category: <small>${dataTodisplay[i].cartCat}</small>
                          </p>
                          <div class="form-outline w-100 py-2">
                              <label class="pb-1" for="typeNumber">Quantity</label>
                              <input value="${dataTodisplay[i].qon}" min="0" type="number" id="typeNumber"
                                  class=" typeNumber form-control d-inline w-50 ps-2 py-1" />

                          </div>
                          <div class="btnsContainer w-100 my-lg-4 text-center ">
                              <button id="subItem" type="button"
                                  class="btn-sm btn disabled  mx-auto btn-success ">Submit</button>
                          </div>
                      </div>
                      <i id="deleteItem" data-product-index="${i}" class="fa-regular fa-circle-xmark fa-xl pt-4 me-3  "></i>
                  </div>

              </div>`;
    $("#cartTable").append(cartona);
  }
  deleProduct();
  quantityCheck();
}

//quantity check function
function quantityCheck() {
  const quantityInputs = Array.from(document.querySelectorAll(".cartdata"));

  for (let i = 0; i < quantityInputs.length; i++) {
    const updateButton = quantityInputs[i].children[4].children[0];
    let preValue =
      quantityInputs[i].children[3].children[1].getAttribute("value");
    quantityInputs[i].addEventListener("input", async (e) => {
      const newValue = e.target.value;

      if (newValue !== preValue) {
        updateButton.classList.remove("disabled");
      } else {
        updateButton.classList.add("disabled");
      }
    });
  }
}

//  for (let i = 0; i < addToCartBtns.length; i++) {
//   addToCartBtns[i].addEventListener("click", (e) => {
//     console.log("hello",e.target);
//   });

function addBtns() {
  const imgs = Array.from(document.querySelectorAll(".card"));
  let productsCartona = {};
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener("click", (e) => {
      if (e.target.classList[0] == "btn") {
        productsCartona = {
          cartImgSrc: imgs[i].children[0].src,
          cartTitle: imgs[i].children[1].children[0].innerHTML,
          cartDiscrption: imgs[i].children[1].children[1].innerHTML,
          cartCat: imgs[i].children[1].children[2].innerHTML,
          cartpri: imgs[i].children[1].children[3].innerHTML,
          cartid: imgs[i].children[1].children[4].innerHTML,
        };
        usersArr[userId].products.push(productsCartona);
        saveToLocalStorage();
      }
    });
  }
}

//delete function
function saveToLocalStorage() {
  localStorage.setItem("user", JSON.stringify(usersArr));
  $("#count").empty();
  $("#count").append(`<small>  ${usersArr[userId].products.length}</small>`);
}

// Function to delete a product from the user's cart
function deleteProduct(productIndex) {
  if (userId !== null && userId !== "") {
    if (productIndex >= 0 && productIndex < usersArr[userId].products.length) {
      usersArr[userId].products.splice(productIndex, 1);
      saveToLocalStorage(); // Save to local storage after deletion
      displayCart(); // Update the cart display
    }
  }
}

// Call the deleteProduct function when a delete button is clicked
function deleProduct() {
  const deletebtns = Array.from(document.querySelectorAll("#deleteItem"));

  for (let i = 0; i < deletebtns.length; i++) {
    deletebtns[i].addEventListener("click", function () {
      const productIndex = deletebtns[i].getAttribute("data-product-index");
      deleteProduct(productIndex);
    });
  }
}
