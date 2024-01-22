let homeSelected = true;
let ordersSelected = false;
let reviewsSelected = false;

const homeTab = document.getElementById("divHome");
const ordersTab = document.getElementById("divOrders");
const reviewsTab = document.getElementById("divReviews");

const ordersButton = document.getElementById("ordersButton");
const homeButton = document.getElementById("homeButton");
const reviewsButton = document.getElementById("reviewsButton");

//button toggle style
function toggled() {
  if (homeSelected) {
    homeButton.classList.add("toggled");
    ordersButton.classList.remove("toggled");
    reviewsButton.classList.remove("toggled")
  } else if (ordersSelected) {
    ordersButton.classList.add("toggled");
    homeButton.classList.remove("toggled");
    reviewsButton.classList.remove("toggled");
  } else if (reviewsSelected) {
    reviewsButton.classList.add("toggled");
    homeButton.classList.remove("toggled");
    ordersButton.classList.remove("toggled");
  }
}

//navigation button functions
function pressHome() {
  show('#divHome');
  hide('#divOrders');
  hide('#divReviews');
  homeSelected = true; 
  ordersSelected = false; 
  reviewsSelected = false;
}

function pressOrders() {
  hide('#divHome');
  show('#divOrders');
  hide('#divReviews');
  ordersSelected = true; 
  homeSelected = false;
  reviewsSelected = false;
}

function pressReviews() {
  hide('#divHome');
  hide('#divOrders');
  show('#divReviews');
  reviewsSelected = true;
  homeSelected = false;
  ordersSelected = false;
}

//for showing or hiding elements 

function hide(hideIt) {
  document.querySelector(hideIt).classList.add("isHidden");
}

function show(showIt) {
  document.querySelector(showIt).classList.remove('isHidden');
}

function toggleVisibility(toggleIt) {
  document.querySelector(toggleIt).classList.toggle('isHidden');
}

//for scrolling to certain parts

function scrollToPart(pagePart) {
  document.querySelector(pagePart).scrollIntoView({behavior: "smooth"})
}

//FOR GENERATING TABLE

function createTable(products, curArray, arrayName) {
    const targetTable = document.getElementById(products); targetTable.innerHTML = "";
    curArray.forEach((item, i) => {
      targetTable.innerHTML += 
      `<tr>
        <td class='col1'>
         <button onclick="selectedArray(${arrayName}); addToCart('${i}'); popUpAdd(); addCounter(); editReset(); toggleCartReceipt('cart');">${item.product}</button>
        </td>
        <td class='col2'>${item.price}
        </td>
       </tr>`;
    })
  }
  
let selectedFrom = null

function selectedArray(arrayName) {
  selectedFrom = arrayName
}

//FORMS

const needForm = [
  {'form':'codmForm'}, 
  {'form':'wrForm'}, 
  {'form':'giForm'}, 
  {'form':'giForm'}, 
  {'form':'pubgForm'}, 
  {'form':'mlForm'}, 
  {'form':'smForm'}, 
  {'form':'flForm'}, 
  {'form':'valForm'}, 
  {'form':'lolForm'},
  {'form':'smartForm'}, 
  {'form':'tntForm'}, 
  {'form':'globeForm'}, 
  {'form':'tmForm'}, 
  ];
  
  //Note to future self: item.form is different from obj.form
  function formCheck() {
  needForm.forEach((item) => {
    if (cart.some(obj => obj.form.includes(item.form))) {
    document.getElementById(item.form).classList.remove('isHidden')
  } else {
    document.getElementById(item.form).classList.add('isHidden')
  }; 
  })
}

//CART CONTENT

let cart = [];
  
const placeHolderCart = [
  {'product':'Example Product 1', 'price':50},
  {'product':'Example Product 2', 'price':100}, 
  {'product':'Example Product 3', 'price':150},
  ];

const cartTable = document.querySelector('#cartContent');
  
