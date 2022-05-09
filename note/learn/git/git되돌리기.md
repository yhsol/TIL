# git 되돌리기

- reset

  - soft

    - undo last commit 이 이 명령어 인듯.
    - 이전으로 이동하고, 변경내용은 changes 상태에 남아있다.
    - 그것을 discard 하거나 반영하거나 할 수 있다.
    - 커밋이력도 삭제.

  - hard

    - 이전으로 이동하고, 변경했던 내용도 삭제됨.
    - 커밋이력도 삭제.
    - merge 중에 되돌리고 싶으면 hard 를 써야함.

  - HEAD 로 이동

    - undo last commit 은 HEAD 를 이용해서 git reset HEAD~1 과 같이 작동한다.
    - soft 명령어와 비슷한듯.

  - ORIG_HEAD 활용
    - ORIG_HEAD 는 이전에 작업하던 곳을 말한다.
    - git diff ORIG_HEAD 를 해서 확인해보면 된다.
    - git 작업 바로 이전으로 돌리고 싶을 경우는 ORIG_HEAD 가 도움이 될 듯.
    - 보통의 경우 --soft 를 사용해도 될 듯 하고,
      pull 또는 merge 를 되돌리고 싶은 경우 git reset --hard ORIG_HEAD 를 사용하면 된다.

- revert

  - 커밋이력 삭제하지 않음.
  - conflict 발생할 수 있음.
  - conflict 를 해결하고 다시 반영.
  - 아직은 좀 헷갈린다.

- undo last commit on vs code
  - git reset --soft HEAD~1 인듯하다.
  - git reset HEAD~1 도 같은 동작을 한다.
  - 이전으로 이동하고, 커밋이력은 삭제됨.

revert test
