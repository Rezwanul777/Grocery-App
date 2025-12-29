import { auth } from "@/auth";
import AdminDashBoard from "@/components/AdminDashBoard";
import DeliveryBoyDashboard from "@/components/DeliveryBoyDashboard";
import EditRoleMobile from "@/components/EditRoleMobile";
import Nav from "@/components/Nav";
import UserDashboard from "@/components/UserDashboard";
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

  const plainUser= JSON.parse(JSON.stringify(user));
  return (
    <div>
     <Nav user={plainUser}/>
     {
      user.role==="user" ? <UserDashboard/> : 
      user.role==="admin" ? <AdminDashBoard/> :
      <DeliveryBoyDashboard/>
     }
    </div>
  );
}
export default Home;