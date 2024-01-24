const emailInput = document.getElementById("email");
const nameInput = document.getElementById("name");
const passwordInput = document.getElementById("password");
const form = document.getElementById("form");
const errorEl = document.getElementById("error");
const msgEls = document.getElementsByClassName("msg");
const inputGroup = document.getElementsByClassName("input-group");

form.addEventListener("submit", (event) => {
  let isValid = false;
  let messages = [];

  if (!validateEmail(emailInput.value)) {
    setError("Invalid email format", msgEls[0], emailInput);
    isValid = false;
  } else {
    clearError(msgEls[0], emailInput);
  }

  if (!validateName(nameInput.value)) {
    setError("Invalid name", msgEls[1], nameInput);
    isValid = false;
  } else {
    clearError(msgEls[1], nameInput);
  }

  if (!validatePassword(passwordInput.value)) {
    setError(
      "Password must be between 6 and 15 characters",
      msgEls[2],
      passwordInput
    );
    isValid = false;
  } else {
    clearError(msgEls[2], passwordInput);
  }

  if (nameInput.value.trim() === "") {
    messages.push("Name is required");
  }

  if (passwordInput.value.length < 6) {
    messages.push("Password must be at least 6 characters.");
  }

  if (passwordInput.value.length > 15) {
    messages.push("Password must be less than 15 characters.");
  }

  if (passwordInput.value === "password") {
    messages.push("Please use a more secure password");
  }

  if (messages.length > 0) {
    event.preventDefault();
    errorEl.innerText = messages.join(", ");
  }

  if (!isValid) {
    event.preventDefault();
  }
});

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateName(name) {
  return name.trim().length > 0;
}

function validatePassword(password) {
  return password.length >= 6 && password.length <= 15;
}

function setError(message, msgEls, inputElement) {
  msgEls.textContent = message;
  msgEls.style.display = "block";
  msgEls.classList.add("error");
  inputElement.classList.add("error");
  msgEls.style.color = "rgb(var(--error))";
  inputElement.style.boxShadow = "0 0 0 1px rgb(var(--error))";
}

function clearError(msgEls, inputElement) {
  msgEls.textContent = "Valid input";
  msgEls.style.display = "none";
  msgEls.classList.add("success");
  msgEls.classList.remove("error");
  inputElement.classList.remove("error");
  msgEls.style.color = "rgb(var(--success))";
  inputElement.style.boxShadow = "0 0 0 1px rgb(var(--success))";
}
