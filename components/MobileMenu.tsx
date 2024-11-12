import { auth } from "@/auth";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image";
import Link from "next/link";
import Logout from "./auth/Logout";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";


const MobileMenu = async () => {
    const session = await auth();
    return (
        <Sheet>
            <SheetTrigger>
            <HamburgerMenuIcon/>
            </SheetTrigger>
            <SheetContent className='text-white'>
            <SheetTitle>Taskwise </SheetTitle>
                
                    <div className="flex flex-col space-y-5 mt-8  items-center flex-3 gap-x-5">
                        {
                            session && <Link href="/dashboard">
                                Dashboard
                            </Link>
                        }
                        {!session?.user ? (
                            <Link href="/sign-in">
                                <div className=" text-white text-sm px-4 py-2 rounded-sm">
                                    Login
                                </div>
                            </Link>
                        ) : (
                            <>
                                <div className="flex items-center gap-x-2 text-sm">
                                    {session?.user?.name}
                                    {session?.user.image && (
                                        <Image
                                            className='rounded-full'
                                            width={30}
                                            height={30}
                                            alt='User Avatar'
                                            src={session?.user?.image || ""}
                                        />
                                    )}
                                </div>
                                <Logout />
                            </>
                        )}
                    </div>

                
            </SheetContent>
        </Sheet>
    )
}

export default MobileMenu