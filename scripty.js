var userInput = " ";
var patient_id = " ";
var exports = {};
const  client_id = '92113669b35347428d5b1c84d49de0a6';  
const client_secret = 'ny6lSmAs6E418gb4wFg8pN3yxPs3pt0F';  


const token_url = 'https://api.1up.health/fhir/oauth2/token';  
const api_url = 'https://api.1up.health/fhir'; 
const auth = "/$everything\ -H Authorization: Bearer";

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


