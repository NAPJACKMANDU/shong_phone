import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { KakaoStatusBar } from '../../common/kakaoCommon.tsx'
import { CgvPoster, AgeBadge, CGV_PATH } from '../../common/cgvCommon.tsx'
import { getBackDestination } from '../../common/kakaoCommon.tsx'
import '../../css/cgv/cgvwatchedCss.css'

/* ===================== 아이콘 ===================== */
const IconBack = () => (
    <svg viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="10 2 2 10 10 18" />
    </svg>
)
const IconHome = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 11.2c0-.8.4-1.5 1-2l5-4.2a2 2 0 0 1 2.6 0l5 4.2c.6.5 1 1.2 1 2V18a2.5 2.5 0 0 1-2.5 2.5h-9.5A2.5 2.5 0 0 1 4.5 18z" />
    </svg>
)
const IconPrev = () => (
    <svg viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="8 2 2 8 8 14" />
    </svg>
)
const IconNext = () => (
    <svg viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="2 2 8 8 2 14" />
    </svg>
)
const IconCalendarCheck = () => (
    <svg className="cw-range-cal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="5" width="17" height="16" rx="3" />
        <path d="M8 2.5v4M16 2.5v4" />
        <path d="M8.5 13.5l2.5 2.5 4.5-5" />
    </svg>
)

/* ===================== 데이터 =====================
   poster 에 이미지 주소를 넣으면 포스터가, 비워두면 bg 색이 보여요. */
interface Watched {
    id: number
    title: string
    age: '12' | '15' | '19' | 'ALL'
    watchedAt: string
    date: string
    theater: string[]    // ['천호 4관'] 또는 ['판교 4DX관', '4DX'] (구분선으로 이어 붙임)
    tag: string
    poster?: string
}

