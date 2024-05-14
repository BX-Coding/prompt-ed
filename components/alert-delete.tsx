import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { deleteUser, getAuth } from "firebase/auth";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
  
  export function AlertDelete() {
    const router = useRouter();
    const deleteAccount = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user !== null) {
        deleteUser(user).then(() => {
            toast({title: "Account Successfully Deleted"});
            router.push("/");
        }).catch((error) => {
            toast({
                title: "Account Timeout",
                description: "Please login then try again"
              });
              console.log(error);
              router.push("/login");
        });
        }
    }
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete Account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteAccount}>Yes, Delete Account</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  