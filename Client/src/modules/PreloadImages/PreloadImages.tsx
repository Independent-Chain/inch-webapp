import { ReactNode } from 'react';
import { Helmet } from 'react-helmet';


const iconsOtherPreload: string[] = [
   '/qrCode.svg',
   '/coin.png',
   '/coin.webp',
]
const iconsUiPreload: string[] = [
   '/ui-icons/arrow-right-stroke-rounded.svg',
   '/ui-icons/arrow-up-right-stroke-rounded.svg',
   '/ui-icons/coins-stroke-rounded.svg',
   '/ui-icons/en.svg',
   '/ui-icons/flash-stroke-rounded.svg',
   '/ui-icons/home-stroke-rounded.svg',
   '/ui-icons/information-circle-stroke-rounded.svg',
   '/ui-icons/notification-stroke-rounded.svg',
   '/ui-icons/ru.svg',
   '/ui-icons/settings-stroke-rounded.svg',
   '/ui-icons/square-arrow-up-double-stroke-rounded.svg',
   '/ui-icons/task-stroke-rounded.svg',
   '/ui-icons/user-square-stroke-rounded.svg',
   '/ui-icons/premium-true.svg',
   '/ui-icons/premium-false.svg',
   '/ui-icons/ton.svg'
];
const iconsTasksPreload: string[] = [
   '/tasks-icons/telegram.svg',
   '/tasks-icons/instagram.svg',
   '/tasks-icons/youtube.svg',
   '/tasks-icons/bingx.svg',
]

interface ComponentProps { }

const PreloadImages = ({ }: ComponentProps): ReactNode => (
   <Helmet>
      {
         iconsOtherPreload.map((src, index) => (
            <link key={ index } rel="preload" href={ src } as="image" />
         ))
      }
      {
         iconsUiPreload.map((src, index) => (
            <link key={ index } rel="preload" href={ src } as="image" />
         ))
      }
      {
         iconsTasksPreload.map((src, index) => (
            <link key={ index } rel="preload" href={ src } as="image" />
         ))
      }
   </Helmet>
)

export default PreloadImages;
