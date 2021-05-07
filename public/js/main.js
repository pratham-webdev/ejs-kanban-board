$(".list-group-item").click(function() {
    var cardID = $(this).attr("id");
    console.log(cardID);
})

// document.querySelectorAll(".card").forEach(function(item) {
// item.addEventListener("click", () =>{
//     console.log(item.getAttribute("id"));
// });
// });