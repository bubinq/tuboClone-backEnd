import { axiosInstance } from '../utils'
import { useContext, useEffect } from 'react'
import { NavigationContext } from '../contexts/navigationContext'
import { UsersContext } from '../contexts/usersContext'
import { VideoContext } from '../contexts/videosContext'
import { VideoCard } from './VideoCard'

export const Main = () => {
    const {videos, setVideos} = useContext(VideoContext)
    const {users, setUsers} = useContext(UsersContext)
    const {toggleSideMenu} = useContext(NavigationContext)

    useEffect(() => {
        const getVideos = async () => {
            const response = await axiosInstance.get('/video')
            const listOfUsers = await axiosInstance.get('/user')
            setUsers(listOfUsers.data)
            setVideos(response.data)
        }
        getVideos()
    // eslint-disable-next-line
    }, [])
    return (
        <main>
            <div className={toggleSideMenu? "contentWrapper" : "contentWrapperToggle"}>
                {videos &&
                    videos.map(video => <VideoCard key={video._id} video={video} users={users}></VideoCard>)
                }
            </div>
        </main>
    )
}