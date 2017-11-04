export class Sound {
    id: string;
    name: string;
    link: string;
    createdAt: Date;
    is_favorite: boolean;

  constructor(sound: Sound) {
    this.id = sound.id;
    this.name = sound.name;
    this.link = sound.link;
    this.createdAt = sound.createdAt;
    this.is_favorite = sound.is_favorite;
  }
}
