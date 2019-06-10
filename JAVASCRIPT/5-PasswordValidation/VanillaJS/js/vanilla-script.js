document.addEventListener("DOMContentLoaded", function() {
    const username = document.querySelector("#username");
    const pswd = document.querySelector("#pswd");
    const pswdConfirm = document.querySelector("#pswdConfirm");
    const signIn = document.querySelector("#signIn");
    // shows info box on input focus
    pswd.addEventListener("focus", function(){
        document.querySelector("#pswd_info").style.display = "block";
    });
    pswd.addEventListener("blur", function(){
        document.querySelector("#pswd_info").style.display = "none";
    });
    document.addEventListener('keyup', function(){
        // always verify if password are matching
        if (!passwordMatching()){
            pswdConfirm.style.borderColor = "red";
        } else{
            pswdConfirm.style.borderColor = "";
        }
        // update conditions style
        updateInfoCondition("letter", fieldLetter());
        updateInfoCondition("capital", fieldCapitalLetter());
        updateInfoCondition("number", fieldNumber());
        updateInfoCondition("length", fieldLength());
    });

    function passwordMatching(){
        return pswd.value === pswdConfirm.value;
    }
    // length >= 8
    function fieldLength (){
        return pswd.value.length >= 8;
    }
    // at least one letter str.match(/[A-z]/)
    function fieldLetter (){
        return pswd.value.match(/[A-z]/);
    }
    // at least one Capital letter str.match(/[A-Z]/)
    function fieldCapitalLetter (){
        return pswd.value.match(/[A-Z]/);
    }
    // at least one number str.match(/\d/)
    function fieldNumber (){
        return pswd.value.match(/\d/);
    }
      function checkAllCase(pswd) {
      return fieldLength() && fieldLetter() && fieldCapitalLetter() && fieldNumber();
    }

    function updateInfoCondition (field, condition){
        if (condition){
            document.querySelector("#"+field).classList.remove("invalid");
            document.querySelector("#"+field).classList.add("valid");
        }else{
            document.querySelector("#"+field).classList.remove("valid");
            document.querySelector("#"+field).classList.add("invalid");
        }
    }
    signIn.addEventListener("submit", function(event){
        event.preventDefault();
        if (!checkAllCase()){
            document.querySelector("#pswd_info").style.display = "block";
        }else{
            if (username.value.length > 0 && passwordMatching()){
                signIn.innerHTML = "<strong>Success</strong>";
            }
        }

    });


  });