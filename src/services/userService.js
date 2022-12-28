const lowerCase = /[a-z]/g;
const upperCase = /[A-Z]/g;
const nums = /[0-9]/g;
const specialCharacters = /[-_@#$%*?&~]/;

function isSignUpDataValid(firstName, lastName, email, password) {
  return (
    isUserNameValid(firstName, lastName) &&
    isEmailValid(email) &&
    isPasswordValid(password)
  );
}

function isUserNameValid(firstName, lastName) {
  const userName = `${firstName} ${lastName}`;
  return userName.length > 0;
}

function isEmailValid(email) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  return email.match(emailRegex);
}

function isPasswordValid(password) {
  return (
    password.length > 8 &&
    password.length < 20 &&
    password.match(lowerCase) &&
    password.match(upperCase) &&
    password.match(nums) &&
    password.match(specialCharacters)
  );
}

module.exports = { isSignUpDataValid };
