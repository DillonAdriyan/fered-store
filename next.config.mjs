let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
}

<<<<<<< HEAD
if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig

  for (const key in config) {
=======
mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
>>>>>>> 05328758480f2ca0e80c357fdbd5c34d986925b5
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
<<<<<<< HEAD
        ...config[key],
      }
    } else {
      nextConfig[key] = config[key]
=======
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
>>>>>>> 05328758480f2ca0e80c357fdbd5c34d986925b5
    }
  }
}

export default nextConfig
