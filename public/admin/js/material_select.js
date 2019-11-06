jQuery(function($){
  // /////
  // MAD-SELECT
  var madSelectHover = 0;
  // $(".mad-select").each(function() {
  //   include_mad_select(this);
  // });
  // CLOSE ALL OPNED
  $(document).on("mouseup", function(){
    if(!madSelectHover) $(".mad-select-drop").removeClass("show");
  });
});

// var include_mad_select = function(block, end_funct = function(){}){
//   if (!$(block).hasClass("noInit")){
//     var $input = $(block).find("input"),
//     $ul = $(block).find("> ul"),
//     $ulDrop =  $ul.clone().addClass("mad-select-drop");
//     $ul.remove();
//     $(block)
//     .append('<i class="material-icons">arrow_drop_down</i>', $ulDrop)
//     .on({
//       hover : function() { madSelectHover ^= 1; },
//       click : function(e) { 
//         $ulDrop.toggleClass("show");
//         var size_block = 290;
//         if ($ulDrop.find("li").length <= 2){ size_block = 160 }
//         var top_block = $(window).innerHeight() - ($ulDrop.closest(".mad-select").position().top + size_block) - 100;
//         if (top_block < 0) { $ulDrop.css({top: top_block}) }
//       }
//     });
//     // PRESELECT
//     // $ul.add($ulDrop).find("li[data-value='"+ $input.val() +"']").addClass("selected");
//     if ($input.val() != undefined && $input.val().length){
//       $ulDrop.find("li[data-value='"+ $input.val() +"']").addClass("selected");
//       if(!$(block).find(".titleSelect").length){
//         $(block).prepend($("<div class='titleSelect'>Не выбрано</div>"))
//       }
//       var title = $ulDrop.find("li[data-value='"+ $input.val() +"']").text();
//       $(block).find(".titleSelect").text(title);
//     }else{
//       var title = $ulDrop.find("li:first").text();
//       $(block).find(".titleSelect").text(title);
//     }
    
//     // MAKE SELECTED
//     $ulDrop.on("click", "li", function(evt) {
//       evt.stopPropagation();
//       $input.val($(this).data("value")); // Update hidden input value
//       $(block).find(".titleSelect").text($(this).text());
//       $(this).add(this).addClass("selected")
//       .siblings("li").removeClass("selected");
//       end_funct($input);
//     });
//     // UPDATE LIST SCROLL POSITION
//     $ul.on("click", function() {
//       var liTop = $ulDrop.find("li.selected").position().top;
//       $ulDrop.scrollTop(liTop + $ulDrop[0].scrollTop);
//     });
//   }
// }

