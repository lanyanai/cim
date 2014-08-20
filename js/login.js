/**
 * Created by zd on 2014/8/20.
 */
$(function(){
  var $familyname = $("#familyname");
  var $password = $("#password");
  var $tip = $(".warning");

  var familynameVa = true,
      passwordVa = true;
  $familyname.blur(function(){
    var family_name = $familyname.val();
    if(!validateMobile(family_name) && !validateEmail(family_name)){
      $tip.text("请输入正确的账号");
      familynameVa = false;
    }else{
      if(passwordVa){
        $tip.text("");
      }else{
        $tip.text("密码长度不符");
      }
      familynameVa = true;
    }
  });

  $password.blur(function(){
    var password = $password.val();
    if(!validatePassword(password)){
      $tip.text("密码长度不符");
      passwordVa = false;
    }else{
      if(familynameVa){
        $tip.text("");
      }else{
        $tip.text("请输入正确的账号");
      }
      passwordVa = true;
    }
  });

  $("#loginBtn").click(function(){
    $password.blur();
    $familyname.blur();
    if(familynameVa && passwordVa){
      $("form").submit();
    }else{

      return false;
    }
  });
});