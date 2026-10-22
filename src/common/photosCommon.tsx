import type { CSSProperties, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/photo/photosCommonCss.css'

// 라우터 경로 (프로젝트 라우터에 맞게 수정하세요)
export const PHOTOS_PATH = {
    library: '/photosLibrary',
    collections: '/photosCollections',
}

/* ===================== 사진 박스 =====================
   src 가 있으면 사진을, 없으면 bg(색/그라데이션) 자리표시를 보여줘요. */
export const PhotoBox = ({
    src, bg, className = '', style, children,
}: { src?: string; bg?: string; className?: string; style?: CSSProperties; children?: ReactNode }) => (
    <div className={`pc-photo ${className}`} style={{ ...(bg ? { background: bg } : {}), ...style }}>
        {src && <img src={src} alt="" />}
        {children}
    </div>
)

/* ===================== 상단 큰 제목 영역 ===================== */
interface HeaderProps {
    title: string
    subtitle?: ReactNode
    light?: boolean            // true: 흰 글씨 (어두운 사진 위)
    shade?: 'dark' | 'light'   // 제목 뒤 그림자/흐림
    right?: ReactNode          // 오른쪽 버튼들
}

export const PhotosHeader = ({ title, subtitle, light = false, shade, right }: HeaderProps) => (
    <div className={`pc-header ${light ? 'light' : ''} ${shade ? `shade-${shade}` : ''}`}>
        <span className="pc-title">{title}</span>
        {subtitle && <div className="pc-sub">{subtitle}</div>}
        {right && <div className="pc-right">{right}</div>}
    </div>
)

/* ===================== 아이콘 ===================== */
const IconLibrary = () => (
    <svg viewBox="0 0 32 26" fill="currentColor">
        <defs>
            <mask id="pc-lib-mask">
                <rect width="32" height="26" fill="#fff" />
                <rect x="6" y="5" width="26" height="21" rx="6.5" fill="#000" />
            </mask>
        </defs>
        <rect x="1.5" y="1" width="22" height="17" rx="4.5" mask="url(#pc-lib-mask)" />
        <rect x="8" y="7" width="22" height="17" rx="4.5" />
        <circle cx="15.5" cy="12.5" r="2" fill="#fff" />
        <path d="M10 22.5l6.5-6 3.5 3.5 3-2.5 5 5z" fill="#fff" />
    </svg>
)
const IconCollections = () => (
    <svg viewBox="0 0 24 26" fill="currentColor">
        <rect x="5" y="0.5" width="14" height="2.4" rx="1.2" />
        <rect x="3" y="4.5" width="18" height="2.6" rx="1.3" />
        <rect x="0.5" y="9" width="23" height="16.5" rx="4.5" />
    </svg>
)
export const IconSearchBold = () => (
    <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
        <circle cx="11" cy="11" r="7.5" />
        <path d="M16.5 16.5L23 23" />
    </svg>
)

/* ===================== 하단 떠 있는 탭바 ===================== */
export const PhotosTabBar = ({ active }: { active: 'library' | 'collections' }) => {
    const navigate = useNavigate()
    return (
        <div className="pc-tabbar">
            <div className="pc-tabs">
                <button className={`pc-tab ${active === 'library' ? 'on' : ''}`} onClick={() => navigate('/photosLibrary')}>
                    <IconLibrary />
                    <span>보관함</span>
                </button>
                <button className={`pc-tab ${active === 'collections' ? 'on' : ''}`} onClick={() => navigate('/photosCollections')}>
                    <IconCollections />
                    <span>모음</span>
                </button>
            </div>
            <button className="pc-search"><IconSearchBold /></button>
        </div>
    )
}