function addToCart(index) {
  cart.push(selectedFrom[index]); updateCart();
  };

function updateCart() {let totalPrice = 0; let cartItems; if (cart.length === 0) { cartTable.innerHTML = ""; 
placeHolderCart.forEach((item) => {
  cartTable.innerHTML += 
  `<tr>
    <td><em>${item.product}</em></td>
    <td>${item.price}</td>
    <td class='isHidden editHidden'><button class='buttonRemoveToCart'>x</button></td>
   <tr>`; 
   totalPrice += item.price;
})} else { cartTable.innerHTML = ""; 
cart.forEach((item, i) => {
  cartTable.innerHTML += 
  `<tr>
    <td>${item.product}</td>
    <td>${item.price}</td>
    <td class='isHidden editHidden'><button onclick='removeToCart(${i})' class='buttonRemoveToCart'>x</button></td>
   <tr>`; 
   totalPrice += item.price;})};
  cartTable.innerHTML += 
  `<tr>
    <th>Total: </th>
    <th>${totalPrice}</th>
    <td class='isHidden editHidden'><button id='removeAllBtn' class='buttonRemoveToCart' onclick='removeAllToCart()'>All</button>
    </td>
   </tr>`; 
   formCheck();
}

function removeToCart(num) {
  cart.splice(num, 1); cartTable.innerHTML = ""; updateCart(); cartEdit();
}

function removeAllToCart() {
  editMode = false; cart = []; cartTable.innerHTML = ""; updateCart(); document.getElementById('btnForEdit').innerHTML = 'Edit Cart';
}

updateCart();

let editMode = false;

function editReset() {
  editMode = false;
  document.getElementById('btnForEdit').innerHTML = 'Edit Cart';
}

function toggleEdit() {
  if (editMode) {
    editMode = false;
    updateCart();
    document.getElementById('btnForEdit').innerHTML = 'Edit Cart';
  } else {
    editMode = true;
    cartEdit();
    document.getElementById('btnForEdit').innerHTML = 'Done';
  }
}

function cartEdit() { 
  let hiddenEdit = document.getElementsByClassName('editHidden'); for(let i = 0; i < hiddenEdit.length; i++) {
  hiddenEdit[i].classList.remove('isHidden')
 }
};

//POP-UP WHEN ADDING TO CART

let timerRunning = false;
let fastAddCounter = 1;

function addCounter() {
  fastAddCounter++;
}

function fastAdding() {
  let popUpContent = document.getElementById('popUpText');
  popUpContent.innerHTML = ''; popUpContent.innerHTML = fastAddCounter + ' Items added to<br> Cart!'
};

function popUpAdd() { if (timerRunning) {
  fastAdding();
} else {
  const popUpDiv = document.getElementById('cartPromptParent');
  const popUpLogo = document.getElementById('popUpLogo');
  const popUpText = document.getElementById('popUpText');
  popUpText.innerHTML = 'Item added to<br>Cart!';
  popUpDiv.classList.remove('isHidden');
  popUpDiv.classList.add('animationFade');
  popUpLogo.classList.add('animationSlide');
  popUpText.classList.add('animationPop'); timerRunning = true;
  setTimeout(function() {
    popUpDiv.classList.remove('animationFade');
  popUpLogo.classList.remove('animationSlide');
  popUpText.classList.remove('animationPop'); 
  popUpDiv.classList.add('isHidden'); timerRunning = false; fastAddCounter = 1;
  }, 2500)}}
  
//FOR AQUIRING DATE AND TIME

let timeDate = null;
let orderID = null;

function timeAndDate() {
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
const hour = currentDate.getHours();
const minute = currentDate.getMinutes(); 
const seconds = currentDate.getSeconds(); 

timeDate = `${year}/${month}/${day} ${hour}:${minute}:${seconds}`; 
};

