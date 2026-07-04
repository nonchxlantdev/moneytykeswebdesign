import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { phoneScreens } from '@/data/stats'
import coinIcon from '@/img/coinicon.png'

function Phone({
  position,
  rotation,
  screen,
}: {
  position: [number, number, number]
  rotation: number
  screen: (typeof phoneScreens)[0]
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={[0, rotation, 0.1]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh>
          <boxGeometry args={[0.7, 1.4, 0.08]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[0.62, 1.22]} />
          <meshStandardMaterial
            color={screen.color}
            emissive={screen.color}
            emissiveIntensity={0.35}
          />
        </mesh>
        <mesh position={[0, 0.6, 0.05]}>
          <boxGeometry args={[0.2, 0.03, 0.02]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
      </Float>
    </group>
  )
}

function FloatingCoin({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null)
  const texture = useTexture(coinIcon)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 2
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <circleGeometry args={[0.15, 32]} />
      <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  )
}

function Scene() {
  const phones = useMemo(
    () =>
      phoneScreens.map((screen, i) => ({
        screen,
        position: [
          Math.cos((i / phoneScreens.length) * Math.PI * 2) * 2.2,
          Math.sin(i * 0.5) * 0.3,
          Math.sin((i / phoneScreens.length) * Math.PI * 2) * 2.2,
        ] as [number, number, number],
        rotation: (i / phoneScreens.length) * Math.PI * 2,
      })),
    [],
  )

  const coins = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4,
        ] as [number, number, number],
        key: i,
      })),
    [],
  )

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#0FAF9C" />
      <pointLight position={[-5, -3, 3]} intensity={0.5} color="#FFD54A" />

      {phones.map((p) => (
        <Phone key={p.screen.id} position={p.position} rotation={p.rotation} screen={p.screen} />
      ))}

      {coins.map((c) => (
        <FloatingCoin key={c.key} position={c.position} />
      ))}
    </>
  )
}

export function PhoneCarousel3D() {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2 px-4">
        {phoneScreens.map((screen) => (
          <span
            key={screen.id}
            className="px-2 py-1 rounded-full text-[10px] font-semibold glass text-ink-muted dark:text-white/85"
          >
            {screen.label}
          </span>
        ))}
      </div>
    </div>
  )
}
