
import { auth } from '@/auth'
import AccountMenu from './AccountMenu';
const Account = async () => {
  const session = await auth();
  if (!session || !session.user) {
    return <span>Loading...</span>; 
  }

  const {  email, name, image } = session.user; 

  return ( 
    <>
    {session ? (
      <AccountMenu email={email ?? ""} name={name ?? ""}    image={image ?? undefined} />
    ) : (
      <span>Loading...</span>
    )}
  </>
   
  )
}

export default Account

