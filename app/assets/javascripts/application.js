//= require_tree ./pages
//= require vendor/serialize_file


show_error = function (text, duration) {
  var el = $('#alert');
  el.find('.text').text(text);
  el.show(300);
  el.find('.close').click(function () {
    el.hide(400);
  });
  if (duration){
    setTimeout(function () {
      el.hide(400);
    }, duration);
  }
};

function params_url() {
  var queryDict = {};
  var substr = location.search.substr(1).replace(/%2F/gi, "/");
  if (substr.length) substr.split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]});
  return queryDict;
}

var getTitleAndHrefBtnInOtherPopup = function(btn){
  var title = $(btn).data('title');
  var url = $(btn).attr("href");
  loadContentInOtherPopup(title, url);
}

var loadContentInOtherPopup = function(title, url){
  openAllOtherPopup(title, function(){
    $.ajax({
      type   : 'get',
      url    : url,
      data   : {typeAction: "json"},
      success: function (data) {
        var pasteContent = $(".allOtherPopup .conteinerPopup").html($(data));
        pasteContent.find(".defaultInitMdSelect").each(function(i, block){
          include_mad_select($(block));
        });
        pasteContent.find(".btn[type='submit']").on('click', function(event){
          event.preventDefault();
          submitUpdateModel($(event.target));
        });
        pasteContent.find( ".datepicker" ).datepicker({
          dateFormat: "dd/mm/yy"
        });
        pasteContent.find("input[accept='image/*,image/jpeg']").on('change', function(){
          $(this).closest(".custom-file").find("label").text(this.files[0].name)
        })
      },
      error  : function () {
        show_error('Ошибка', 3000);
      }
    });
  });
}

var ajaxApi = function(type, method, data, end_action, view_error){
  if (data == undefined) data = {};
  if (view_error == undefined) view_error = true;

  $.ajax({
    type   : type,
    url    : method,
    data   : data,
    success: function (data) {
      if (end_action != undefined) end_action(data);
      if (view_error) show_error('Успешно', 3000);
      
    },
    error  : function () {
      show_error('Ошибка', 3000);
    }
  });
}

var btnAjaxRemove = function(btn_this){
  var btn = $(btn_this);
  ajaxApi('get', btn.attr("href"), {}, function(){
    btn.closest(".removeParentBlock").remove();
  });
}


var selectedLi = function(block, val){
  var ul = block.find("ul");
  ul.find(".selected").removeClass("selected");
  var curr_li = ul.find("li[data-value='" + val + "']");
  curr_li.addClass("selected");
  ul.closest(".parentSelectMd").find(".titleSelect").text(curr_li.text());
  ul.closest(".parentSelectMd").find("input").val(val);
}

var include_mad_select = function(block, end_funct){
  if (!$(block).hasClass("noInit")){
    var $input = $(block).find("input"),
    $ul = $(block).find(".listSelectMd > ul"),
    $ulDrop =  $ul;
    $(block)
    .on({
      hover : function() { madSelectHover ^= 1; },
      click : function(e) { 
        $ulDrop.addClass("show");
        // $(block).addClass("includeMad");
        var size_block = 290;
        if ($ulDrop.find("li").length <= 2){ size_block = 160 }
          var top_block = $(window).innerHeight() - ($ulDrop.closest(".parentSelectMd").position().top + size_block) - 80;
        if (top_block < 0) { $ulDrop.closest(".listSelectMd").css({top: top_block}) }
      }
  });
    // PRESELECT
    // $ul.add($ulDrop).find("li[data-value='"+ $input.val() +"']").addClass("selected");
    if ($input.val() != undefined && $input.val().length){
      $ulDrop.find("li[data-value='"+ $input.val() +"']").addClass("selected");
      var title = $ulDrop.find("li[data-value='"+ $input.val() +"']").text();
      $(block).find(".titleSelect").text(title);
    }else{
      var title = $ulDrop.find("li:first").text();
      $(block).find(".titleSelect").text(title);
    }
    
    // MAKE SELECTED
    $ulDrop.on("click", "li", function(evt) {
      evt.stopPropagation();
      $input.val($(this).data("value")); // Update hidden input value
      $(block).find(".titleSelect").text($(this).text());
      $(this).add(this).addClass("selected")
      .siblings("li").removeClass("selected");
      $ul.removeClass("show");
      if (end_funct != undefined) end_funct($input);
    });
    // UPDATE LIST SCROLL POSITION
    $ul.on("click", function() {
      var liTop = $ulDrop.find("li.selected").position().top;
      $ulDrop.scrollTop(liTop + $ulDrop[0].scrollTop);
    });
  }
}

