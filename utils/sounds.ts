import { IS_BROWSER } from "$fresh/runtime.ts";

export class SoundManager {
  private static instance: SoundManager;
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private initialized = false;

  private constructor() {
    if (IS_BROWSER) {
      this.sounds = {
        complete: new Audio("/sounds/complete.mp3"),
      };

      // Pré-carregar os sons
      Object.values(this.sounds).forEach(audio => {
        audio.load();
        audio.volume = 0.5; // 50% do volume
      });
    }
  }

  static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  async init() {
    if (this.initialized) return;
    
    try {
      // Tenta reproduzir e pausar imediatamente para inicializar
      // Isso ajuda em navegadores que precisam de interação do usuário
      await Promise.all(
        Object.values(this.sounds).map(async (audio) => {
          try {
            await audio.play();
            audio.pause();
            audio.currentTime = 0;
          } catch {
            console.log("Audio needs user interaction first");
          }
        })
      );
      
      this.initialized = true;
    } catch (e) {
      console.error("Failed to initialize audio:", e);
    }
  }

  play(soundName: 'complete' | 'undo') {
    if (!IS_BROWSER || !this.sounds[soundName]) return;

    const audio = this.sounds[soundName];
    audio.currentTime = 0; // Reinicia o som para permitir plays rápidos
    audio.play().catch(e => console.log("Couldn't play audio:", e));
  }
}
