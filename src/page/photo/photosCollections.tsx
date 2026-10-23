import { useState } from 'react'
import type { ReactNode } from 'react'
import { KakaoStatusBar } from '../../common/kakaoCommon.tsx'
import { PhotosHeader, PhotosTabBar, PhotoBox } from '../../common/photosCommon.tsx'
import '../../css/photo/photosCollectionsCss.css'

/* ===================== 아이콘 ===================== */
const IconDots = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="4.5" cy="12" r="2.1" />
        <circle cx="12" cy="12" r="2.1" />
        <circle cx="19.5" cy="12" r="2.1" />
    </svg>
)

const IconChevronRight = () => (
    <svg viewBox="0 0 10 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="2 2 8 7 2 12" />
    </svg>
)
const IconChevronDown = () => (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1.5 4 6 8.5 10.5 4" />
    </svg>
)
const IconPlay = () => (
    <svg viewBox="0 0 14 14" fill="#fff">
        <path d="M2.5 1.2l10 5.8-10 5.8z" />
    </svg>
)
const IconHeart = () => (
    <svg className="pm-heart" viewBox="0 0 14 13" fill="#fff">
        <path d="M7 12.6C2.4 9.4.5 7 .5 4.4.5 2.3 2 .9 3.8.9c1.3 0 2.5.7 3.2 1.9C7.7 1.6 8.9.9 10.2.9 12 .9 13.5 2.3 13.5 4.4c0 2.6-1.9 5-6.5 8.2z" />
    </svg>
)

/* 프로필 버튼 (동기화 링 + 이름 첫 글자) */
const AvatarButton = ({ letter }: { letter: string }) => (
    <button className="pm-avatar">
        <svg viewBox="0 0 43 43">
            <circle cx="21.5" cy="21.5" r="19.5" fill="#8b9be0" stroke="#8a8a8f" strokeWidth="3" />
            <path d="M21.5 2A19.5 19.5 0 0 1 38.4 11.8" fill="none" stroke="#2f7bf2" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <span>{letter}</span>
    </button>
)

/* 지도 타일 그림 */
const MapArt = () => (
    <svg className="pm-map" viewBox="0 0 107 107">
        <rect width="107" height="107" fill="#bcdcec" />
        <path d="M8 22C30 8 62 12 84 28c16 12 22 42 14 79H8z" fill="#a8d08d" />
        <path d="M0 40C28 36 50 54 84 60M20 107C30 80 50 70 70 76M40 0C46 24 40 40 30 56" fill="none" stroke="#6f9fc4" strokeWidth="1.6" />
        <path d="M0 62C20 58 40 70 60 64M50 30C64 36 78 56 76 80" fill="none" stroke="#7aa7c8" strokeWidth="1" />
        <circle cx="62" cy="31" r="3.2" fill="none" stroke="#111" strokeWidth="2" />
        <circle cx="38" cy="47" r="3.2" fill="none" stroke="#111" strokeWidth="2" />
        <circle cx="46" cy="24" r="2.2" fill="#111" />
        <circle cx="75" cy="46" r="2.2" fill="#111" />
        <circle cx="68" cy="62" r="2.8" fill="none" stroke="#111" strokeWidth="1.8" />
        <circle cx="76" cy="76" r="1.8" fill="#111" />
        <circle cx="72" cy="95" r="2.2" fill="#111" />
        <g fill="#1c1c1e" fontWeight="600">
            <text x="30" y="26" fontSize="9"></text>
            <text x="64" y="26" fontSize="15" fontWeight="700">속초</text>
            <text x="46" y="60" fontSize="12">인천</text>
            <text x="78" y="44" fontSize="9">서울</text>
            <text x="72" y="62" fontSize="11">여수</text>
            <text x="78" y="78" fontSize="9">부산</text>
            <text x="76" y="97" fontSize="10">여수</text>
        </g>
    </svg>
)

/* ===================== 데이터 =====================
   src 에 사진 주소를 넣으면 그 사진이, 비워두면 bg 색이 보여요. */
interface Memory { id: number; title: string; sub: string; bg?: string; src?: string; play?: boolean }
interface Tile { id: number; label?: ReactNode; two?: boolean; bg?: string; src?: string; heart?: boolean; map?: boolean }

const MEMORIES: Memory[] = [
    { id: 1, title: '여행', sub: '지난 수년간', play: true, src:'/photo-thumbs/81.jpg' },
    { id: 2, title: '인물 사진', sub: '2025년', src:'/photo-thumbs/162.jpg' },
    { id: 3, title: '행복한 추억', sub: '2024년', src:'/photo-thumbs/105.jpg' },
]

