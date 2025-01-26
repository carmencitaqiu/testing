const ColumnViewIcon = ({ fill }) => {
    return (
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_369_22460)">
                <rect x="10" y="8" width="28" height="28" rx="4" fill={fill} />
                <path
                    d="M20.6667 15.3333H31.5V17H20.6667V15.3333ZM17.75 17.4167C17.0596 17.4167 16.5 16.857 16.5 16.1667C16.5 15.4763 17.0596 14.9167 17.75 14.9167C18.4404 14.9167 19 15.4763 19 16.1667C19 16.857 18.4404 17.4167 17.75 17.4167ZM17.75 23.25C17.0596 23.25 16.5 22.6903 16.5 22C16.5 21.3097 17.0596 20.75 17.75 20.75C18.4404 20.75 19 21.3097 19 22C19 22.6903 18.4404 23.25 17.75 23.25ZM17.75 29C17.0596 29 16.5 28.4403 16.5 27.75C16.5 27.0597 17.0596 26.5 17.75 26.5C18.4404 26.5 19 27.0597 19 27.75C19 28.4403 18.4404 29 17.75 29ZM20.6667 21.1667H31.5V22.8333H20.6667V21.1667ZM20.6667 27H31.5V28.6667H20.6667V27Z"
                    fill="black"
                    fillOpacity="0.85"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_369_22460"
                    x="0"
                    y="0"
                    width="48"
                    height="48"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="5" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_369_22460" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_369_22460" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};
export default ColumnViewIcon;
