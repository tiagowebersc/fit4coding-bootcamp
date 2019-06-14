let hashChat = "";
let idIntervalChat = "";
let refreshChatList = true;

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#signup").addEventListener("submit", e => {
    e.preventDefault();
    const user = document.querySelector("#user").value;
    const password = document.querySelector("#password").value;
    const confPassword = document.querySelector("#confirmPassword").value;
    if (password !== confPassword) {
      document.querySelector("#errorSignup").textContent =
        "Password don't match";
    } else {
      if (user !== "" && password !== "") {
        signupServer(user, password);
      }
    }
  });
  document.querySelector("#login").addEventListener("submit", e => {
    e.preventDefault();
    const user = document.querySelector("#userL").value;
    const password = document.querySelector("#passwordL").value;
    if (user !== "" && password !== "") {
      loginServer(user, password);
    }
  });
  document.querySelector("#userMessage").addEventListener("submit", e => {
    e.preventDefault();
    const message = document.querySelector("#message").value;
    if (message.length > 0) {
      sendMessage(hashChat, message);
      document.querySelector("#message").value = "";
    }
  });
  document.querySelector("#loginOption").addEventListener("click", () => {
    document.querySelector("#signup").style.display = "none";
    document.querySelector("#login").style.display = "flex";
  });
  document.querySelector("#chatView").addEventListener("mouseover", () => {
    refreshChatList = false;
  });
  document.querySelector("#chatView").addEventListener("mouseout", () => {
    refreshChatList = true;
  });
});
function signupServer(user, password) {
  hashChat = "";
  const data = { login: user, password: password };
  fetch("http://ajax.i-marty.eu/addUser", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      if (Number(response.retour) === -1 || Number(response.retour) === 0) {
        document.querySelector("#errorSignup").textContent = response.serverMsg;
      } else {
        hashChat = response.retour;
        openChat(user);
      }
    })
    .catch(
      error =>
        (document.querySelector("#errorSignup").textContent = "Error: " + error)
    );
}
function loginServer(user, password) {
  const loginData = { login: user, password: password };
  fetch("http://ajax.i-marty.eu/checkUser", {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      if (Number(response.retour) === 0) {
        document.querySelector("#errorLogin").textContent = response.serverMsg;
      } else {
        hashChat = response.retour;
        openChat(user);
      }
    })
    .catch(
      error =>
        (document.querySelector("#errorLogin").textContent = "Error: " + error)
    );
}
function openChat(user) {
  document.querySelector("#modal").style.display = "none";
  document.querySelector("#userMessage h3").textContent = user;
  idIntervalChat = setInterval(refreshChat, 250);
}
function refreshChat() {
  if (refreshChatList) {
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        document.querySelector("#chatView").innerHTML = "";
        for (const message of JSON.parse(xmlhttp.responseText).Messages) {
          const divMessage = document.createElement("div");
          const pUser = document.createElement("p");
          const pDate = document.createElement("p");
          const pMessage = document.createElement("p");
          divMessage.classList.add("chat");
          pUser.classList.add("user");
          pDate.classList.add("date");
          pMessage.classList.add("message");
          pUser.textContent = message.user;
          const localDate = new Date(message.date);
          pDate.textContent = localDate.toLocaleString();
          pMessage.textContent = message.message;
          divMessage.appendChild(pUser);
          divMessage.appendChild(pDate);
          divMessage.appendChild(pMessage);
          document.querySelector("#chatView").appendChild(divMessage);
        }

        const objChat = document.querySelector("#chatView");
        objChat.scrollTop = objChat.scrollHeight;
      }
    };
    xmlhttp.open("GET", "http://ajax.i-marty.eu/chatMessages", true);
    xmlhttp.send();
  }
}
function sendMessage(hash, message) {
  const data = { hash: hash, message: message };
  fetch("http://ajax.i-marty.eu/addMessage", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      const retour = Number(response.retour);
      if (retour !== 1) {
        document.querySelector("#errorMessage").textContent =
          response.serverMsg;
      } else {
        document.querySelector("#errorMessage").textContent = "";
      }
    })
    .catch(
      error =>
        (document.querySelector("#errorMessage").textContent =
          "Error: " + error)
    );
}
