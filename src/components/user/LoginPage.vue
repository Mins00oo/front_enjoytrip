<template>
    <div class="login-page">
        <div class="form">
            <form class="login-form">
                <input type="text" placeholder="아이디" />
                <input type="password" placeholder="비밀번호" />
                <button>로그인</button>
                <p class="message">아직 회원이 아니신가요? <a href="/register">회원가입</a></p>
            </form>
        </div>
    </div>
</template>

<style scoped>
@import '/src/assets/css/login.css';
</style>