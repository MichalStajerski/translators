const messageBoard = document.getElementById('messageBoard')
const message = document.createElement('div')
const form = document.getElementById('form')
const inputElements = document.getElementsByClassName('input')

const errorMessages = {
  age: 'age must be a number between 1 and 125',
  firstName: 'first and last name must start with Upper Case letter,have 2-20 characters, no numbers or special characters',
  lastName: 'first and last name must start with Upper Case letter,have 2-20 characters, no numbers or special characters',
  email: 'Wrong email',
  password: 'Password must contain at least one: number, upper case letter, lower case letter,special character and have min.8 chars'
}

const HtmlForm = {
  firstName: false,
  lastName: false,
  age: false,
  email: false,
  password: false
}

function getValues () {
  const inputValues = Array.from(inputElements).map((element) => element.value)
  checkRequirements(inputValues)
}

function checkRequirements (inputValues) {
  const firstAndLastNameRegex = new RegExp('^[A-Z]([A-Za-z]{1,19})$') // must start with capital letter, no numbers
  // ^[A-Z] => must start with capital letter
  // [A-Za-z] => must contain only upper or lower case letters
  // {1,19} length of string between 2 and 20
  const ageRegex = new RegExp('^([1-9]|[1-9][0-9]|1[01][0-9]|12[0-5])$') // expects numbver between 1 and 125
  // range from 1 to 125 is divided into: 
  // 1-9 => [1-9]
  // 10 - 99 => [1-9][0-9]
  // 100 - 119 => 1[01][0-9]
  // 120 - 125 => 12[0-5]
  const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')
  // ^ => The string starts with
  // (?=.*[a-z]) => The string must contain at least one lower case letter
  // (?=.*[A-Z]) => The string must contain at least one upper case letter
  // (?=.*[0-9]) => The string must contain at least one number
  // (?=.*[!@#\$%\^&\*]) => The string must contain at least one special character
  // (?=.{8,}) => THe string must be at least 8 characters long

  // validate whether our inputs are correct
  firstAndLastNameRegex.test(inputValues[0]) ? HtmlForm.firstName = true : false
  firstAndLastNameRegex.test(inputValues[1]) ? HtmlForm.lastName = true : false
  ageRegex.test(inputValues[2]) ? HtmlForm.age = true : false
  validateEmail(inputValues[3], HtmlForm)
  passwordRegex.test(inputValues[4]) ? HtmlForm.password = true : false
  // if there are some wrong filled fields show list of errors or display alert
  Object.values(HtmlForm).some(k => k !== true) ? showErrors(HtmlForm) : form.onsubmit = true && alert('Correct validation')
}

function validateEmail (emailAdress, HtmlForm) {
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  // \w+ => any letter,numer or underscore repeated 1 or more times
  // [.-] => matches character '.' or '-'
  // [.-]? => matches 0 or 1 occurence of this char
  // ([\.-]?\w+)* => matches the username in email that is placed before @
  // @ => must include this special char
  // \w+([\.-]?\w+)* => same as before just for the email domain
  // .\w{2,3} => two or three char string like com, pl, eu
  // (\.\w{2,3})+ => this expression can occur one or more times 
  emailAdress.match(regexEmail) ? HtmlForm.email = true : HtmlForm
}

function showErrors (HtmlForm) {
  message.innerHTML = ''
  console.log(HtmlForm)
  // displays errors in messageBoard
  for (const item in HtmlForm) {
    HtmlForm[item] ? null : message.innerHTML += `${item} => ${errorMessages[`${item}`]}<br/>`
  }
  messageBoard.appendChild(message)
}
