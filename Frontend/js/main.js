let allLink = document.querySelectorAll("a");
let signUp = document.querySelector(".signup");
let logIn = document.querySelector(".login");
allLink.forEach((e) => {
  e.onclick = () => {
    allLink.forEach((e) => {
      e.classList.remove("active");
    });
    e.classList.add("active");
    if (e.classList.contains("sign")) {
      e.innerHTML = "go to Login";
      const head = document.getElementById("head");
      head.innerHTML = "Signup";
      e.classList.add("log");
      e.classList.remove("sign");
      logIn.style.display = "none";
      signUp.style.display = "block";
    } else if (e.classList.contains("log")) {
      e.innerHTML = "go to Signup";
      const headlog = document.getElementById("headlog");
      headlog.innerHTML = "login";
      headlog.style.color = "#ddd";
      e.classList.add("sign");
      e.classList.remove("log");
      signUp.style.display = "none";
      logIn.style.display = "block";
    }
  };
});
// start connection with backend
const basedUserUrl = "http://localhost:3000/api/v1/user";
const basedproductUrl = "http://localhost:3000/api/v1/product";

const logbtn = document.getElementById("login");
const signbtn = document.getElementById("signup");
logbtn.onclick = () => {
  const userMail = document.getElementById("email");
  const userpass = document.getElementById("password");
  const data = {
    email: userMail.value,
    password: userpass.value,
  };
  axios({
    method: "post",
    url: `${basedUserUrl}/login`,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    data,
  })
    .then((response) => {
      const { message, user } = response.data;
      if (message == "Done") {
        const headlog = document.getElementById("headlog");
        headlog.innerHTML = "Success";
        headlog.style.color = "green";
        localStorage.setItem("userId", `${user.id}`);
        setTimeout(() => {
          location.replace(
            "file:///D:/Education/courses/Route/Node%20js/Assignment/ass%205/Frontend/notes.html#"
          );
        }, 0);
      } else {
        userpass.value = ""
        const headlog = document.getElementById("headlog");
        headlog.innerHTML = "invalid email or password";
        headlog.style.cssText = "color : red; text-align : center;";
      }
    })
    .catch((err) => {
      const headlog = document.getElementById("headlog");
      headlog.innerHTML = "invalid data";
      headlog.style.color = "red";
      console.log(err);
    });
};
signbtn.onclick = () => {
  const userName = document.getElementById("newname");
  const age = document.getElementById("newage");
  const email = document.getElementById("newmail");
  const phone = document.getElementById("newphone");
  const password = document.getElementById("newpass");
  const confirm = document.getElementById("confirm");
  const data = {
    userName: userName.value,
    age: age.value,
    email: email.value,
    phone: phone.value,
    password: password.value,
  };
  if (password.value == confirm.value) {
    axios({
      method: "post",
      url: `${basedUserUrl}/signup`,
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      data: data,
    })
      .then((response) => {
        const { message } = response.data;
        if (message == "Done") {
          const head = document.getElementById("head");
          head.innerHTML = "Success";
          head.style.color = "green";
        } else {
          password.value = "";
          confirm.value = "";
          const head = document.getElementById("head");
          head.innerHTML = "email already exist";
          head.style.color = "red";
        }
      })
      .catch((err) => {
        const head = document.getElementById("head");
        password.value = "";
        confirm.value = "";
        head.innerHTML = "invalid data";
        head.style.color = "red";
        console.log(err);
      });
  } else {
    password.value = "";
    confirm.value = "";
    const head = document.getElementById("head");
    head.innerHTML = "invalid confirmation of password";
    head.style.color = "red";
  }
};
