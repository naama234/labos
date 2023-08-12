const mockFormData = {
    firstName: 'Israel',
    lastName: 'Israeli',
    gender: 'Male',
    address: 'Bograshov 1 Tel Aviv',
    address2: 'Bograshov 1',
    city: 'Tel Aviv',
    zip: '1',
    state: 'Tel Aviv',
    email: 'Israeli@gmail.com',
    date: '08/10/2023',
    countryOption: 'Israel',
    hourDropdown: '08',
    minDropdown: '30',
    phone: '1111111111',
    uftCheckbox: true,
    queryTextarea: 'Sample query'
};

const mockRequestData = {
    form_id: "1",
    "vfb-3": "99",
    "vfb-5": mockFormData.firstName,
    "vfb-7": mockFormData.lastName,
    "vfb-13[address-2]": mockFormData.address2,
    "vfb-13[address]": mockFormData.address,
    "vfb-13[city]": mockFormData.city,
    "vfb-13[country]": mockFormData.countryOption,
    "vfb-13[state]": mockFormData.state,
    "vfb-13[zip]": mockFormData.zip,
    "vfb-14": mockFormData.email,
    "vfb-16[hour]": mockFormData.hourDropdown,
    "vfb-16[min]": mockFormData.minDropdown,
    "vfb-18": mockFormData.date,
    "vfb-19": mockFormData.phone,
    "vfb-23": mockFormData.queryTextarea,
    "vfb-31": mockFormData.gender,
    "vfb-spam": "",
    "vfb-submit": "Submit",
    "_vfb-secret": "vfb-3",
    "_wp_http_referer": "/demo-site/",
    "vfb-20[]" : "UFT"
};

export { mockFormData, mockRequestData };
