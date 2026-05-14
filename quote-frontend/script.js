const API_URL = "http://localhost:3000";

    let currentQuoteId = null;

    async function fetchRandomQuote() {
      try {
        const response = await fetch("http://t4xbsd9s7ns46zkc62na2kyi.178.105.39.91.sslip.io");
        const quote = await response.json();

        currentQuoteId = quote.id;

        document.getElementById("quoteText").innerText =
          `"${quote.text}"`;

        document.getElementById("quoteAuthor").innerText =
          `— ${quote.author}`;
      } catch (error) {
        console.error(error);
      }
    }

    document
      .getElementById("nextBtn")
      .addEventListener("click", fetchRandomQuote);

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

          const data = await response.json();

          document.getElementById("message").innerText =
            data.message;

          document.getElementById("quoteForm").reset();

        } catch (error) {
          console.error(error);
        }
      });

    document
      .getElementById("deleteBtn")
      .addEventListener("click", async () => {

        if (!currentQuoteId) return;

        try {
          await fetch(`${API_URL}/quotes/${currentQuoteId}`, {
            method: "DELETE"
          });

          fetchRandomQuote();

        } catch (error) {
          console.error(error);
        }
      });

    fetchRandomQuote();

    