const needDetails = [
  {'id':'wrInput', 'divform':'wrForm', 'label':'Wild Rift Riot ID:'}, 
  {'id':'giInput', 'divform':'giForm', 'label':'Genshin Impact User ID:'}, 
  {'id':'giInput2', 'divform':'giForm', 'label':'Server:'}, 
  {'id':'pubgInput', 'divform':'pubgForm', 'label':'PUBG Player ID:'}, 
  {'id':'pubgInput2', 'divform':'pubgForm', 'label':'PUBG Nickname:'}, 
  {'id':'mlInput', 'divform':'mlForm', 'label':'Mobile Legends User ID:'}, 
  {'id':'mlInput2', 'divform':'mlForm', 'label':'Server:'}, 
  {'id':'smInput', 'divform':'smForm', 'label':'Sausage Man Character ID:'}, 
  {'id':'flInput', 'divform':'flForm', 'label':'Farlight User ID:'}, 
  {'id':'valInput', 'divform':'valForm', 'label':'Valorant Riot ID:'}, 
  {'id':'lolInput', 'divform':'lolForm', 'label':'LOL Riot ID'}, 
  {'id':'smartInput', 'divform':'smartForm', 'label':'Smart #:'}, 
  {'id':'tntInput', 'divform':'tntForm', 'label':'TNT #:'}, 
  {'id':'globeInput', 'divform':'globeForm', 'label':'Globe #:'}, 
  {'id':'tmInput', 'divform':'tmForm', 'label':'TM #:'}, 
  ]

  let detailsPart = document.getElementById('detailsPart');
  
function detailsIncluded() { 
  let customerName = document.getElementById('customerName').value; 
  let paymentMethod = document.getElementById('paymentMethod').value; 
  detailsPart.innerHTML = ""; 
  if (customerName === "") {
    detailsPart.innerHTML = `<p><strong>Customer:</strong> Loyal Buyer</p>`;
  } else {
    detailsPart.innerHTML = `<p><strong>Customer:</strong> ${customerName}</p>`
  }; 
  if (paymentMethod === 'GCash') {
    detailsPart.innerHTML += `<p><strong>Payment Method:</strong> <span class='gCash'>${paymentMethod}</span></p>`;
  } else if (paymentMethod === 'Maya') {
    detailsPart.innerHTML += `<p><strong>Payment Method:</strong> <span class='maya'>${paymentMethod}</span></p>`; 
  }; 
  timeAndDate(); 
  detailsPart.innerHTML += `<p id='timeDate'>${timeDate}</p>`; 
  needDetails.forEach((item) => {
    let current = document.getElementById(item.id).value;
    if (current !== "" && cart.some(obj => obj.form.includes(item.divform))) {
      detailsPart.innerHTML += `<p><strong>${item.label}</strong> ${current}</p>`;
    }
  })
}

const errorBox = document.getElementById('errorBox');

function isCartLoaded() {
  if (cart.length === 0) {
    errorBox.innerHTML = "";
    errorBox.innerHTML = "<h3>ERROR!</h3><p>Your cart is</p> <p>empty</p>";
    show('#errorParent');
    errorBox.classList.add('animationFadeUp');
    setTimeout(() => {
      hide('#errorParent');
      errorBox.classList.remove('animationFadeUp');
    }, 1000);
  } else {
    show('#forms'); 
  }
} 

function isInputFilled() { 
  let allIsFilled = true; 
  let paymentMethod = document.getElementById('paymentMethod').value; 
  needDetails.forEach((item) => {
  let current = document.getElementById(item.id).value;
  if (current === "" && cart.some(obj => obj.form.includes(item.divform))) {
    allIsFilled = false;
  }}); 
  if (allIsFilled && paymentMethod !== "") {
    hide('#forms'); show('#detailsPart'); detailsIncluded(); toggleCartReceipt('receipt'); hide('#cartButtons'); show('#receiptButtons'); scrollToPart('#myCart'); editReset(); updateCart(); show('#tacParent');
  } else {
    errorBox.innerHTML = "";
    errorBox.innerHTML = "<h3>ERROR!</h3><p>Details required!</p>";
    show('#errorParent');
    errorBox.classList.add('animationFadeUp');
    setTimeout(() => {
      hide('#errorParent');
      errorBox.classList.remove('animationFadeUp');
    }, 1000);
  }
}

