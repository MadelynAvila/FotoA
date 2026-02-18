import { useState, useEffect } from "react"

export default function Home() {

  /* =========================
     ARRAY DE IMÁGENES Y VIDEOS
     👉 Solo agrega más objetos aquí
  ========================== */
  const mediaItems = [
    { type: "video", src: "/video/imagen2.mp4", col: "col-span-2 md:col-span-3", row: "row-span-2" },
    { type: "image", src: "/img/imagen3.jpg", col: "col-span-2 md:col-span-3", row: "row-span-2" },
    { type: "image", src: "/img/imagen4.jpg" },
    { type: "image", src: "/img/imagen5.jpg", col: "col-span-2", row: "row-span-2" },
    { type: "image", src: "/img/imagen6.jpg" },
    { type: "image", src: "/img/imagen7.jpg" },
    { type: "video", src: "/video/imagen8.mp4", row: "row-span-2" },
    { type: "image", src: "/img/imagen9.jpg" },
    { type: "image", src: "/img/imagen10.jpg" },
    { type: "image", src: "/img/imagen11.jpg", col: "col-span-2" },
    { type: "image", src: "/img/imagen12.jpg", row: "row-span-2" },
    { type: "image", src: "/img/imagen13.jpg" },
    { type: "image", src: "/img/imagen14.jpg" },
    { type: "image", src: "/img/imagen15.jpg" }

  ]

  /* =========================
     ESTADO DEL LIGHTBOX
  ========================== */
  const [selectedIndex, setSelectedIndex] = useState(null)

  const selectedMedia = selectedIndex !== null ? mediaItems[selectedIndex] : null

  /* =========================
     NAVEGACIÓN CON TECLADO
     ESC = cerrar
     ← → = navegar
  ========================== */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return

      if (e.key === "Escape") {
        setSelectedIndex(null)
      }

      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev + 1) % mediaItems.length)
      }

      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex, mediaItems.length])

  /* =========================
     FUNCIONES DE NAVEGACIÓN
  ========================== */
  const nextMedia = (e) => {
    e.stopPropagation()
    setSelectedIndex((prev) => (prev + 1) % mediaItems.length)
  }

  const prevMedia = (e) => {
    e.stopPropagation()
    setSelectedIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length)
  }

  return (
    <div>

      {/* =========================
         HERO PRINCIPAL
      ========================== */}
      <section className="w-full">
        <div className="w-full h-[80vh] overflow-hidden">
          <img
            src="/img/imagen1.jpg"
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* =========================
         COLLAGE DINÁMICO
      ========================== */}
      <section className="p-0 md:p-1">
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2 auto-rows-[160px] grid-flow-dense">

          {mediaItems.map((item, index) => (
            <div
              key={index}
              className={`relative overflow-hidden cursor-pointer group ${item.col || ""} ${item.row || ""}`}
              onClick={() => setSelectedIndex(index)}
            >

              {item.type === "image" ? (
                <img
                  src={item.src}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <video
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"   // 👈 permite que cargue vista previa
                  poster="/img/preview.jpg" // 👈 opcional (miniatura mientras carga)
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

              )}

            </div>
          ))}

        </div>
      </section>

      {/* =========================
         LIGHTBOX FULLSCREEN
      ========================== */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelectedIndex(null)}
        >

          {/* BOTÓN CERRAR */}
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={() => setSelectedIndex(null)}
          >
            ✕
          </button>

          {/* FLECHA IZQUIERDA */}
          <button
            className="absolute left-5 text-white text-4xl"
            onClick={prevMedia}
          >
            ‹
          </button>

          {/* CONTENIDO (IMAGEN O VIDEO) */}
          {selectedMedia.type === "image" ? (
            <img
              src={selectedMedia.src}
              className="max-w-[90%] max-h-[90%] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <video
              src={selectedMedia.src}
              controls
              autoPlay
              className="max-w-[90%] max-h-[90%] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          )}

          {/* FLECHA DERECHA */}
          <button
            className="absolute right-5 text-white text-4xl"
            onClick={nextMedia}
          >
            ›
          </button>

        </div>
      )}

    </div>
  )
}