const WATCHED: Watched[] = [
  // 1. 2023.04.22 ~ 2023.10.21
  {
    id: 1, title: '슈퍼 마리오 브라더스', age: 'ALL',
    watchedAt: '2023-05-05',
    date: '2023.05.05(금) 14:00~15:32', theater: ['용산아이파크몰 4관'], tag: '일반 2',
    poster: 'cgv/supermario.jpg',
  },
  {
    id: 2, title: '가디언즈 오브 갤럭시: Volume 3', age: '12',
    watchedAt: '2023-05-14',
    date: '2023.05.14(일) 16:30~19:00', theater: ['영등포 IMAX관'], tag: 'IMAX 2',
    poster: 'cgv/gadionz.png',
  },
  {
    id: 3, title: '범죄도시3', age: '15',
    watchedAt: '2023-06-08',
    date: '2023.06.08(목) 19:20~21:05', theater: ['천호 5관'], tag: '일반 2',
    poster: 'cgv/roundup3.png',
  },
  {
    id: 4, title: '엘리멘탈', age: 'ALL',
    watchedAt: '2023-06-25',
    date: '2023.06.25(일) 13:10~14:52', theater: ['영등포 1관'], tag: '일반 2',
    poster: 'cgv/elemental.png',
  },
  {
    id: 5, title: '미션 임파서블: 데드 레코닝 PART ONE', age: '15',
    watchedAt: '2023-07-22',
    date: '2023.07.22(토) 15:40~18:23', theater: ['용산아이파크몰 7관'], tag: '일반 2',
    poster: 'cgv/missionimpassible.png'
  },
  {
    id: 6, title: '밀수', age: '15',
    watchedAt: '2023-08-05',
    date: '2023.08.05(토) 17:00~19:09', theater: ['왕십리 3관'], tag: '일반 2',
    poster: 'cgv/milsu.png',
  },
  {
    id: 7, title: '콘크리트 유토피아', age: '15',
    watchedAt: '2023-08-19',
    date: '2023.08.19(토) 18:30~20:40', theater: ['천호 2관'], tag: '일반 2',
    poster: 'cgv/concreteUtopia.png',
  },

  // 2. 2023.10.22 ~ 2024.04.21
  {
    id: 8, title: '서울의 봄', age: '12',
    watchedAt: '2023-12-02',
    date: '2023.12.02(토) 14:20~16:41', theater: ['용산아이파크몰 15관'], tag: '일반 2',
    poster: 'cgv/seoul.png',
  },
  {
    id: 9, title: '노량: 죽음의 바다', age: '12',
    watchedAt: '2023-12-30',
    date: '2023.12.30(토) 16:00~18:33', theater: ['영등포 4DX관'], tag: '4DX 2',
    poster: 'cgv/norang.png',
  },
  {
    id: 10, title: '외계+인 2부', age: '12',
    watchedAt: '2024-01-20',    
    date: '2024.01.20(토) 15:10~17:12', theater: ['강남 1관'], tag: '일반 2',
    poster: 'cgv/alientwo.png',
  },
  {
    id: 11, title: '웡카', age: 'ALL',
    watchedAt: '2024-02-10',
    date: '2024.02.10(토) 13:00~14:56', theater: ['판교 IMAX관'], tag: 'IMAX 2',
    poster: 'cgv/wonka.png',
  },
  {
    id: 12, title: '파묘', age: '15',
    watchedAt: '2024-03-03',
    date: '2024.03.03(일) 19:00~21:14', theater: ['건대입구 4관'], tag: '일반 2',
    poster: 'cgv/pamo.png',
  },
  {
    id: 13, title: '듄: 파트 2', age: '12',
    watchedAt: '2024-03-10',
    date: '2024.03.10(일) 15:30~18:16', theater: ['용산아이파크몰 IMAX관'], tag: 'IMAX 2',
    poster: 'cgv/dune2.png',
  },

  // 3. 2024.04.22 ~ 2024.10.21
  {
    id: 14, title: '범죄도시4', age: '15',
    watchedAt: '2024-05-04',
    date: '2024.05.04(토) 17:20~19:09', theater: ['천호 1관'], tag: '일반 2',
    poster: 'cgv/roundup4.png',
  },
  {
    id: 15, title: '인사이드 아웃 2', age: 'ALL',
    watchedAt: '2024-06-22',
    date: '2024.06.22(토) 14:00~15:36', theater: ['판교 3관'], tag: '일반 2',
    poster: 'cgv/insideout2.png',
  },
  {
    id: 16, title: '탈주', age: '12',
    watchedAt: '2024-07-13',
    date: '2024.07.13(토) 16:10~17:44', theater: ['건대입구 3관'], tag: '일반 2',
    poster: 'cgv/tarju.png',
  },
  {
    id: 17, title: '데드풀과 울버린', age: '19',
    watchedAt: '2024-08-03',
    date: '2024.08.03(토) 20:00~22:08', theater: ['용산아이파크몰 IMAX관'], tag: 'IMAX 2',
    poster: 'cgv/DeadpoolandWolverine.png',
  },
  {
    id: 18, title: '파일럿', age: '12',
    watchedAt: '2024-08-11',
    date: '2024.08.11(일) 15:00~16:51', theater: ['강남 5관'], tag: '일반 2',
    poster: 'cgv/Pilot.png',
  },
  {
    id: 19, title: '베테랑2', age: '15',
    watchedAt: '2024-09-22',
    date: '2024.09.22(일) 18:10~20:08', theater: ['영등포 6관'], tag: '일반 2',
    poster: 'cgv/Veteran.png',
  },

  // 4. 2024.10.22 ~ 2025.04.21
  {
    id: 20, title: '글래디에이터 II', age: '19',
    watchedAt: '2024-11-23',
    date: '2024.11.23(토) 19:30~22:00', theater: ['용산아이파크몰 IMAX관'], tag: 'IMAX 2',
    poster: 'cgv/Gladiator2.png',
  },
{
    id: 21, title: '위키드', age: 'ALL',
    watchedAt: '2024-12-01',
    date: '2024.12.01(일) 14:00~16:40', theater: ['왕십리 4관'], tag: '일반 2',
    poster: 'cgv/wicked.png',
  },
  {
    id: 22, title: '소방관', age: '12',
    watchedAt: '2024-12-15',
    date: '2024.12.15(일) 16:20~18:06', theater: ['천호 3관'], tag: '일반 2',
    poster: 'cgv/firefighters.png',
  },
  {
    id: 23, title: '위키드', age: 'ALL',
    watchedAt: '2024-12-01',
    date: '2024.12.19(목) 12:00~14:40', theater: ['강남 1관'], tag: '일반 2',
    poster: 'cgv/wicked.png',
  },
  {
    id: 24, title: '무파사: 라이온 킹', age: 'ALL',
    watchedAt: '2024-12-28',
    date: '2024.12.28(토) 13:30~15:28', theater: ['영등포 1관'], tag: '일반 2',
    poster: 'cgv/mufasa.png',
  },
  {
    id: 25, title: '검은 수녀들', age: '15',
    watchedAt: '2025-02-02',
    date: '2025.02.02(일) 20:10~22:05', theater: ['천호 4관'], tag: '일반 2',
    poster: 'cgv/dark_nuns.png',
  },

  // 5. 2025.04.22 ~ 2025.10.21
  {
    id: 26, title: '미션 임파서블: 파이널 레코닝', age: '15',
    watchedAt: '2025-05-25',
    date: '2025.05.25(일) 15:00~17:40', theater: ['용산아이파크몰 IMAX관'], tag: 'IMAX 2',
    poster: 'cgv/mission_impossible_final_reckoning.png',
  },
  {
    id: 27, title: '드래곤 길들이기', age: 'ALL',
    watchedAt: '2025-06-21',
    date: '2025.06.21(토) 14:10~16:05', theater: ['판교 4DX관'], tag: '4DX 2',
    poster: 'cgv/how_to_train_your_dragon.png',
  },
  {
    id: 28, title: '슈퍼맨', age: '12',
    watchedAt: '2025-07-20',
    date: '2025.07.20(일) 16:00~18:15', theater: ['영등포 IMAX관'], tag: 'IMAX 2',
    poster: 'cgv/superman.png',
  },
  {
    id: 29, title: '연의 편지', age: 'ALL',
    watchedAt: '2025-10-11',
    date: '2025.10.11(토) 13:00~14:35', theater: ['강남 2관'], tag: '일반 2',
    poster: 'cgv/letter_from_yeon.png',
  },

  // 6. 2025.10.22 ~ 2026.04.21
  {
    id: 30, title: '주토피아 2', age: 'ALL',
    watchedAt: '2025-11-29',
    date: '2025.11.29(토) 14:30~16:20', theater: ['천호 3관'], tag: '일반 2',
    poster: 'cgv/zootopia2.png',
  },
  {
    id: 31, title: '위키드: 포 굿', age: 'ALL',
    watchedAt: '2025-11-30',
    date: '2025.11.30(일) 17:00~19:35', theater: ['용산아이파크몰 6관'], tag: '일반 2',
    poster: 'cgv/wicked_for_good.png',
  },
  {
    id: 32, title: '아바타: 불과 재', age: '12',
    watchedAt: '2025-12-27',
    date: '2025.12.27(토) 18:00~21:10', theater: ['용산아이파크몰 IMAX관'], tag: 'IMAX 2',
    poster: 'cgv/avatar_fire_and_ash.png',
  },
  {
    id: 33, title: '왕과 사는 남자', age: '12',
    watchedAt: '2026-02-04',
    date: '2026.05.25(월) 15:00~17:45', theater: ['용산아이파크몰 IMAX관'], tag: 'IMAX 2',
    poster: 'cgv/king.jpg',
  },

  // 7. 2026.04.22 ~ 2026.10.21
  {
    id: 34, title: '군체', age: '12',
    watchedAt: '2026-05-21',
    date: '2026.05.25(월) 15:00~17:45', theater: ['용산아이파크몰 IMAX관'], tag: 'IMAX 2',
    poster: 'cgv/colony.png',
  },
  {
    id: 35, title: '토이 스토리 5', age: 'ALL',
    watchedAt: '2026-06-27',
    date: '2026.06.27(토) 13:20~15:00', theater: ['강남 3관'], tag: '일반 5',
    poster: 'cgv/toy_story5.png',
  },
]

