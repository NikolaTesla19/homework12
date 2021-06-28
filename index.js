//Вёрстка
function createMain(){
  let mainDiv = createDiv('mainDiv');
  mainDiv.appendChild(createDiv('topDiv')).append(createImg('mainImg', 'img/photo4.jpeg'));
  mainDiv.appendChild(createBottomDiv('bottomDiv'));
  document.body.appendChild(mainDiv);
}
function createBottomDiv(){
  let bottomDiv = createDiv('bottomDiv');
  bottomDiv.appendChild(createDiv('bottomImgDiv')).append(createImg('bottomImg', 'img/photo1.jpeg'));
  bottomDiv.appendChild(createDiv('bottomImgDiv')).append(createImg('bottomImg', 'img/photo2.jpeg'));
  bottomDiv.appendChild(createDiv('bottomImgDiv')).append(createImg('bottomImg', 'img/photo3.jpeg'));
  bottomDiv.appendChild(createDiv('bottomImgDiv')).append(createImg('bottomImg', 'img/photo4.jpeg'));
  bottomDiv.appendChild(createDiv('bottomImgDiv')).append(createImg('bottomImg', 'img/photo5.jpeg'));
  return bottomDiv
}
function createDiv(classList){
  let div = document.createElement('div');
  div.classList = classList;
  return div
}
function createImg(classList, src){
  let img = document.createElement('img');
  img.classList = classList;
  img.src = src;
  return img
}
createMain();
//событие
function addEvent(){
  let element = document.querySelector('.bottomDiv');
  element.addEventListener('click', function(event){
    let targetImg = event.target;
    srcOfImg = targetImg.src;
    let mainImg = document.getElementsByClassName('topDiv');
    if (srcOfImg === undefined) {
      mainImg[0].children[0].src = srcOfImg.children[0].src;
    }else {
      mainImg[0].children[0].src = srcOfImg;
    }

  })
}
addEvent();
