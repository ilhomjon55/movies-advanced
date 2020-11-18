// Function to select html elements
var $_ = function (selector, node = document) {
  return node.querySelector(selector);
}

var $$_ = function (selector, node = document) {
  return node.querySelector(selector);
}


// Function to create new element
var createNewEl = function (tag, className, text) {

  var elNew = document.createElement(tag);
  elNew.setAttribute('class', className);
  elNew.textContent = text;

  return elNew;
}