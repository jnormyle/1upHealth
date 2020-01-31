const fetch = 'node-fetch';
const request = require('request');
const async = require('async');
var exports = {};
//hardcoding my client keys
const  client_id = '92113669b35347428d5b1c84d49de0a6';  
const client_secret = 'ny6lSmAs6E418gb4wFg8pN3yxPs3pt0F';  


const token_url = 'https://api.1up.health/fhir/oauth2/token';  
const api_url = 'https://api.1up.health/fhir'; 
const auth = "/$everything\ -H Authorization: Bearer";

//curl -X GET 'https://api.1up.health/fhir/dstu2/Patient/{patient_id}/$everything' \
 // -H "Authorization: Bearer accesstokenaccesstoken"

function getAccessToken(){
    //sets access Token and patient ID variables
    var oneUpAccessToken = document.getElementById("userInput1").value;
    var patientID = document.getElementById("userInput2").value;
    
    //testing for function
    
    document.getElementById("at").innerHTML = oneUpAccessToken;
    document.getElementById("pid").innerHTML = patientID;
    
    //nifty 'dynamic' query concat
    createURL();
    }  
  //  function createURL() {
    //    var query_url = api_url.concat(patientID,auth,oneUpaAccessToken);
      //  getAllFhirResourceBundles();
   // }

//attempnting to modify existing demo to suit $everything

    if(document.getElementById('everything').checked) {
 //let endpointstoQuery = curl -X GET 'https://api.1up.health/fhir/dstu2/Patient/{patient_id}/$everything' \
 // -H "Authorization: Bearer accesstokenaccesstoken"
}else if(document.getElementById('original').checked) {
  //original endpoints


let endpointsToQuery = [
  { apiVersion: 'stu3', resourceType: 'Patient' },
  { apiVersion: 'stu3', resourceType: 'Coverage' },
  { apiVersion: 'stu3', resourceType: 'ExplanationOfBenefit' },
  { apiVersion: 'stu3', resourceType: 'ReferralRequest' },
  { apiVersion: 'dstu2', resourceType: 'Patient' },
  { apiVersion: 'dstu2', resourceType: 'Encounter' },
  { apiVersion: 'dstu2', resourceType: 'Observation' },
  { apiVersion: 'dstu2', resourceType: 'MedicationOrder' },
  { apiVersion: 'stu3', resourceType: 'MedicationDispense' },
  { apiVersion: 'stu3', resourceType: 'MedicationStatement' },
  { apiVersion: 'stu3', resourceType: 'MedicationOrder' },
  { apiVersion: 'dstu2', resourceType: 'Condition' },
  { apiVersion: 'dstu2', resourceType: 'AllergyIntolerance' }
];

};

function getAllFhirResourceBundles(oneupAccessToken, callback) {
  let responseData = {};
  async.map(
    endpointsToQuery,
    function(params, callback) {
      getFhirResourceBundle(
        params.apiVersion,
        params.resourceType,
        oneupAccessToken,
        function(error, body) {
          if (error) {
            callback(error);
          } else {
            try {
              let jsbody = JSON.parse(body);
              if (typeof responseData[params.resourceType] === 'undefined') {
                responseData[params.resourceType] = jsbody;
              } else {
                responseData[params.resourceType].entry = responseData[
                  params.resourceType
                ].entry.concat(jsbody.entry);
              }
              callback(null, jsbody);
            } catch (e) {
              console.log('error in getFhirResourceBundle', e);
            }
          }
        },
      );
    },
    function(error, body) {
      if (error) {
        callback(error);
      } else {
        callback(responseData);
      }
    },
  );
}
