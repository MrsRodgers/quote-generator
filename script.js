const quoteText = document.getElementById("quote-text");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote-button");
const twitterBtn = document.getElementById("twitter-button");
const loader = document.getElementById("loader");

let apiQuotes = [];
const componentArr = [quoteText, authorText, newQuoteBtn, twitterBtn];

const AUTHOR_PLACEHOLDER = "Unknown";

/**
 * Hide/Show the loading progress
 * @param {*} loading - boolean
 * @returns void;
 */
function setLoading(loading) {
  loader.hidden = !loading;
  componentArr.forEach((element) => (element.hidden = loading));
}

/**
 * Twitter Button Handler.
 * Navigates to Twitter with text intent. Requires User sign in.
 * @returns void
 */
function handleTwitterButtonClick() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

/**
 * New Quote Button Handler.
 * Calculates a random number,
 * then adds the index of the quotes to the text content of the HTML Elements.
 * @returns void
 */
function handleNewQuoteButtonClick() {
  setLoading(true);
  const randomNumber = Math.floor(Math.random() * (apiQuotes.length || 1));
  const newQuote = apiQuotes[randomNumber];

  authorText.textContent = newQuote.author
    ? newQuote.author
    : AUTHOR_PLACEHOLDER;

  quoteText.textContent = newQuote.text;
  if (quoteText.text?.length && quoteText.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  setLoading(false);
}

/**
 * Fetch Quotes function
 * Retrieves all quotes from a json hosted on github pages.
 * Sets the Quotes to the above constant.
 * @returns void.
 */
async function getQuotes() {
  setLoading(true);
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    handleNewQuoteButtonClick();
    setLoading(false);
  } catch (error) {
    authorText.textContent = "";
    quoteText.textContent = `Error: ${error}`;
    setLoading(false);
  }
}

//onLoad
getQuotes();

//Event Listeners
newQuoteBtn.addEventListener("click", handleNewQuoteButtonClick);
twitterBtn.addEventListener("click", handleTwitterButtonClick);
