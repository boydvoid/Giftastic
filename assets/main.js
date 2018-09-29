$(document).ready(() => {
  //strings array for initial buttons
  let topics = ["basketball", "baseball", "football", "soccer"];
  let newBtn;
  let api = "9MEVd7MXtXTlO2ZtbNMF0JKMMuUQOEmo";
  let btnRow = $("#buttons-row");
  let giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=" + api + "&";
  let statics = [];
  let gifs = [];
  let twitterURL;

  //append the topic buttons to the html
  for (let topic of topics) {
    newBtn = $("<button>");

    newBtn.text(topic);
    newBtn.attr("id", topic);
    newBtn.attr("class", "btn btn-primary " + topic);
    btnRow.append(newBtn);
  }

  //button onclicks
  $(document).on("click", ".btn", function() {
    giphyCall(this.id);
  });

  //form submit to add a new button
  $("#new-category").submit(function(event) {
    event.preventDefault();

    //input box value
    let newCategory = $(" #add-category").val();
    newBtn = $("<button>");

    newBtn.text(newCategory);

    newBtn.attr("id", newCategory);
    newBtn.attr("class", "btn btn-primary " + newCategory);
    btnRow.append(newBtn);
  });

  //ajax call for giphy
  function giphyCall(topic) {
    $.ajax({
      url: giphyURL + "q=" + topic,
      method: "GET"
    }).then(res => {
      console.log(res);
      $("#images-row").empty();
      for (let i = 0; i < 10; i++) {
        //create the image div
        let img = $("<img>");
        img.attr("src", res.data[i].images.original_still.url);
        statics.push(res.data[i].images.original_still.url);
        gifs.push(res.data[i].images.original.url);
        img.attr("class", "static image");
        img.attr("data-index", [i]);
        img.attr("id", [i]);
        //create the column
        let col = $("<div>");
        col.attr("class", "col-xl-3");
        col.append(img);
        $("#images-row").append(col);
      }
    });
  }

  //images onclick
  $(document).on("click", ".static", function() {
    if (
      $(this)
        .attr("class")
        .includes("gif")
    ) {
      let image = $(this).attr("data-index");
      $(this).attr("src", statics[parseInt(image)]);
      $(this).removeClass("gif");
    } else {
      console.log(this);
      let gif = $(this).attr("data-index");
      $(this).attr("src", gifs[parseInt(gif)]);
      $(this).addClass("gif");
    }
  });

  // end of doc ready
});
