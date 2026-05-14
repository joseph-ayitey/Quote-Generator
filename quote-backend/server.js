import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let quotes = [

    {
    id: "CJ14",
    text: "Either write something worth reading or do something worth writing.",
    author: "Benjamin Franklin",
  },
    {
    id: "CJ16",
    text: "The beginning of wisdom is how you react to situations.",
    author: "Joseph Ayitey",
  },
  {
    id: "CJ17",
    text: "I should have been more kind.",
    author: "Clive James"
  },
  {
    id: "CJ18",
    text: "Stay hungry. Stay foolish.",
    author: "Steve Jobs"
  },
  {
    id: "CJ19",
    text: "Knowledge is power.",
    author: "Francis Bacon"
  }
];

app.get("/quotes", (req, res) => {
  res.json(quotes);
});

app.get("/quotes/random", (req, res) => {

  const randomIndex =
    Math.floor(Math.random() * quotes.length);

  res.json(quotes[randomIndex]);
});

app.post("/quotes", (req, res) => {

  const { text, author } = req.body;

  const newQuote = {
    id: `CJ${Date.now()}`,
    text,
    author
  };

  quotes.push(newQuote);

  res.json({
    message: "Quote added successfully",
    quote: newQuote
  });
});

app.delete("/quotes/:id", (req, res) => {

  const { id } = req.params;

  quotes = quotes.filter(
    (quote) => quote.id !== id
  );

  res.json({
    message: "Quote deleted successfully"
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
