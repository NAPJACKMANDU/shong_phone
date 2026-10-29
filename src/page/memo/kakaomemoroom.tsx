import { useLayoutEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { getBackDestination, KakaoStatusBar, lineProps } from '../../common/kakaoCommon.tsx'
import { getMemo } from '../../data/memoData.ts'
import '../../css/memo/kakaomemoroomCss.css'

/* ===================== 아이콘 ===================== */
const IconBack = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2.4">
        <polyline points="15 4 7 12 15 20" />
    </svg>
)
const IconShare = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2">
        <path d="M12 15V3M7.5 7.5L12 3l4.5 4.5" />
        <path d="M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8" />
    </svg>
)
const IconDots = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="4.5" cy="12" r="2.1" />
        <circle cx="12" cy="12" r="2.1" />
        <circle cx="19.5" cy="12" r="2.1" />
    </svg>
)
const IconChecklist = () => (
    <svg viewBox="0 0 28 26" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6.5" cy="6" r="4" fill="currentColor" />
        <path d="M4.7 6l1.4 1.5 2.3-2.8" stroke="#fff" strokeWidth="1.6" />
        <path d="M14 6h11" />
        <circle cx="6.5" cy="19.5" r="3.8" />
        <path d="M14 19.5h11" />
    </svg>
)
const IconClip = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2">
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
)
const IconMarkup = () => (
    <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13" cy="13" r="11" />
        <path d="M13 6.5l4.5 9.5-4.5-1.8L8.5 16z" />
        <circle cx="13" cy="12.5" r="0.8" fill="currentColor" />
        <path d="M13 14.2V19" />
    </svg>
)
const IconCompose = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2">
        <path d="M17.5 13.5V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9.5a3 3 0 0 1 3-3h4.5" />
        <path d="M20.3 3.7a2 2 0 0 1 0 2.8L12 14.8l-3.6.9.9-3.6 8.2-8.4a2 2 0 0 1 2.8 0z" />
    </svg>
)

/* ===================== 글 보여주기 =====================
   http 로 시작하는 주소는 노란 링크 모양이에요. (긴 주소는 / ? = & 뒤에서 줄이 바뀌어요) */
const URL_PATTERN = /(https?:\/\/[^\s]+)/g

const renderBody = (body: string): ReactNode[] =>
    body.split(URL_PATTERN).filter((p) => p !== '').map((part, i) => {
        if (/^https?:\/\//.test(part)) {
            const pieces = part.split(/([/?=&])/)
            return (
                <a key={i} className="mr-link" href={part} onClick={(e) => e.preventDefault()}>
                    {pieces.map((p, j) => (/^[/?=&]$/.test(p) ? <span key={j}>{p}<wbr /></span> : p))}
                </a>
            )
        }
        return part
    })

/* ===================== 메모룸 페이지 =====================
   주소 뒤에 ?id=메모번호 를 붙여서 들어와요.  예) /kakaoMemoRoom?id=5 */
export const KakaoMemoRoom = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [params] = useSearchParams()
    const memo = getMemo(Number(params.get('id')))
    const wrapperRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const wrapper = wrapperRef.current
        if (wrapper) wrapper.scrollTop = 0
    }, [memo.id])

    return (
        <div className="kk-wrapper mr-wrapper" ref={wrapperRef}>
            {/* 글 */}
            <div className="mr-scroll">
                <div className="mr-stamp">{memo.stamp}</div>
                <div className="mr-body">{renderBody(memo.body)}</div>
            </div>

            {/* 위쪽 흐림 + 뒤로 / 공유·더보기 */}
            <div className="mr-topfade" />
            <div className="mr-top">
                <button
                    className="mr-round mr-glass"
                    onClick={() => navigate(getBackDestination(location.pathname), { replace: true, state: location.state })}
                >
                    <IconBack />
                </button>
                <div className="mr-pill mr-glass">
                    <button><IconShare /></button>
                    <button><IconDots /></button>
                </div>
            </div>

            {/* 카카오 공통 상태바 */}
            <KakaoStatusBar time="4:23" battery={74} />

            {/* 하단 흐림 + 도구 모음 */}
            <div className="mr-fade" />
            <div className="mr-bar">
                <div className="mr-tools mr-glass">
                    <button><IconChecklist /></button>
                    <button><IconClip /></button>
                    <button><IconMarkup /></button>
                </div>
                <button className="mr-compose mr-round mr-glass"><IconCompose /></button>
            </div>
        </div>
    )
}
export default KakaoMemoRoom