function toggleCartReceipt(state) {
  const cartOrReceipt = document.getElementById('cartOrReceipt');
  if (state === 'cart') { 
    cartOrReceipt.innerHTML = 'My Cart 🛒'; hide('#detailsPart'); hide('#receiptButtons'); show('#cartButtons'); hide('#orderID')
  } else if (state === 'receipt') {
    cartOrReceipt.innerHTML = 'Receipt 🧾'; 
    randomId(); show('#orderID');
  }
}

function whichPayment() {
  if (document.getElementById('paymentMethod').value === 'GCash') {
    document.getElementById('forGcash').classList.remove('isHidden'); hide('#forMaya'); addFadeUp('qrChild'); 
  } else if (document.getElementById('paymentMethod').value === 'Maya') {
    document.getElementById('forMaya').classList.remove('isHidden'); hide('#forGcash'); addFadeUp('qrChild'); 
  }
}

//FOR ORDER ID RNG

let orderIDnumber = null;

function randomId() {
  orderIDnumber = Math.floor(Math.random()*1000000);
  document.getElementById('orderID').innerHTML = `Order ID: ${orderIDnumber}`;
}

//FOR FADE-UP ANIMATION

function addFadeUp(container) { 
  let windowPopUp = document.getElementById(container); 
  windowPopUp.classList.add('animationFadeUp');
    setTimeout(() => {
      windowPopUp.classList.remove('animationFadeUp');
    }, 1000);
}
 
//FOR CALL OF DUTY MOBILE

let codmCurArray = [
  {'product':'50 Garena Shells (100cp)', 'price':50, 'form':'codmForm'}, 
  {'product':'100 Garena Shells (208cp)', 'price':98, 'form':'codmForm'}, 
  {'product':'200 Garena Shells (416cp)', 'price':193, 'form':'codmForm'}, 
  {'product':'300 Garena Shells (648cp)', 'price':290, 'form':'codmForm'}, 
  {'product':'500 Garena Shells (1080cp)', 'price':480, 'form':'codmForm'}, 
  {'product':'1000 Garena Shells (2320cp)', 'price':950, 'form':'codmForm'}, 
  ];

//FOR WILD RIFT

let wrCurArray = [
  {'product':'100 Wild Cores', 'price':45, 'form':'wrForm'}, 
  {'product':'200 Wild Cores', 'price':90, 'form':'wrForm'}, 
  {'product':'305 Wild Cores', 'price':135, 'form':'wrForm'}, 
  {'product':'405 Wild Cores', 'price':180, 'form':'wrForm'}, 
  {'product':'535 Wild Cores', 'price':225, 'form':'wrForm'}, 
  {'product':'635 Wild Cores', 'price':270, 'form':'wrForm'}, 
  {'product':'735 Wild Cores', 'price':315, 'form':'wrForm'}, 
  {'product':'840 Wild Cores', 'price':360, 'form':'wrForm'}, 
  {'product':'940 Wild Cores', 'price':415, 'form':'wrForm'}, 
  {'product':'1100 Wild Cores', 'price':450, 'form':'wrForm'}, 
  {'product':'1200 Wild Cores', 'price':495, 'form':'wrForm'}, 
  {'product':'1300 Wild Cores', 'price':540, 'form':'wrForm'}, 
  {'product':'1405 Wild Cores', 'price':585, 'form':'wrForm'}, 
  {'product':'1505 Wild Cores', 'price':630, 'form':'wrForm'}, 
  {'product':'1725 Wild Cores', 'price':685, 'form':'wrForm'}, 
  {'product':'1825 Wild Cores', 'price':720, 'form':'wrForm'}, 
  {'product':'1925 Wild Cores', 'price':765, 'form':'wrForm'}, 
  {'product':'2030 Wild Cores', 'price':810, 'form':'wrForm'}, 
  {'product':'2130 Wild Cores', 'price':865, 'form':'wrForm'}, 
  {'product':'2260 Wild Cores', 'price':900, 'form':'wrForm'}, 
  {'product':'3000 Wild Cores', 'price':1125, 'form':'wrForm'}, 
  {'product':'6000 Wild Cores', 'price':2250, 'form':'wrForm'}, 
  {'product':'9000 Wild Cores', 'price':3375, 'form':'wrForm'}, 
  ]

