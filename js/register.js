/**
 * Created by zd on 2014/8/20.
 */
//加载完执行函数
$(function(){

  //禁用tab导航点击切换
  $("#registerTabNav a").click(function(){
    return false;
  });

  //step1 注册
  var $username = $("#username");
  var $password = $("#password");
  var $repeatPassword = $("#repeatPassword");
  var usernameVa = true,
      passwordVa = true,
      repeatPasswordVa = true;
  $username.blur(function(){
    var family_name = $username.val();
    var $tip = $username.parent().next();
    if(!validateMobile(family_name) && !validateEmail(family_name)){
      $tip.text("请输入正确的邮箱或者手机号");
      usernameVa = false;
    }else{
      $tip.text("");
      usernameVa = true;
    }
  });

  $password.blur(function(){
    var password = $password.val();
    var $tip = $password.parent().next();
    if(!validatePassword(password)){
      $tip.text("请输入6-128位密码");
      passwordVa = false;
    }else{
      $tip.text("");
      passwordVa = true;
    }
  });

  $repeatPassword.blur(function(){
    var password = $password.val();
    var repeatPassword = $repeatPassword.val();
    var $tip = $repeatPassword.parent().next();
    if(password !== repeatPassword){
      $tip.text("两次密码不一致");
      repeatPasswordVa = false;
    }else{
      $tip.text("");
      repeatPasswordVa = true;
    }
  });

  $("#registerBtn").click(function(){
    $username.blur();
    $password.blur();
    $repeatPassword.blur();
    if(usernameVa && passwordVa && repeatPasswordVa){
      //提交注册
      $.post("/user/regist", {
        family_name:$username.val(),
        password:$password.val()
      }, function(data){
        //注册结果 json数据
        if(data.status == 1){
          $("#user-menu").show();
          $("#family_id").html(data.family_name + '<b class="caret"></b>');
          $("#registerTabNav li:eq(1) a").tab("show");
        }else{
          $("#step1 input[name=" + data.column + "]").parent().find(".tip").text(data.message);
          return false;
        }
        
        
      }, "json");
    }else{
      return false;
    }
  });

  //step2 创建家庭成员
  var $memberName = $("#memberName"),
      $memberBirthday = $("#memberBirthday"),
      $memberWeight = $("#memberWeight"),
      $memberHeight = $("#memberHeight");
  var memberNameVa = true,
      memberBirthdayVa = true,
      memberWeightVa = true,
      memberHeightVa = true;

  $memberName.blur(function(){
    var $tip = $(this).parent().next();
    if($memberName.val().length === 0){
      $tip.text("请输入正确姓名");
      memberNameVa = false;
    }else{
      $tip.text("");
      memberNameVa = true;
    }
  });

  $memberBirthday.change(function(){
    var $tip = $(this).parent().next();
    if($memberBirthday.val().length === 0){
      $tip.text("请选择出生日期");
      memberBirthdayVa = false;
    }else{
      $tip.text("");
      memberBirthdayVa = true;
    }
  });

  $memberWeight.blur(function(){
    var $tip = $(this).parent().next().next();
    if(!validateNum($memberWeight.val(), 0, 500)){
      $tip.text("请输入正确体重");
      memberWeightVa = false;
    }else{
      $tip.text("");
      memberWeightVa = true;
    }
  });

  $memberHeight.blur(function(){
    var $tip = $(this).parent().next().next();
    if(!validateNum($memberHeight.val(), 0, 400)){
      $tip.text("请输入正确身高");
      memberHeightVa = false;
    }else{
      $tip.text("");
      memberHeightVa = true;
    }
  });

  $("#submitBtn").click(function()
  {
    $memberName.blur();
    $memberBirthday.change();
    $memberWeight.blur();
    $memberHeight.blur();
    if(memberNameVa && memberBirthdayVa && memberWeightVa && memberHeightVa){
      $.post("/user/member/create", {
        name:$memberName.val(),
        born_date:$memberBirthday.val(),
        sex:$("#step2 input[name=sex]:checked").val(),
        weight:$memberWeight.val(),
        height:$memberHeight.val()
      }, function(data){
        if(data.status == 1){
          $("#registerTabNav li:eq(2) a").tab("show");
        }else{
          $("#step2 input[name=" + data.column + "]").parent().find('.tip').text(data.message);
        }
      }, "json");
    }
  });


  //step3 是否继续添加
  $("#addMemberBtn").click(function()
  {
    $("#registerTabNav li:eq(3) a").tab("show");
  });

  //step4 添加家庭成员
  var $addMemberName = $("#addMemberName"),
      $addMemberBirthday = $("#addMemberBirthday"),
      $addMemberWeight = $("#addMemberWeight"),
      $addMemberHeight = $("#addMemberHeight");
  var addMemberNameVa = true,
      addMemberBirthdayVa = true,
      addMemberWeightVa = true,
      addMemberHeightVa = true;

  $addMemberName.blur(function(){
    var $tip = $(this).parent().next();
    if($addMemberName.val().length === 0){
      $tip.text("请输入正确姓名");
      addMemberNameVa = false;
    }else{
      $tip.text("");
      addMemberNameVa = true;
    }
  });

  $addMemberBirthday.change(function(){
    var $tip = $(this).parent().next();
    if($addMemberBirthday.val().length === 0){
      $tip.text("请选择出生日期");
      addMemberBirthdayVa = false;
    }else{
      $tip.text("");
      addMemberBirthdayVa = true;
    }
  });

  $addMemberWeight.blur(function(){
    var $tip = $(this).parent().next().next();
    if(!validateNum($addMemberWeight.val(), 0, 500)){
      $tip.text("请输入正确体重");
      addMemberWeightVa = false;
    }else{
      $tip.text("");
      addMemberWeightVa = true;
    }
  });

  $addMemberHeight.blur(function(){
    var $tip = $(this).parent().next().next();
    if(!validateNum($addMemberHeight.val(), 0, 400)){
      $tip.text("请输入正确身高");
      addMemberHeightVa = false;
    }else{
      $tip.text("");
      addMemberHeightVa = true;
    }
  });

  $("#addSubmitBtn").click(function()
  {
    $addMemberName.blur();
    $addMemberBirthday.change();
    $addMemberWeight.blur();
    $addMemberHeight.blur();
    if(addMemberNameVa && addMemberBirthdayVa && addMemberWeightVa && addMemberHeightVa){
      $.post("/user/member/create", {
        name:$addMemberName.val(),
        born_date:$addMemberBirthday.val(),
        sex:$("#step4 input[name=sex]:checked").val(),
        weight:$addMemberWeight.val(),
        height:$addMemberHeight.val()
      }, function(data){
        if(data.status == 1){
          $("#add-info-form")[0].reset();
        }else{
          $("#step4 input[name=" + data.column + "]").parent().find('.tip').text(data.message);
        }
      }, "json");
    }else{
      return false;
    }
  });

  //日期选择功能
  $("#memberBirthday, #addMemberBirthday").datepicker({
    format: "yyyy-mm-dd",
    weekStart: 1,
    language: "zh-CN",
    autoclose: true,
    todayHighlight: true
  });
});