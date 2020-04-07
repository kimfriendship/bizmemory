let cardList = [];
let favCardList = [];

const $newInfo = document.querySelector('.newInfo');
const $submitBtn = document.querySelector('.submitBtn');
const $nameCardList = document.querySelector('.namecardList');
const $cardList = document.querySelector('.cardList');
const $sortList = document.querySelector('.sortList');
const $favList = document.querySelector('.favList');
const $favTitle = document.querySelector('.favTitle');
const $newName = document.querySelector('.newName');
const $newEmail = document.querySelector('.newEmail');
const $newCompany = document.querySelector('.newCompany');
const $newDivision = document.querySelector('.newDivision');
const $newPosition = document.querySelector('.newPosition');
const $newMobile = document.querySelector('.newMobile');
const $blankMsg = document.querySelector('.blankMsg');
const $warningModal = document.querySelector('.warning-modal');
const $deleteModal = document.querySelector('.deleting-modal');
const $warningMsg = document.querySelector('.warningMsg');
const $deletingMsg = document.querySelector('.deletingMsg');
const $warningClose = document.querySelector('.warningClose');
const $deleteClose = document.querySelector('.deleteClose');
const $deleteConfirm = document.querySelector('.deleteConfirm');

const checkEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
const checkMobile = /^\d{3}-\d{3,4}-\d{4}$/;
const checkName = /../;

const blankMsg = () => {
  $blankMsg.style.display = (cardList.length || favCardList.length) ? 'none' : 'block';
};

const blankFav = () => {
  $favTitle.style.display = favCardList.length ? 'block' : 'none';
};

const render = () => {
  let html = '';
  let favHtml = '';
  const isFav = [...cardList.filter(card => card.favorite), ...favCardList.filter(card => card.favorite)];
  const isNotFav = [...cardList.filter(card => !card.favorite), ...favCardList.filter(card => !card.favorite)];
  const li = card => {
    return `<li id="${card.id}" class="namecard color${card.color}">
          <div class="namecardInfo">
            <span class="cardName">${card.name}</span>
            <span class="cardMobile">${card.mobile}</span>
            <span class="cardEmail">${card.email}</span>
          </div>
          <div class="namecardCompany">
            <span class="cardCompany">${card.company}</span>
            <span class="cardDivision">${card.division}</span>
            <span class="cardPosition">${card.position}</span>
          </div>
          <img class="favoriteBtn ${card.favorite ? 'far' : 'fas'}" src="./img/fav-icon${card.favorite ? '-on' : ''}.png">
          <img class="deleteBtn" src="./img/close-btn.png">
        </li>`;
  };

  cardList = isNotFav;
  favCardList = isFav;

  // html 부분도 li 함수로 만들어 중복을 피했습니다.
  cardList.forEach(card => html += li(card));
  favCardList.forEach(card => favHtml += li(card));

  $cardList.innerHTML = html;
  $favList.innerHTML = favHtml;

  blankFav();
  blankMsg();
};

const getCardList = () => {
  cardList = [{
    id: 1,
    name: '이하은',
    company: '카카오뱅크',
    division: '앱 개발팀',
    position: '대리',
    email: 'daidy@naver.com',
    mobile: '010-5067-5111',
    color: 'namecard color1',
    favorite: false,
  },
  {
    id: 2,
    name: '김우정',
    company: '토스',
    division: '인재 개발팀',
    position: '선임',
    email: 'tj123y@naver.com',
    mobile: '010-2344-3453',
    color: 'namecard color2',
    favorite: false,
  },
  {
    id: 3,
    name: '송승은',
    company: '라인',
    division: '경영지원팀',
    position: '과장',
    email: 'wj456@naver.com',
    mobile: '010-2535-4985',
    color: 'namecard color3',
    favorite: false,
  },
  {
    id: 4,
    name: '김태진',
    company: '에어비앤비',
    division: 'UX디자인팀',
    position: '책임',
    email: 'se7890@naver.com',
    mobile: '010-2355-2455',
    color: 'namecard color4',
    favorite: false,
  },
  {
    id: 5,
    name: '김데레사',
    company: '에어비앤비',
    division: 'UX디자인팀',
    position: '책임',
    email: 'se7890@naver.com',
    mobile: '010-2355-2455',
    color: 'namecard color6',
    favorite: false,
  },
  {
    id: 6,
    name: '이웅모',
    company: '라인',
    division: '경영지원팀',
    position: '과장',
    email: 'wj456@naver.com',
    mobile: '010-2535-4985',
    color: 'namecard color5',
    favorite: false,
  },
  {
    id: 7,
    name: '이규하',
    company: '콜버스',
    division: '소프트웨어',
    position: '엔지니어',
    email: 'hardy@callbus.com',
    mobile: '010-2847-0896',
    color: 'namecard color1',
    favorite: false,
  },
  {
    id: 8,
    name: '최성진',
    company: '와이즐리',
    division: '개발',
    position: '매니저',
    email: 'sjchoi@wiselyshave.com',
    mobile: '010-8993-0864',
    color: 'namecard color2',
    favorite: false,
  }].sort((card1, card2) => card2.id - card1.id);

  favCardList = [].sort((card1, card2) => card2.id - card1.id);
  render();
};

