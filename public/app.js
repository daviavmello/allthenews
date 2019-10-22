$( () => {

      $("#home").on("click", event => {
      event.preventDefault();
      $.get("/", () => {
          console.log("Home")
      })
  });


  $("#scrape").on("click", event => {
      event.preventDefault();
      $.getJSON("/scrape", () => {
          console.log("Scrape")
      });
      location.reload();
  });

  $("#clear").on("click", event => {
      event.preventDefault();
      $.getJSON("/drop", () => {
      });
      console.log("collection dropped");
      $("#display").empty();
  });

  $(document).on("click", ".saved", function () {
      let id = $(this).attr("id");
      console.log("Article ID: " + id);
      $(this).parents(".card").remove();
      $.ajax({
          type: "PUT",
          url: "/saved/" + id,
      }).then((response) => {
          console.log(JSON.stringify(response));
      });
  });
});

$(".deleteArticle").on("click", function () {
  console.log("Delete button");
  let id = $(this).attr("id");
  $.ajax("/delete-Article/" + id, {
      type: "DELETE"
  }).then(
      function () {
          console.log("Deleted article", id);
          location.reload();
      });
});

$(".saveNote").on("click", function () {

  let id = $(this).attr("id");
  console.log("clicked");
  console.log($(".userNote").val().trim());
  $.ajax({
      url: "/notes",
      method: "POST",
      data: {
          body: $(".userNote").val().trim()
      }})
      .then(
      function (data) {
          console.log(data);
          $(".userNote").val("");
      });
  $(".savedNote").empty();
});

$(".addNote").on("click", function () {
  let id = $(this).attr('id');
  $(".saveNote").attr("data-id", id);
  $(".article").attr("data-id", id);
  console.log("clicked" + id);
  $.ajax({
      url: "/articles/" + id,
      method: "GET",
  }).then(
      function (data) {
          console.log(data);
          displayArticles(data);
      });
  $(".savedNote").empty();
});

$(document).on("click", "button.delete", function (event) {
  event.preventDefault();
  console.log("clicked delete")
  let id = $(this).attr('id');
  console.log(id)
  $.ajax({
      url: "/delete-Article/" + id,
      method: "DELETE",
  }).then(
      function (data) {
          console.log(data);
          alert("Comment Deleted");
          location.reload();
      });
});