var submitNewModel = function(btn){
  var form = btn.closest("form");
  var data = form.serializeArray();
  data.push({name: 'typeAction', value: "json"})

  $.ajax({
    type   : 'POST',
    url    : form.attr("action"),
    data   : data,
    success: function (data) {
      $( "#js_template_item" ).tmpl(data.model).insertAfter(".list-group.row .panel_gray_common");
      closeFAB();
      show_error('Сохранено', 3000);
    },
    error  : function () {
      show_error('Ошибка', 3000);
    }
  });
}

var submitUpdateModel = function(btn){
  var form = btn.closest("form");
  var data = form.serializeArray();
  data.push({name: 'typeAction', value: "json"})

  $.ajax({
    type   : 'PUT',
    url    : form.attr("action"),
    data   : data,
    success: function (data) {
      closeAllOtherPopup();
      $(".btn_def_pay_" + data.model.id).closest(".removeParentBlock").remove();
      $( "#js_template_item" ).tmpl(data.model).prependTo(".allTasks");
      show_error('Сохранено', 3000);
    },
    error  : function () {
      show_error('Ошибка', 3000);
    }
  });
}

var ajax_load_content = function(href, data, type, end_funct){
  $.ajax({
    type   : type,
    url    : href,
    data   : data,
    success: function (data) {
      if (end_funct != undefined) end_funct(data);
    },
    error  : function () {
      show_error('Ошибка', 3000);
    }
  });
}

var load_content = function(url, title, btn_type, change_url){
  if(window.location.pathname != url || btn_type == "priority"){
    ajax_load_content(url, {typeAction: 'load_content'}, 'GET', function(data){
      closeNav();
      $(".load__content").fadeOut( "slow", function() {
        $(".load__content").remove();
        $(".well").prepend($(data));;
        if (change_url != "not_change_url") history.pushState({id: url}, title, url);
        $(".headerTitle").text(title);
        $("title").text(title);
        load_scripts();
      });
    });
  }else{
    closeNav();
  }
}

var filter = function(inp){
  var filter_hash = {}
  filter_hash[inp.attr('name')] = inp.val()
  var get_params = $.extend(params_url(), filter_hash );
  var get_url = window.location.pathname + "?" + $.param(get_params);
  history.pushState(null, null, get_url);
  ajax_load_content(get_url, {typeAction: 'json_load_content'}, 'GET', function(data){
    $(".list-group.row .allTasks").fadeOut( "slow", function() {
      $(".list-group.row .allTasks").remove();
      $( "#js_template_all" ).tmpl({ dataItems: data}).insertAfter(".list-group.row .panel_gray_common");
    });
  });
}

var load_scripts = function(){
  $( ".datepicker" ).datepicker({
    dateFormat: "dd/mm/yy"
  });

  $(".fab").on('click', openFAB);
  $("#overlay").on('click', closeFAB);


  $(".parentSelectMd").not(".noInit").each(function() {
    include_mad_select(this);
  });

  $(".parentSelectMd.changeFilterSelect.noInit").each(function() {
    $(this).removeClass("noInit");
    include_mad_select(this, function(inp){
      filter(inp);
    });
  });

  $(".selectFilter input.hasDatepicker").on('change', function(){
    filter($(this));
  });


}

$(document).ready(function(){
  load_scripts();

  $(window).on('popstate', function (e) { 
    var url = window.location.pathname + window.location.search;
    var title = $(".sidenav a[href='" + window.location.pathname + "']").text();
    load_content(url, title, "priority", "not_change_url");
  });

  $(document).on('click', '.js_loadContentInOtherPopup', function(event){
    event.preventDefault();
    getTitleAndHrefBtnInOtherPopup($(this));
  });

  $(document).on('click', '.js_submitNewModel', function(event){
    event.preventDefault();
    submitNewModel($(event.target));
  });

  $(document).on('click', '.js__remove', function(event) {
    event.preventDefault();
    btnAjaxRemove(this);
  });



  $(document).on('click', '.js__load_content', function(event){
    event.preventDefault();
    var btn = $(event.target);
    var url = $(btn).attr('href');
    var title = $(btn).text();
    var btn_type = $(btn).data("type");
    load_content(url, title, btn_type);
  });
  
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });

  $(document).on('click', '.js_openUserPopupInfo', function(){
    if ($(".popupUserAvaInfo:visible").length){
      $(".popupUserAvaInfo").hide();
    }else{
      $(".popupUserAvaInfo").show();
    } 
  });

  $(document).on('click', 'body', function(e){
    var block = $(e.target);
    if(!block.closest(".user_info").length) $(".popupUserAvaInfo").hide();
    if(!block.closest(".parentSelectMd").length) $(".parentSelectMd ul.show").removeClass("show");
  });
});

