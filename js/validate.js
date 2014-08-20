/**
 * Created by zd on 2014/8/20.
 */
//验证手机号码
function validateMobile(mobile){
  var mobileRe = /^(1[3-5][0-9]{9})|(18[0-9]{9})$/;
  return mobile.length === 11 && mobileRe.test(mobile);
}

//验证邮箱
function validateEmail(email){
  var emailRe= /\w@\w*\.\w/;
  return emailRe.test(email);
}

//验证密码
function validatePassword(password){
  return (password.length >= 6 && password.length <= 128);
}

//验证数字
function validateNum(str, min, max){
  var numRe = /^\d+(\.\d+)?$/;
  if(!numRe.test(str)){
    return false;
  }
  if(parseFloat(str) != str){
    return false;
  }
  var num = parseFloat(str);
  if(min && num < min){
    return false;
  }
  if(max && num > max){
    return false;
  }
  return true;
}