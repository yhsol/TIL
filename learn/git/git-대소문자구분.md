# git 대소문자 구분 이슈

Git 작업을 하다보면 파일 명 또는 폴더명의 대소문자만 변경하는 경우가 있습니다. 예를들어, Git.ts 파일을 git.ts 파일로 변경할 수 있을 것입니다. 그런데 Git 에서 그러한 변경을 변경으로 판단하지 않는 경우가 있습니다. 그럴경우 변경한 파일을 원격 저장소에 올린뒤에 다시 내려받았을 때, 원격저장소에는 Git.ts 파일이었고, 그 이름을 바꾼것을 Git 은 변경이라고 판단하지 않기 때문에 내려받은 파일은 Git.ts 가 되는것이죠.

이것은 Git 의 `core.ignoreCase` 라는 속성의 영향을 받습니다.

git-scm 을 살펴보면 다음과 같이 설명하고 있습니다. ([core.ignoreCase](https://git-scm.com/docs/git-config/2.14.6#Documentation/git-config.txt-coreignoreCase))

```
If true, this option enables various workarounds to enable Git to work better on filesystems that are not case sensitive, like FAT. For example, if a directory listing finds "makefile" when Git expects "Makefile", Git will assume it is really the same file, and continue to remember it as "Makefile".

The default is false, except git-clone[1] or git-init[1] will probe and set core.ignoreCase true if appropriate when the repository is created.
```

요약하자면, 파일시스템에서 Git 이 더 잘 작동하도록 하기 위한 것이라고 이해할 수 있을 것 같습니다. MakeFile 을 찾고 있는데 makefile 을 발견했다면 같은 파일이라고 가정하고 진행하는 것이죠.

또한, 설명에 있듯이 true 일 경우 대소문자를 구분하지 않으며, false 일 경우 대소문자를 구분합니다. 즉, 처음에 얘기했던 Git.ts → git.ts 의 경우가 변경되지 않았던 이유는 core.ignoreCase 가 true 가 아닌지 확인해 볼만 한 것이겠죠.

그래서, Git 이 대소문자를 구분하도록 하고싶다고 했을 때의 변경은 다음과 같이 할 수 있습니다.

```bash
git config core.ignorecase false
```

이렇게 해주면 config 설정은 완료입니다. 그런데 주의할 점은 이미 push 된 파일이 있는 경우 그 이후에 변경된 config 로 인해 꼬일 수 있는 여지가 있을 수 있다는 것입니다. 사이드 이펙트의 우려가 있는 것이죠.

그럴경우에는 직접 Git 에 등록된 파일 또는 폴더의 이름을 변경해주는 방법이 있습니다. [git-mv](https://git-scm.com/docs/git-mv) 를 이용하는 것입니다. 필요한 파일만을 직접 수정하면 되기 때문에 전체 config 가 변경되는데에 따른 사이드 이팩트는 피할 수 있겠죠. 또한, config 는 os 의 파일시스템에 대해 적합한 동작을 정의해 둔 것이라고 생각해 볼 때, mv 를 통해 필요할 경우에 필요한 변경을 한다는 관점에서 조금 더 좋지 않을까 생각합니다.

명령어는 아래와 같습니다.

```bash
git mv user.ts User.ts
```

or

```bash
git mv --force user.ts User.ts
```

`--force` 는 mv 에서 파일의 이름을 변경하거나 이동시키는 역할을 하는데요, 기존에는 `--force` 옵션을 붙여줘야 했지만 버전이 올라가며 git 에서 `mv` 일 경우에 맞는 처리를 해줄 수 있게 되어 붙이지 않아도 된다고 합니다.

사소한 듯 하지만 이런게 꼬이기 시작하면 정말 번거로워질 수 있는 일이죠. 파일명 또는 폴더명은 경로에도 포함되는 등 많은 역할을 하니까요. 그간 이런 문제가 생기면 어떻게 어떻게 해결을 해가며 지나왔었는데, 동료 개발자분과 얘기를 하던 중에 이런 경우에 사용할 수 있는 config (core.ignoreCase) 에 대한 얘기를 듣게되어 찾아보고, 정리해둡니다.

참고:

[Git 파일명 대소문자 변경](https://pixerce.wordpress.com/2016/05/16/git-%ED%8C%8C%EC%9D%BC%EB%AA%85-%EB%B3%80%EA%B2%BD-%EB%8C%80%EC%86%8C%EB%AC%B8%EC%9E%90/)

[How do I commit case-sensitive only filename changes in Git?](https://stackoverflow.com/questions/17683458/how-do-i-commit-case-sensitive-only-filename-changes-in-git)

[git에서 파일 이름 대소문자만 변경하기](https://musma.github.io/2019/03/04/git-force-file-rename.html)

[Git - git-config Documentation](https://git-scm.com/docs/git-config/2.14.6#Documentation/git-config.txt-coreignoreCase)

[Git - git-mv Documentation](https://git-scm.com/docs/git-mv)
