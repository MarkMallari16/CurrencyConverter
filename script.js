const APIKEY = "5e67f5b5bf56be84a19ce6fa";
const APIURL = `https://v6.exchangerate-api.com/v6/5e67f5b5bf56be84a19ce6fa/latest/USD`;
const fromCurrencyDropdown = document.getElementById("fromCurrency");
const toCurrencyDropdown = document.getElementById("toCurrency");

const fromCurrencyInput = document.getElementById("fromCurrencyInput");
const toCurrencyInput = document.getElementById("toCurrencyInput");

let conversionRates;

fetchCurrencies();

async function fetchCurrencies() {
    try {
        const response = await fetch(APIURL);
        const data = await response.json();

        // console.log(data);  //pang debug

        conversionRates = data.conversion_rates;

        populateDropdown(fromCurrencyDropdown, conversionRates);
        fromCurrencyDropdown.value = "USD";
        populateDropdown(toCurrencyDropdown, conversionRates);
        toCurrencyDropdown.value = "PHP";

        convertCurrency();
    } catch (error) {
        console.error("Error", error);
    }

}

function populateDropdown(selectElement, options) {
    selectElement.innerHTML = "";
    Object.entries(options).forEach(([currencyCode]) => {
        const optionElement = document.createElement("option");
        optionElement.value = currencyCode;
        optionElement.text = `${currencyCode}`;
        selectElement.appendChild(optionElement);
    })
}
function convertCurrency() {
    const fromCurrency = fromCurrencyDropdown.value;
    const toCurrency = toCurrencyDropdown.value;

    const amount = parseFloat(document.getElementById("fromCurrencyInput").value);

    if (!isNaN(amount)) {
        const apiUrl = `https://v6.exchangerate-api.com/v6/${APIKEY}/pair/${fromCurrency}/${toCurrency}/${amount}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const convertedAmount = data.conversion_result;
                document.getElementById("toCurrencyInput").value = convertedAmount.toFixed(2);
            })
            .catch(error => {
                console.error('Error converting currency:', error);
            });
    }
}
function setDefaultValue() {
    document.getElementById("fromCurrencyInput").value = "1";
}
setDefaultValue();

fromCurrencyDropdown.addEventListener("change", convertCurrency);
toCurrencyDropdown.addEventListener("change", convertCurrency);
fromCurrencyInput.addEventListener("input", convertCurrency);
toCurrencyInput.addEventListener("input", convertCurrency);