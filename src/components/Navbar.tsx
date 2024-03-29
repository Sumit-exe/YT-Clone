
import {AiOutlineSearch , AiOutlineClose} from 'react-icons/ai'
import {TiMicrophone} from 'react-icons/ti'
import {BsYoutube , BsCameraVideo , BsBell} from 'react-icons/bs'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoAppsSharp} from 'react-icons/io5'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { changeSearchTerm, clearSearchTerm, clearVideos } from '../store'
import { getSearchPageVideos } from '../store/reducers/getSearchPageVideos'


export default function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const searchTerm = useAppSelector((state)=> state.youtubeApp.searchTerm);
    console.log('st : ', searchTerm)
    
    const handleSearch = ()=>{
        if(location.pathname!=='/search') navigate('/search');
        else{
            dispatch(clearVideos())
            dispatch(getSearchPageVideos(false))
        }
    }

  return (
    <div className='flex justify-between items-center px-14 max-md:px-5 gap-3 max-md:px-6 h-14 bg-[#212121] opacity-95 sticky z-50'>
        <div className="flex gap-8 items-center text-2xl ">
            <div className='max-xl:hidden'>
                <GiHamburgerMenu/>
            </div>
            <Link to='/'>
                <div className="flex gap-1 items-center justify-center">
                    <BsYoutube className="text-3xl text-red-600"/>
                    <span className='text-2xl font-medium max-md:hidden'>YouTube</span>
                </div>
            </Link>
        </div>
        <div className="flex justify-center items-center gap-5">
            <form onSubmit={(e)=>{
                e.preventDefault();
                handleSearch();
            }}>

                <div className="flex bg-zinc-900 h-10 items-center px-4 pr-0">
                    <div className="flex gap-5 items-center pr-5">
                        <div>
                            <AiOutlineSearch className="text-xl"/>
                        </div>
                        <input 
                        type="text"  
                        className='w-96 bg-zinc-900 focus:outline-none border-none max-xl:max-w-32'
                        value={searchTerm}
                        onChange={e=>dispatch(changeSearchTerm(e.target.value))}
                        />
                        
                        <AiOutlineClose  
                        className={`text-xl  cursor-pointer ${!searchTerm ? 'invisible' : 'visible'}`}
                        onClick={()=>dispatch(clearSearchTerm())}
                        />
                    </div>
                    <button  className="h-10 w-16 flex justify-center items-center bg-zinc-800 max-md:w-10">
                        <AiOutlineSearch className="text-xl"/>
                    </button>
                </div>

            </form>
            <div className='text-xl p-3 bg-zinc-900 rounded-full max-lg:hidden'>
                <TiMicrophone/>
            </div>
        </div>
        <div className='flex gap-5 items-center text-xl max-xl:hidden'>
            <BsCameraVideo />
            <IoAppsSharp />
            <div className="relative">
                <BsBell/>
                <span className='absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1'>
                    9+
                </span>
            </div>
            <img src="https://yt3.ggpht.com/ytc/AIf8zZRfiJdWid07icXERt-G4Pk-6lIn9zCmr8xAiQtUqg=s176-c-k-c0x00ffffff-no-rj" alt="logo"
            className='w-9 h-9 rounded-full'    
            />
        </div>
    </div>
  )
}
