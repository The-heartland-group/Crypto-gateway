const payBtn = document.getElementById('pay');
const invoiceDiv = document.getElementById('invoice');

payBtn.addEventListener('click', async () => {
  const amount = document.getElementById('amount').value;
  const currency = document.getElementById('currency').value;

  if (!amount) {
    alert("Please enter an amount!");
    return;
  }

  payBtn.disabled = true;
  invoiceDiv.innerText = 'Creating invoice...';

  try {
    const response = await fetch('https://YOUR_REPLIT_URL.repl.co/api/create-invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price_amount: +amount, currency })
    });

    const data = await response.json();
    invoiceDiv.innerHTML = `
      <p><strong>Order ID:</strong> ${data.order_id}</p>
      <p><strong>Amount to Pay:</strong> ${data.pay_amount} ${data.pay_currency}</p>
      <a href="${data.invoice_url}" target="_blank">Click here to pay</a>
    `;
  } catch (error) {
    invoiceDiv.innerText = 'Error creating invoice.';
    console.error(error);
  } finally {
    payBtn.disabled = false;
  }
});