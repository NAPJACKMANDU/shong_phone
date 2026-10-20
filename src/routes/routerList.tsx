import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import {
    KAKAOCHATLIST_PATH,
    MAIN_PATH
} from "./index.ts"
import LockScreen from "../page/lockScreen.tsx"
import HomeScreen from "../page/homeScreen.tsx"
import KakaoChatList from "../page/kakaochatlist.tsx"
import KakaoFriends from "../page/kakaofriends.tsx"

const PhoneScreen = () => {
    const [unlocked, setUnlocked] = useState(false)

    return (
        <div className="screen-stage">
            <HomeScreen />
            {!unlocked && <LockScreen onSuccess={() => setUnlocked(true)} />}
        </div>
    )
}

export const RouterSetting = () => {
     return (
        <Routes>
            <Route path={MAIN_PATH()} element={<PhoneScreen />}></Route>
            <Route path={KAKAOCHATLIST_PATH()} element={<KakaoChatList/>}></Route>
             <Route path={KAKAOCHATLIST_PATH()} element={<KakaoFriends/>}></Route>
        </Routes>
        )
}
 export default RouterSetting;