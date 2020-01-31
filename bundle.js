(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
"use strict";

// ref: https://github.com/tc39/proposal-global
var getGlobal = function () {
	// the only reliable means to get the global object is
	// `Function('return this')()`
	// However, this causes CSP violations in Chrome apps.
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	throw new Error('unable to locate global object');
}

var global = getGlobal();

module.exports = exports = global.fetch;

// Needed for TypeScript and Webpack.
exports.default = global.fetch.bind(global);

exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
const fetch = require("node-fetch");
var userInput = " ";
var patient_id = " ";

const  client_id = '92113669b35347428d5b1c84d49de0a6';  
const client_secret = 'ny6lSmAs6E418gb4wFg8pN3yxPs3pt0F';  

const token_url = 'https://api.1up.health/fhir/oauth2/token';  
const api_url = 'https://api.1up.health/fhir'; 
const auth = "/$everything\ -H Authorization: Bearer"

//curl -X GET 'https://api.1up.health/fhir/dstu2/Patient/{patient_id}/$everything' \
 // -H "Authorization: Bearer accesstokenaccesstoken"

function getAccessToken(){
    //sets access Token and patient ID variables
    var accessToken = document.getElementById("userInput1").value;
    var patientID = document.getElementById("userInput2").value;
    
    //testing for function
    
    document.getElementById("at").innerHTML = accessToken;
    document.getElementById("pid").innerHTML = patientID;
    
    //nifty 'dynamic' query concat
   
    function createURL() {
        var query_url = api_url.concat(patientID,auth,accessToken);
        actualQuery();
    }
    
    //now to query the mfin api
    function actualQuery() {
    fetch(window.query_url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  };
   
};



},{"node-fetch":1}]},{},[2]);
