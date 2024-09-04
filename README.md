# <div align="center">**Kita**</div>

### 기간 : 2024.07.19 ~ 2024.08.06

### 개발자 : [![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FTeTedo&count_bg=%230D00FF&title_bg=%23000000&icon=darkreader.svg&icon_color=%23FF0000&title=hits&edge_flat=false)](https://github.com/devingnow)(devingnow)

# 담당 작업
 - 프론트,백엔드

 - 회원가입
    - 정규식을 이용한 조건 생성
    - 중복검사를 통해 프론트에서 생성 여부 확인 가능
    - 데이터베이스에 비밀번호를 암호화시켜 저장

 - 로그인
    - 아이디 또는 비밀번호 오류시 경고문구 생성
    - 아이디 및 비밀번호 조건 충족시 로그인 버튼 활성화
    - 로그인시 쿠키 생성을 통해 관리

 - 마이페이지
    - 로그인 시 생성된 쿠키 검증 후 알맞는 값을 출력
    - 수정 버튼 클릭시 수정 페이지로 이동하여 개인정보 수정 가능

## 목차

- [**주요 페이지**](#주요-페이지)
  - [SignupPage](#Signup-Page)
  - [LoginPage](#Login-Page)
  - [Mypage](#Mypage)

- [**주요 기능**](#주요-기능)
  - [로그인시 쿠키생성](#로그인시-쿠키생성)
  
- [**이슈**](#이슈)
  - [쿠키](#쿠키)


 ---

  ## 사용 **기술**

 <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black"> <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs"> <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">

---

## 주요 페이지

### **Signup Page**

<img src="https://github.com/user-attachments/assets/02275c3b-cb59-4d7a-9e4a-10b2226e86b7">
<img src="https://github.com/user-attachments/assets/0801df52-6fab-42eb-b237-a983f7c67e6e">


### **LoginPage**

<img src="https://github.com/user-attachments/assets/d8077584-592c-46c6-bc0c-e1aba402cbd6">
<img src="https://github.com/user-attachments/assets/4bc441df-728d-46b1-8057-97f00de73c5e">


### **Mypage**

<img src="https://github.com/user-attachments/assets/31b5dd3d-57e4-4cce-9f00-0dbf70ca4d09">
<img src="https://github.com/user-attachments/assets/0cd607e4-5b75-4521-98ac-50020452042a">
<img src="https://github.com/user-attachments/assets/0095abd6-c435-4afa-ad27-cccdcca45196">

---

## 주요 기능

### 로그인시 쿠키생성

<img src="https://github.com/user-attachments/assets/0ba897e4-741d-4730-ae9e-8237cf9e601d">

---

## 이슈 사항

### 쿠키
로그인시 쿠키가 생성되는데 페이지를 이동시 쿠키가 유지되지 않는 현상
쿠키를 만들때 sameSite와 secure를 추가하여 해결

