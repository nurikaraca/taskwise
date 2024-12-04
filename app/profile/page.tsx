import Profile from '@/components/account/Profile'
import { auth } from "@/auth"; 
const ProfilePage =async () => {
  const session = await auth(); 
  return (
    <div className='flex h-[36rem]  '>
     <Profile />
    </div>
  )
}
export default ProfilePage