//FOR GENSHIN IMPACT

let giCurArray = [
  {'product':'60 Genesis Crystals', 'price':50, 'form':'giForm'}, 
  {'product':'330 Genesis Crystals', 'price':252, 'form':'giForm'}, 
  {'product':'1090 Genesis Crystals', 'price':747, 'form':'giForm'}, 
  {'product':'2240 Genesis Crystals', 'price':1503, 'form':'giForm'}, 
  {'product':'3880 Genesis Crystals', 'price':2576, 'form':'giForm'}, 
  {'product':'7760 Genesis Crystals', 'price':5152, 'form':'giForm'}, 
  {'product':'8080 Genesis Crystals', 'price':5225, 'form':'giForm'}, 
  {'product':'Blessing of the Welkin Moon', 'price':252, 'form':'giForm'}, 
  ]
  
//FOR PUBG MOBILE

let pubgCurArray = [
  {'product':'63 Unknown Cash', 'price':45, 'form':'pubgForm'}, 
  {'product':'126 Unknown Cash', 'price':90, 'form':'pubgForm'}, 
  {'product':'189 Unknown Cash', 'price':135, 'form':'pubgForm'}, 
  {'product':'252 Unknown Cash', 'price':180, 'form':'pubgForm'},  
  {'product':'340 Unknown Cash', 'price':225, 'form':'pubgForm'}, 
  {'product':'403 Unknown Cash', 'price':270, 'form':'pubgForm'}, 
  {'product':'690 Unknown Cash', 'price':450, 'form':'pubgForm'}, 
  {'product':'1875 Unknown Cash', 'price':1125, 'form':'pubgForm'}, 
  {'product':'4000 Unknown Cash', 'price':2250, 'form':'pubgForm'}, 
  {'product':'8400 Unknown Cash', 'price':4500, 'form':'pubgForm'}, 
  ]

//FOR MOBILE LEGENDS

let mlCurArray = [
    {'product':'56 ML Diamonds', 'price':48, 'form':'mlForm'}, 
    {'product':'112 ML Diamonds', 'price':97, 'form':'mlForm'}, 
    {'product':'168 ML Diamonds', 'price':143, 'form':'mlForm'}, 
    {'product':'224 ML Diamonds', 'price':193, 'form':'mlForm'}, 
    {'product':'280 ML Diamonds', 'price':240, 'form':'mlForm'}, 
    {'product':'336 ML Diamonds', 'price':290, 'form':'mlForm'}, 
    {'product':'414 ML Diamonds', 'price':355, 'form':'mlForm'}, 
    {'product':'504 ML Diamonds', 'price':435, 'form':'mlForm'}, 
    {'product':'570 ML Diamonds', 'price':470, 'form':'mlForm'}, 
    {'product':'626 ML Diamonds', 'price':518, 'form':'mlForm'}, 
    {'product':'738 ML Diamonds', 'price':613, 'form':'mlForm'}, 
    {'product':'794 ML Diamonds', 'price':663, 'form':'mlForm'}, 
    {'product':'850 ML Diamonds', 'price':710, 'form':'mlForm'}, 
    {'product':'906 ML Diamonds', 'price':760, 'form':'mlForm'}, 
    {'product':'1163 ML Diamonds', 'price':940, 'form':'mlForm'}, 
    {'product':'2398 ML Diamonds', 'price':1880, 'form':'mlForm'}, 
    {'product':'3561 ML Diamonds', 'price':2820, 'form':'mlForm'}, 
    {'product':'4796 ML Diamonds', 'price':3760, 'form':'mlForm'}, 
    {'product':'6042 ML Diamonds', 'price':4700, 'form':'mlForm'}, 
    ]
    
