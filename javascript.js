
const purchaseSlider = document.getElementById('purchase-slider');
const downSlider = document.getElementById('down-slider');
const purchaseAmount = document.getElementById('purchase-amount');
const downAmount = document.getElementById('down-amount');
const downPercent = document.getElementById('down-percent');
const monthlyPayment = document.getElementById('monthly-payment');
const loanRadios = document.querySelectorAll('input[name="loan"]');


const interestRates = {
    '5/1': 5.25,
    '15': 4.85,
    '30': 5.50
};


function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}


function calculatePayment() {
    const principal = purchaseSlider.value - downSlider.value;
    const selectedLoan = document.querySelector('input[name="loan"]:checked').value;
    
    let term;
    if (selectedLoan === '5/1') {
        term = 30; 
    } else {
        term = parseInt(selectedLoan);
    }
    
    const annualRate = interestRates[selectedLoan];
    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = term * 12;
    
    // Monthly payment formula: M = P[r(1+r)^n]/[(1+r)^n-1]
    const payment = principal * 
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return Math.round(payment);
}


function updatePurchaseAmount() {
    purchaseAmount.textContent = formatNumber(purchaseSlider.value);
    
    
    downSlider.max = purchaseSlider.value;
    
   
    if (parseInt(downSlider.value) > parseInt(purchaseSlider.value)) {
        downSlider.value = purchaseSlider.value;
        updateDownAmount();
    }
    
    updateDownPercent();
    updateMonthlyPayment();
}


function updateDownAmount() {
    downAmount.textContent = formatNumber(downSlider.value);
    updateDownPercent();
    updateMonthlyPayment();
}


function updateDownPercent() {
    const percent = ((downSlider.value / purchaseSlider.value) * 100).toFixed(1);
    downPercent.textContent = `${percent}% or more of purchase price`;
}


function updateMonthlyPayment() {
    const payment = calculatePayment();
    monthlyPayment.textContent = formatNumber(payment);
}


purchaseSlider.addEventListener('input', updatePurchaseAmount);
downSlider.addEventListener('input', updateDownAmount);


loanRadios.forEach(radio => {
    radio.addEventListener('change', updateMonthlyPayment);
});


updatePurchaseAmount();
updateDownAmount();
updateMonthlyPayment();


document.getElementById('get-started-btn').addEventListener('click', function() {
    alert('Starting your mortgage application process!');
});