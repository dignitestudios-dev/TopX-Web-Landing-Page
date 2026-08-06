/**
 * Static stand-in for TopicSortScene.
 *
 * Shown on reduced-motion, low-end and no-WebGL devices, and while the 3D
 * chunk loads. It renders the *sorted* end state, so the fallback still
 * communicates the same idea as the animation it replaces.
 */
export function TileGridFallback() {
  const columns = [
    { tone: "bg-blaze", label: "Climate" },
    { tone: "bg-ink-soft", label: "Film" },
    { tone: "bg-blaze-amber", label: "Cycling" },
    { tone: "bg-blaze-deep", label: "Cooking" },
  ];

  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <div className="grid w-full max-w-2xl grid-cols-4 gap-3 px-6">
        {columns.map((column, col) => (
          <div key={column.label} className="space-y-3">
            {Array.from({ length: 5 }, (_, row) => (
              <div
                key={row}
                className={`h-10 rounded-[2px] sm:h-12 ${
                  (col + row) % 5 === 2 ? "bg-bone-dim" : column.tone
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
