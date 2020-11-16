(function () {
  const ESC_CODE = 27;

  const buttonFeedback = document.querySelector('.feedback__button');
  const popup = document.querySelector('.popup');
  const close = document.querySelector('.popup__button-close');
  const yourName = popup.querySelector('[name=name]');
  const email = popup.querySelector('[name=mail]')
  const form = popup.querySelector('form');
  const message = popup.querySelector('[name=letter]');

  let isStorageSupport = true;
  let storageName  = '';
  let storageMail = '';

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
    if (evt.keyCode === ESC_CODE) {
      if (popup.classList.contains('popup--show')) {
        evt.preventDefault();
        popup.classList.remove('popup--show');
        popup.classList.remove('popup--error');
      }
    }
  });
})();

