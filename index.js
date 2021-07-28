// form elements
const shortenForm = document.querySelector('.shorten__form')
const linkInput = shortenForm.querySelector('input')
const linkError = shortenForm.querySelector('.shorten__form-error')
const linkButton = shortenForm.querySelector('button')

// shortened links elements
const linkTable = document.querySelector('.shorten__links')
const linkTemplate = document.querySelector('#shorten__link')

// menu
const menuButton = document.querySelector('.header-button')
const menu = document.querySelector('.header__nav')


/**
 * Add event listeners
 */
const addListeners = () => {
    shortenForm.addEventListener('submit', formHandler)
    menuButton.addEventListener('click', menuHandler)
}

/**
 * Initialize .shorten__links table with localStorage data
 */
const initLinkTable = () => {
    const links = getFromStorage()
    for (let item of links) {
        addShortenedLink(item.original, item.shortened)
    }
}

/**
 * Handle menu button click event
 * Toggle show/hide menu
 * @param  {object} event
 */
const menuHandler = (event) => {
    menu.classList.toggle('hide')

    const isHidden = menu.classList.contains('hide')

    menuButton.setAttribute('aria-label', `${isHidden ? 'Open' : 'Close'} the menu`)
    menuButton.setAttribute('aria-expanded', !isHidden)
}

/**
 * Handle .shorten__form submission
 * @param  {object} event
 */
const formHandler = async (event) => {
    event.preventDefault()

    setIsLoading()

    const link = linkInput.value

    if (!isEmptySpace(link)) {
        try {
            const shortened = await shortenLink(link)
            addShortenedLink(link, shortened)
            addToStorage({
                original: link,
                shortened
            })

            linkInput.value = ''    //  clear input value
        }
        catch (err) {
            setErrorMessage('Encountered problem while shortening the link. Please try again after a while or contact us if it persists.')
        }
        finally {
            setIsLoading()
        }
    }
    else {
        setErrorMessage("Please don't leave this field empty")
        setIsLoading()
    }
}

/**
 * Add shortened link to .shorten__links table
 * @param  {string} link
 * @param  {string} shortened
 */
const addShortenedLink = (link, shortened) => {
    const shortenedLinkRow = linkTemplate.content.cloneNode(true).children[0]

    const originalLinkCol = shortenedLinkRow.children[0]
    const shortenedLinkCol = shortenedLinkRow.children[1]
    const copyButton = shortenedLinkRow.querySelector('button')

    originalLinkCol.textContent = link
    shortenedLinkCol.textContent = shortened
    copyButton.addEventListener('click', event => copyToClipboard(event.target, shortened))

    const tableBody = linkTable.children[0]
    tableBody.appendChild(shortenedLinkRow)

    linkTable.classList.remove('hide')  //  reveal .shorten__links table
}

/**
 * Get all 'links' data from localStorage
 * @returns {array}
 */
const getFromStorage = () => {
    const links = JSON.parse(localStorage.getItem('links'))
    return links ? links : []
}

/**
 * Add shortened link's details to localStorage
 * Contains properties: original, shortened
 * @param  {object} link
 */
const addToStorage = (link) => {
    const links = getFromStorage()

    links.push(link)
    localStorage.setItem('links', JSON.stringify(links))
}

/**
 * Copy value to clipboard
 * @param  {object} button
 * @param  {string} value
 */
const copyToClipboard = (button, value) => {
    navigator.clipboard.writeText(value)
    button.classList.add('copied')
}

/**
 * Send request to shrtcode API
 * @param  {string} link
 * @returns {string} shortened link
 */
const shortenLink = (link) => {
    return fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
        .then(res => res.json())
        .then(data => {
            const shortened = data.result.full_short_link
            return shortened
        })
}

/**
 * Toggle loading display
 */
const setIsLoading = () => {
    linkButton.classList.toggle('loading')
}

/**
 * Show error message
 * @param  {string} message
 */
const setErrorMessage = (message) => {
    linkError.textContent = `Error: ${message}`
    linkInput.setAttribute('aria-invalid', true)
}

/**
 * Check if string is empty
 * @param  {string} value
 * @returns {boolean}
 */
const isEmptySpace = (value) => {
    const removedSpace = value.replace(/\s/g, '')   // remove whitespaces
    return removedSpace.length === 0
}

addListeners()
initLinkTable()
