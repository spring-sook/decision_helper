# 시작하기

## 1. Node 버전 맞추기
```bash
nvm use
```

## 2. 패키지 설치
```bash
pnpm install
```

## 3. 개발 서버 실행
```bash
pnpm dev
```

---

## Claude Code 권한 설정 (선택)

`~/.claude/settings.json`에 추가:

```json
{
  "permissions": {
    "deny": [
      "Read(**/.env)",
      "Read(**/.env.*)",
      "Read(.env)",
      "Read(.env.*)",
      "Read(./.ssh/**)",
      "Read(**/credentials.json)",
      "Read(**/database.yml)",
      "Read(./.aws/**)",
      "Read(./secrets/**)",
      "Read(**/*.key)",
      "Read(**/*.pem)"
    ]
  }
}
```
