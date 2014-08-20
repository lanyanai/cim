/**
 * Created by zd on 2014/8/20.
 */
$(function(){
  //修改密码验证
  var $curPassword = $("#curPassword"),
      $password = $("#password"),
      $repeatPassword = $("#repeatPassword");
  var curPasswordVa = true,
      passwordVa = true,
      repeatPasswordVa = true;

  $curPassword.blur(function(){
    var curPassword = $curPassword.val();
    var $tip = $curPassword.parent().next();
    if(!validatePassword(curPassword)){
      $tip.text("请输入6-128位密码");
      curPasswordVa = false;
    }else{
      $tip.text("");
      curPasswordVa = true;
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

  $("#modifyBtn").click(function(){
    $curPassword.blur();
    $password.blur();
    $repeatPassword.blur();
    if(curPasswordVa && passwordVa && repeatPasswordVa){
      //提交修改密码
      $.post("dd.php", {

        password:$password.val()
      }, function(data){
        //修改结果

      }, "json");
    }else{
      return false;
    }
  });
});