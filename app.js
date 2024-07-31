import { randomUUID } from "node:crypto";

const measurementId = "replace-with-your-measurement-id";
const apiSecret = "replace-with-your-api-secret";

async function sendExchangeRate(rate) {
  const clientId = randomUUID();
  const payload = {
    client_id: clientId,
    events: [
      {
        name: "exchange_rate",
        params: {
          currency: "UAH_USD",
          value: rate,
        },
      },
    ],
  };

  try {
    const body = JSON.stringify(payload);
    const response = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }
    );
    if (response.status === 204) {
      console.log("Event sent successfully");
    } else {
      console.error("Error sending event:", response.statusText);
    }
  } catch (error) {
    console.error("Error sending event:", error);
  }
}

async function fetchExchangeRate() {
  try {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/UAH"
    );
    if (response.ok) {
      const data = await response.json();
      const rate = data.rates.USD;
      sendExchangeRate(rate);
    } else {
      console.error("Error fetching exchange rate:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
  }
}

fetchExchangeRate();
