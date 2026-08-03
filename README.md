# 불편함 해결소 🛠️

평소 불편했던 기능을 하나씩 도구로 만들어 모으는 정적 웹사이트입니다. 모든 도구는 브라우저에서만 동작하고 서버가 필요 없어, **무료 호스팅**에 그대로 올릴 수 있습니다.

## 폴더 구조

```
site/
├─ index.html              ← 홈(허브) 페이지
├─ ads.txt                 ← 애드센스 인증용 (루트에 위치)
├─ robots.txt              ← 검색엔진용
├─ sitemap.xml             ← 검색엔진용
├─ TEMPLATE.html           ← 새 도구 만들 때 복사해서 쓰는 틀
├─ assets/
│  ├─ style.css            ← 공통 디자인 (한 곳만 고치면 전체 적용)
│  └─ app.js               ← 다크모드 토글, 복사 기능 등 공통 스크립트
└─ tools/
   ├─ json-formatter.html
   ├─ timestamp.html
   ├─ base64.html
   └─ color-converter.html
```

---

## 1단계 — 무료로 배포하기

가장 쉬운 방법 세 가지 중 하나를 고르세요. **GitHub Pages**를 추천합니다(무료, 도메인 연결 가능).

### A. GitHub Pages (추천)
1. github.com 가입 → 새 저장소(repository) 생성
2. `site` 폴더 안의 파일들을 저장소에 업로드 (드래그&드롭 가능)
3. 저장소 → Settings → Pages → Source를 `main` 브랜치 / 루트로 지정
4. 몇 분 뒤 `https://(아이디).github.io/(저장소명)/` 주소로 공개됨

### B. Netlify / Vercel (드래그&드롭)
1. netlify.com 또는 vercel.com 가입
2. `site` 폴더를 통째로 드래그&드롭
3. 즉시 임시 도메인으로 공개됨, 나중에 내 도메인 연결 가능

> 애드센스 승인에는 **본인 소유 도메인**(예: `mytools.com`)이 있는 편이 유리합니다. 가비아·Cloudflare 등에서 도메인을 사고, 위 호스팅에 연결하세요.

---

## 2단계 — Google AdSense 붙이기

> 애드센스는 사이트에 **어느 정도 쓸모 있는 콘텐츠와 방문자**가 있어야 승인됩니다. 도구를 몇 개 더 추가하고, 며칠 운영한 뒤 신청하는 것을 권합니다.

1. **신청**: [adsense.google.com](https://adsense.google.com) → 가입 → 사이트 주소 등록
2. **사이트 연결 코드 삽입**: 승인 심사를 위해 애드센스가 주는 `<script>` 한 줄을 받습니다. 각 HTML 파일 `<head>` 안에 이미 아래 주석이 들어있으니, 주석을 풀고 `ca-pub-XXXXXXXXXXXXXXXX`를 본인 게시자 ID로 바꾸세요.

   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-내번호" crossorigin="anonymous"></script>
   ```

3. **ads.txt 수정**: 루트의 `ads.txt` 파일에서 `pub-XXXXXXXXXXXXXXXX`를 본인 게시자 ID(숫자)로 교체.
4. **광고 위치**: 각 페이지에 `<div class="ad-slot">광고 영역...</div>` 자리가 미리 잡혀 있습니다. 승인 후 애드센스에서 "광고 단위"를 만들면 `<ins class="adsbygoogle" ...></ins>` 코드를 줍니다. 그 코드로 `ad-slot` 안의 안내 문구를 교체하세요. 예:

   ```html
   <div class="ad-slot">
     <ins class="adsbygoogle"
          style="display:block"
          data-ad-client="ca-pub-내번호"
          data-ad-slot="광고단위번호"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
     <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
   </div>
   ```

승인 팁: 광고를 너무 빽빽하게 넣지 말 것, 개인정보처리방침 페이지를 추가하면 유리, 저작권 문제 없는 자체 제작 콘텐츠일 것(이 사이트는 모두 자체 제작이라 안전).

---

## 3단계 — 새 도구 추가하기 (이 사이트의 핵심)

불편한 게 생길 때마다 이렇게 추가하면 됩니다.

1. `TEMPLATE.html`을 복사해 `tools/새이름.html`로 저장
2. 파일 안의 제목·설명·기능 코드를 채우기 (`<!-- 여기에 도구 기능 -->` 부분)
3. `index.html`의 카드 그리드에 링크 카드 한 개 추가:

   ```html
   <a class="card" href="tools/새이름.html">
     <div class="emoji">✨</div>
     <h3>새 도구 이름</h3>
     <p>한 줄 설명.</p>
   </a>
   ```

4. `sitemap.xml`에 새 페이지 주소 한 줄 추가 (선택)

디자인은 `assets/style.css` 하나만 고치면 전체 페이지에 반영됩니다.

---

## 로컬에서 미리보기

브라우저로 `index.html`을 더블클릭해 열면 됩니다. (도구가 모두 클라이언트에서 동작하므로 서버 불필요)

문제 없이 잘 작동하면, 위 1·2단계로 배포하면 끝입니다.
