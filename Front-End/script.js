$(document).ready(()=>{
    //window popup animation
    $(".pop-up-button").click(()=>{
        $(".chat-box").slideToggle("slow")
    })
})

$(document).ready(function(){

    $("#send").submit(function(e){
      e.preventDefault();
      // get the message 
      let getMessage = $('input').val();
      // if message not empty
      if( getMessage !== '' ) {
        // prepare message
        let newMessage = "<div class='my-chat'>" + getMessage + "</div>";
        // append the message to box 
        $('.message').append(newMessage);
        window.scrollTo(0, document.querySelector(".message-box").scrollHeight);
        // clear form field
        $('input').val("");
        // move scroll to end after message submission
        $(".message-box").stop().animate({ scrollTop: $(".message-box")[0].scrollHeight}, 1000);
      }
    });
  });