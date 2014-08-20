/**
 * Created by zd on 2014/8/20.
 */
//var memberData = [{
//  name:"那英",
//  birthday:"1990-06-06",
//  sex:"female",
//  weight: 90,
//  height:170,
//  head:""
//}, {
//  name:"汪峰",
//  birthday:"1790-06-06",
//  sex:"male",
//  weight: 60,
//  height:180,
//  head:""
//}, {
//  name:"周鸿伟",
//  birthday:"1890-06-06",
//  sex:"male",
//  weight: 70,
//  height:190,
//  head:""
//}];
//
//function resetData(index){
//  $("#memberNav li").removeClass("active").eq(index).addClass("active");
//  $("#modifyMemberName").val(memberData[index].name);
//  $("#modifyMemberBirthday").val(memberData[index].birthday);
//  $("#modifyMemberWeight").val(memberData[index].weight);
//  $("#modifyMemberHeight").val(memberData[index].height);
//  $("input[value=" + memberData[index].sex + "]").attr("checked", "");
//}

$(function()
{

//  $.each(memberData, function (index, value) {
//    $("#memberNav").append('<li><a href="javascript:;">' + memberData[index].name + '</a></li>');
//  });
//  $("#memberNav li").first().addClass("first");
//  $("#memberNav li").last().addClass("last");
//  resetData(0);
//
//  $("#memberNav li").click(function(){
//    var $items = $("#memberNav>li");
//    var $curItem = $(this);
//    resetData($items.index($curItem));
//  });

  //表单验证
  var $modifyMemberName = $("#modifyMemberName"),
      $modifyMemberBirthday = $("#modifyMemberBirthday"),
      $modifyMemberWeight = $("#modifyMemberWeight"),
      $modifyMemberHeight = $("#modifyMemberHeight");
  var modifyMemberNameVa = true,
      modifyMemberBirthdayVa = true,
      modifyMemberWeightVa = true,
      modifyMemberHeightVa = true;

  $modifyMemberName.blur(function(){
    var $tip = $(this).parent().next();
    if($modifyMemberName.val().length === 0){
      $tip.text("请输入正确姓名");
      modifyMemberNameVa = false;
    }else{
      $tip.text("");
      modifyMemberNameVa = true;
    }
  });

  $modifyMemberBirthday.change(function(){
    var $tip = $(this).parent().next();
    if($modifyMemberBirthday.val().length === 0){
      $tip.text("请选择出生日期");
      modifyMemberBirthdayVa = false;
    }else{
      $tip.text("");
      modifyMemberBirthdayVa = true;
    }
  });

  $modifyMemberWeight.blur(function(){
    var $tip = $(this).parent().next().next();
    if(!validateNum($modifyMemberWeight.val(), 0, 500)){
      $tip.text("请输入正确体重");
      modifyMemberWeightVa = false;
    }else{
      $tip.text("");
      modifyMemberWeightVa = true;
    }
  });

  $modifyMemberHeight.blur(function(){
    var $tip = $(this).parent().next().next();
    if(!validateNum($modifyMemberHeight.val(), 0, 400)){
      $tip.text("请输入正确身高");
      modifyMemberHeightVa = false;
    }else{
      $tip.text("");
      modifyMemberHeightVa = true;
    }
  });

  $("#modifySubmitBtn").click(function()
  {
    $modifyMemberName.blur();
    $modifyMemberBirthday.change();
    $modifyMemberWeight.blur();
    $modifyMemberHeight.blur();
    if(modifyMemberNameVa && modifyMemberBirthdayVa && modifyMemberWeightVa && modifyMemberHeightVa){
      $.post("modify.php", {

      }, function(data){

      }, "json");
    }else{
      return false;
    }
  });



  $("#modifyMemberBirthday").datepicker({
    format: "yyyy-mm-dd",
    weekStart: 1,
    language: "zh-CN",
    autoclose: true,
    todayHighlight: true
  });



  $("#modifyHeadBtn").upload({
    action: "url/up.php", //上传地址
    fileName: "file",    //文件名称。用于后台接收
    params: {

    },         //参数
    accept: ".jpg,.png",     //文件类型
    complete: function () {  //渲染完成

    },
    submit: function (data) {   //提交之后
      alert("submit");
    }
  });
});