//FOR SAUSAGE MAN    
    
let smCurArray = [
    {'product':'60 Candies', 'price':50, 'form':'smForm'}, 
    {'product':'180 Candies', 'price':145, 'form':'smForm'}, 
    {'product':'316 Candies', 'price':243, 'form':'smForm'}, 
    {'product':'718 Candies', 'price':480, 'form':'smForm'}, 
    {'product':'1368 Candies', 'price':950, 'form':'smForm'}, 
    {'product':'2118 Candies', 'price':1455, 'form':'smForm'}, 
    {'product':'3548 Candies', 'price':2420, 'form':'smForm'}, 
    {'product':'7048 Candies', 'price':4825, 'form':'smForm'}, 
    ]

//FOR FARLIGHT 84    

let flCurArray = [
    {'product':'20 FL Diamonds', 'price':10, 'form':'flForm'}, 
    {'product':'30 FL Diamonds', 'price':15, 'form':'flForm'}, 
    {'product':'40 FL Diamonds', 'price':19, 'form':'flForm'}, 
    {'product':'50 FL Diamonds', 'price':24, 'form':'flForm'}, 
    {'product':'60 FL Diamonds', 'price':28, 'form':'flForm'}, 
    {'product':'80 FL Diamonds', 'price':36, 'form':'flForm'}, 
    {'product':'100 FL Diamonds', 'price':45, 'form':'flForm'}, 
    {'product':'165 FL Diamonds', 'price':68, 'form':'flForm'}, 
    {'product':'220 FL Diamonds', 'price':90, 'form':'flForm'}, 
    {'product':'330 FL Diamonds', 'price':131, 'form':'flForm'}, 
    {'product':'880 FL Diamonds', 'price':347, 'form':'flForm'}, 
    {'product':'2240 FL Diamonds', 'price':900, 'form':'flForm'}, 
    {'product':'4700 FL Diamonds', 'price':1710, 'form':'flForm'}, 
    ]

//FOR VALORANT   

let valCurArray = [
    {'product':'125 Valorant Points', 'price':45, 'form':'valForm'}, 
    {'product':'250 Valorant Points', 'price':90, 'form':'valForm'}, 
    {'product':'380 Valorant Points', 'price':135, 'form':'valForm'}, 
    {'product':'505 Valorant Points', 'price':180, 'form':'valForm'}, 
    {'product':'630 Valorant Points', 'price':225, 'form':'valForm'}, 
    {'product':'790 Valorant Points', 'price':270, 'form':'valForm'}, 
    {'product':'915 Valorant Points', 'price':315, 'form':'valForm'}, 
    {'product':'1040 Valorant Points', 'price':360, 'form':'valForm'}, 
    {'product':'1170 Valorant Points', 'price':405, 'form':'valForm'}, 
    {'product':'1650 Valorant Points', 'price':540, 'form':'valForm'}, 
    {'product':'1775 Valorant Points', 'price':585, 'form':'valForm'}, 
    {'product':'1900 Valorant Points', 'price':630, 'form':'valForm'}, 
    {'product':'2030 Valorant Points', 'price':675, 'form':'valForm'}, 
    {'product':'2155 Valorant Points', 'price':720, 'form':'valForm'}, 
    {'product':'2440 Valorant Points', 'price':810, 'form':'valForm'}, 
    {'product':'2565 Valorant Points', 'price':856, 'form':'valForm'}, 
    {'product':'2850 Valorant Points', 'price':900, 'form':'valForm'}, 
    {'product':'3640 Valorant Points', 'price':1170, 'form':'valForm'}, 
    {'product':'4500 Valorant Points', 'price':1530, 'form':'valForm'}, 
    {'product':'5800 Valorant Points', 'price':1800, 'form':'valForm'}, 
    {'product':'8650 Valorant Points', 'price':2700, 'form':'valForm'}, 
    {'product':'11600 Valorant Points', 'price':3600, 'form':'valForm'}, 
    ]
 
