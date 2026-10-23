import { useMemo, useState } from 'react'
import { KakaoStatusBar } from '../../common/kakaoCommon.tsx'
import { MsgAvatar, IconMic } from '../../common/imessagecommon.tsx'
import { PhoneTop, PhoneTabBar, PhoneInfoButton, IconFilter } from '../../common/phonecommon.tsx'
import '../../css/calling/phonerecentsCss.css'

/* ===================== 아이콘 ===================== */
const ArrowOut = () => (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 9.5l7-7M4 2.5h5.5V8" />
    </svg>
)
const ArrowIn = () => (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2.5l-7 7M2.5 4v5.5H8" />
    </svg>
)
const IconSearchSmall = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <circle cx="10.5" cy="10.5" r="7" />
        <path d="M16 16l5 5" />
    </svg>
)

/* ===================== 데이터 ===================== */
interface Call {
    id: number
    name: string
    letter?: string      // 있으면 이름 첫 글자 프로필, 없으면 기본 프로필
    emoji?: boolean      // 이름이 이모지인 경우
    missed?: boolean     // 부재중(빨간색)
    dir: 'in' | 'out'    // in: 걸려온 전화, out: 건 전화
    kind: string
    time: string
}

const CALLS: Call[] = [
    { id: 1, name: '070-1234-5678', missed: true, dir: 'in', kind: '대한민국', time: '오후 3:49' },
    { id: 2, name: '쇼타로 형', letter: '쇼', dir: 'out', kind: '휴대전화', time: '어제' },
    { id: 3, name: '앤토니', letter: '앤', missed: true, dir: 'in', kind: '휴대전화', time: '어제' },
    { id: 4, name: '송은석', letter: '송', dir: 'in', kind: '휴대전화', time: '어제' },
    { id: 5, name: '이소희', letter: '이', dir: 'in', kind: '휴대전화', time: '어제' },
    { id: 6, name: '쇼타로 형', letter: '쇼', dir: 'out', kind: '휴대전화', time: '월요일' },
    { id: 7, name: '앤토니', letter: '앤', missed: true, dir: 'in', kind: '휴대전화', time: '화요일' },
    { id: 8, name: '쇼타로 형', letter: '쇼', dir: 'out', kind: '휴대전화', time: '월요일' },
    { id: 9, name: '앤토니', letter: '앤', missed: true, dir: 'in', kind: '휴대전화', time: '월요일' },
    { id: 10, name: '070-1234-3923', missed: true, dir: 'in', kind: '대한민국', time: '월요일' },
    { id: 11, name: '아빠', letter: '아', dir: 'in', kind: '휴대전화', time: '일요일' },
    { id: 12, name: '엄마', letter: '엄', dir: 'in', kind: '휴대전화', time: '일요일' },
    { id: 13, name: '엄마', letter: '엄', dir: 'in', kind: '휴대전화', time: '일요일' },
    { id: 14, name: '쇼타로 형', letter: '쇼', dir: 'out', kind: '휴대전화', time: '토요일' },
    { id: 15, name: '앤토니', letter: '앤', missed: true, dir: 'in', kind: '휴대전화', time: '토요일' },
    { id: 16, name: '엄마', letter: '엄', dir: 'in', kind: '휴대전화', time: '금요일' },
    { id: 17, name: '엄마', letter: '엄', dir: 'in', kind: '휴대전화', time: '금요일' },
]

/* ===================== 최근 통화 페이지 ===================== */
export const PhoneRecents = () => {
    const [mode, setMode] = useState<'all' | 'missed'>('all')
    const [query, setQuery] = useState('')

    const calls = useMemo(() => {
        const q = query.trim().toLowerCase()
        return CALLS.filter((c) => (mode === 'all' || c.missed) && (!q || c.name.toLowerCase().includes(q)))
    }, [mode, query])

    return (
        <div className="kk-wrapper ph-wrapper">
            {/* 내용 (스크롤) */}
            <div className="ph-scroll">
                <h1 className="ph-title">최근 통화</h1>

                <label className="pr-search">
                    <IconSearchSmall />
                    <input type="text" placeholder="검색" value={query} onChange={(e) => setQuery(e.target.value)} />
                    <IconMic />
                </label>

                <div className="pr-list">
                    {calls.map((c) => (
                        <div className="ph-row pr-row" key={c.id}>
                            <div className="ph-avatar"><MsgAvatar size={50} letter={c.letter} /></div>
                            <div className="ph-body">
                                <div className="ph-text">
                                    <span className={`ph-name ${c.missed ? 'red' : ''} ${c.emoji ? 'pr-name-emoji' : ''}`}>{c.name}</span>
                                    <span className="ph-sub">
                                        {c.dir === 'in' ? <ArrowIn /> : <ArrowOut />}
                                        {c.kind}
                                    </span>
                                </div>
                                <span className="pr-time">{c.time}</span>
                                <PhoneInfoButton />
                            </div>
                        </div>
                    ))}
                    {calls.length === 0 && <div className="pr-empty">통화 기록이 없습니다</div>}
                </div>
            </div>

            {/* 위쪽 흐림 + 상단 버튼 */}
            <div className="im-topfade" />
            <PhoneTop
                center={
                    <div className="ph-seg im-glass">
                        <button className={`ph-seg-btn ${mode === 'all' ? 'on' : ''}`} onClick={() => setMode('all')}>모두</button>
                        <button className={`ph-seg-btn ${mode === 'missed' ? 'on' : ''}`} onClick={() => setMode('missed')}>부재중 전화</button>
                    </div>
                }
                right={<button className="im-round im-glass"><IconFilter /></button>}
            />

            {/* 카카오 공통 상태바 */}
            <KakaoStatusBar time="10:00" battery={25} />

            {/* 하단 흐림 + 탭바 */}
            <PhoneTabBar active="recents" />
        </div>
    )
}
export default PhoneRecents