$(document).ready(() => {
  //strings array for initial buttons
  let topics = ["basketball", "baseball", "football", "soccer"];
  let newBtn;
  let api = "9MEVd7MXtXTlO2ZtbNMF0JKMMuUQOEmo";
  let btnRow = $("#buttons-row");
  let giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=" + api + "&";
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
        //create the column
        let col = $("<div>");
        col.attr("class", "col-xl-3");
        col.append(img);
        $("#images-row").append(col);
      }
    });
  }

  // end of doc ready
});
