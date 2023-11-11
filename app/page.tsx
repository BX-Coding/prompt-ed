import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-24 bg-primary">
      <Image
        src="logo.svg"
        alt="Prompt Ed logo"
        className='animate-bounce'
        width={200}
        height={200}
      />
      <h1 className="text-xl font-bold text-center text-primary-foreground m-5">
        Prompt Ed Coming Soon 🚀
      </h1>
    </main>
  )
}
