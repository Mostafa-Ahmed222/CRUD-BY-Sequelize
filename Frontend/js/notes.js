const basedUserUrl = "http://localhost:3000/api/v1/user";
function welcome() {
  axios({
    method: "get",
    url: `${basedUserUrl}/${localStorage.getItem("userId")}`,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then((response) => {
      const {
        user: { userName },
      } = response.data;
      console.log(userName);
      localStorage.setItem("userName", `${userName}`);
      const user = document.getElementById("userName");
      user.innerHTML = `Welcome ${localStorage.getItem("userName")}`;
    })
    .catch((err) => {
      console.log("catch error", err);
    });
}
welcome();

let allLink = document.querySelectorAll("a");
let signup = document.getElementById("sign");
let signUp = document.querySelector(".signup");
let logIn = document.querySelector(".login");
allLink.forEach((e) => {
  e.onclick = () => {
    allLink.forEach((e) => {
      e.classList.remove("active");
    });
    e.classList.add("active");
    if (e.classList.contains("sign")) {
      location.replace(
        "file:///D:/Education/courses/Route/Node%20js/Assignment/ass%205/Frontend/index.html#"
      );
      localStorage.clear();
    }
  };
});
const overlay = document.getElementById("overlay");
const restore = document.getElementById("restore");
const update = document.getElementById("update");
overlay.onclick = function () {
  overlay.style.display = "none";
  add.style.display = "none";
  restore.style.display = "none";
  update.style.display = "none";
};
const trash = document.getElementById("trash");
const addbtn = document.getElementById("book");
const add = document.getElementById("add");

// start connection with backend
const basedproductUrl = "http://localhost:3000/api/v1/product";
let books = [];
let allTrash = [];
let search = [];
const userId = localStorage.getItem("userId");
function getData() {
  axios({
    method: "get",
    url: `${basedproductUrl}/user/${userId}`,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then((response) => {
      const { message, product } = response.data;
      books = product;
      showData();
    })
    .catch((err) => {
      console.log("catch error", err);
    });
}
getData();
function showData() {
  const box = document.getElementById("box");
  let cartona = ``;
  for (let index = 0; index < books.length; index++) {
    cartona += `<div class="box">
    <i class="fas fa-book-reader fa-4x"></i>
    <i class="fas fa-trash" onclick='deleteItem(${books[index].id})'
    id="btn-danger"></i>
    <i class="fas fa-edit" onclick='updateItem(${books[index].id})'
    id="btn-success"></i>
    <h3>${books[index].name}</h3>
    <div class="info">
      <div class="price">${books[index].price}$</div>
    </div>
  </div>`;
  }
  box.innerHTML = cartona;
}
const nameUpdate = document.getElementById("up-name");
const priceUpdate = document.getElementById("up-price");
const btnUpdate = document.getElementById("update-btn");
function updateItem(id) {
  update.style.display = "flex";
  overlay.style.display = "block";
  localStorage.setItem("bookId", `${id}`);
  axios({
    method: "get",
    url: `${basedproductUrl}/${id}`,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then((response) => {
      const {
        message,
        product: { name, price },
      } = response.data;
      if (message == "Done") {
        nameUpdate.value = name;
        priceUpdate.value = price;
      }
    })
    .catch((err) => console.log("catch error", err));
}
btnUpdate.onclick = function () {
  const data = {
    name: nameUpdate.value,
    price: priceUpdate.value,
  };
  axios({
    method: "patch",
    url: `${basedproductUrl}/${localStorage.getItem("bookId")}`,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    data,
  })
    .then((response) => {
      const { message } = response.data;
      if (message == "Done") {
        update.style.display = "none";
        overlay.style.display = "none";
        getData();
      }
    })
    .catch((err) => console.log("catch error", err));
};
function deleteItem(id) {
  axios({
    method: "get",
    url: `${basedproductUrl}/sdelete/${id}`,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then((response) => {
      console.log(response.data);
      const { message } = response.data;
      if (message == "Done") {
        getData();
      }
    })
    .catch((err) => console.log("catch error", err));
}
addbtn.onclick = function () {
  overlay.style.display = "block";
  add.style.display = "flex";
};
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const addProduct = document.getElementById("add-btn");
addProduct.onclick = function () {
  const data = {
    name: nameInput.value,
    price: priceInput.value,
    UserId: userId,
  };
  axios({
    method: "post",
    url: `${basedproductUrl}/`,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    data,
  })
    .then((response) => {
      const { message } = response.data;
      if (message == "Done") {
        getData();
        nameInput.value = "";
        priceInput.value = "";
      }
    })
    .catch((err) => console.log("catch error", err));
};
trash.onclick = function () {
  restore.style.display = "flex";
  overlay.style.display = "block";
  getTrash();
};

function getTrash() {
  axios({
    method: "get",
    url: `${basedproductUrl}/trash/${userId}`,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then((response) => {
      const { message, product } = response.data;
      allTrash = product;
      if (books.length) {
        const userName = document.getElementById("userName");
        userName.innerHTML = `Welcome ${books[0].User.userName}`;
      }
      showTrashData();
    })
    .catch((err) => {
      console.log("catch error", err);
    });
}
function showTrashData() {
  const box = document.getElementById("box-two");
  let cartona = ``;
  for (let index = 0; index < allTrash.length; index++) {
    cartona += `<div id="box-two">
    <div class="undo">
      <p>${allTrash[index].name}</p>
      <button id="rest" onclick='undoItem(${allTrash[index].id})'=>Restore</button>
      <button id="del" onclick='destroyItem(${allTrash[index].id})'>delete</button>
    </div>
  </div>`;
  }
  box.innerHTML = cartona;
}
function destroyItem(id) {
  axios({
    method: "delete",
    url: `${basedproductUrl}/delete/${id}`,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then((response) => {
      const { message } = response.data;
      if (message == "Done") {
        getTrash();
      }
    })
    .catch((err) => {
      console.log("catch error", err);
    });
}
function undoItem(id) {
  axios({
    method: "get",
    url: `${basedproductUrl}/restore/${id}`,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then((response) => {
      const { message } = response.data;
      if (message == "Done") {
        getData();
        getTrash();
      }
    })
    .catch((err) => {
      console.log("catch error", err);
    });
}
const select = document.querySelector("select");
const searchInput = document.getElementById("search");
searchInput.oninput = function () {
  if (select.value == "name") {
    axios({
      method: "get",
      url: `${basedproductUrl}/searchname/${userId}?key=${searchInput.value}`,
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    })
      .then((response) => {
        const { message, product } = response.data;
        if (message == "Done") {
          search = product;
          searchData();
        }
      })
      .catch((err) => {
        console.log("catch error", err);
      });
  } else {
    axios({
      method: "get",
      url: `${basedproductUrl}/searchprice/${userId}?key=${searchInput.value}`,
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    })
      .then((response) => {
        const { message, product } = response.data;
        if (message == "Done") {
          search = product;
          searchData();
        }
      })
      .catch((err) => {
        console.log("catch error", err);
      });
  }
};
function searchData() {
  const box = document.getElementById("box");
  let cartona = ``;
  for (let index = 0; index < search.length; index++) {
    cartona += `<div class="box">
    <i class="fas fa-book-reader fa-4x"></i>
    <i class="fas fa-trash" onclick='deleteItem(${search[index].id})'
    id="btn-danger"></i>
    <i class="fas fa-edit" onclick='updateItem(${search[index].id})'
    id="btn-success"></i>
    <h3>${search[index].name}</h3>
    <div class="info">
      <div class="price">${search[index].price}$</div>
    </div>
  </div>`;
  }
  box.innerHTML = cartona;
}
search;
