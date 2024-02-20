const MIN_PASSWORD_LENGTH = 6;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emailValidation = (email: string) => EMAIL_REGEX.test(email);

const passwordValidation = (password: string) => password.length >= MIN_PASSWORD_LENGTH;

function loginValidation(email: string, password: string) {
  const validEmail = emailValidation(email);
  const validPassword = passwordValidation(password);

  return (validEmail && validPassword);
}

export default loginValidation;
