var openAllOtherPopup = function(title, action = function(){}){
  $("body").css({overflow: "hidden"})
  $(".allOtherPopup").show();
  $(".allOtherPopup .fab-hdr h3").text(title)
  $("#overlay").addClass('dark-overlay');
  action();
}

var closeAllOtherPopup = function(){
  $("body").css({overflow: "initial"});
  $(".allOtherPopup").hide();
  $("#overlay").removeClass('dark-overlay');
  closeFAB();
}

function closeFAB() {
  $("body").css({overflow: "initial"});
  $(".fab").find(".conteinerPopup, .fab-hdr").fadeOut(300);
  $(".allOtherPopup").hide();
  $(".fab").removeClass('active');
  $("#overlay").removeClass('dark-overlay');
}

function openFAB(event) {
  if (!$(".fab").hasClass("active") && !$(event.target).hasClass("closeBtn")){
    $("body").css({overflow: "hidden"})
    $(".fab").addClass('active');
    $(".fab").find(".conteinerPopup, .fab-hdr").fadeIn(300);
    $("#overlay").addClass('dark-overlay');
  }
}



function openNav() {
  $(".sidenav").toggleClass("open");
}

function closeNav(){
  $(".sidenav").removeClass("open");
}

