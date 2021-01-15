describe('Buy Stav a card', () => {
  before(() => {
    browser.url(`https://www.newegg.com/`);
      browser.pause(4000);
      if($(`${popup}`).isDisplayed()) {
        $(`${popup}`).waitForClickable();
        $(`${popup}`).click();
      }
  });

// Requests an email verification each time...wonder if theres someway around it.
  // it('Should sign you in', () => {
  //   $(`${signInBtn}`).waitForClickable();
  //   $(`${signInBtn}`).click();
  //   $(`${usernameInput}`).waitForClickable();
  //   $(`${usernameInput}`).setValue(username);
  //   $(`${loginBtn}`).click();
  //   $(`${passwordInput}`).waitForClickable();
  //   $(`${passwordInput}`).setValue(password);
  //   $(`${loginBtn}`).click();
  // });

  it('Should do search', () => {
    $(`${searchInput}`).waitForClickable();
    $(`${searchInput}`).setValue(search2);
    $(`${searchBtn}`).click();
  });

  it('Should check and see if the product page is displayed, and open up the product page', () => {
    $(`${productPage}`).waitForDisplayed();
    $(`${evga}`).waitForClickable();
    expect($(`${evga}`)).toHaveText(text2)
    $(`${evga}`).click();
    $(`${opened}`).waitForDisplayed();
    expect($(`${opened}`)).toHaveText(text2);
  });

  it('Should check and see if the purchase button is displaying', () => {
      // Check to see if auto notify is displayed
      if($(`${purchaseNotifyBtn}`).getText() === "AUTO NOTIFY") {
        for(let i = 0; i < 10; i++) {
            browser.refresh();

            if($(`${purchaseNotifyBtn}`).getText() === "ADD TO CART") {
              i = 10;
              buyThatCard(address);
            }

            if(i === 10) {
              console.log("Please restart the bot. Product still on auto notify.");
            }
          }
        } else if ($(`${purchaseNotifyBtn}`).getText() === "ADD TO CART") {
            buyThatCard(address);
      }
  });
});

function fillInAddressModal(data) {
  $(`${firstname}`).waitForClickable();
  $(`${firstname}`).setValue(data.firstname);
  $(`${lastname}`).setValue(data.lastname);
  $(`${address1}`).setValue(data.address1);
  $(`${city}`).setValue(data.city);
  $(`${state}`).selectByAttribute("value", data.state);
  $(`${zip}`).setValue(data.zip);
  $(`${phone}`).setValue(data.phone);
  $(`${email}`).setValue(data.email);
  $(`${saveBtn}`).click();
  $(`${continueAsGuest}`).waitForClickable();
  $(`${continueAsGuest}`).click();
  $(`${useAddress}`).waitForClickable();
  $(`${useAddress}`).click();
}

function addCreditCard(data) {
  $(`${addCCBtn}`).waitForClickable();
  $(`${addCCBtn}`).click();
  browser.pause(1000);
  browser.switchToFrame($("[title='ec_payment']"));
  $(`${ccNameInput}`).waitForClickable();
  $(`${ccNameInput}`).setValue(data.name);
  browser.keys('\uE004');
  $(`${ccNumInput}`).setValue(data.cc);
  $(`${ccExpMonthSelect}`).click();
  $(`${ccMonth}`).waitForClickable();
  $(`${ccMonth}`).click();
  $(`${ccYearSelect}`).click();
  $(`${ccYear}`).waitForClickable();
  $(`${savePaymentBtn}`).click();
}

function buyThatCard(data) {
  $(`${purchaseNotifyBtn}`).waitForClickable();
  $(`${purchaseNotifyBtn}`).click();
  $(`${closeRightModal}`).waitForClickable();
  $(`${closeRightModal}`).click();
  $(`${checkout}`).waitForClickable();
  $(`${checkout}`).click();

  $(`${closeMaskModal}`).waitForClickable();
  $(`${closeMaskModal}`).click();
  $(`${secureCheckoutBtn}`).waitForClickable();
  $(`${secureCheckoutBtn}`).click();

  // login page, use guest checkout mode
  $(`${guestCheckoutBtn}`).waitForClickable();
  $(`${guestCheckoutBtn}`).click();
  $(`${addAddress}`).waitForClickable();
  $(`${addAddress}`).click();

  // Address modal
  fillInAddressModal(address);

  $(`${continueToDelivery}`).waitForClickable();
  $(`${continueToDelivery}`).click();

  $(`${continueToPayment}`).waitForClickable();
  $(`${continueToPayment}`).click();

  addCreditCard(cc);
  $(`${cvcInput}`).waitForClickable();
  $(`${cvcInput}`).setValue(cc.cvc);

  $(`${reviewOrderBtn}`).waitForClickable();
  $(`${reviewOrderBtn}`).click();
}

const address = {
  firstname: "K",
  lastname: "Stav",
  address1: "32 Hilton Ave.",
  city: "Exeter",
  state: "NH",
  zip: "03833",
  phone: "2223334455",
  email: "joshualjohnson33@gmail.com"
}

