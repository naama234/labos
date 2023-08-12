import ApplicationPage from '../pages/ApplicationPage';
import {mockFormData, mockRequestData} from '../fixtures/mockData';


const verificationCodeErrorSelector = "label.vfb-error[for=\"vfb-3\"]";
const firstNameIsMissingErrorSelector = "label[for=\"vfb-5\"].vfb-error";
const dynamicTransactionVerificationSelector = '.elementor-element-75d4546';

function requestBodyToJson(requestBody) {
  const cleanedRequestBody = requestBody.replace(/\r/g, '');

  const jsonData = {};
  const lines = cleanedRequestBody.split('\n');

  lines.forEach(line => {
    if (line.startsWith('------')) return;
    if (line.startsWith('Content-Disposition:')) {
      const [, name] = line.match(/name="([^"]+)"/);
      jsonData[name] = lines[lines.indexOf(line) + 2];
    }
  });
  return jsonData;
}

describe('NxtGen AI Academy Demo Site test', () => {
  const applicationPage = new ApplicationPage();

  beforeEach(() => {
    applicationPage.visit();
  });

  it('data can be entered into all fields and field types', () => {
    applicationPage.fillInputAndVerify(applicationPage.firstNameInput, mockFormData.firstName);
    applicationPage.fillInputAndVerify(applicationPage.lastNameInput, mockFormData.lastName);
    applicationPage.selectRadioOptionByValueAndVerify(applicationPage.genderSelector, mockFormData.gender);
    applicationPage.fillInputAndVerify(applicationPage.addressInput, mockFormData.address);
    applicationPage.fillInputAndVerify(applicationPage.address2Input, mockFormData.address2);
    applicationPage.fillInputAndVerify(applicationPage.cityInput, mockFormData.city);
    applicationPage.fillInputAndVerify(applicationPage.zipInput, mockFormData.zip);
    applicationPage.fillInputAndVerify(applicationPage.stateInput, mockFormData.state);
    applicationPage.fillInputAndVerify(applicationPage.emailInput, mockFormData.email);
    applicationPage.fillInputAndVerify(applicationPage.dateInput, mockFormData.date);
    applicationPage.selectCountry(mockFormData.countryOption);
    applicationPage.shouldHaveText(applicationPage.countrySelector, mockFormData.countryOption);
    applicationPage.fillSelectAndVerify(applicationPage.hourDropdown, mockFormData.hourDropdown)
    applicationPage.fillSelectAndVerify(applicationPage.minDropdown, mockFormData.minDropdown)
    applicationPage.fillInputAndVerify(applicationPage.phoneInput, mockFormData.phone);
    applicationPage.selectCheckboxAndVerify(applicationPage.uftCheckbox);
    applicationPage.fillInputAndVerify(applicationPage.queryTextarea, mockFormData.queryTextarea);
  });


  it('users should not be able to submit the form with missing mandatory fields', () => {
    applicationPage.getSubmitButton().click();
    applicationPage.validateElementExists(firstNameIsMissingErrorSelector);
  });

  it('submitting is possible after using the Verification code', () => {
    applicationPage.populateFormWithMandatoryFields(mockFormData.firstName, mockFormData.lastName, mockFormData.email, mockFormData.gender);
    applicationPage.getSubmitButton().click();
    applicationPage.validateElementExists(verificationCodeErrorSelector)
    applicationPage.setVerificationNumber();
    applicationPage.getSubmitButton().click();
    applicationPage.validateElementExists(dynamicTransactionVerificationSelector);
  });

  it('users should receive Transaction ID after submitting the form', () => {
    applicationPage.populateFormWithMandatoryFields(mockFormData.firstName, mockFormData.lastName, mockFormData.email, mockFormData.gender);
    applicationPage.setVerificationNumber();
    applicationPage.getSubmitButton().click();
    applicationPage.logTransactionId();
  });

  it('data sent in the POST request should be accurate', () => {
    cy.intercept('POST', 'https://nxtgenaiacademy.com/demo-site/').as('postRequest');
    applicationPage.populateFormWithAllFields(mockFormData);
    applicationPage.setVerificationNumber();
    applicationPage.getSubmitButton().click();

    cy.wait('@postRequest').then((interception) => {
      const requestBody = interception.request.body;
      const jsonData = requestBodyToJson(requestBody);
      expect(jsonData).to.deep.equal(mockRequestData);
    });
  });

});
