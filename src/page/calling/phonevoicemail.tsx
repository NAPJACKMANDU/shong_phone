import { KakaoStatusBar } from '../../common/kakaoCommon.tsx'
import { MsgAvatar } from '../../common/imessagecommon.tsx'
import { PhoneTop, PhoneTabBar, PhoneInfoButton } from '../../common/phonecommon.tsx'
import '../../css/calling/phonevoicemailCss.css'

/* ===================== 데이터 =====================
   전화번호는 개인정보라서 임의의 번호로 바꿔 두었어요. */
interface Voicemail {
    id: number
    name?: string
    text: string   // 음성 메시지를 글자로 옮긴 내용
    number?:string
    date: string
    length: string
}

const VOICEMAILS: Voicemail[] = [
    { id: 1, name: '앤토니', text: '성찬이형 전화 좀 받아줘요 보고 싶어요 형이 저 싫어할 거 알고 있어요...', date: '2026. 10. 21.', length: '03:21' },
    { id: 2, number: '+82 70-1234-5678', text: '매일 3만원에서 15만 원까지 당일 지급을 원칙으로 하며 상담을 원하시면...', date: '2026. 9. 23.', length: '00:14' },
    { id: 3, name: '앤토니', text: '성찬이형 저 다음 달에 한국 갈 것 같아요 볼 수 있나요? 잠깐이라도 좋아요', date: '2026. 09. 10.', length: '02:47' },
    { id: 4, number: '+82 70-1234-5679', text: '난 이 번을 눌러 주세요', date: '2026. 5. 13.', length: '00:03' },
]

const IconChevron = () => (
    <svg viewBox="0 0 7 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 1 6 6.5 1 12" />
    </svg>
)

/* ===================== 음성 메시지 페이지 ===================== */
export const PhoneVoicemail = () => {
    return (
        <div className="kk-wrapper ph-wrapper">
            {/* 내용 (스크롤) */}
            <div className="ph-scroll">
                <h1 className="ph-title">음성 메시지</h1>

                <div className="pv-carrier">
                    <b>이동통신사 음성 사서함</b>
                    <button className="pv-call">이동통신사에 전화</button>
                </div>

                <div className="pv-list">
                    {VOICEMAILS.map((v, i) => (
                        <div className={`ph-row pv-row ${i === VOICEMAILS.length - 1 ? 'last' : ''}`} key={v.id}>
                            <div className="ph-avatar"><MsgAvatar size={50} /></div>
                            <div className="ph-body">
                                <div className="ph-text">
                                    <span className="ph-name">{v.number ? v.number : v.name}</span>
                                    <div className="pv-trans">
                                        <span className="pv-badge">메인</span>
                                        “{v.text}”
                                    </div>
                                </div>
                                <div className="pv-date">
                                    {v.date}
                                    <span>{v.length}</span>
                                </div>
                                <PhoneInfoButton />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pv-deleted">
                    삭제된 음성 메시지
                    <em>2</em>
                    <IconChevron />
                </div>
            </div>

            {/* 위쪽 흐림 + 상단 버튼 */}
            <div className="im-topfade" />
            <PhoneTop right={<button className="im-pill im-glass">인사말</button>} />

            {/* 카카오 공통 상태바 */}
            <KakaoStatusBar time="10:00" battery={25} />

            {/* 하단 흐림 + 탭바 */}
            <PhoneTabBar active="voicemail" />
        </div>
    )
}
export default PhoneVoicemail