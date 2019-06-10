$(document).on("keyup", function() {
  const pswd = $("#pswd").val();
  const pswdConfirm = $("#pswdConfirm").val();

  if (pswd !== pswdConfirm) {
    $("#pswdConfirm").css("border-color", "red");
  } else {
    $("#pswdConfirm").css("border-color", "");
  }
  // length >= 8
  if (lengthVal(pswd)) {
    $("#length")
      .removeClass("invalid")
      .addClass("valid");
  } else {
    $("#length")
      .removeClass("valid")
      .addClass("invalid");
  }
  // at least one letter str.match(/[A-z]/)
  if (letterVal(pswd)) {
    $("#letter")
      .removeClass("invalid")
      .addClass("valid");
  } else {
    $("#letter")
      .removeClass("valid")
      .addClass("invalid");
  }
  // at least one Capital letter str.match(/[A-Z]/)
  if (capitalVal(pswd)) {
    $("#capital")
      .removeClass("invalid")
      .addClass("valid");
  } else {
    $("#capital")
      .removeClass("valid")
      .addClass("invalid");
  }
  // at least one number str.match(/\d/)
  if (numberVal(pswd)) {
    $("#number")
      .removeClass("invalid")
      .addClass("valid");
  } else {
    $("#number")
      .removeClass("valid")
      .addClass("invalid");
  }
});

function lengthVal(pswd) {
  if (pswd.length >= 8) return true;
  else return false;
}
function letterVal(pswd) {
  if (pswd.match(/[A-z]/)) return true;
  else return false;
}
function capitalVal(pswd) {
  if (pswd.match(/[A-Z]/)) return true;
  else return false;
}
function numberVal(pswd) {
  if (pswd.match(/\d/)) return true;
  else return false;
}
function checkAllCase(pswd) {
  if (
    lengthVal(pswd) &&
    letterVal(pswd) &&
    capitalVal(pswd) &&
    numberVal(pswd)
  ) {
    return true;
  } else {
    return false;
  }
}

$("#pswd").on("focus", function() {
  $("#pswd_info").css("display", "block");
});
// blur is the opposite of focus
$("#pswd").on("blur", function() {
  $("#pswd_info").css("display", "none");
});
$("#signIn").on("submit", function(event) {
  event.preventDefault();
  const pswd = $("#pswd").val();
  const pswdConfirm = $("#pswdConfirm").val();

  if (!checkAllCase(pswd)) {
    $("#pswd_info").css("display", "block");
  } else {
    if (pswd === pswdConfirm) $("#signIn").html("<strong>Success</strong>");
  }
});
