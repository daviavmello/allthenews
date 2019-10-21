$( () => {

//   let displayArticles = articles => {
//       articles.forEach((article) => {

//           let div = $("<div>").attr("class", "card").css("width", "75rem").append(
//               $("<div>").attr("class", "card-body").append(

//                   $("<a>").attr("href", "http://nytimes.com" + article.link).attr("target", "_blank").html("<h3>" + article.title + "</h3"),
//                   $("<p>").attr("class", "card-text").text(article.snip),
//                   $("<button>").attr("class", "btn btn-success saved").attr("id", article._id).text("Save Article")
//               )
//           );
//           $("#display").append(div);
//       });

//   };
//   displayArticles();

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
      $.getJSON("/articles", (data) => {
          displayArticles(data);
      });
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

      $.ajax({
          type: "PUT",
          url: "/saved/" + id,
      }).then((response) => {
          console.log(JSON.stringify(response));
      });
  });
});

$(".deleteArticle").on("click", function () {
  console.log("deleteButton clicked");
  let id = $(this).attr('id');
  $.ajax("/delete-Article/" + id, {
      type: "DELETE"
  }).then(
      function () {
          console.log("Deleted article", id);
          location.reload();
      });
});

$(".saveNote").on("click", function () {

  let id = $(this).attr('data-id');
  console.log("clicked" + id);
  console.log($(".userNote").val().trim());
  $.ajax({
      url: "/articles/" + id,
      method: "POST",
      data: {
          body: $(".userNote").val().trim()
      }
  }).then(
      function (data) {
          console.log(data);
      });
  $(".userNote").val("");

  $.ajax({
      method: "GET",
      url: "/articles/" + id
  })

      .then(function (data) {
          console.log(data);
          // The title of the article
          displayArticles(data);
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
  let id = $(this).attr('data-id');
  $.ajax({
      url: "/delete-Note/" + id,
      method: "DELETE",
  }).then(
      function (data) {
          console.log(data);
          alert("Comment Deleted");
          location.reload();
      });
});