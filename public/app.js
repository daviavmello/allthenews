$(() => {
    
    let showArticles = data => {
        data.forEach((article) => {
          let div = $("<div>").attr("class", "card").append(

            $("<div>").attr("class", "card-header").append(

              $("<a>").attr("href", "https://www.nytimes.com/section/world" + article.link).attr("class", "article-link").attr("target","_blank").html("<h3>" + article.title + "</h3>"),
              $("<button>").attr("class", "btn btn-success save").attr("id", article._id).text("Save")
            ),
            $("<div>").attr("class", "card-body").append(
              $("<h2>").html("<p>" + article.text + "</p>")
            )
          )
          $("#articlesList").append(div);
        })
    }
    
    $("#home").on("click", event => {
      event.preventDefault();
      $.get("/", () => {
          console.log("Home")
      })
  })
  $("#scrape").on("click", event => {
      event.preventDefault();
      $.getJSON("/scrape", () => {
          console.log("Scrape new articles")
      });

      $.getJSON("/articles", (data) => {
          showArticles(data);
      });
  });


  $("#clear").on("click", event => {
      event.preventDefault();
      $.getJSON("/delete", () => {

      });
      console.log("Articles cleared");
      $("#articlesList").empty();
  });

  $(document).on("click", '#saved',  () => {
      let id = $(this).attr('_id');
      console.log("Article ID: " + id);

      $.ajax({
          type: "PUT",
          url: "/saved/" + id,
      })
      .then((res) => {
          console.log(JSON.stringify(res));
      });
  });
  
})