// Init the ui library
var ui = ui()

// Login form validation
ui.form('#loginForm', [{
        name: 'email',
        rules: [{
                type: 'required',
                message: 'Please enter an email adress!'
            },
            {
                type: 'validEmail',
                message: 'The given email address is not valid.'
            }
        ]
    },
    {
        name: 'password',
        rules: [{
                type: 'required',
                message: 'Please enter a password!'
            },
            {
                type: 'minLength(6)',
                message: 'The password must be at least 6 characters long.'
            }
        ]
    }
], function (results) {
    console.log(results)
})

// Sign Up form validation
ui.form('#signUpForm', [{
        name: 'firstname',
        rules: [{
            type: 'required',
            message: 'Please enter your first name!'
        }]
    },
    {
        name: 'lastname',
        rules: [{
            type: 'required',
            message: 'Please enter your last name!'
        }]
    },
    {
        name: 'email',
        rules: [{
                type: 'required',
                message: 'Please enter an email adress!'
            },
            {
                type: 'validEmail',
                message: 'The given email address is not valid.'
            }
        ]
    },
    {
        name: 'password',
        rules: [{
                type: 'required',
                message: 'Please enter a password!'
            },
            {
                type: 'minLength(6)',
                message: 'The password must be at least 6 characters long.'
            }
        ]
    },
    {
        name: 'privacy',
        rules: [{
            type: 'required',
            message: 'You must accept the Privacy Statement!'
        }]
    },
    {
        name: 'newsletter',
        rules: [{
            type: 'required',
            message: 'You have to subsribe to the newsletter!'
        }]
    }
], function (results) {
    console.log(results)
})

// Checks for cookie banner and create one if needed
ui.cookieBanner(
    'We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.'
)

// Modal on link
;(function openModalOnLink() {
    // Check the url hash
    if (window.location.hash === '#login') {
        // Open the modal with UI
        ui.openModal('#loginModal')
    } else if (window.location.hash === '#signup') {
        ui.openModal('#signUpModal')
    } else {
        return
    }
})()

// Change header class on scroll
window.addEventListener('scroll', function () {
    var topNav = document.querySelector('#topNav')
    if ((window).pageYOffset > 150) {
        topNav.classList.add('light')
        topNav.classList.add('small')
    } else {
        topNav.classList.remove('light')
        topNav.classList.remove('small')
    }
})

// Products sliders on click
function slideProducts(dir) {
    var cardGrid = document.querySelector('#products-cards-grid')
    var cardWidth = cardGrid.querySelector('.card').offsetWidth
    var numbOfCards = document.querySelector('#products').querySelectorAll('.card').length

    //Get the number from the transform: translate property
    var cardGridOffset = -Number(cardGrid.style.transform.match(/\d+/g, '')[0])
    var direction = dir === 'left' ? 1 : -1

    // Translate with the width of a card
    var translateFinal = cardGridOffset + direction * (cardWidth + 10) // +5 cause of margin
    cardGrid.setAttribute('style', 'transform: translateX(' + translateFinal + 'px)')

    // If there is tranlation, show the left arrow. At the far right, hide the right arrow.
    var leftArrow = document.querySelector('#products').querySelector('.arrow-left')
    var rightArrow = document.querySelector('#products').querySelector('.arrow-right')

    if (Math.abs(translateFinal) > 0) {
        leftArrow.classList.add('active')
    } else {
        leftArrow.classList.remove('active')
    }

    if (Math.abs(translateFinal) >= (numbOfCards - 1) * cardWidth) {
        rightArrow.classList.remove('active')
    } else {
        rightArrow.classList.add('active')
    }
}

// Type the text
function typedText() {
    // Declare the words
    var wordArr = ['engaging', 'interesting', 'fun', 'enjoyable', 'captivating', 'fascinating', 'effective', 'powerful', 'memorable', 'compelling', 'playful', 'ectraordinary', 'meaningful', 'remarkable']
    var numbOfWords = wordArr.length

    // Find the div
    var div = document.querySelector('.typed-text')

    // Init the counter variables
    var currentChar = 0
    var currentWord = 0

    function typing(text) {
        // Check if the typing is finished
        if (currentChar < text.length) {
            // First type a space charakter
            if (currentChar === 0) {
                div.textContent += ' '   
            }

            // Type the current charakter
            div.textContent += text.charAt(currentChar)
            // Set up for the next char
            currentChar++
            // Randomize the typing speed
            var typeSpeed = Math.random() * 70 + 100
            // Recursively call the typing function with thr text parameter
            setTimeout(typing.bind(null, text), typeSpeed)
        } else {
            // The typing is finished, start the delete process
            setTimeout(deleteTyping.bind(null, text), 3000)
        }
    }
    // When the page loads call the typing func for the first time
    setTimeout(typing.bind(null, wordArr[currentWord]), 1000)

    function deleteTyping(text) {
        // Check if any char left in the text
        if (currentChar > 0) {
            // Cut off the last char
            var deletedText = ' ' + text.substring(0, currentChar - 1)
            // Set the div as the deleted version of the text
            div.textContent = deletedText
            currentChar--
            // Call recursively the delete function
            setTimeout(deleteTyping.bind(null, text), 70)
        } else {
            // The delete process is finished, find the next word
            currentWord++
            // If there are no other word, set to first
            currentWord = currentWord % numbOfWords
            // Call the typing function again
            setTimeout(typing.bind(null, wordArr[currentWord]), 1500)
        }
    }
}
// Inv the function
typedText()

