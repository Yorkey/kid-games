const audioSources = {
  'score': 'https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3',
  'congrats': 'https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3',
}

export const playAudio = (sourceId: keyof typeof audioSources) => {
  const audio = new Audio(audioSources[sourceId]);
  audio.play();
}
