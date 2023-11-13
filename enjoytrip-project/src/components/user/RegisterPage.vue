<template>
    <div class="login-page">
        <div class="form">
            <form class="login-form">
                <input type="text" placeholder="이름" />
                <input type="text" placeholder="닉네임"/>
                <input type="text" placeholder="이메일" />
                <input type="password" placeholder="비밀번호" />
                <button>회원가입</button>
                <p class="message">이미 회원이신가요? <a href="/login">로그인</a></p>
            </form>
        </div>
    </div>
</template>

<style scoped>
@import '/src/assets/css/login.css';
</style>