"use client"

import * as React from "react"

import {useState} from 'react';
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {  createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword  } from 'firebase/auth'
import { auth } from '../app/firebase'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface ResetFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function StylisticPreviews() {
  return (
    <div className="relative">
      <div className="absolute space-y-[13px] overflow-clip">
        <div className="mt-[-169px] ml-[94px] mr-[64px] flex max-xl:flex-col xl:flex-row gap-3 items-end">
          <div className="flex flex-col xl:w-1/2">
            <img className="rounded-md" alt="Cool image" src="https://s3-alpha-sig.figma.com/img/d7b4/efdd/381b11b86264093a8f7f3a6ee4c73f50?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aG366r7n6H-eADx-rtzrVEReNQz1u6St8qVmWGDfvB1XqMXFa6LSTSo-nMgTmsFXVnUwLVpyqTTCXGQ2ztCq2JxEGAM9te8dDqgbIHnSG9mae1loAodlTI1mcxcbZ5k931JuuAaLT7WCIE~LNgNunefkGV5O1uH8dan2lrRS0UlNeXL1oLTy7WHygc4INpBNqP2KCHKzhJUMu3LA7F0OGdT5q4du4juj6MhVVHpSVWgyEzP6D9B8rQS2TEYYCUvEzHHs3ZHcK6o3GhKAoHAtU0MtLzUKA2MzTIKY40J0eyrv1ZJ4PftwDeioU-ir4TFneT9bszGDMVbjGJtgg6X8-A__" />
            <p className="text-text-t2 text-sm">Edoardo Giudici...</p>
          </div>
          <div className="flex flex-col xl:w-1/2">
            <img className="rounded-md" alt="Cool image" src="https://s3-alpha-sig.figma.com/img/cd2e/c6a5/c3ec4037a21864ef1aac6ce109bf6278?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qozzxxJQmyn1Qmw1IQwo5eOjQxwqcVEtV7kQkhlOUKfR5rGNnDsvZn-PkPVE~e13VZFtsEmPD~adodzod-UTtHoSQIBfn5O-F9t6pz-urck7sZ8TYAuLgYxFQmguFhHzGe99ZUYRJlsZfyRO9F5LOw0rddjWp01FCm8HM-SViDKWEwl~J6hodWO8M3Y37DgtAlVtriOEntxS5PyB12e2YVX0AhVVViy2CZn3sWbzkWMWYUyzJnwKUqL7R7wm5YJx8NrrnzRWYBttPxdOX4iAzphyMvniilkpQEHInwb3bN06Rx-aqJw57b0F7J83DPfuuB8zC7DYtXxhkSjt3EjlUg__" />
            <p className="text-text-t2 text-sm">Yuri Krupenin</p>
          </div>
        </div>
        <div className="mt-[-169px] ml-[94px] mr-[64px] flex max-xl:flex-col xl:flex-row gap-3">
          <div className="flex flex-col xl:w-1/2">
            <img className="rounded-md" alt="Cool image" src="https://s3-alpha-sig.figma.com/img/374b/3d5f/ff0beebeb47a960e889ff3f4fa00d092?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k8oyXF~Doko8RLxRQahhU9l9-lwftwpa5Yp-wcmbvSN7b8zlYVcHn05GDjU9gdPLoT3-zACZZpOoUfzCI44cXRdYYO5k5fiRJU2rkvElPziHpKyFrbULws0LZn3XEWaZOBhYgou-4H31-u4ToYaTMw6zRmbOXjOR7Tt5VI2VR2rsQTQZ~PJAc55u-PsmyUOlBGwTEJ76trDSWPQ8F23kdIfNRN1xBPbtFWSjB4BS-xca3HGAmyLsjcicqTEEk9FCqnrstpcgbm42XfwBn59M7mVh9XzzT8NOVg0m0JtyHcmclmJcyC8Ty326HuQUJrvERTkZF~QF~CVgXMiCSLJmLA__" />
            <p className="text-text-t2 text-sm">Patrick Konior</p>
          </div>
          <div className="flex flex-col xl:w-1/2">
            <img className="rounded-md" alt="Cool image" src="https://s3-alpha-sig.figma.com/img/2d45/13d1/6ebfb79b669257ddbddc6de96fc525f4?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gcLJ93jHLxdStkpq4Z1QSuZ92G2ruI3BBlx0KzvWnLgcOJKHEyEttH9HgxPrYPLDrM6dXc8JtlP7N1EKu6-FWI2H-4hWtUjfhsy2jhDn16WTvNe9g7ZE3C4fggNZEQ0FaqZcliSAEv3sEZYXQcC8RhVuAkgjb8gA-11cxST3EjCSZQ51r3RgIWmrpzPSDNSw5c-MjKyRcnHeWdyUcvgLJcVjAQ7Rv-r04YGLm5XCfJ1BMYx4dKxs87wI6yGnMncO5FqfhMD1~UaEdfg~X1RJyLbDCKRPQ~vdEQGbx-1Ilu08so8amLgLHvlLhPJZIaVOy9Yx340cmmb0jrR1J2ONcw__" />
            <p className="text-text-t2 text-sm">Denley Jones</p>
          </div>
        </div>
        <div className="mt-[-169px] ml-[94px] mr-[64px] flex max-xl:flex-col xl:flex-row gap-3">
          <div className="flex flex-col w-full">
            <img className="rounded-md object-cover" alt="Cool image" src="https://s3-alpha-sig.figma.com/img/595a/cfab/7d0b62a224b455a527a3cc1eb1408df4?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S1nc7rkpGV6~OfT7CXxAtV0SuDh7OnShY2Yp8ktpH9IG6N6Jh~JVEZtS3pkK6hBTUy2GJPpE7S7rk5EeQvMhh0I0l7CZAVLCeitDYxX7KEueS6sEQHq0sqROBhuyAGHN11Rpi9Zv~rlaruTtr~~sM55i45Mvg2sWdec-oPJDJF76UyT~jHpRwPOR7BUq5Bp7U2Zh-y8eWeCaxdw2Q7DEO~1FKbJ73qKM90jYYBKTVYLODZbOOPGVJCeJrufRTv7NRjkhMruGDZEqEO1KYbVfI0QQmNeZoMVHSLQ9JI3y2Bc577qrord0S9jnM97EPPBbFZyCQCQmtFjI8wBh~HtHUw__" />
            <p className="text-text-t2 text-sm">Edoardo Giudici...</p>
          </div>
        </div>
        <div className="mt-[-169px] ml-[94px] mr-[64px] flex max-xl:flex-col xl:flex-row gap-3">
          <div className="flex flex-col xl:w-1/2">
            <img className="rounded-md" alt="Cool image" src="https://s3-alpha-sig.figma.com/img/d2a2/70fe/ee06922b30596b3ce23ea9497ac7632b?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=As-lsdmOJ~umbpdR6l~XpdsF8JwUjsNEeHzKc89BkbX5QtGNyyiy9fNEkl2NNFi-l08K94gQEn0GhMnG93myxAeLXD1AGM6GTtwSLsQUaqKYzKBN4dAqEi29SfJzgLnbD-WwFy0ojDBjnp4D-YRgRBU2ldfNrZVOIvmUXBsKJLKwDWl-SHGrNLKpqkuL36gVAnF-xYjwoMqus2WQ7K8wAupBaibEEtKBgiOYPR8gy8k6x8jzcTiAskLPcjoX7L9Xn2iQklIq9Fvz~PcZK0cZ3BtErL~f545mUkweAUn0w2p8lB1o7gYQFSYsFpzsYSHJcGYiaDBaRKnZV7yNktCK0A__" />
            <p className="text-text-t2 text-sm">Patrick Konior</p>
          </div>
          <div className="flex flex-col xl:w-1/2">
            <img className="rounded-md" alt="Cool image" src="https://s3-alpha-sig.figma.com/img/6af0/8842/39519aae66bfacaf94647aac3e509303?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iUhV6mEpaQzqu-4xRix4Jdeps7Tuqx9R~XkzNjE9m8xi-kGH73LRfEvts3OrDBQzLbyMfovqbUT8wRT0cT9JirJ60MbSEsyGSLMpBcx0EFOVRJGneKhIww~qrFyiTKkwEdv8DMCPz8C2a9x73UbQxYEGjGFBRktBNekmgFxHyXVU-bK4z9DuqG-mlNodP8GbcWVJle4EEiyECbkAVkf-wrUAvumMAFdnvrpmjvz74CJoeDgBJuTFUkdCIy5JS96LsZyIjjbK6xdHed-44iN1tsB6vsSZa2amZim~Rm1T9NtwYSz39zgu8pzmfhl8NicH~HnpGrUv1dlBj4wjy0866g__" />
            <p className="text-text-t2 text-sm">Denley Jones</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  async function onSubmitCreate(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      router.push("/login");
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      console.log(errorCode);
      console.log(error);
      toast({
        title: "Oops, something's not right",
        description: "Account already exists with this email. Please login instead.",
      });
    })
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <>
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={onSubmitCreate}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder=""
                type="password"
                autoCapitalize="none"
                autoComplete="none"
                autoCorrect="off"
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button variant="accent" size="lg" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign Up with Email
            </Button>
          </div>
        </form>
      </div>
    <Toaster />
    </>
  )
}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      router.push("/home");
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      toast({
        title: "Oops, something's not right",
        description: "Invalid login. Please try again or reset password",
      });
    })
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <>
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder=""
                type="password"
                autoCapitalize="none"
                autoComplete="none"
                autoCorrect="off"
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Link
                href="/password-reset"
                className="underline underline-offset-4 hover:text-primary"
              >
                Forgot Password?
              </Link>{" "}
            <Button variant="accent" size="lg" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Login
            </Button>
          </div>
        </form>
      </div>
      <Toaster />
    </>
  )
}

export function ResetForm({ className, ...props }: ResetFormProps) {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    await sendPasswordResetEmail(auth, email).then(() => {
      router.push("/login");
      setIsLoading(false);
      toast({
        title: "Email Sent!",
        description: "Please check email for reset link in a few minutes.",
      });
    }).catch((error) => {
      setIsLoading(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      toast({
        title: "Oops, something's not right",
        description: "There is no account associated with that email.",
      });
    })
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <>
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Send Reset Email
            </Button>
          </div>
        </form>
      </div>
      <Toaster />
    </>
  )
}