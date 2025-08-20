4기 (5회차) FE / 4차 최종 프로젝트 / Git선~을 제압해~ 5팀의 FE 리포지토리입니다
# 0. 시작하기
<img width="500" height="500" alt="defaultProfile" src="https://github.com/user-attachments/assets/e870b2c0-2d6a-42b0-9497-348c6b42c95a" />
<br>
[MAPICK] 배포주소 : https://mapick.vercel.app

<br/>

# 1. 프로젝트 개요
## 프로젝트 이름
- MAPICK

## 프로젝트 설명
- 장소 기반의 경험과 관심사를 주제로, 마커와 레이어를 통해 나만의 테마 지도를 만들고, 다른 사람과 함께 편집·공유할 수 있는 인터랙티브 지도 플랫폼

## 프로젝트 소개영상
- https://www.youtube.com/watch?v=qJjl6GVcLaQ

## 개발기간
- 2025 6/26 ~ 7/31
<br/>

# 2. 팀원 및 팀 소개
## 프론트팀원소개
| 김태연(팀장) | 권태훈 | 이예빈 | 송지은 |
|:------:|:------:|:------:|:------:|
| <img width="160px" src="https://github.com/user-attachments/assets/ab18c001-6f75-4c10-80e5-2436544fb543" /> | <img src="https://avatars.githubusercontent.com/u/56614716?v=4" width="160px" /> | <img src="https://avatars.githubusercontent.com/u/105144795?v=4" width="160px" /> | <img width="160px" src="https://github.com/user-attachments/assets/1e8272aa-8254-40b3-bd30-a37bbf1db577" /> |
| [@TYss00](https://github.com/TYss00) | [@KwonTaeHun00](https://github.com/KwonTaeHun00) | [@llyybbb](https://github.com/llyybbb) | [@jieun22222](https://github.com/jieun22222) |

<br>

## 백엔드
- https://github.com/prgrms-web-devcourse-final-project/WEB5_6_GitSunJaeAb_BE

## 백엔드팀원소개
| 임서현(PO) | 김나단(팀장) | 노선우 | 이초롱 | 채철민 |
|:------:|:------:|:------:|:------:|:------:|
| <img width="160px" src="https://avatars.githubusercontent.com/u/132811149?v=4" /> | <img src="https://avatars.githubusercontent.com/u/168330519?v=4" width="160px" /> | <img src="https://avatars.githubusercontent.com/u/152956024?v=4" width="160px" /> | <img width="160px" src="https://avatars.githubusercontent.com/u/132190391?v=4" /> | <img width="160px" src="https://avatars.githubusercontent.com/u/133864111?v=4" /> |
| [@nunLSH](https://github.com/nunLSH) | [@nathan960307](https://github.com/nathan960307) | [@Noopy1](https://github.com/Noopy1) | [@0802222](https://github.com/0802222) | [@moooonbong](https://github.com/moooonbong) |

<br>

<br>

## 팀원 역할

김태연
> 마이페이지
  - 마이페이지
    - 작성글
    - 참여글
    - 좋아요글
    - 댓글목록
    - 찜한레이어
  - 프로필정보
    - 프로필사진 및 닉네임변경
    - 비밀번호변경
    - 관심분야재설정
    - 업적표시
      
> 관리자페이지
  - 신고
  - 사용자관리
  - 기타관리(카테고리,커스텀마커)
  - 공유지도
  - 관리자공지
    
> 검색
  - 최근검색기록 서버연결
  - 제목 or 해시태그 검색시 검색
    
> 대시보드
  - 로드맵 대시보드
  - 퀘스트 대시보드
    
> 퀘스트 랭킹
  - 정답 or 오답처리
  - 랭킹시스템

권태훈
> 공유 지도
  - 공유 지도 대시보드
  - 공유 지도 게시글 상세 페이지
    - 공유 지도 참여자 목록 조회
  - 공유 지도 상세 페이지 
  - 공유 지도 참여 페이지
    - 레이어 생성
    - 마커 생성
> 댓글
  - 댓글 수정 및 삭제

이예빈
> 로드맵
  - 로드맵 상세 페이지

> 퀘스트
  - 퀘스트 상세 페이지

송지은
> 로그인 및 회원가입
  - 로그인
  - 회원가입
  - 소셜로그인

> 알림
  - 전체
  - 게시글
  - 공지

> 업적
  - 토스트메시지로 업적달성구현

<br/>
<br/>

# 3. 주요기능
### 1. 홈화면
<mark> 로그인전 첫화면으로 나오는 사이트 소개를 해주는 로그인전 랜딩페이지입니다.</mark>

- Gsap.js를 사용하여 애니메이션을 넣어 표현하였다.
- 튜토리얼같은 느낌으로 어떤사이트인지 소개한다.
  
<img src="https://github.com/user-attachments/assets/0580b7c3-d8da-4b2f-adaa-bdc0b27a76d8" width="100%" alt="랜딩 페이지" />

<br><br>
<br><br>

### 2. 회원
#### 2.1. 로그인,회원가입
- 로그인과 회원가입을 할수있다.
- 첫로그인시에는 자신의 관심분야를 선택하는창이 나온다.
- 관심분야를 선택하면 마이페이지에서 확인할수있다.

<img src="https://github.com/user-attachments/assets/ea2eb8a7-993e-440f-956f-d91284ba8c4a" width="100%" alt="로그인" />

<br><br>

- 소셜로그인으로도 로그인을 할수있다.

<img src="https://github.com/user-attachments/assets/dfc7d7b5-f861-408a-ba55-0234a80988bd" width="100%" alt="소셜로그인" />

<br><br>
<br><br>

### 3. 대시보드
#### 3.1. 홈 대시보드
<mark> 로그인시 나오는 첫화면으로 사이트소개를 하고있다.</mark>

- 관심분야소개,인기있는 로드맵,공유지도,퀘스트를 보여준다.
- swiper를 사용하여 자동으로 넘어가거나 넘길수있도록하였다.

<img src="https://github.com/user-attachments/assets/3e8c0c50-0f2c-4fce-8b69-a1f418133f64" width="100%" alt="홈 대시보드" />
<br><br>
<br><br>


#### 3.2. 로드맵 대시보드
<mark> 로드맵에 마커를찍어 자신이 소개하고싶은분야를 소개하는 공간이다.</mark>

- 자신이 추천하는 여행경로,맛집탐방등 여러가지를 지도에 마커를 찍어서 보여주는곳이다.
- 관심분야별로 볼수있다
- 최신순,인기순정렬이 가능하다.
- 인기있는것들을 Hot에서 3개볼수있다.

> 로드맵 메인대시보드

<img src="https://github.com/user-attachments/assets/64146c90-52cb-4450-b2c5-a7bbc4c22ecf" width="100%" alt="로드맵 대시보드" />
<br><br>


> 로드맵 생성

<img src="https://github.com/user-attachments/assets/177f5af1-37b5-44ce-b3fc-e45e0c0edbf7" width="100%" alt="로드맵 생성" />
<br><br>


> 마커 직접찍기

<img src="https://github.com/user-attachments/assets/270188ba-b7e0-4aa0-8c31-4281cd11c618" width="100%" alt="마커직접" />
<br><br>


> 주소로 마커찍기

<img src="https://github.com/user-attachments/assets/56ba3343-9404-4fe8-88e4-de9dde0227bc" width="100%" alt="주소로마커" />
<br><br>


> 로드맵 상세페이지

<img src="https://github.com/user-attachments/assets/622eb5c1-83bd-4aa4-acc7-abeb4d75c381" width="100%" alt="로드맵상세페이지" />
<br><br>


> 로드맵 수정

<img src="https://github.com/user-attachments/assets/d0a2e1c2-6714-4b6c-8ac6-edee96f00bab" width="100%" alt="로드맵수정" />
<br><br>


> 로드맵 삭제

<img src="https://github.com/user-attachments/assets/e05652c0-9b83-4db1-afa7-2249adbc9a90" width="100%" alt="로드맵삭제" />
<br><br>
<br><br>

#### 3.3. 공유지도 대시보드
<mark> 사용자들끼리 목표(지역)를 정한후 해당하는 마커들을 같이 찍어 만드는 공간이다. </mark>

- 참여하기를 통하여 공유지도에 참여할수있다.
- 마커를 직접찍거나 주소입력으로 마커를 추가할수있다.
- Liveblocks 사용하여 실시간으로 마커들이 찍힌다.

> 공유지도 생성
<img src="https://github.com/user-attachments/assets/6cd9e232-87c4-46d2-9430-829e79d88e7e" width="100%" alt="공유지도생성" />
<br><br>

> 공유지도 레이어추가
<img src="https://github.com/user-attachments/assets/8503cbad-8bf0-4267-89fe-8020f8c85980" width="100%" alt="레이어추가" />
<br><br>

> 공유지도 참여하기
<img src="https://github.com/user-attachments/assets/e515305f-3432-45c5-bb91-09a292e261e8" width="100%" alt="공유지도 참여하기" />
<br><br>

> 공유지도 레이어조회
<img src="https://github.com/user-attachments/assets/7483c6a8-c63d-4ffd-9a61-f7e744f17801" width="100%" alt="레이어확인" />
<br><br>

> 공유지도 삭제
<img src="https://github.com/user-attachments/assets/c15db057-54ca-424c-b0df-e92bebb16636" width="100%" alt="공유지도 삭제" />
<br><br>
<br><br>

#### 3.4. 퀘스트 대시보드
<mark> 장소맞추기 퀘스트를할수있는 공간이다. </mark>

- 작성자는 퀘스트장소와 힌트,마감일을 적어 작성을한다.
- 맞추는사람은 사진과 내용을적어 한번 시도를할수있다.
- 대기중상태가 기본이고 작성자가 정답 또는 실패처리를 할수있다.
- 가장 빨리맞춘사람순으로 랭킹에서 순위를 나타낸다.

> 퀘스트 메인대시보드
<img src="https://github.com/user-attachments/assets/b44e6057-47a4-4af2-b12d-2f59936f57d4" width="100%" alt="퀘스트 메인대시보드" />
<br><br>

> 퀘스트 생성
<img src="https://github.com/user-attachments/assets/383b7798-d605-43eb-ae53-45816e714b5f" width="100%" alt="퀘스트 생성" />
<br><br>

> 퀘스트 상세페이지
<img src="https://github.com/user-attachments/assets/48379c25-9ef7-4981-b4da-3f4c9e15d1ff" width="100%" alt="퀘스트 상세페이지" />
<br><br>

> 퀘스트 정답맞추기
<img src="https://github.com/user-attachments/assets/68f7b5c0-76c0-4a17-b320-66636a8d811b" width="100%" alt="퀘스트 정답맞추기" />
<br><br>

> 퀘스트 정답처리
<img src="https://github.com/user-attachments/assets/be86c384-7f5a-4e2a-9b09-dfb6bb7af931" width="100%" alt="퀘스트 정답처리" />
<br><br>
<br><br>

### 4. 알림 및 검색
#### 4.1. 알림
<mark> 시스템공지와 관리자공지를 받을수있다. </mark>

- 게시글,댓글등의 공지와 관리자공지가있다.
- 알림클릭시 알림확인이되어 알림을 읽은표시가된다.
- 전체읽음을 누르면 전체알림이 사라진다.

<img src="https://github.com/user-attachments/assets/c0c2428c-c869-4af3-bb70-5430af42f148" width="100%" alt="알림" />
<br><br>
<br><br>

#### 4.2. 검색
<mark> 게시글들을 검색할수있는 공간이다. </mark>

- 해시태그와 제목으로 검색이 가능하다.
- 검색페이지에서는 최대3개 또는 4개가 나온다.
- 가까이 클릭시 전체보기가 나오며 전체보기 클릭시 전체가나온다.

<img src="https://github.com/user-attachments/assets/08de3c83-023f-48ab-b7f8-7e84fe2f921e" width="100%" alt="검색" />
<br><br>
<br><br>

#### 4.3. 업적
<mark> 업적을달성하면 토스트메시지로 업적달성이온다. </mark>

- 해당 업적을 달성하면 토스트메시지가온다.
- 자신이얻은것은 마이페이지에서 확인이가능하다.

<img src="https://github.com/user-attachments/assets/81fdd64e-e83a-47fe-a201-bb0a64752020" width="100%" alt="업적" />
<br><br>
<br><br>

### 5. 마이페이지
<mark> 자신의글들과 좋아요,프로필수정등을 할수있는 공간이다. </mark>

- 프로필정보를 변경할수있다.
- 자신의 관심분야를 확인할수있다.
- 업적등 얻은것을 확인할수있다.
- 자신이 쓴 게시글,참여한글등 확인할수있다.

<img src="https://github.com/user-attachments/assets/26eeb730-f646-45dd-aa0f-4b704205c793" width="100%" alt="마이페이지" />
<br><br>

#### 5.1. 소셜로그인시

- 소셜로그인에서는 비밀번호를 변경할수없다.

<img src="https://github.com/user-attachments/assets/4f54158b-837a-49c2-9071-69cea0ed5f85" width="100%" alt="소셜로그인마이페이지" />
<br><br>
<br><br>

#### 5.2. 일반로그인시

- 일반로그인시 비밀번호를 변경할수있다.

<img src="https://github.com/user-attachments/assets/3b1150dc-90ea-4245-913b-371bf7fd10b5" width="100%" alt="일반로그인마이페이지" />
<br><br>
<br><br>

### 6. 관리자페이지
<mark> 관리자가 여러가지 처리를하는 공간이다. </mark>
#### 6.1. 신고

- 신고를 받은것들은 대기상태이다.
- 자세히보기를 누르면 해당 게시물이 나온다.
- 게시글 삭제처리를하거나 완료처리를하면된다.
- 삭제를하면 자동으로 완료처리가된다.

<img src="https://github.com/user-attachments/assets/3def8f12-d2e0-4e8b-b3f4-8608fa1259e4" width="100%" alt="신고" />
<br><br>
<br><br>

#### 6.2. 사용자관리

- 사용자를 관리하는 공간이다.
- 사용자정보,삭제를할수있다.
- 관리자권한부여,회수를 할수있다.
- 블랙리스트를 지정,회수할수있다.
  
<img src="https://github.com/user-attachments/assets/5e63d08b-4c00-4cf5-ab2d-10daaa0ac594" width="100%" alt="사용자 관리" />
<br><br>
<br><br>

#### 6.3. 카테고리관리

- 카테고리를 관리하는 공간이다.
- 카테고리를 생성,수정,삭제를 할수있다.

> 생성
<img src="https://github.com/user-attachments/assets/2c5c5c3e-12b9-4fe1-815b-bea1d0c2f1fb" width="100%" alt="카테고리 생성" />
<br><br>

> 간편수정
<img src="https://github.com/user-attachments/assets/34b989a4-9cee-471f-85da-aade72f14ac5" width="100%" alt="카테고리 수정" />
<br><br>

> 디테일수정
<img src="https://github.com/user-attachments/assets/f267600e-3dbe-47b1-9f40-80c501f61c98" width="100%" alt="카테고리 어려운수정" />
<br><br>

> 삭제
<img src="https://github.com/user-attachments/assets/896b631e-8c94-409b-930f-d46644b3efc7" width="100%" alt="카테고리 삭제" />
<br><br>
<br><br>

#### 6.4. 공유지도관리

- 공유지도를 관리하는 공간이다.
- 공유지도를 삭제할수있다.
- 공유지도 진행율은 전체 사용자 / 참여한 사용자 비율이다.

<img src="https://github.com/user-attachments/assets/3a0172e6-fe97-436f-8c6c-432eccdf1e72" width="100%" alt="공유지도 관리" />
<br><br>
<br><br>

#### 6.5. 관리자공지

- 관리자공지를 할수있는 공간이다.
- 공지를 생성,삭제를 할수있다.
- 시스템,이벤트,업데이트,안내사항으로 공지를 나눠서할수있다.

> 공지생성
<img src="https://github.com/user-attachments/assets/c791a265-5c04-4dd6-a843-45a892d12f2e" width="100%" alt="관리자공지생성" />
<br><br>

> 공지확인
<img src="https://github.com/user-attachments/assets/17c1e5cf-238d-4a96-a202-50c0069a78bc" width="100%" alt="관리자공지확인" />
<br><br>

# 4. 사용한 기술
## 언어 및 라이브러리
### 언어 및 프레임워크
| React | TypeScript | Next |
|:-----:|:----------:|:----:|
| <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/React_Logo_SVG.svg/250px-React_Logo_SVG.svg.png" alt="React" width="100"> | <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Typescript.svg/250px-Typescript.svg.png" alt="TypeScript" width="100"> | <img src="https://miro.medium.com/v2/resize:fit:1200/0*exXLyexwiMZ7Nwsg.png" alt="Next" width="100"> 
<br/>

### 라이브러리 및 API
| Tailwindcss | Axios | Zustand | Liveblocks | Googlemap |
|:-----------:|:-----:|:-------:|:----------:|:---------:|
| <img src="https://velog.velcdn.com/images/js43o/post/3ab8d087-c4f4-46b5-8f65-6d5e1736b58e/image.png" alt="Tailwindcss" width="100"> | <img src="https://blog.kakaocdn.net/dn/BtYd5/btsy6i6iR6d/MaQMnt5wPhrGervuQS6ba1/img.png" alt="Axios" width="100"> | <img src="https://velog.velcdn.com/images/jwhong135/post/50f0132e-c4c7-4bb9-ad29-d1fde4635fad/image.png" alt="Zustand" width="100"> | <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGTjLDMUZa9zBmqsjL7pNzmdsWqAcGtSqFNA&s" alt="Liveblocks" width="100"> | <img src="https://api.eremedia.com/wp-content/uploads/2020/10/google-maps-1797882_1920.png" alt="Googlemap" width="100"> |

<br/>

### 협력도구
| Git | GitHub | Notion | Slack |
|:---:|:------:|:------:|:-----:|
| <img src="https://github.com/user-attachments/assets/483abc38-ed4d-487c-b43a-3963b33430e6" alt="git" width="100">  | <img src="https://cdn.iconscout.com/icon/free/png-512/free-github-logo-icon-download-in-svg-png-gif-file-formats--badge-devicons-pack-design-development-icons-458293.png?f=webp&w=256" alt="github" width="100"> | <img src="https://github.com/user-attachments/assets/34141eb9-deca-416a-a83f-ff9543cc2f9a" alt="Notion" width="100">| <img src="https://www.darun.io/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdqddtkvmb%2Fimage%2Fupload%2Fv1728017922%2Fproduction%2Fimages%2Flogos%2Fslack.webp&w=96&q=75" alt="slack" width="100">|

<br/>
<br/>
