export default function SettingsLoading() {
  return (
    <div className="flex flex-col items-center justify-start w-full min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="w-full max-w-2xl bg-transparent border-none shadow-none">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-14 w-14 rounded-full bg-muted-foreground/20 animate-pulse" />

          <div className="space-y-2">
            <div className="h-6 w-40 bg-muted-foreground/20 rounded animate-pulse" />
            <div className="h-4 w-64 bg-muted-foreground/20 rounded animate-pulse" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col space-y-1">
            <div className="h-4 w-12 bg-muted-foreground/20 rounded animate-pulse" />
            <div className="h-10 w-full bg-muted-foreground/20 rounded animate-pulse" />
          </div>

          <div className="flex flex-col space-y-1">
            <div className="h-4 w-14 bg-muted-foreground/20 rounded animate-pulse" />
            <div className="h-10 w-full bg-muted-foreground/20 rounded animate-pulse" />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-muted-foreground/20 animate-pulse" />
            <div className="h-4 w-40 bg-muted-foreground/20 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
