
document.addEventListener('DOMContentLoaded', () => {
    'use strict'
    //Login
    var LoginBtn = document.querySelector('#loginBtn')
    if(LoginBtn){
        LoginBtn.addEventListener("click", e => {
            if(document.getElementById("loginId").value == '' || document.getElementById("loginPw").value == '') {
                e.preventDefault();
                alert('아이디, 비밀번호를 입력해주세요');
            } else {
                location.href='_starter_simple.html';
            }
        })
    }
})