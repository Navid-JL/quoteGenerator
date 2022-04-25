// Get Quote From API
const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')

const loading = (state) => {
  state
    ? (quoteContainer.style.background = `url('./three-dots.svg') no-repeat center/cover`)
    : (quoteContainer.style.background = 'rgba(255, 255, 255, 0.25)')
}

const getQuote = async () => {
  loading(true)
  const apiUrl = `//cors-anywhere.herokuapp.com/api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json`

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {},
    })
    loading(false)
    const data = await response.json()
    // If Author is blank, add 'Unknown'
    authorText.innerText = data.quoteAuthor === '' ? 'Unknown' : data.quoteAuthor

    // Reduce font size for long quotes
    data.quoteText.length > 50
      ? quoteText.classList.add('long-quote')
      : quoteText.classList.remove('long-quote')

    quoteText.innerText = data.quoteText
  } catch (error) {
    console.error('Something went wrong', error)
  }
}

// Tweet Quote
const tweetQuote = () => {
  const quote = quoteText.innerText
  const author = authorText.innerText
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote + ' - ' + author}`
  window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)

window.addEventListener('load', getQuote)
