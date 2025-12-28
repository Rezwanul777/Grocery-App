import { auth } from "@/auth";
import EditRoleMobile from "@/components/EditRoleMobile";
import connectToDatabase from "@/lib/db";
import User from "@/models/user.model";
import { redirect } from "next/navigation";


async function Home() {
  await connectToDatabase();
  const session= await auth()
  const user= await User.findById(session?.user?.id);
  if(!user){
    redirect('/login');
  }
  const inComplete=!user.name || !user.role || (!user.mobile && user.role=="user");
  if(inComplete){
   return <EditRoleMobile/>
  }
  return (
    <div>
     
    </div>
  );
}
export default Home;