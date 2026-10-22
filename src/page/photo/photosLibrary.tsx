import { useLayoutEffect, useRef, useState } from 'react'
import { KakaoStatusBar } from '../../common/kakaoCommon.tsx'
import { PhotosHeader, PhotosTabBar, PhotoBox } from '../../common/photosCommon.tsx'
import { PHOTOS } from '../../data/photoDada.ts'
import '../../css/photo/photosLibraryCss.css'

/* ===================== 아이콘 ===================== */
const IconSortLines = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <path d="M3.5 7h17M6.5 12h11M9.5 17h5" />
    </svg>
)

/* ===================== 보관함 페이지 ===================== */
export const PhotosLibrary = () => {
    const gridRef = useRef<HTMLDivElement>(null)
    const [visibleDate, setVisibleDate] = useState(PHOTOS[PHOTOS.length - 1]?.date ?? '')
    const [isTop, setIsTop] = useState(true)

    const updateVisibleDate = () => {
        const grid = gridRef.current
        if (!grid) return

        setIsTop(grid.scrollTop <= 10)

        const header = grid.parentElement?.querySelector('.pc-header')
        const headerBottom = header?.getBoundingClientRect().bottom ?? 0
        const visibleTile = Array.from(grid.querySelectorAll('.pl-tile')).find((tile) => {
            const bounds = tile.getBoundingClientRect()
            return bounds.bottom > headerBottom && bounds.top < grid.getBoundingClientRect().bottom
        })
        const index = visibleTile ? Array.from(grid.children).indexOf(visibleTile) : -1
        if (index >= 0) setVisibleDate(PHOTOS[index].date)
    }

    useLayoutEffect(() => {
        const scrollToBottom = () => {
            const grid = gridRef.current
            if (grid) grid.scrollTop = grid.scrollHeight

            window.scrollTo(0, document.documentElement.scrollHeight)
            updateVisibleDate()
        }

        scrollToBottom()
        const frame = window.requestAnimationFrame(scrollToBottom)
        return () => window.cancelAnimationFrame(frame)
    }, [])

    return (
        <div className={`kk-wrapper pl-wrapper ${isTop ? 'is-top' : ''}`}>
            {/* 사진 격자 */}
            <div className="pl-grid" ref={gridRef} onScroll={updateVisibleDate}>
                {/* 헤더 영역 뒤로 사진이 가리지 않도록 상단 빈 공간 */}
                <div className="pl-grid-spacer" />
                {PHOTOS.map((p) => (
                    <PhotoBox key={p.id} src={p.src} bg={p.bg} className={`pl-tile ${p.tall ? 'tall' : ''}`} />
                ))}
            </div>

            {/* 상단 큰 제목 */}
            <PhotosHeader
                title="보관함"
                subtitle={visibleDate ? new Intl.DateTimeFormat('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }).format(new Date(`${visibleDate}T00:00:00`)) : undefined}
                light={!isTop}
                shade={isTop ? 'light' : 'dark'}
                right={
                    <>
                        <button className={`pc-glass-btn ${isTop ? '' : 'dark'}`}><IconSortLines /></button>
                        <button className={`pc-glass-btn text ${isTop ? '' : 'dark'}`}>선택</button>
                    </>
                }
            />

            {/* 카카오 공통 상태바 */}
            <KakaoStatusBar time="2:37" battery={72} />

            {/* 하단 떠 있는 탭바 */}
            <PhotosTabBar active="library" />
        </div>
    )
}
export default PhotosLibrary