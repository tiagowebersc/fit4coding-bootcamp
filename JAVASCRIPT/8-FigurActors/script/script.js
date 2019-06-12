$(function() {
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

  for (const actor of actors) {
    //clone the card that is the template create
    // find for the card hidded
    const newCard = $(".d-none").clone();
    newCard.find(".card-title").text(actor.name);
    newCard.find("img").attr("src", actor.picture);
    newCard.addClass(actor.category);
    newCard.removeClass("d-none");
    $(".card-columns").append(newCard);

    const selectActor = $("#actor option:nth-of-type(1)").clone();
    selectActor.val(actor.name);
    selectActor.text(actor.name);
    $("#actor").append(selectActor);
  }

  showCard($("#category").val());

  // select category
  $("input[type='radio']").on("change", function() {
    showCard(this.id, false);
  });
  $("#category").on("change", function() {
    showCard($(this).val(), true);
  });
  // select actor
  $(".card").on("click", function() {
    showActor(
      $(this)
        .find("h5")
        .text()
    );
  });
  $("#actor").on("change", function() {
    showActor($(this).val());
  });
  // form submit
  const form = document.getElementById("formToValidate");
  form.addEventListener(
    "submit",
    function(event) {
      event.preventDefault();
      if (this.checkValidity() === false) {
        event.stopPropagation();
      }
      this.classList.add("was-validated");
      formSubmit();
    },
    false
  );
});

function formSubmit() {
  let valid = true;
  if (
    $("#companyName").val().length === 0 ||
    isLowerCase($("#companyName").val()[0])
  ) {
    document.querySelector("#companyName").setCustomValidity("error");
    valid = false;
  } else {
    document.querySelector("#companyName").setCustomValidity("");
  }
  const emailForm = $("#email").val();
  const afterAt = emailForm.substring(emailForm.indexOf("@"));
  if (emailForm.indexOf("@") <= 0 || afterAt.indexOf(".") === -1) {
    document.querySelector("#email").setCustomValidity("error");
    valid = false;
  } else {
    document.querySelector("#email").setCustomValidity("");
  }
  if ($("#category").val().length === 0) {
    document.querySelector("#category").setCustomValidity("error");
    valid = false;
  } else {
    document.querySelector("#category").setCustomValidity("");
  }
  if ($("#actor").val().length === 0) {
    document.querySelector("#actor").setCustomValidity("error");
    valid = false;
  } else {
    document.querySelector("#actor").setCustomValidity("");
  }

  if (valid) {
    const actorName = $("#actor").val();
    $("form").html(
      `<p>Sorry, ${actorName} is not currently available. You will be contacted as soon as possible.</p>`
    );
  }
}

function isLowerCase(letter) {
  return letter === letter.toLowerCase();
}

function showCard(category, refreshButton) {
  if (refreshButton) {
    $(".btn-group-toggle .btn").removeClass("active");
    $("#" + category)
      .parent()
      .addClass("active");
  }
  $(".card").hide();
  $(".card." + category).show();
  $("#category").val(category);
  $("#actor").val("");
}

function showActor(actor) {
  $(".card").each(function() {
    $(this).removeClass("bg-primary text-white");
    if (
      $(this)
        .find("h5")
        .text() === actor
    ) {
      showCard(
        $(this)
          .attr("class")
          .split(" ")[1],
        true
      );

      $(this).addClass("bg-primary text-white");
      $("#actor").val(
        $(this)
          .find("h5")
          .text()
      );
    }
  });
}
