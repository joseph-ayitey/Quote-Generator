const API_URL = "http://t4xbsd9s7ns46zkc62na2kyi.178.105.39.91.sslip.io";

let currentQuoteId = null;

// FETCH RANDOM QUOTE
async function fetchRandomQuote() {
  try {

    const response = await fetch(`${API_URL}/quotes`);

    if (!response.ok) {
      throw new Error("Failed to fetch quotes");
    }

    // GET JSON DATA
    const data = await response.json();

    console.log("API DATA:", data);

    // FIX JSON MISMATCH
    // If backend returns array -> pick random quote
    // If backend returns single object -> use it directly
    const quote = Array.isArray(data)
      ? data[Math.floor(Math.random() * data.length)]
      : data;

    if (!quote) {
      throw new Error("No quote found");
    }

    // SAVE CURRENT ID
    currentQuoteId = quote.id;

    // UPDATE UI
    document.getElementById("quoteText").innerText =
      `"${quote.text}"`;

    document.getElementById("quoteAuthor").innerText =
      `— ${quote.author}`;

  } catch (error) {

    console.error("FETCH ERROR:", error);

    document.getElementById("quoteText").innerText =
      "Failed to load quote";

    document.getElementById("quoteAuthor").innerText =
      "";
  }
}

// NEXT BUTTON
document
  .getElementById("nextBtn")
  .addEventListener("click", fetchRandomQuote);

// ADD QUOTE
document
  .getElementById("quoteForm")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

    const text = document.getElementById("textInput").value;
    const author = document.getElementById("authorInput").value;

    try {

      const response = await fetch(`${API_URL}/quotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text,
          author
        })
      });

      if (!response.ok) {
        throw new Error("Failed to add quote");
      }

      const data = await response.json();

      document.getElementById("message").innerText =
        data.message || "Quote added";

      document.getElementById("quoteForm").reset();

      // RELOAD QUOTE
      fetchRandomQuote();

    } catch (error) {

      console.error("POST ERROR:", error);

      document.getElementById("message").innerText =
        "Failed to add quote";
    }
  });

// DELETE QUOTE
document
  .getElementById("deleteBtn")
  .addEventListener("click", async () => {

    if (!currentQuoteId) {
      alert("No quote selected");
      return;
    }

    try {

      const response = await fetch(
        `${API_URL}/quotes/${currentQuoteId}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete quote");
      }

      // LOAD NEW RANDOM QUOTE
      fetchRandomQuote();

    } catch (error) {

      console.error("DELETE ERROR:", error);

      alert("Failed to delete quote");
    }
  });

// INITIAL LOAD
fetchRandomQuote();