//Size the product card
function setProductCardsWidth() {
    var mainGrid = document.querySelector('#products-main-grid')
    var cardGrid = document.querySelector('#products-cards-grid')
    var cards = cardGrid.querySelectorAll('.card')
    var screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    var numbOfCards = cards.length
    var cardFinalWidth

    // In case of mobile
    if (screenWidth < 576) {
        cardFinalWidth = mainGrid.offsetWidth
        // In case of tablet
    } else if (screenWidth < 1024) {
        cardFinalWidth = mainGrid.offsetWidth / 2 - 10 //-10 beacause of the margins
        // In case of laptop
    } else {
        cardFinalWidth = mainGrid.offsetWidth / 3 - 10 //-20 beacause of the margins
    }

    for (var i = 0; i < numbOfCards; i++) {
        //Doing both way because browser compatibility
        cards[i].setAttribute('style', 'width: ' + cardFinalWidth + 'px')
        cards[i].style.width = cardFinalWidth + 'px'
    }
}
// Run the function on window resize event
window.addEventListener("resize", setProductCardsWidth)
// Run when the windows is loaded
window.onload = function () {
    setProductCardsWidth()
}

// Price slider
;(function priceSliderhandler() {
    // Get the players
    var year = document.querySelector('#licenceYear')
    var slider = document.querySelector('#priceSlider')
    var premiumPrice = document.querySelector('#premiumPrice')
    var proPrice = document.querySelector('#proPrice')

    // Set up the pricelist
    var premiumPriceList = [
        1990, 1590, 1290, 1090, 990
    ]
    var proPriceList = [
        3990, 3190, 2590, 2190, 1990
    ]

    // Init the values
    setValues()

    // Change value on slider change
    slider.oninput = setValues
    // IE compatibility
    slider.onchange = setValues

    function setValues() {
        year.innerHTML = slider.value
        premiumPrice.innerHTML = premiumPriceList[slider.value - 1].toLocaleString()
        proPrice.innerHTML = proPriceList[slider.value - 1].toLocaleString()
    }

})()

// Build up the reference images
;(function buildRefImages(num) {
    // Find the img grid
    var imgGrid = document.querySelector('#refImgGrid')
    // Set the source
    var src = './img/refs/ref'
    // Extension
    var ext = '.png'
    var img

    // For every image
    for (var i = 0; i < num; i++) {
        // Create a new one
        img = new Image
        // Add data-src, cause of lazy loading
        img.dataset.src = src + (i + 1) + ext
        img.classList.add('lazy')
        img.alt = 'References'
        imgGrid.appendChild(img)
    }
    // Immediatly invoke with 9 images
})(9)

// Lazy loading
document.addEventListener('DOMContentLoaded', function () {
    // Create an arra of imgaes with lazy classes
    var lazyImages = [].slice.call(document.querySelectorAll('img.lazy'))
    var active = false

    // Create the function
    var lazyLoad = function () {
        if (active === false) {
            active = true

            setTimeout(function () {
                lazyImages.forEach(function (lazyImage) {
                    // The imgage is entering the screen
                    if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== 'none') {
                        // Set the src attribute from the data-src
                        lazyImage.src = lazyImage.dataset.src
                        // Remove the class
                        lazyImage.classList.remove('lazy')

                        // Remove the image from the array
                        lazyImages = lazyImages.filter(function (image) {
                            return image !== lazyImage
                        })

                        // Check if the array is empty, then remove the event listeners
                        if (lazyImages.length === 0) {
                            document.removeEventListener('scroll', lazyLoad)
                            window.removeEventListener('resize', lazyLoad)
                            window.removeEventListener('orientationchange', lazyLoad)
                        }
                    }
                })

                active = false
            }, 200)
        }
    }

    // Add the event listeners
    document.addEventListener('scroll', lazyLoad)
    window.addEventListener('resize', lazyLoad)
    window.addEventListener('orientationchange', lazyLoad)
})

// Custom aos
function animateOnScroll() {

    // Create a proper array from the divs with data-aos property
    var selectorArr = [].slice.call(document.querySelectorAll('[data-aos]'))
    // Set the offset, so tha nimatins will start a little bit later
    var offset = 250

    selectorArr.forEach(function(selector) {
        // Find each selector and see if they are on the screen
        if (selector.getBoundingClientRect().top + offset <= window.innerHeight && selector.getBoundingClientRect().bottom >= 0) {
            // Animate
            selector.classList.add('animate')
            
            setTimeout(function() {
                // Remove the data attribute and animate class, no longer needed
                selector.removeAttribute('data-aos')
                selector.classList.remove('animate')
                
                // Filter the array, remove the current selector element
                selectorArr = selectorArr.filter(function(item) {
                    return item !== selector
                })

                // If the array is empty remove the event listener
                if (selectorArr.length === 0) {
                    document.removeEventListener('scroll', animateOnScroll)
                }
            }, 300)
        }
    })
}
// Invoke the function when the script loads
animateOnScroll()
// Add the event listener to the scroll event
document.addEventListener('scroll', animateOnScroll)