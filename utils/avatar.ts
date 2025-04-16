/**
 * Gets a random avatar URL from a collection of realistic face avatars
 * @param seed An optional seed to ensure consistent avatar selection
 * @returns A URL to a realistic face avatar
 */
export function getAvatarUrl(seed?: string): string {
  // Collection of realistic avatar URLs
  const avatars = [
    "/images/warm-smile-portrait.png",
    "https://randomuser.me/api/portraits/women/1.jpg",
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
    "https://randomuser.me/api/portraits/women/3.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg",
    "https://randomuser.me/api/portraits/women/4.jpg",
    "https://randomuser.me/api/portraits/men/4.jpg",
    "https://randomuser.me/api/portraits/women/5.jpg",
    "https://randomuser.me/api/portraits/men/5.jpg",
    "https://randomuser.me/api/portraits/women/6.jpg",
    "https://randomuser.me/api/portraits/men/6.jpg",
    "https://randomuser.me/api/portraits/women/7.jpg",
    "https://randomuser.me/api/portraits/men/7.jpg",
  ]

  if (seed) {
    // Use the seed to deterministically select an avatar
    const seedNumber = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return avatars[seedNumber % avatars.length]
  }

  // Return a random avatar if no seed is provided
  return avatars[Math.floor(Math.random() * avatars.length)]
}

/**
 * Gets the warm smile portrait avatar
 * @returns The URL to the warm smile portrait avatar
 */
export function getWarmSmileAvatar(): string {
  return "/images/warm-smile-portrait.png"
}

/**
 * Gets the professional portrait avatar for the main user
 * @returns The URL to the professional portrait avatar
 */
export function getProfessionalPortraitAvatar(): string {
  return "/images/professional-portrait.png"
}
