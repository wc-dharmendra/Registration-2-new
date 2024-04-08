
import { Inter } from 'next/font/google';
import Header from '@/Components/Header/Header';

const inter = Inter({ subsets: ['latin'], display: 'swap', adjustFontFallback: false })

const EventLayout = ({ children }) => {
    return (
        <div className={`min-h-screen bg-[#F9F9F9] ${inter.className}`}>
            <div className="container lg:w-[820px] lg:w-[820px] mx-auto px-4">
                <Header />
            </div>
            {children}
        </div>
    )
}
export default EventLayout;