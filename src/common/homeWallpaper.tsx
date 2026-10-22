export const HomeWallpaper = ({ className }: { className: string }) => (
    <svg
        className={className}
        viewBox="0 0 390 844"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    >
        <defs>
            <linearGradient id="bg-base" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#4a0b1f" />
                <stop offset="0.12" stopColor="#5a0d1c" />
                <stop offset="0.2" stopColor="#9a1b14" />
                <stop offset="0.3" stopColor="#e8302a" />
                <stop offset="1" stopColor="#e8302a" />
            </linearGradient>
            <radialGradient id="bg-dark" cx="0" cy="0.1" r="0.6">
                <stop offset="0" stopColor="#2c0627" stopOpacity="0.95" />
                <stop offset="1" stopColor="#2c0627" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="bg-orange" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#ee6a35" />
                <stop offset="0.5" stopColor="#f0a63c" />
                <stop offset="1" stopColor="#f2b24c" />
            </linearGradient>
            <radialGradient id="bg-peach" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#f2a597" stopOpacity="0.9" />
                <stop offset="1" stopColor="#f2a597" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="bg-magenta" gradientUnits="userSpaceOnUse" x1="0" y1="440" x2="0" y2="730">
                <stop offset="0" stopColor="#c458d8" />
                <stop offset="0.3" stopColor="#dd4fc8" />
                <stop offset="0.5" stopColor="#ee52b5" />
                <stop offset="0.75" stopColor="#d44ad8" />
                <stop offset="1" stopColor="#8f60e6" />
            </linearGradient>
            <linearGradient id="bg-cyan" gradientUnits="userSpaceOnUse" x1="390" y1="560" x2="120" y2="820">
                <stop offset="0" stopColor="#f2fdff" />
                <stop offset="0.45" stopColor="#8aeaff" />
                <stop offset="1" stopColor="#5fc2ff" />
            </linearGradient>
        </defs>
        <rect width="390" height="844" fill="url(#bg-base)" />
        <rect width="390" height="844" fill="url(#bg-dark)" />
        <path d="M95 440 C190 365 290 270 390 205 L390 470 C340 440 290 455 230 455 C170 457 130 440 95 440 Z" fill="url(#bg-orange)" />
        <ellipse cx="370" cy="410" rx="90" ry="85" fill="url(#bg-peach)" />
        <path d="M0 438 C50 428 110 452 200 452 C270 452 330 440 390 470 V844 H0 Z" fill="url(#bg-magenta)" />
        <path d="M0 700 C80 738 190 738 250 692 C310 646 360 600 390 560 V844 H0 Z" fill="url(#bg-cyan)" />
    </svg>
)