//FOR LEAGUE OF LEGENDS  
 
let lolCurArray = [
    {'product':'200 Riot Points', 'price':45, 'form':'lolForm'}, 
    {'product':'400 Riot Points', 'price':90, 'form':'lolForm'}, 
    {'product':'625 Riot Points', 'price':135, 'form':'lolForm'}, 
    {'product':'825 Riot Points', 'price':180, 'form':'lolForm'}, 
    {'product':'1025 Riot Points', 'price':225, 'form':'lolForm'}, 
    {'product':'1250 Riot Points', 'price':270, 'form':'lolForm'}, 
    {'product':'1525 Riot Points', 'price':315, 'form':'lolForm'}, 
    {'product':'1725 Riot Points', 'price':360, 'form':'lolForm'}, 
    {'product':'1925 Riot Points', 'price':405, 'form':'lolForm'}, 
    {'product':'2150 Riot Points', 'price':450, 'form':'lolForm'}, 
    {'product':'2900 Riot Points', 'price':585, 'form':'lolForm'}, 
    {'product':'3100 Riot Points', 'price':645, 'form':'lolForm'}, 
    {'product':'3300 Riot Points', 'price':685, 'form':'lolForm'}, 
    {'product':'3525 Riot Points', 'price':720, 'form':'lolForm'}, 
    {'product':'3725 Riot Points', 'price':765, 'form':'lolForm'}, 
    {'product':'4600 Riot Points', 'price':900, 'form':'lolForm'}, 
    {'product':'4800 Riot Points', 'price':945, 'form':'lolForm'}, 
    {'product':'5000 Riot Points', 'price':990, 'form':'lolForm'}, 
    {'product':'5225 Riot Points', 'price':1035, 'form':'lolForm'}, 
    {'product':'5425 Riot Points', 'price':1080, 'form':'lolForm'}, 
    {'product':'6125 Riot Points', 'price':1215, 'form':'lolForm'}, 
    {'product':'6750 Riot Points', 'price':1350, 'form':'lolForm'}, 
    {'product':'7500 Riot Points', 'price':1485, 'form':'lolForm'}, 
    {'product':'7700 Riot Points', 'price':1530, 'form':'lolForm'}, 
    {'product':'8125 Riot Points', 'price':1620, 'form':'lolForm'}, 
    {'product':'9200 Riot Points', 'price':1800, 'form':'lolForm'}, 
    {'product':'10000 Riot Points', 'price':1993, 'form':'lolForm'}, 
    ]
    
//FOR STEAM CODE
 
let steamArray = [
    {'product':'Steam Code 50', 'price':50, 'form':'steamForm'}, 
    {'product':'Steam Code 100', 'price':100, 'form':'steamForm'}, 
    {'product':'Steam Code 250', 'price':245, 'form':'steamForm'}, 
    {'product':'Steam Code 500', 'price':490, 'form':'steamForm'}, 
    {'product':'Steam Code 800', 'price':790, 'form':'steamForm'}, 
    {'product':'Steam Code 1000', 'price':980, 'form':'steamForm'}, 
    {'product':'Steam Code 2200', 'price':2150, 'form':'steamForm'}, 
    ]

//FOR SMART DATA
 
