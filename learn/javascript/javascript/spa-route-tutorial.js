// 초기 애플리케이션을 로드할 때 모든 웹 사이트 콘텐츠를 로드하고 URL 경로 이름에 따라 페이지에 올바른 콘텐츠를 동적으로 표현
// SPA 라우팅 구현 방법
// 1. history (Broweser History)
// 2. hash (Hash History)

// history (Browser History Mode)
// pushstate, popstate 이벤트 이용.
window.history.pushstate({ data: 'some data' }, 'Some history entry title', '/some-path')

window.onpopstate = () => {
    appDiv.innerHTML = routes[window.location.pathname]
}

// hash (Hash History Mode)
// # 앵커를 통해 이동
// site/#some-path 와 같이 url 이 표현됨.
// 보통 정적 페이지에서 사용됨

window.addEventListener('hashchange', () => {
    appDiv.innerHTML = routes[window.location.hash.replace('#', '')]
})

// 보통 hash History 는 웹 페이지 내부에서 이동을 위한 것으로 history 가 관리되지 않음
// 하지만 서버가 없는 정적 페이지 경우에는 hashHistory 만으로도 충분

