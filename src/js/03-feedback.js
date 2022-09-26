import throttle from 'lodash.throttle';
const formRef = document.querySelector('.feedback-form');
const emailRef = formRef.querySelector('input');
const messageRef = formRef.querySelector('textarea');

formRef.addEventListener('input', throttle(formChange, 500));

// console.log(formRef);

let dataForm = {};
const STORAGE_KEY = 'feedback-form-state';

function formChange(e) {
  //отслеживаем событие в форме и вносим изменения значений по ключу в объекте dataForm

  dataForm[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataForm));
}

formRef.addEventListener('submit', submitForm);

function submitForm(e) {
  //отслеживаем события отправки формы и вывод объекта в консоль + очистка формы и localStorage
  if (emailRef.value === '' || messageRef.value === '') {
    alert('Необходимо заполнить все поля!');
    return;
  }
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  dataForm = {};
}

formStorage();

// функция сохранения данных формы в случае обновления страницы
function formStorage() {
  let data = localStorage.getItem(STORAGE_KEY);
  // console.log(data);
  if (data) {
    data = JSON.parse(data);
    Object.entries(data).forEach(([name, value]) => {
      dataForm[name] = value;
      formRef.elements[name].value = value;
    });
  }
}