const generateId = () => {
  return cardList.length ? Math.max(...cardList.map(card => card.id)) + 1 : 1;
};

const generateColor = () => {
  const colorNumber = generateId();
  return colorNumber % 6;
};

window.onload = getCardList;

// register
const newInfoInputs = [$newName, $newCompany, $newDivision, $newPosition, $newEmail, $newMobile];

const btnState = state => {
  $submitBtn.classList.toggle('valid', state === 'activate');
  $submitBtn.classList.toggle('invalid', state === 'deactivate');
};

// 기존에 onblur 이벤트를 onchange 이벤트에 호출되는 함수로 정리해 보았습니다.
const checkValues = target => {
  switch (target) {
    case $newName :
      $newName.nextElementSibling.style.display = checkName.test($newName.value) ? 'none' : 'block';
      break;
    case $newEmail :
      $newEmail.nextElementSibling.style.display = checkEmail.test($newEmail.value) ? 'none' : 'block';
      break;
    default :
      $newMobile.nextElementSibling.style.display = checkMobile.test($newMobile.value) ? 'none' : 'block';
      break;
  }
};

const checkInputs = target => {
  const isInvalid = !(checkName.test($newName.value) && checkEmail.test($newEmail.value) && checkMobile.test($newMobile.value));
  const isBlank = newInfoInputs.filter(input => input.value.trim() === '').length !== 0;
  
  if (target === $newName || target === $newEmail || target === $newMobile ) checkValues(target);

  isBlank || isInvalid ? btnState('deactivate') : btnState('activate');
};

newInfoInputs.forEach(input => input.addEventListener('change', ({ target }) => checkInputs(target)));

$submitBtn.onclick = () => {
  const isInvalid = !(checkName.test($newName.value) && checkEmail.test($newEmail.value) && checkMobile.test($newMobile.value));
  const isBlank = newInfoInputs.filter(input => input.value.trim() === '').length !== 0;
  const newValues = newInfoInputs.map(input => input.value.trim());
  
  if (isBlank || isInvalid) return;

  const [name, company, division, position, email, mobile] = newValues;

  cardList = [{
    id: generateId(),
    name,
    company,
    division,
    position,
    email,
    mobile,
    favorite: false,
    color: generateColor(),
  }, ...cardList];

  render('id');

  newInfoInputs.forEach(input => input.value = '');
  btnState('deactivate');
};

// close modal event
const closeWarnings = e => e.target.parentNode.parentNode.style.display = 'none';

$warningClose.addEventListener('click', e => closeWarnings(e));

// Delete Button event
const deleteCard = id => {
  cardList = cardList.filter(card => card.id !== +id);
  favCardList = favCardList.filter(card => card.id !== +id);

  render();
};

$nameCardList.onclick = ({ target }) => {
  if (!target.matches('.cardList > .namecard > img.deleteBtn') && !target.matches('.favList > .namecard > img.deleteBtn')) return;
  const { id } = target.parentNode;

  $deleteModal.style.display = 'block';

  $deleteClose.addEventListener('click', e => closeWarnings(e));
  $deleteConfirm.addEventListener('click', e => {
    closeWarnings(e);
    deleteCard(id);
  });
};

// favorite event
const favList = e => {
  if (!e.target.matches('.cardList > li > img.favoriteBtn') && !e.target.matches('.favList > li > img.favoriteBtn')) return;
  const { id } = e.target.parentNode;
  const changeFavState = card => (card.id === +id ? { ...card, favorite: !card.favorite } : card);

// 위의 changeFavState 변수를 사용하여 긴 중복을 줄였습니다.
  cardList = cardList.map(changeFavState);
  favCardList = favCardList.map(changeFavState);

  render();
};

$cardList.addEventListener('click', e => favList(e));
$favList.addEventListener('click', e => favList(e));

// sorting event
// 하은이가 수정한 부분 최대한 간소화 해보았습니다.
const sortCard = (list, key) => list.sort((card1, card2) => (card1[key] > card2[key] ? 1 : (card1[key] < card2[key] ? -1 : 0)));
const reverseCard = (list, key) => list.sort((card1, card2) => (card1[key] < card2[key] ? 1 : (card1[key] > card2[key] ? -1 : 0)));

const sortBy = (list, key) => {
  if (list.length <= 1) return;

  list = list[0].id === sortCard(list, key)[0].id && list[1].id === sortCard(list, key)[1].id ? reverseCard(list, key) : sortCard(list, key);

  render();
};

$sortList.onclick = e => {
  if (e.target.matches('.sortName')) {
    sortBy(cardList, 'name');
    sortBy(favCardList, 'name');
  } if (e.target.matches('.sortCompany')) {
    sortBy(cardList, 'company');
    sortBy(favCardList, 'company');
  } if (e.target.matches('.sortRecent')) {
    sortBy(cardList, 'id');
    sortBy(favCardList, 'id');
  }
};
