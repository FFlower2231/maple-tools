# 🚀 배포 가이드 (GitHub Pages 추천)

사이트는 서버가 필요 없는 **정적 사이트**(총 164KB)라, 파일만 올리면 바로 인터넷에 공개됩니다.

---

## 방법 A. GitHub Pages — 추천 ⭐

무료 · 수정 이력 관리 · 내 도메인 연결 가능. 애드센스 장기 운영에 가장 적합합니다.

### 1단계: 깃허브 가입 & 저장소 만들기
1. [github.com](https://github.com) 가입 (이미 있으면 로그인)
2. 오른쪽 위 **`+` → New repository** 클릭
3. **Repository name**에 원하는 이름 입력 (예: `tools` 또는 `maple-tools`)
4. **Public** 선택 (Pages 무료 사용 조건)
5. **Create repository** 클릭

### 2단계: 파일 업로드
1. 새로 만든 저장소 화면에서 **uploading an existing file** 링크 클릭
   (또는 **Add file → Upload files**)
2. `site` 폴더 **안의 내용물**을 통째로 드래그&드롭
   - ⚠️ `site` 폴더 자체가 아니라 **그 안의 `index.html`, `assets`, `tools` 등**을 올려야 합니다
   - 폴더째 드래그하면 브라우저가 알아서 하위 파일까지 올려줍니다
3. 아래 **Commit changes** 버튼 클릭

### 3단계: Pages 켜기
1. 저장소 상단 **Settings** 탭
2. 왼쪽 메뉴 **Pages**
3. **Source**: `Deploy from a branch`
4. **Branch**: `main` / 폴더는 `/ (root)` 선택 → **Save**
5. 1~3분 뒤 새로고침하면 상단에 공개 주소가 뜹니다

```
https://(내아이디).github.io/(저장소이름)/
```

### 4단계: 배포 후 마무리 (중요)
공개 주소가 정해지면 아래 두 파일에서 `https://example.com`을 **실제 주소로 교체**하세요.

- `sitemap.xml` — 모든 `<loc>` 주소
- `robots.txt` — `Sitemap:` 줄

예시:
```
https://example.com/tools/cube-calculator.html
→ https://kjins1121.github.io/tools/tools/cube-calculator.html
```

수정 방법: 저장소에서 파일 클릭 → 연필(✏️) 아이콘 → 수정 → Commit.

### 이후 수정하는 법
파일을 고친 뒤 저장소에 **Add file → Upload files**로 같은 이름 파일을 올리면 덮어쓰기 됩니다. 1~2분 뒤 사이트에 반영돼요.

---

## 방법 B. Netlify Drop — 지금 당장 확인하고 싶을 때

가장 빠릅니다. 1분이면 끝나요.

1. [app.netlify.com/drop](https://app.netlify.com/drop) 접속
2. `site` 폴더를 페이지에 **드래그&드롭**
3. 즉시 `랜덤이름.netlify.app` 주소가 생성됩니다

> 계정 없이도 임시 배포되지만, 주소를 유지하려면 가입하세요. 가입 후 **Site settings → Change site name**에서 주소를 바꿀 수 있어요.

---

## 내 도메인 연결 (선택, 애드센스에 유리)

1. 가비아·Cloudflare·Namecheap 등에서 도메인 구입 (연 1~2만원대)
2. **GitHub Pages**: 저장소 Settings → Pages → Custom domain에 도메인 입력 → 도메인 업체에서 DNS 설정
   - A 레코드 4개: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. **Enforce HTTPS** 체크 (무료 SSL 자동 적용)

---

## 애드센스 신청 (배포 후)

> 사이트가 실제로 공개되어 있어야 신청할 수 있습니다.

1. **며칠~몇 주 운영** — 콘텐츠와 방문자가 어느 정도 있어야 승인에 유리합니다
2. [adsense.google.com](https://adsense.google.com) 가입 → 사이트 주소 등록
3. 받은 게시자 ID(`ca-pub-...`)를 아래에 반영:
   - 각 HTML 파일 `<head>`의 주석 처리된 애드센스 스크립트 → 주석 해제 + ID 교체
   - `ads.txt`의 `pub-XXXXXXXXXXXXXXXX` → 내 ID로 교체
4. 승인되면 광고 단위를 만들어 각 페이지의 `<div class="ad-slot">` 안 안내 문구를 `<ins class="adsbygoogle" ...>` 코드로 교체

**승인 팁**
- 광고를 과하게 넣지 말 것
- 개인정보처리방침 페이지가 있으면 유리 (필요하면 만들어 드릴게요)
- 이 사이트는 전부 자체 제작이라 저작권 문제는 없습니다

---

## 배포 전 체크리스트

- [ ] `index.html`을 브라우저로 열어 모든 도구가 잘 작동하는지 확인
- [ ] 사이드바 메뉴에서 각 페이지 이동 확인
- [ ] 배포 후 `sitemap.xml` · `robots.txt`의 주소 교체
- [ ] (선택) 색상 변환기의 스포이드·화면 캡처 기능은 **HTTPS 환경에서만** 동작 → 배포 후 정상 작동
