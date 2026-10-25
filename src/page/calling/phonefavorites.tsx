import { KakaoStatusBar, lineProps } from '../../common/kakaoCommon.tsx'
import { MsgAvatar } from '../../common/imessagecommon.tsx'
import { PhoneTop, PhoneTabBar, PhoneInfoButton } from '../../common/phonecommon.tsx'
import '../../css/calling/phonefavoritesCss.css'

/* ===================== 아이콘 ===================== */
const IconPlus = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2.4">
        <path d="M12 4v16M4 12h16" />
    </svg>
)
const IconBubble = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4C6.5 4 2.5 7.4 2.5 11.5c0 2.2 1.1 4.1 2.9 5.5L4.5 20.5c-.1.5.4.8.8.6l4.4-2.4c.7.1 1.5.2 2.3.2 5.5 0 9.5-3.4 9.5-7.5S17.5 4 12 4z" />
    </svg>
)
const IconHandset = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
)

/* ===================== 데이터 ===================== */
interface Favorite {
    id: number
    name: string
    letter?: string
    kind: 'message' | 'phone'
    label: string
}

const FAVORITES: Favorite[] = [
    { id: 1, name: '앤토니', letter: '앤', kind: 'phone', label: '휴대전화' },
    { id: 2, name: '엄마', letter: '엄', kind: 'phone', label: '휴대전화' },
    { id: 3, name: '아빠', letter: '아', kind: 'phone', label: '휴대전화' },
]

/* ===================== 즐겨찾기 페이지 ===================== */
export const PhoneFavorites = () => {
    return (
        <div className="kk-wrapper ph-wrapper">
            {/* 내용 (스크롤) */}
            <div className="ph-scroll">
                <h1 className="ph-title">즐겨찾기</h1>

                <div className="pf-list">
                    {FAVORITES.map((f) => (
                        <div className="ph-row pf-row" key={f.id}>
                            <div className="ph-avatar"><MsgAvatar size={43} letter={f.letter} /></div>
                            <div className="ph-body">
                                <div className="ph-text">
                                    <span className="ph-name">{f.name}</span>
                                    <span className="ph-sub">
                                        {f.kind === 'message' ? <IconBubble /> : <IconHandset />}
                                        {f.label}
                                    </span>
                                </div>
                                <PhoneInfoButton />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 위쪽 흐림 + 상단 버튼 */}
            <div className="im-topfade" />
            <PhoneTop right={<button className="pf-plus im-round im-glass"><IconPlus /></button>} />

            {/* 카카오 공통 상태바 */}
            <KakaoStatusBar time="4:23" battery={74} />

            {/* 하단 흐림 + 탭바 */}
            <PhoneTabBar active="favorites" />
        </div>
    )
}
export default PhoneFavorites