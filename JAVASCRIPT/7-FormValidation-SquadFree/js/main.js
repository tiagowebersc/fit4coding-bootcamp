$(function() {
  $("#preloader").hide();

  $("a[href^='#']").on("click", function() {
    var page = $(this).attr("href");
    var speed = 500;
    $("html").animate(
      {
        scrollTop: $(page).offset().top
      },
      speed,
      "swing"
    );
    return false;
  });
});

$("#contact-form").on("submit", function(event) {
  event.preventDefault();
  const nameForm = $("#name").val();
  const emailForm = $("#email").val();
  const subjectForm = $("#subject").val();
  const messageForm = $("#message").val();

  const afterAt = emailForm.substring(emailForm.indexOf("@"));

  const helpForm = $("#helpForm");
  if (emailForm.indexOf("@") <= 0 || afterAt.indexOf(".") === -1) {
    helpForm.text("Email invalid");
    return false;
  }
  if (messageForm.length < 40) {
    helpForm.text("The message must be more than 40 characters");
    return false;
  } else {
    helpForm.text("");
  }

  if (nameForm.length > 0 && subjectForm.length > 0) {
    const p = nameForm + ", your message " + messageForm + " has been sent.";
    const p2 =
      "You will be contact soon on the mail address " +
      emailForm +
      " about " +
      subjectForm;

    $("#contact-form").html("<p>" + p + p2 + "</p>");
    setTimeout(function() {
      $("#contact-form").html("<h1>SUCCESS !</h1>");
    }, 4000);
  }
});
