/**
 * Variables
 */
 var modal       = document.querySelector('.modal');
 var modalClose  = document.querySelector('#modalClose');
 var underlay    = document.querySelector('.modal-underlay');
 var form        = document.getElementById('emailSignUp');
 var email       = document.getElementById('email');
 var submit      = document.getElementById('submit');
 var flag        = false;
 
 var show = function (elem) {
     elem.style.display = 'block';
 };
 var hide = function (elem) {
     elem.style.display = 'none';
 };
 
 /**
  * Functions
  */
 function fadeOut(el){
     el.style.opacity = 1;
 
     (function fade() {
         if ((el.style.opacity -= .1) < 0) {
             el.style.display = "none";
         } else {
             requestAnimationFrame(fade);
         }
     })();
 };
 
 function fadeIn(el, display){
     el.style.opacity = 0;
     el.style.display = display || "block";
 
     (function fade() {
         var val = parseFloat(el.style.opacity);
         if (!((val += .1) > 1)) {
             el.style.opacity = val;
             requestAnimationFrame(fade);
         }
     })();
 };
 
 function validateEmail(email)
 {
     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(String(email).toLowerCase());
 }
 
 function validate(value)
 {
     const result = document.querySelector('.error-message');
     result.innerHTML = '';
 
     if (validateEmail(value)) {
         result.innerHTML = "";
         result.style.opacity = 0;
         return true;
 
     } else {
         result.innerHTML = "Not valid";
         result.style.opacity = 1;
     }
 
     return false;
 }
 
 /**
  * Functionality
  */
 setTimeout(function(){
     fadeIn(modal, 'block');
     flag = true;
 }, 1000);
 
 modalClose.addEventListener('click', function(e){
     fadeOut(modal);
 });
 
 underlay.addEventListener('click', function(event){
     if (flag) {
         fadeOut(modal);
     }
 });
 
 form.addEventListener('submit', function(event){
     event.preventDefault();
 
     var isValid = validate(email.value);
 
     if (isValid) {
         document.querySelector('.modal-front').style.display = 'none';
         document.querySelector('.modal-back').style.display = 'flex';
     }
 });