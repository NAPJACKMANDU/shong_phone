import { useEffect, useState } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import {
    CALENDARMAIN_PATH,
    CGVHOME_PATH,
    CGVMORE_PATH,
    CGVWATCHED_PATH,
    HOMESCREEN_PATH,
    KAKAOCHATLIST_PATH,
    KAKAOCHATROOM_PATH,
    KAKAOFRIENDS_PATH,
    KAKAOMEMO_PATH,
    KAKAOMEMOROOM_PATH,
    KAKAOMORE_PATH,
    MAIN_PATH,
    MESSAGESCHAT_PATH,
    MESSAGESLIST_PATH,
    PHONEFAVORITES_PATH,
    PHONERECENTS_PATH,
    PHONEVOICEMAIL_PATH,
    PHOTOSCOLLECTIONS_PATH,
    PHOTOSLIBRARY_PATH
} from "./index.ts"
import LockScreen from "../page/lockScreen.tsx"
import HomeScreen from "../page/homeScreen.tsx"
import KakaoChatList from "../page/kakaoTalk/kakaochatlist.tsx"
import KakaoFriends from "../page/kakaoTalk/kakaofriends.tsx"
import KakaoChatRoom from "../page/kakaoTalk/kakaoChatRoom.tsx"
import KakaoMore from "../page/kakaoTalk/kakaoMore.tsx"
import KakaoNotification from "../page/kakaoTalk/kakaoNotification.tsx"
import type { KakaoNoticeMsg } from "../page/kakaoTalk/kakaoNotification.tsx"
import KakaoMemo from "../page/memo/kakaoMemo.tsx"
import PhotosLibrary from "../page/photo/photosLibrary.tsx"
import PhotosCollections from "../page/photo/photosCollections.tsx"
import CgvHome from "../page/cgv/cgvHome.tsx"
import CgvMore from "../page/cgv/cgvmore.tsx"
import CgvWatched from "../page/cgv/cgvwatched.tsx"
import MessagesList from "../page/message/messageslist.tsx"
import MessagesChat from "../page/message/messageschat.tsx"
import PhoneFavorites from "../page/calling/phonefavorites.tsx"
import PhoneRecents from "../page/calling/phonerecents.tsx"
import PhoneVoicemail from "../page/calling/phonevoicemail.tsx"
import KakaoMemoRoom from "../page/memo/kakaomemoroom.tsx"
import CalendarMain from "../page/calendar/calendarmain.tsx"

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
                        onSuccess={(destination) => {
                            setUnlocked(true)
                            navigate(destination ?? HOMESCREEN_PATH())
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
                        <Route path={KAKAOMEMOROOM_PATH()} element={<KakaoMemoRoom/>}></Route>
                        <Route path={PHONEVOICEMAIL_PATH()} element={<PhoneVoicemail/>}></Route>
                        <Route path={PHOTOSLIBRARY_PATH()} element={<PhotosLibrary/>}></Route>
                        <Route path={PHOTOSCOLLECTIONS_PATH()} element={<PhotosCollections/>}></Route>
                        <Route path={CGVHOME_PATH()} element={<CgvHome/>}></Route>
                        <Route path={CGVMORE_PATH()} element={<CgvMore/>}></Route>
                        <Route path={CGVWATCHED_PATH()} element={<CgvWatched/>}></Route>
                        <Route path={MESSAGESLIST_PATH()} element={<MessagesList/>}></Route>
                        <Route path={MESSAGESCHAT_PATH()} element={<MessagesChat/>}></Route>
                        <Route path={PHONEFAVORITES_PATH()} element={<PhoneFavorites/>}></Route>
                        <Route path={PHONERECENTS_PATH()} element={<PhoneRecents/>}></Route>
                        <Route path={PHONEVOICEMAIL_PATH()} element={<PhoneVoicemail/>}></Route>
                        <Route path={CALENDARMAIN_PATH()} element={<CalendarMain/>}></Route>
                    </Routes>
                </>
            )}
        </>
    )
}

export default RouterSetting