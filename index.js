var formDef1 = [
  {
    label:'Разработчики:',
    type:'longtext',
    name:'developers'
  },
  {
    label:'Название сайта:',
    type:'longtext',
    name:'sitename'
  },
  {
    label:'URL сайта:',
    type:'shorttext',
    name:'siteurl'
  },
  {
    label:'Дата запуска сайта:',
    type:'number',
    name:'date'
  },
  {
    label:'Посетителей в сутки:',
    type:'number',
    name:'visitors'
  },
  {
    label:'E-mail для связи:',
    type:'shorttext',
    name:'email'
  },
  {
    label:'Рубрика каталога:',
    type:'combo',
    name:'division',
    variants:[
      {
        text:'здоровье',
        value:1
      },
      {
        text:'домашний уют',
        value:2
      },
      {
        text:'бытовая техника',
        value:3,
        selected: true
      }
    ]
  },
  {
    label:'Размещение:',
    type:'radio',
    name:'payment',
    variants:[
      {
        text:'бесплатное',
        value:1
      },
      {
        text:'платное',
        value:2
      },
      {
        text:'VIP',
        value:3
      }
    ]
  },
  {
    label:'Разрешить отзывы:',
    type:'check',
    name:'votes'
  },
  {
    label:'Описание сайта:',
    type:'memo',
    name:'description'
  },
  {
    caption:'Опубликовать',
    type:'submit'
  },
];
window.onload = createForm(formDef1);

function createForm(array){
  let mainForm = document.getElementsByName('mainForm');
  let mainDiv = createDiv('mainDiv');
  mainForm[0].appendChild(createFormFromArr(array, mainDiv));
}
function createFormFromArr(array, mainDiv){
  for (var i = 0; i < array.length; i++) {
    let rowDiv = createDiv('rowDiv');
    if ((array[i].label !== undefined)) {
      if (array[i].type !== 'memo') {
        rowDiv.appendChild(createDiv('collDivLeft')).append(createLabel(array[i]));
        if (array[i].type == 'radio') {
          rowDiv.appendChild(createRadioInput(array[i], createDiv('collDivRight')));
        }else {
          rowDiv.appendChild(createInputs(array[i], createDiv('collDivRight')));
        }
      }else{
        rowDiv.appendChild(createLabel(array[i]));
        rowDiv.appendChild(createTextarea(array[i]));
      }
    }else{
      rowDiv.appendChild(createButton(array[i]));
    }
    mainDiv.appendChild(rowDiv);
  }
  return mainDiv;
}

