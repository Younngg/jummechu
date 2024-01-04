# 점메추

<br />

## 서비스 링크

> https://jummechu.vercel.app/

<br />

## 프로젝트 소개

#### 음식 메뉴를 투표하고, 투표 마감 후에 근처 1위 음식을 파는 가게를 추천받을 수 있는 앱입니다.

1. Google, Kakao 로그인을 할 수 있고, 로그인 시 모임 생성과 투표가 가능합니다.
2. 회원, 비회원 모두 투표를 조회할 수 있습니다.
3. 로그인 시 참여했던 투표 목록을 조회할 수 있습니다.
4. 모임 생성 시 익명 투표, 항목 추가 허용 여부를 정할 수 있습니다.
5. 투표와 투표 취소가 가능합니다.
6. 모임장은 투표 삭제, 수정, 마감이 가능합니다.
7. 모임 마감 시 내 위치 근처 1위 음식점을 추천받을 수 있습니다.

<br />

## 구현 화면

![투표목록](https://github.com/Younngg/jummechu/assets/98656282/6121810f-a1c6-43eb-9122-1f49109ef913)

투표 목록

![투표](https://github.com/Younngg/jummechu/assets/98656282/40873abd-ec90-4f2a-a4ed-e3e902457723)

투표

![투표 마감 후](https://github.com/Younngg/jummechu/assets/98656282/9e2d74f1-6829-454b-a4f5-8fd9a45bdf18)

투표 마감 후

<br />

## :hammer_and_wrench: 기술 스택

- Next.js
- TypeScript
- Tailwind CSS
- Next-Auth
- Sanity

## :runner: 로컬 실행 방법

1. 레포지토리를 클론하고자 하는 디렉토리에서 아래 명령어를 수행

   ```
   git clone <레포지토리 주소>
   ```

<br>

2. 클론한 디렉토리에서 아래 명령어를 통해 필요한 module 설치

   ```
   npm install
   ```

<br>

3. firebase, open weather API에서 필요한 `.env` 설정

- 아래 설명에 따라 환경변수 설정

  ```
  GOOGLE_OAUTH_ID=
  GOOGLE_OAUTH_SECRET=
  SANITY_PROJECT_ID=
  SANITY_DATASET=
  SANITY_SECRET_TOKEN=
  NEXTAUTH_URL=
  NEXTAUTH_SECRET=
  NEXT_PUBLIC_BASE_URL=
  KAKAO_CLIENT_ID=
  KAKAO_CLIENT_SECRET=
  ```

4. 앱을 실행

   ```
   npm run dev
   ```
