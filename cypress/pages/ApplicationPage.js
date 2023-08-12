class ApplicationPage {
    constructor() {
        this.firstNameInput = 'input#vfb-5';
        this.lastNameInput = 'input#vfb-7';
        this.genderSelector = 'label.vfb-choice';
        this.addressInput = 'input[name="vfb-13[address]"]';
        this.address2Input = 'input[name="vfb-13[address-2]"]';
        this.cityInput = 'input[name="vfb-13[city]"]';
        this.zipInput = 'input[name="vfb-13[zip]"]';
        this.stateInput = 'input#vfb-13-state';
        this.emailInput = 'input#vfb-14';
        this.dateInput = 'input[name="vfb-18"]';
        this.countrySelector = 'span.select2-selection[aria-labelledby="select2-vfb-13-country-container"]';
        this.countryOption = 'span.select2-results li';
        this.hourDropdown = '#vfb-16-hour';
        this.minDropdown = '#vfb-16-min';
        this.phoneInput = 'input[name="vfb-19"]';
        this.uftCheckbox = 'input[value="UFT"]';
        this.queryTextarea = 'textarea#vfb-23';
        this.verificationNumberInput = "input#vfb-3"
        this.submitButton = "input[name=\"vfb-submit\"]";
    }

    visit() {
        cy.visit('https://nxtgenaiacademy.com/demo-site/');
    }

    selectCountry(country){
        cy.get(this.countrySelector).click();
        cy.get(this.countryOption).contains(country).click();
    }

    getInputField(selector) {
        return cy.get(selector);
    }

    fillInputField(selector, value) {
        this.getInputField(selector).type(value);
    }

    fillInputAndVerify(selector, value) {
        this.fillInputField(selector, value);
        this.getInputField(selector).should('have.value', value);
    }

    fillSelect(selector, value){
        cy.get(selector).select(value, { force: true });

    }
    fillSelectAndVerify(selector, value){
        this.fillSelect(selector, value);
        cy.get(selector).should('have.value', value);
    }

    shouldHaveText(selector, value){
        this.getInputField(selector).should('have.text', value);
    }


    getSubmitButton() {
        return cy.get(this.submitButton);
    }

    logTransactionId() {
        cy.get('.elementor-widget-container').invoke('text').then((textContent) => {
            const transactionIdPattern = /NXTGEN\d+/;
            const transactionIdMatch = textContent.match(transactionIdPattern);
            cy.log(`Extracted Transaction ID: ${transactionIdMatch}`);
        });
    }


    selectRadioOptionByValue(selector, optionValue) {
        this.getInputField(selector).contains(optionValue).click();

    }
    selectRadioOptionByValueAndVerify(selector, optionValue) {
        this.selectRadioOptionByValue(selector,optionValue);
        this.getInputField(`[value="${optionValue}"]`).should('be.checked');
    }

    selectCheckboxAndVerify(selector) {
        this.getInputField(selector).check();
        this.getInputField(selector).should('be.checked');
    }

    validateElementExists(selector) {
        this.getInputField(selector).should('exist');
    }

    getVerificationNumber() {
        return cy.get('span.vfb-span')
            .find('label')
            .invoke('text')
            .then((labelText) => {
                return labelText.split(':')[1].trim();
            });
    }

    setVerificationNumber () {
        this.getVerificationNumber().then((verificationNumber) => {
            this.fillInputField(this.verificationNumberInput, verificationNumber);
        })
    }

    populateFormWithMandatoryFields(firstName, lastName, email, gender) {
        this.fillInputField(this.firstNameInput, firstName);
        this.fillInputField(this.lastNameInput, lastName);
        this.selectRadioOptionByValue(this.genderSelector, gender);
        this.fillInputField(this.emailInput, email);
    }

    populateFormWithAllFields(mockData) {
        this.populateFormWithMandatoryFields(mockData.firstName, mockData.lastName, mockData.email,mockData.gender)
        this.fillInputField(this.addressInput, mockData.address);
        this.fillInputField(this.address2Input, mockData.address2);
        this.fillInputField(this.cityInput, mockData.city);
        this.fillInputField(this.zipInput, mockData.zip);
        this.fillInputField(this.stateInput, mockData.state);
        this.fillInputField(this.dateInput, mockData.date);
        this.selectCountry(mockData.countryOption);
        this.fillSelect(this.hourDropdown, mockData.hourDropdown)
        this.fillSelect(this.minDropdown, mockData.minDropdown)
        this.fillInputField(this.phoneInput, mockData.phone);
        this.getInputField(this.uftCheckbox).check();
        this.fillInputField(this.queryTextarea, mockData.queryTextarea);

    }
}

export default ApplicationPage;
