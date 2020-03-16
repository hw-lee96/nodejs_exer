# ELECTRON SUMMARY

## package.json 설명

```
{
  "name": "200316_electron",
  "version": "0.0.1",
  "description": "electron client summary",
  "main": "index.js",
  "scripts": {
    "start": "electron ."
  },
  "private": true,
  "author": "hwlee",
  "license": "ISC",
  "devDependencies": {
    "electron": "^8.1.1"
  }
}
```
***
## description
설명을 문자열로 기술한다. npm search로 검색된 리스트에 표시되기 때문에 사람들이 이 패키지를 찾아내고 이해하는데 도움이 된다.
***
## keywords
npm search로 검색된 리스트에 표시될 키워드를 문자열 배열로 설정한다.
***
## private
이 패키지의 비공개 여부를 설정한다.
***
## license
패키지 사용자들이 현재 패키지를 사용하기 위해 어떻게 권한을 얻는지, 또 어떤 금기 사항이 있는지 알게하기 위해 라이센스를 명시한다. 

현재 프로젝트에서 명시한 `UNLICENSED`는 라아센스를 설정하지 않았다는 뜻으로, npm의 `package.json`에서는 타인에게 비공개 패키지의 사용 권한을 부여하지 않길 원하는 경우 사용한다.
***
## build
Electron으로 만든 앱을 배포하기 위한 옵션을 설정한다. 해당 프로젝트에서는 써드파티 패키징 툴로 electron-builder 를 사용했으며, 이 도구는 다음 동작을 수행한다.
* 응용 프로그램 패키징
* 실행 파일 브랜딩
* 올바른 아이콘 설정
* 선택적으로 설치 프로그램 생성 등

아래는 build 옵션에 대한 설명이다.
- asar : `tar`와 비슷한 포맷으로 모든 리소스를 하나의 파일로 만들며, `electron`은 압축해제 없이 임의로 모든 파일을 읽어들일 수 있다. `asar` 아카이브로 패키징을 하면 다음과 같은 장점이 있다.
  - Windows에서 일어나는 긴 경로 이름에 대한 issues를 완화
  - require 속도를 약간 빠르게 함
  - 리소스와 소스 코드를 보호
  
- appId : 고유 `application id`를 말한다. windowsOS에서는 Application User Model ID를 의미하며, macOS에서는 CFBundleIdentifier로 사용된다.

- productName : npm 모듈 규칙에 따라 대부분의 경우 `package.json`의 `name` 필드는 소문자 이름을 사용한다. 하지만 `electron`은 `name` 대신 `productName` 필드를 주로 사용하기 때문에 반드시 이 필드도 같이 지정해야 하며, 이 필드에는 맨 앞 글자를 대문자로 애플리케이션 전체 이름을 지정한다. 

- publish : 링크 참조 >
https://www.electron.build/configuration/publish
 
- win : 윈도우 설치 파일 관련 옵션
  -  target : nsis, zip 등으로 빌드할 수 있다.
      - nsis : 스크립트 기반으로 동작하는 윈도우용 설치 시스템
  - arch : 명령 집합 아키텍쳐를 지정한다.
      - ia32 : `Intel Architecture, 32-bit`로 인텔 32비트 마이크로프로세스에서 사용하는 아키텍쳐를 말한다.
  - nsis : 
      - oneClick : 별도의 경로 지정 없이 한 번에 설치되게 할 것인가를 설정한다. 기본값은 true이며, 설치 경로 기본값은 `%APPDATA%`이다.
      - perMachine : 사용자별 설치와 기기 단위 설치를 설정하는 옵션이다. oncClick 값에 따라서 기본값이 바뀌며, oneClick을 false로 설정하면 인스톨러 실행 시 사용자가 선택하는 화면이 나온다.
      - shortcutName : 단축아이콘 이름
      - language : 인스톨러의 언어를 지정한다. 기본값이 시스템 언어로 된다고 되어있지만, 영어로 나오는 경우가 종종 있다고 한다. 한국어로 설정하려면 1042로 하면 된다.
  - extraResources : 특정 파일을 패키지에 추가하는 역할을 한다. 
      - from : 추가할 파일의 경로를 정의
      - to : 추가할 파일의 위치를 정의
      - filter : 어떤 파일을 추출할지 정의

***
## dependencies
패키지의 이름과 해당 패키지의 버전 범위를 지정한 객체를 통해 의존성이 규정된다. 의존성은 tarball 이나 git URL로도 지정될 수 있다.

버전 범위를 지정하는 방법
```
version  : 명시한 version 과 일치해야 한다.
>version : 명시한 version 보다 높아야 한다.
>=version, <version, <=version 등이 있다.
~version : 명시한 version 과 근사한 version.
^version : 명시한 version과 호환되는 version.
1.2.x : 1.2.0 혹은 1.2.1 과 같은 version.
http://... : tarball의 url을 지정할 수도 있다.
* : 모든 version.
"" : * 와 같음.
version1 - version2 : version1 <=, <= version2와 같음.
range1 || range2 : range1 또는 range2.
git... : Git URL을 지정할 수도 있다.
```
***
## devDependencies
운영이 아닌 개발 단계에서만 필요한 의존성 모듈들은 `devDependencies`에 설치해야 한다. 여기서 말하는 모듈은 테스트 관련 모듈이나 트랜스 파일러 관련 모듈을 말한다.
***
