import { useEffect, useState } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import {
    HOMESCREEN_PATH,
    KAKAOCHATLIST_PATH,
    KAKAOCHATROOM_PATH,
    KAKAOFRIENDS_PATH,
    KAKAOMEMO_PATH,
    KAKAOMORE_PATH,
    MAIN_PATH,
    PhotosLibrary_PATH
} from "./index.ts"
import LockScreen from "../page/lockScreen.tsx"
import HomeScreen from "../page/homeScreen.tsx"
import KakaoChatList from "../page/kakaochatlist.tsx"
import KakaoFriends from "../page/kakaofriends.tsx"
import KakaoChatRoom from "../page/kakaoChatRoom.tsx"
import KakaoMore from "../page/kakaoMore.tsx"
import KakaoNotification from "../page/kakaoNotification.tsx"
import type { KakaoNoticeMsg } from "../page/kakaoNotification.tsx"
import KakaoMemo from "../page/kakaoMemo.tsx"
import PhotosLibrary from "../page/photosLibrary.tsx"

export const RouterSetting = () => {
    const [unlocked, setUnlocked] = useState(false)
    const [notifications, setNotifications] = useState<KakaoNoticeMsg[]>([])
    const location = useLocation()
    const navigate = useNavigate()

    // 잠금 해제 후 5초 뒤 알림 표시
    useEffect(() => {
        if (!unlocked) return
        const timer = window.setTimeout(() => {
            setNotifications([{
                id: 1,
                sender: "앤토니",
                text: "형.. 저 한국 도착했어요 지금 비행기에서 내려요 바로 형 집 가도 되나요? 형 집에 없어도 기다릴게요 보고 싶어 죄송해요",
                time: "방금",
            }])
        }, 5000)
        return () => window.clearTimeout(timer)
    }, [unlocked])

    // 뒤로가기 제스처 처리
    useEffect(() => {
        let touchStart: { pointerId: number; x: number; y: number } | null = null

        const handlePointerDown = (event: PointerEvent) => {
            if (event.pointerType !== "touch" || event.clientX > 32) return
            touchStart = {
                pointerId: event.pointerId,
                x: event.clientX,
                y: event.clientY
            }
        }

        const handlePointerUp = (event: PointerEvent) => {
            if (!touchStart || event.pointerId !== touchStart.pointerId) return

            const deltaX = event.clientX - touchStart.x
            const deltaY = Math.abs(event.clientY - touchStart.y)
            touchStart = null

            if (deltaX < 70 || deltaX < deltaY * 1.5) return

            const pathname = location.pathname
            const chatRoomPath = KAKAOCHATROOM_PATH()
            const isChatRoom = pathname === chatRoomPath || pathname.startsWith(`${chatRoomPath}/`)

            if (isChatRoom) {
                // 1. 채팅방 안에서는 무조건 채팅 목록으로 이동
                navigate(KAKAOCHATLIST_PATH(), { replace: true })
            } else if (pathname !== HOMESCREEN_PATH() && pathname !== MAIN_PATH()) {
                // 2. 채팅방이 아닌 다른 모든 화면(챗리스트, 친구목록, 설정 등)에서는 어디서 왔든 무조건 홈 화면으로 이동
                navigate(HOMESCREEN_PATH(), { replace: true })
            }
        }

        const handlePointerCancel = () => {
            touchStart = null
        }

        window.addEventListener("pointerdown", handlePointerDown, { passive: true })
        window.addEventListener("pointerup", handlePointerUp, { passive: true })
        window.addEventListener("pointercancel", handlePointerCancel, { passive: true })

        return () => {
            window.removeEventListener("pointerdown", handlePointerDown)
            window.removeEventListener("pointerup", handlePointerUp)
            window.removeEventListener("pointercancel", handlePointerCancel)
        }
    }, [location.pathname, navigate])

    return (
        <>
            {!unlocked && (
                <div className="screen-stage">
                    <HomeScreen showStatusBar={false} />
                    <LockScreen
                        onSuccess={() => {
                            setUnlocked(true)
                            navigate(HOMESCREEN_PATH()) // 잠금 해제 후 홈 화면으로 이동
                        }}
                        showStatusBar={false}
                    />
                </div>
            )}
            {unlocked && (
                <>
                    <KakaoNotification
                        messages={notifications}
                        onClear={() => setNotifications([])}
                    />
                    <Routes>
                        <Route path={MAIN_PATH()} element={<HomeScreen showStatusBar={true}/>}></Route>
                        <Route path={HOMESCREEN_PATH()} element={<HomeScreen showStatusBar={true}/>}></Route>
                        <Route path={KAKAOCHATLIST_PATH()} element={<KakaoChatList/>}></Route>
                        <Route path={KAKAOFRIENDS_PATH()} element={<KakaoFriends/>}></Route>
                        <Route path={`${KAKAOCHATROOM_PATH()}/:chatId?`} element={<KakaoChatRoom/>}></Route>
                        <Route path={KAKAOMORE_PATH()} element={<KakaoMore/>}></Route>
                        <Route path={KAKAOMEMO_PATH()} element={<KakaoMemo/>}></Route>
                        <Route path={PhotosLibrary_PATH()} element={<PhotosLibrary/>}></Route>
                    </Routes>
                </>
            )}
        </>
    )
}

export default RouterSetting