let smartArray = [
    {'product':'500mb Smart Data', 'price':7, 'form':'smartForm'}, 
    {'product':'1024mb Smart Data', 'price':12, 'form':'smartForm'}, 
    {'product':'2048mb Smart Data', 'price':24, 'form':'smartForm'}, 
    {'product':'3072mb Smart Data', 'price':36, 'form':'smartForm'}, 
    {'product':'4096mb Smart Data', 'price':48, 'form':'smartForm'}, 
    {'product':'5120mb Smart Data', 'price':60, 'form':'smartForm'}, 
    {'product':'6144mb Smart Data', 'price':72, 'form':'smartForm'}, 
    {'product':'7168mb Smart Data', 'price':84, 'form':'smartForm'}, 
    {'product':'8192mb Smart Data', 'price':96, 'form':'smartForm'}, 
    {'product':'9216mb Smart Data', 'price':108, 'form':'smartForm'}, 
    {'product':'10240mb Smart Data', 'price':120, 'form':'smartForm'}, 
    ]

//FOR TNT DATA
 
let tntArray = [
    {'product':'500mb TNT Data', 'price':7, 'form':'tntForm'}, 
    {'product':'1024mb TNT Data', 'price':12, 'form':'tntForm'}, 
    {'product':'2048mb TNT Data', 'price':24, 'form':'tntForm'}, 
    {'product':'3072mb TNT Data', 'price':36, 'form':'tntForm'}, 
    {'product':'4096mb TNT Data', 'price':48, 'form':'tntForm'}, 
    {'product':'5120mb TNT Data', 'price':60, 'form':'tntForm'}, 
    {'product':'6144mb TNT Data', 'price':72, 'form':'tntForm'}, 
    {'product':'7168mb TNT Data', 'price':84, 'form':'tntForm'}, 
    {'product':'8192mb TNT Data', 'price':96, 'form':'tntForm'}, 
    {'product':'9216mb TNT Data', 'price':108, 'form':'tntForm'}, 
    {'product':'10240mb TNT Data', 'price':120, 'form':'tntForm'}, 
    ]

//FOR GLOBE DATA 

let globeArray = [
    {'product':'1024mb Globe Data (1 Day)', 'price':12, 'form':'globeForm'}, 
    {'product':'3072mb Globe Data (3 Days)', 'price':36, 'form':'globeForm'}, 
    {'product':'5120mb Globe Data (5 Days)', 'price':60, 'form':'globeForm'}, 
    ]

//FOR TM DATA 

let tmArray = [
    {'product':'1024mb TM Data (1 Day)', 'price':12, 'form':'tmForm'}, 
    {'product':'3072mb TM Data (3 Days)', 'price':36, 'form':'tmForm'}, 
    {'product':'5120mb TM Data (5 Days)', 'price':60, 'form':'tmForm'}, 
    ]

//FOR BATTLE PASS

let bpArray = [
    {'product':'CODM Regular Battle Pass', 'price':160, 'form':'codmForm'}, 
    {'product':'CODM Normal Battle Pass', 'price':193, 'form':'codmForm'}, 
    {'product':'CODM Premium Battle Pass', 'price':290, 'form':'codmForm'}, 
    {'product':'Valorant Battle Pass', 'price':360, 'form':'valForm'}, 
    {'product':'Wild Rift Normal Wild Pass', 'price':270, 'form':'wrForm'}, 
    {'product':'Wild Rift Elite Wild Pass', 'price':450, 'form':'wrForm'}, 
    {'product':'Farlight 84 Battle Pass', 'price':209, 'form':'flForm'}, 
    ]
    
 //NOT MY CODE
 function saveAsImage() {
  // Get the div element
  const div = document.getElementById('myCart');

  // Use html2canvas to capture the div and convert it to an image
  html2canvas(div).then(function(canvas) {
    // Convert the canvas to a data URL
    const dataURL = canvas.toDataURL('image/png');

    // Create a link element for the download
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `asth-order${orderIDnumber}.png`;

    // Trigger the download
    link.click();
  });
}