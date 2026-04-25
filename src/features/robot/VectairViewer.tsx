import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Center, Bounds } from '@react-three/drei'
import { Suspense } from 'react'
import { SpringFadeIn } from '@/components/motion/SpringFadeIn'
import { GlassCard } from '@/components/ui/GlassCard'
import { RotateCw } from 'lucide-react'

import { useGLTF } from '@react-three/drei'

/** Real Vectair robot CAD model */
function VectairModel({ exploded: _exploded }: { exploded: boolean }) {
  // Load the highly optimized Draco GLTF model from the public directory
  const { scene } = useGLTF('/models/vectair-draco.glb')

  return (
    <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {/* Center automatically calculates bounding box and shifts origin to the middle */}
      <Center>
        <primitive object={scene} scale={1} />
      </Center>
    </group>
  )
}

// Preload the model for faster viewing
useGLTF.preload('/models/vectair-draco.glb')

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" castShadow />
      <pointLight position={[-4, 3, -2]} intensity={2} color="#0044ff" />
      <pointLight position={[4, 2, 3]} intensity={1.5} color="#ff5e00" />
      <pointLight position={[0, -3, 0]} intensity={0.5} color="#00d4ff" />
      <Environment preset="city" />
      <Bounds fit clip observe margin={1.3}>
        <VectairModel exploded={false} />
      </Bounds>
      <OrbitControls
        enableZoom={false}
        enablePan={true}
        minDistance={0.5}
        maxDistance={50}
        autoRotate={false}
        makeDefault
      />
    </>
  )
}

export function VectairViewer() {
  return (
    <section id="vectair-viewer" className="relative z-10 py-24" aria-label="Vectair 3D model viewer">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-brand-electric/30 to-transparent" aria-hidden />

      <div className="container mx-auto px-6">
        <SpringFadeIn>
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.35em] text-brand-electric">
              3D Model
            </span>
            <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
              Vectair · Interactive
            </h2>
            <p className="mt-3 text-text-muted max-w-lg mx-auto">
              Drag to rotate and explore the mechanical architecture.
            </p>
          </div>
        </SpringFadeIn>

        <SpringFadeIn delay={0.1}>
          <GlassCard
            glowColor="#0044ff"
            className="relative overflow-hidden p-0"
            interactive={false}
          >
            {/* Controls bar */}
            <div
              className="flex items-center justify-between border-b px-5 py-3"
              style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
            >
              <div className="flex items-center gap-2">
                <RotateCw className="h-3.5 w-3.5 text-brand-electric" aria-hidden />
                <span className="text-xs font-bold text-white/40">Drag to rotate</span>
              </div>
            </div>

            {/* Canvas */}
            <div
              className="relative h-[480px] md:h-[600px]"
              style={{ background: 'radial-gradient(ellipse at center, #050a1f 0%, #030712 100%)' }}
            >
              {/* Corner HUD decorations */}
              {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, i) => (
                <div
                  key={i}
                  className={`absolute ${pos} h-4 w-4 pointer-events-none`}
                  style={{
                    borderTop: i < 2 ? '1px solid rgba(0,212,255,0.3)' : 'none',
                    borderBottom: i >= 2 ? '1px solid rgba(0,212,255,0.3)' : 'none',
                    borderLeft: i % 2 === 0 ? '1px solid rgba(0,212,255,0.3)' : 'none',
                    borderRight: i % 2 === 1 ? '1px solid rgba(0,212,255,0.3)' : 'none',
                  }}
                  aria-hidden
                />
              ))}

              <Suspense fallback={
                <div className="flex h-full items-center justify-center text-white/20 text-sm">
                  Loading 3D model…
                </div>
              }>
                <Canvas
                  shadows
                  camera={{ position: [0, 0, 5], fov: 45 }}
                  gl={{ antialias: true, alpha: true }}
                >
                  <Scene />
                </Canvas>
              </Suspense>
            </div>
          </GlassCard>
        </SpringFadeIn>
      </div>
    </section>
  )
}
