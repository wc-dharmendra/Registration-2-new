import { Inter, Lato, Montserrat, Noto_Serif_Georgian, Poppins, Raleway, Roboto } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap', adjustFontFallback: false });
const roboto = Roboto({ weight: '500', subsets: ['latin'], display: 'swap', adjustFontFallback: false });
const raleway = Raleway({ subsets: ['latin'], display: 'swap', adjustFontFallback: false });
const poppins = Poppins({ weight: '500', subsets: ['latin'], display: 'swap', adjustFontFallback: false });
const montserrat = Montserrat({ weight: '500', subsets: ['latin'], display: 'swap', adjustFontFallback: false });
const lato = Lato({ weight: '700', subsets: ['latin'], display: 'swap', adjustFontFallback: false });
const georgia = Noto_Serif_Georgian({ subsets: ['latin'], display: 'swap', adjustFontFallback: false });

export const FontList = [
    { name: 'default', fontFamily: inter, icon: "AgFont" },
    { name: 'roboto', fontFamily: roboto, icon: "AgFactoriaFont" },
    { name: 'raleway', fontFamily: raleway, icon: "AgIvyPprestoFont" },
    { name: 'poppins', fontFamily: poppins, icon: "AgIvyModeFont" },
    { name: 'montserrat', fontFamily: montserrat, icon: "AgAlverataFont" },
    { name: 'lato', fontFamily: lato, icon: "AgRocGroteskFont" },
    { name: 'georgia', fontFamily: georgia, icon: "AgMuseoFont" },
];