const PERIOD_START = Date.UTC(2025, 12, 15)
const PERIOD_END = Date.UTC(2026, 6, 14)
const OLDEST_PERIOD = 6

const shiftPeriod = (timestamp: number, period: number) => {
    const date = new Date(timestamp)
    date.setUTCMonth(date.getUTCMonth() - period * 6)
    return date
}

const formatDate = (date: Date) =>
    `${date.getUTCFullYear()}.${String(date.getUTCMonth() + 1).padStart(2, '0')}.${String(date.getUTCDate()).padStart(2, '0')}`

/* ===================== 내가 본 영화 페이지 ===================== */
export const CgvWatched = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [period, setPeriod] = useState(0)
    const startDate = shiftPeriod(PERIOD_START, period)
    const endDate = shiftPeriod(PERIOD_END, period)
    const startTime = startDate.getTime()
    const endTime = endDate.getTime() + 24 * 60 * 60 * 1000
    const watchedMovies = WATCHED.filter((movie) => {
        const watchedTime = new Date(`${movie.watchedAt}T00:00:00Z`).getTime()
        return watchedTime >= startTime && watchedTime < endTime
    })

    return (
        <div className="kk-wrapper cw-wrapper">
            <KakaoStatusBar time="4:23" battery={74} />

            {/* 상단 바 */}
            <div className="cw-appbar">
                <button className="cw-icon-btn back" onClick={() => navigate(getBackDestination(location.pathname), { replace: true })}><IconBack /></button>
                <button className="cw-icon-btn home" onClick={() => navigate(CGV_PATH.home)}><IconHome /></button>
                <div className="cw-appbar-title">내가 본 영화</div>
            </div>

            {/* 기간 */}
            <div className="cw-range">
                <button
                    className="cw-range-prev"
                    aria-label="이전 6개월"
                    disabled={period >= OLDEST_PERIOD}
                    onClick={() => setPeriod((current) => Math.min(current + 1, OLDEST_PERIOD))}
                >
                    <IconPrev />
                </button>
                <IconCalendarCheck />
                <span>{formatDate(startDate)} ~ {formatDate(endDate)}</span>
                <button
                    className="cw-range-next"
                    aria-label="다음 6개월"
                    disabled={period === 0}
                    onClick={() => setPeriod((current) => Math.max(current - 1, 0))}
                >
                    <IconNext />
                </button>
            </div>

            {/* 영화 카드 목록 */}
            <div className="cw-scroll">
                {watchedMovies.map((w) => (
                    <div className="cw-card" key={w.id}>
                        <div className="cw-top">
                            <CgvPoster src={w.poster} className="cw-poster" />
                            <div className="cw-info">
                                <div className="cw-title">
                                    <span>{w.title}</span>
                                    <AgeBadge age={w.age} />
                                </div>
                                <div className="cw-date">{w.date}</div>
                                <div className="cw-theater">
                                    {w.theater.map((t, i) => (
                                        <span key={i} style={{ display: 'contents' }}>
                                            {i > 0 && <i className="cw-sep" />}
                                            <span>{t}</span>
                                        </span>
                                    ))}
                                </div>
                                <span className="cw-tag">{w.tag}</span>
                            </div>
                            <button className="cw-menu"><i /><i /><i /></button>
                        </div>
                        <button className="cw-review">
                            <span>관람하신 영화, 어떠셨나요?</span>
                            <span>실관람평을 남겨주세요.</span>
                        </button>
                    </div>
                ))}
                {watchedMovies.length === 0 && <div className="cw-empty">이 기간에 관람한 영화가 없습니다.</div>}
            </div>
        </div>
    )
}
export default CgvWatched