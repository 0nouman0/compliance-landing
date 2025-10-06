export function Stats() {
  const stats = [
    { value: "40+", label: "Global Standards" },
    { value: "99.8%", label: "Accuracy Rate" },
    { value: "10x", label: "Faster Reviews" },
    { value: "500K+", label: "Documents Analyzed" },
  ]

  return (
    <section className="border-y border-border/40 bg-card/30 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