const cc = {
  name: "Josh L Johnson",
  cc: "4400667716819150",
  cvc: "094"
}

// Data for purchase
const search1 = 'EVGA FTW3 Ultra Rtx 3080'
const search2 = 'Mist Cleaner Screen Cleaner Spray Sterilization Disinfection Cleansing Screen Cleaner for You iPad Laptop MacBook Pro Cell Phone iPhone Smartphones Versatile Cleaners Blue'
const username = 'joshualjohnson33@gmail.com';
const password = 'ColdHearted@1995'
const text1 = 'EVGA GeForce RTX 3080 FTW3 ULTRA GAMING Video Card, 10G-P5-3897-KR, 10GB GDDR6X, iCX3 Technology, ARGB LED, Metal Backplate'
const text2 = 'Mist Cleaner Screen Cleaner Spray Sterilization Disinfection Cleansing Screen Cleaner for You iPad Laptop MacBook Pro Cell Phone iPhone Smartphones Versatile Cleaners Blue';

// Landing page selectors
const popup = '#popup > #popup-close'
const searchInput = "[title='Search Site']"
const searchBtn = '[class="header2020-search-button"] > button'
const signInBtn = 'div > div:nth-child(1) > [class="nav-complex-inner"]'

// Product search page selectors
const productPage = 'div.item-cells-wrap.border-cells.items-grid-view.four-cells.expulsion-one-cell'
const evga = 'div.item-cells-wrap.border-cells.items-grid-view.four-cells.expulsion-one-cell > div:nth-child(1) > div > div > a'
const opened = '[class="product-title"]';

// Login page selectors
const usernameInput = '#labeled-input-signEmail'
const passwordInput = '#labeled-input-password'
const loginBtn = '#signInSubmit'

// Product page
const purchaseNotifyBtn = '#ProductBuy > div > div > button';
const closeRightModal = '#modal-intermediary > div > div > div.modal-header > button'
const checkout = '#app > header > div.header2020-inner > div.header2020-right > div:nth-child(1) > div:nth-child(2) > a';
const closeMaskModal = '[class="modal-dialog modal-md modal-dialog-centered"] > div > div:nth-child(3) > div:nth-child(2) > button:nth-child(1)';
const secureCheckoutBtn = '#app > div.page-content > section > div > div > form > div.row-inner > div.row-side > div > div > div:nth-child(3) > div > button';

// Purchase flow
const guestCheckoutBtn = '#app > div > div.signin-body > div > div > div.signin-step-1 > form:nth-child(3) > div.form-cells > div > button';
const addAddress = '[data-target="#Popup_Address_Edit"]';

// Address modal
const firstname = '[name="FirstName"]';
const lastname = '[name="LastName"]';
const address1 = '[name="Address1"]';
const city = '[name="City"]';
const state = '[name="State"]';
const zip = '[name="ZipCode"]';
const phone = '[name="Phone"]';
const email = '[name="Email"]';
const saveBtn = '[data-target="#Popup_Address_Verification"]';
const continueAsGuest = '#app > div > div > div > div > div.modal-footer > button.btn.btn-primary';
const useAddress = '[data-target="#Popup_Address_Verification"]';

const continueToDelivery = '#app > div > section > div > div > form > div.row-inner > div.row-body > div > div:nth-child(1) > div > div.checkout-step-action > button';
const continueToPayment = '#app > div > section > div > div > form > div.row-inner > div.row-body > div > div:nth-child(2) > div > div.checkout-step-action > button'

// Credit Card
const addCCBtn = '[data-target="#Popup_Card_Add"]';
const ccNameInput = '#app > div > div.modal-body > div:nth-child(1) > div:nth-child(1) > input';
const ccNumInput = '#app > div > div.modal-body > div:nth-child(1) > div:nth-child(2) > input';
const ccExpMonthSelect = '#app > div > div.modal-body > div:nth-child(1) > div:nth-child(4) > label.form-select.is-wide > select';
const ccMonth = '#app > div > div.modal-body > div:nth-child(1) > div:nth-child(4) > label.form-select.is-wide > select > option:nth-child(2)';
const ccYearSelect = '#app > div > div.modal-body > div:nth-child(1) > div:nth-child(5) > label > select';
const ccYear = '#app > div > div.modal-body > div:nth-child(1) > div:nth-child(5) > label > select > option:nth-child(5)';
const savePaymentBtn = '#app > div > div.modal-footer > button.btn.btn-primary';
const cvcInput = '#app > div > section > div > div > form > div.row-inner > div.row-body > div > div:nth-child(3) > div > div.checkout-step-body > div.checkout-step-edit.margin-top > div.checkout-tabs-wrap.margin-top > div.checkout-tab-content.is-active > div.item-cells-wrap.border-cells.tile-cells.three-cells.expulsion-one-cell.checkout-card-cells > div > div > label > div.retype-security-code > input';
const reviewOrderBtn = '#app > div > section > div > div > form > div.row-inner > div.row-body > div > div:nth-child(3) > div > div.checkout-step-action > button';
const placeOrderBtn = '#btnCreditCard';
