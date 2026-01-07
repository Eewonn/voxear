import { NavigationMenuHeader} from "@/components/header/header"

export default function Home() {
  return (
    <div>
    <NavigationMenuHeader/>
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <main className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Voxear</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Your project starts here.
        </p>
      </main>
    </div>
    </div>
  );
}
