export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 animate-ping border border-turquoise/40 opacity-75" />
          <div className="flex h-full w-full items-center justify-center border border-turquoise bg-surface">
            <span className="h-3 w-3 animate-pulse bg-turquoise" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="font-mono text-xs font-semibold tracking-wider text-turquoise uppercase">
            Yükleniyor // RUNTIME_INITIALIZING
          </span>
          <span className="text-xs text-quiet">
            Algoritma ve bileşen ağacı hazırlanıyor...
          </span>
        </div>
      </div>
    </div>
  );
}