const PINNED: Tile[] = [
    { id: 1, label: '즐겨찾기', heart: true,src:'/photo-thumbs/227.jpg' },
    { id: 2, label: <>최근 저장된<br />항목</>, two: true, src:'/photo-thumbs/233.jpg'  },
    { id: 3, label: '지도', map: true, bg: '#bcdcec' }
]

const ALBUMS: Tile[] = [
    { id: 1, label: '앤톤',src:'/photo-thumbs/214.jpg'},
    { id: 2, label: '뉴저지', src:'/photo-thumbs/205.jpg' },
    { id: 3, label: '일본', src:'/photo-thumbs/130.jpg' },
    { id: 4,  label: '상하이', src:'/photo-thumbs/107.jpg' },
]

const PEOPLE: Tile[] = [
    { id: 1, src:'/photo-thumbs/166.jpg'},
    { id: 2, src:'/photo-thumbs/39.jpg' },
    { id: 3, src:'/photo-thumbs/234.jpg' },
    { id: 4, src:'/photo-thumbs/187.jpg' },

]

/* ===================== 섹션 머리글 ===================== */
const SectionHead = ({ title, edit, open, onFold }: { title: string; edit?: boolean; open: boolean; onFold: () => void }) => (
    <div className="pm-section-head">
        <span className="pm-section-title">{title}<IconChevronRight /></span>
        <div className="pm-section-actions">
            {edit && <button className="pm-pill">편집</button>}
            <button className="pm-fold" onClick={onFold} style={{ transform: open ? 'none' : 'rotate(-90deg)' }}>
                <IconChevronDown />
            </button>
        </div>
    </div>
)

const TileRow = ({ tiles }: { tiles: Tile[] }) => (
    <div className="pm-row">
        {tiles.map((t) => (
            <PhotoBox key={t.id} src={t.src} bg={t.bg} className={`pm-tile ${t.label ? '' : 'nolabel'}`}>
                {t.map && <MapArt />}
                {t.heart && <IconHeart />}
                {t.label && <span className={`pm-tile-label ${t.two ? 'two' : ''}`}>{t.label}</span>}
            </PhotoBox>
        ))}
    </div>
)

/* ===================== 모음 페이지 ===================== */
export const PhotosCollections = () => {
    const [open, setOpen] = useState({ memories: true, pinned: true, albums: true, people: true })
    const toggle = (k: keyof typeof open) => setOpen({ ...open, [k]: !open[k] })

    return (
        <div className="kk-wrapper pm-wrapper">
            {/* 스크롤 내용 */}
            <div className="pm-scroll">
                <div className="pm-section">
                    <SectionHead title="추억" open={open.memories} onFold={() => toggle('memories')} />
                    {open.memories && (
                        <div className="pm-row">
                            {MEMORIES.map((m) => (
                                <PhotoBox key={m.id} src={m.src} bg={m.bg} className="pm-memory">
                                    <div className="pm-memory-text">
                                        <b>{m.title}</b>
                                        <span>{m.sub}</span>
                                    </div>
                                    {m.play && <div className="pm-play"><IconPlay /></div>}
                                </PhotoBox>
                            ))}
                        </div>
                    )}
                </div>

                <div className="pm-section">
                    <SectionHead title="고정됨" edit open={open.pinned} onFold={() => toggle('pinned')} />
                    {open.pinned && <TileRow tiles={PINNED} />}
                </div>

                <div className="pm-section">
                    <SectionHead title="앨범" open={open.albums} onFold={() => toggle('albums')} />
                    {open.albums && <TileRow tiles={ALBUMS} />}
                </div>

                <div className="pm-section">
                    <SectionHead title="사람 및 반려동물" open={open.people} onFold={() => toggle('people')} />
                    {open.people && <TileRow tiles={PEOPLE} />}
                </div>
            </div>

            {/* 상단 큰 제목 */}
            <PhotosHeader
                title="모음"
                shade="light"
                right={
                    <>
                        <button className="pc-glass-btn white"><IconDots /></button>
                        <AvatarButton letter="정" />
                    </>
                }
            />

            {/* 카카오 공통 상태바 */}
            <KakaoStatusBar time="2:38" battery={96} />

            {/* 하단 떠 있는 탭바 */}
            <PhotosTabBar active="collections" />
        </div>
    )
}
export default PhotosCollections