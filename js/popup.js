var buttonFeedback = document.querySelector('.feedback__button');
var popup = document.querySelector('.popup');
var close = document.querySelector('.popup__button-close');
var yourName = popup.querySelector('[name=name]');
var email = popup.querySelector('[name=mail]')
var form = popup.querySelector('form');
var message = popup.querySelector('[name=letter]');

var isStorageSupport = true;
var storageName  = '';
var storageMail = '';

try {
  storageName  = localStorage.getItem('name');
  storageMail = localStorage.getItem('mail');
} catch (err) {
  isStorageSupport = false;
};

buttonFeedback.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.add('popup--show');
  if (storageName && storageMail) {
    yourName.value = storageName;
    email.value = storageMail;
    message.focus();
  } else {
    yourName.focus();
  }
});

close.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.remove('popup--show');
  popup.classList.remove('popup--error');
});

form.addEventListener ('submit', function (evt) {
  if (!yourName.value || !email.value) {
    evt.preventDefault();
    popup.classList.remove('popup--error');
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add('popup--error');
    console.log('Нужно вести имя, фамилию и почту')
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', yourName.value);
      localStorage.setItem('mail', email.value);
    }
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (popup.classList.contains('popup--show')) {
      evt.preventDefault();
      popup.classList.remove('popup--show');
      popup.classList.remove('popup--error');
    }
  }
});
