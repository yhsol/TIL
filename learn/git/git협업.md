# git 어렵다

- 작업을 시작할 base 의 레파지토리 또는 거기서의 branch 를 클론한다.
- branch 를 생성한다.
- 작업한다.
- 커밋한다.
- origin "생성한branch" 로 푸쉬한다.
- merge 할 곳으로 pull request(merge request) 를 보낸다.
- merge 가 되면 작업한 origin branch 는 삭제될 것이고, 기존 branch 는 직접 삭제한다.
- 그리고 pull request 후에 작업의 베이스가 되는 곳에서 pull 을 하고, 다시 작업을 위해 branch 를 생성한다.

- master 가 있고, 거기에서의 develop 이 있다.
- develop 을 빌드해 가며 추가할 기능을 위해 develop 에서 branch (devleop_2) 를 만든다.
- develop_2 에서 작업을 한 뒤에 origin develop_2 로 push 한다.
- push 했으면 develop 으로 pull request (merge request) 를 보낸다.
- merge 가 되고 나면, develop 에서 pull 한다.
- develop_2 는 삭제하고, 다음 작업을 위한 branch 를 생성한다.
