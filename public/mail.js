'use strict';

var sendMailButton = document.getElementById('sendMail');

/* far from complete, but does the job to weed out obviousely invalid */
function validateEmail(email) 
{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function sendMail(){
    let subCandidate = document.getElementById('newsletter-subscription').value
    if ( validateEmail(subCandidate)){
        console.log('sendmail to : '+ subCandidate);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/subscribe', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function() { 
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                console.log("mail request processed");
                alert('Thanks! You\'ll hear from us soon');
                document.getElementById('newsletter-subscription').value = '';
            }
        };
        xhr.send('registerEmail='+subCandidate); 
    }else{
        console.error("invalid email "+ subCandidate );
    }
}

sendMailButton.addEventListener('click', sendMail);

