// Function to select html elements
var $_ = (selector, node = document) => {
   return node.querySelector(selector)
}

var $$_ = (selector, node = document) => {
   return node.querySelector(selector)
}


// Function to create new element
var createNewEl = (tag, className, text) => {

   var elNew = document.createElement(tag)
   elNew.setAttribute('class', className)

   if (text) {
      elNew.textContent = text
   }

   return elNew
}