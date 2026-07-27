/**
 * Batch-compress marketing images to WebP alongside originals.
 * Run: node scripts/compress-images.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const imgDir = path.join(root, 'src', 'img')

/** @typedef {{ input: string, output: string, width?: number, height?: number, quality?: number, fit?: keyof sharp.FitEnum }} Job */

/** @type {Job[]} */
const jobs = [
  // Priority: cursor / easter-egg / loading coin — small WebP, well under 20KB
  {
    input: 'coinicon.png',
    output: 'coinicon.webp',
    width: 128,
    height: 128,
    quality: 80,
    fit: 'contain',
  },
  // Hero backgrounds — long edge ≤ 2000px
  {
    input: path.join('website background', 'image1.jpeg'),
    output: path.join('website background', 'image1.webp'),
    width: 2000,
    quality: 78,
  },
  {
    input: path.join('website background', 'image2.jpeg'),
    output: path.join('website background', 'image2.webp'),
    width: 2000,
    quality: 78,
  },
  // Section photos — sized near display use
  { input: 'tykerkid.png', output: 'tykerkid.webp', width: 800, quality: 78 },
  { input: 'family.png', output: 'family.webp', width: 1200, quality: 78 },
  { input: 'classroom.png', output: 'classroom.webp', width: 1200, quality: 78 },
  { input: 'bossntyker.png', output: 'bossntyker.webp', width: 500, quality: 80 },
  { input: 'belizeflagwave.png', output: 'belizeflagwave.webp', width: 1600, quality: 75 },
  // Logos — no SVG source available; WebP at display-scale
  { input: 'moneytykeslogo.png', output: 'moneytykeslogo.webp', width: 512, quality: 85 },
  { input: 'moneytykesweblogo.png', output: 'moneytykesweblogo.webp', width: 800, quality: 85 },
]

async function run() {
  for (const job of jobs) {
    const inputPath = path.join(imgDir, job.input)
    const outputPath = path.join(imgDir, job.output)
    if (!fs.existsSync(inputPath)) {
      console.warn('skip missing', job.input)
      continue
    }

    let pipeline = sharp(inputPath)
    const meta = await pipeline.metadata()
    const resize = {}
    if (job.width != null && job.height != null) {
      resize.width = job.width
      resize.height = job.height
      resize.fit = job.fit ?? 'inside'
      resize.withoutEnlargement = true
    } else if (job.width != null) {
      const longEdge = Math.max(meta.width ?? 0, meta.height ?? 0)
      if (longEdge > job.width) {
        if ((meta.width ?? 0) >= (meta.height ?? 0)) {
          resize.width = job.width
        } else {
          resize.height = job.width
        }
        resize.withoutEnlargement = true
      }
    }

    if (Object.keys(resize).length) {
      pipeline = pipeline.resize(resize)
    }

    await pipeline.webp({ quality: job.quality ?? 80 }).toFile(outputPath)

    const inStat = fs.statSync(inputPath)
    const outStat = fs.statSync(outputPath)
    const outMeta = await sharp(outputPath).metadata()
    console.log(
      `${job.input} → ${job.output}: ${(inStat.size / 1024).toFixed(0)}KB → ${(outStat.size / 1024).toFixed(1)}KB (${outMeta.width}x${outMeta.height})`,
    )
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
