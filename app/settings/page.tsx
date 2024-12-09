import Settings from "@/components/settings/Settings";

import { auth } from "@/auth"; 
const SettingsPage =async () => {
  const session = await auth(); 
  return (
    <div className='flex h-[41rem]  '>
     <Settings />
    </div>
  )
}
export default SettingsPage