function createDiv(classList){
  let mainDiv = document.createElement('div');
  mainDiv.classList = classList;
  return mainDiv;
}
function createLabel(obj){
  let label = document.createElement('label');
  label.innerText = obj.label;
  label.id = obj.name;
  label.classList = 'mainLabel';
  return label;
}
function createInputs(obj, div){
  if ((obj.type == 'longtext')||(obj.type == 'shorttext')) {
    div.appendChild(createTextInput(obj));
  }
  if (obj.type == 'number') {
    div.appendChild(createNumberInput(obj));
  }
  if (obj.type == 'combo') {
    div.appendChild(createComboInput(obj));
  }
  if (obj.type == 'radio') {
    div.appendChild(createTextInput(obj));
  }
  if (obj.type == 'check') {
    div.appendChild(createCheckboxInput(obj));
  }
  return div;
}
function createTextInput(obj){
  let input = document.createElement('input');
  input.classList = obj.type;
  input.name = obj.name;
  return input;
}
function createNumberInput(obj){
  let input = document.createElement('input');
  input.classList = obj.type;
  input.name = obj.name;
  return input;
}
function createComboInput(obj){
  let select = document.createElement('select');
  select.classList = obj.type;
  for (var i = 0; i < obj.variants.length; i++) {
    let option = document.createElement('option');
    option.innerText = obj.variants[i].text;
    option.value = obj.variants[i].value;
    if (obj.variants[i].selected) {
      option.selected = true;
    }
    select.appendChild(option);
  }
  return select;
}
function createRadioInput(obj, div){
  for (var i = 0; i < obj.variants.length; i++) {
    let input = document.createElement('input');
    input.type = 'radio';
    input.name = obj.name;
    input.id = obj.name + i;
    let label = document.createElement('label');
    label.for = obj.name + i;
    label.innerText = obj.variants[i].text;
    label.appendChild(input);
    label.classList = 'labelRadio';
    div.appendChild(label);
  }
  return div;
}
function createCheckboxInput(obj){
  let input = document.createElement('input');
  input.name = obj.name;
  input.type = 'checkbox';
  return input;
}
function createTextarea(obj){
  let div = document.createElement('div');
  let input = document.createElement('textarea');
  input.name = obj.name;
  div.appendChild(input)
  return div;
}
function createButton(obj){
  let button = document.createElement('input');
  button.type = obj.type;
  button.value = obj.caption;
  return button;
}
// валидация
function getElements(array){
  for (var i = 0; i < array.length; i++) {
  let elem = document.getElementsByName(array[i].name);
    if (elem.length !== 0) {
      if (elem.length = 1) {
        emptyInput(elem[0], array[i].name);
      }
      if (array[i].type == 'number') {
        numbersInput(elem[0]);
      }
      if (array[i].name == 'email') {
        emailInput(elem[0]);
      }
    }else{
      if (array[i].type == 'submit') {
        let inputSubmit = document.querySelectorAll('input[type=submit]');
        submitInput(inputSubmit[0], array);
      }
    }
  }
}
//При разфокусе проверка на пустые поля
function emptyInput(elem){
  elem.addEventListener('blur', function(){
    createEventEmpty(elem);
  })
}
function createEventEmpty(elem){
  elem.value = elem.value.trim();
  let message = 'Поле не должно оставаться пустым';
  if (elem.value == '') {
    wrongInput(elem, message);
  }else{
    rightInput(elem);
  }
}
function wrongInput(elem, message){
  let parent = elem.parentNode;
  if (parent.children.length < 2) {
    parent.appendChild(createAlert(message));
  }
  elem.classList.add('wrong');
  elem.classList.remove('right');
}
function rightInput(elem){
  let parent = elem.parentNode;
  if (parent.children.length > 1) {
    let removeElem = elem.nextSibling;
    removeElem.parentNode.removeChild(removeElem);
  }
  elem.classList.remove('wrong');
  elem.classList.add('right');
}
function createAlert(message){
  let alert = document.createElement('p');
  let alertDiv = document.createElement('div');
  alert.innerText = message;
  alertDiv.classList = 'alert';
  alertDiv.appendChild(alert);
  return alertDiv;
}
function numbersInput(elem){
  elem.addEventListener('keyup', function(){
    this.value = this.value.replace(/[^0-9\.]/g, '');
  })
}
//Проверка корректности введённого имейла(есть ли в строке @)
function emailInput(elem){
  elem.addEventListener('blur', function(){
    let message = 'Email введён некорректно';
    let emailInd = 0;
    let parent = elem.parentNode;
    for (let i = 0; i < elem.value.length; i++) {
      if (elem.value[i] == '@') {
        ++emailInd;
      }
      if (emailInd != 1) {
        wrongInput(elem, message);
      }else{
        rightInput(elem);
      }
    }
  })
}
function submitInput(elem, array){
  elem.addEventListener('click', function(event){
    event.preventDefault();
  let focusIndex = 0;
  let message = 'Поле не должно оставаться пустым';
    for (let i = 0; i < array.length; i++) {
      let elements = document.getElementsByName(array[i].name);
      let parent;
      if (elements.length > 0) {
        parent = elements[0].parentNode;
        elements[0].value = elements[0].value.trim();
        if (elements[0].value.trim() == '') {
          if (focusIndex == 0) {
            elements[0].focus();
            ++focusIndex;
          }
          wrongInput(elements[0], message);
        }else{
          rightInput(elements[0]);
        }
      }









    }


  })
}
getElements(formDef1);
