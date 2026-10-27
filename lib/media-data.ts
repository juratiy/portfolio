export type MediaText={en:string;uz:string};
export type MediaItem={id:string;type:"photo"|"video";url:string;poster?:string;title:MediaText;alt:MediaText;tags:string[];date:string;duration?:number;sourceUrl:string;sourceCaption:string;captionInherited?:boolean;attribution:MediaText;shared:boolean;redacted?:boolean;sourceFile:string;projectId?:string;note?:MediaText};
export const mediaGroups=[
  {
    "id": "all",
    "label": {
      "en": "All albums",
      "uz": "Barcha albomlar"
    }
  },
  {
    "id": "photography",
    "label": {
      "en": "Photography",
      "uz": "Fotografiya"
    }
  },
  {
    "id": "blender",
    "label": {
      "en": "Blender / 3D",
      "uz": "Blender / 3D"
    }
  },
  {
    "id": "gym",
    "label": {
      "en": "Gym & sport",
      "uz": "Gym va sport"
    }
  },
  {
    "id": "learning",
    "label": {
      "en": "School & learning",
      "uz": "Maktab va ta’lim"
    }
  },
  {
    "id": "moments",
    "label": {
      "en": "Travel & moments",
      "uz": "Sayohat va lahzalar"
    }
  },
  {
    "id": "inspiration",
    "label": {
      "en": "Inspiration",
      "uz": "Ilhom"
    }
  }
];
// Owner-supplied channel exports; imported captions and source credits stay attached.
export const mediaItems:MediaItem[]=[
  {
    "id": "personal-01",
    "type": "photo",
    "url": "/assets/edex/school-life.jpg",
    "title": {
      "en": "A school-day milestone",
      "uz": "Maktabdagi yutuq"
    },
    "alt": {
      "en": "A school-day milestone",
      "uz": "Maktabdagi yutuq"
    },
    "tags": [
      "learning"
    ],
    "date": "2026-04-11T00:27:51",
    "sourceUrl": "https://t.me/juratss/9",
    "sourceCaption": "“Our first success with my students”🏆",
    "captionInherited": false,
    "attribution": {
      "en": "School moment from a forwarded teacher post.",
      "uz": "Ustozning kanalga ulashilgan postidan maktab lavhasi."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "personal/photo_1@11-04-2026_00-27-51.jpg"
  },
  {
    "id": "personal-02",
    "type": "photo",
    "url": "/assets/archive/personal-02.jpg",
    "title": {
      "en": "The road home",
      "uz": "Uyga qaytish yo‘li"
    },
    "alt": {
      "en": "The road home",
      "uz": "Uyga qaytish yo‘li"
    },
    "tags": [
      "photography"
    ],
    "date": "2026-04-11T18:24:29",
    "sourceUrl": "https://t.me/juratss/14",
    "sourceCaption": "East or west \nHome the best 🕊",
    "captionInherited": false,
    "attribution": {
      "en": "Photograph from my personal channel.",
      "uz": "Shaxsiy kanalimdagi surat."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "personal/photo_2@11-04-2026_18-24-29.jpg"
  },
  {
    "id": "personal-03",
    "type": "photo",
    "url": "/assets/archive/personal-03.jpg",
    "title": {
      "en": "Blue sky, open fields",
      "uz": "Moviy osmon, ochiq dalalar"
    },
    "alt": {
      "en": "Blue sky, open fields",
      "uz": "Moviy osmon, ochiq dalalar"
    },
    "tags": [
      "photography"
    ],
    "date": "2026-04-11T18:24:29",
    "sourceUrl": "https://t.me/juratss/15",
    "sourceCaption": "East or west \nHome the best 🕊",
    "captionInherited": true,
    "attribution": {
      "en": "Photograph from my personal channel.",
      "uz": "Shaxsiy kanalimdagi surat."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "personal/photo_3@11-04-2026_18-24-29.jpg"
  },
  {
    "id": "personal-04",
    "type": "photo",
    "url": "/assets/journal/from-home.jpg",
    "title": {
      "en": "Home, in green",
      "uz": "Yam-yashil uy tomon"
    },
    "alt": {
      "en": "Home, in green",
      "uz": "Yam-yashil uy tomon"
    },
    "tags": [
      "photography"
    ],
    "date": "2026-04-11T18:24:29",
    "sourceUrl": "https://t.me/juratss/16",
    "sourceCaption": "East or west \nHome the best 🕊",
    "captionInherited": true,
    "attribution": {
      "en": "Photograph from my personal channel.",
      "uz": "Shaxsiy kanalimdagi surat."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "personal/photo_4@11-04-2026_18-24-29.jpg"
  },
  {
    "id": "personal-05",
    "type": "photo",
    "url": "/assets/archive/personal-05.jpg",
    "title": {
      "en": "Lines across the field",
      "uz": "Dala chiziqlari"
    },
    "alt": {
      "en": "Lines across the field",
      "uz": "Dala chiziqlari"
    },
    "tags": [
      "photography"
    ],
    "date": "2026-04-11T18:24:29",
    "sourceUrl": "https://t.me/juratss/17",
    "sourceCaption": "East or west \nHome the best 🕊",
    "captionInherited": true,
    "attribution": {
      "en": "Photograph from my personal channel.",
      "uz": "Shaxsiy kanalimdagi surat."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "personal/photo_5@11-04-2026_18-24-29.jpg"
  },
  {
    "id": "personal-06",
    "type": "photo",
    "url": "/assets/archive/personal-06.jpg",
    "title": {
      "en": "Out in the open",
      "uz": "Ochiq havoda"
    },
    "alt": {
      "en": "Out in the open",
      "uz": "Ochiq havoda"
    },
    "tags": [
      "photography"
    ],
    "date": "2026-04-11T18:24:29",
    "sourceUrl": "https://t.me/juratss/18",
    "sourceCaption": "East or west \nHome the best 🕊",
    "captionInherited": true,
    "attribution": {
      "en": "Photograph from my personal channel.",
      "uz": "Shaxsiy kanalimdagi surat."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "personal/photo_6@11-04-2026_18-24-29.jpg"
  },
  {
    "id": "personal-07",
    "type": "photo",
    "url": "/assets/archive/personal-07.jpg",
    "title": {
      "en": "A reminder to take a chance",
      "uz": "Tavakkal qilish haqida eslatma"
    },
    "alt": {
      "en": "A reminder to take a chance",
      "uz": "Tavakkal qilish haqida eslatma"
    },
    "tags": [
      "inspiration"
    ],
    "date": "2026-04-12T18:12:44",
    "sourceUrl": "https://t.me/juratss/19",
    "sourceCaption": "🧠",
    "captionInherited": false,
    "attribution": {
      "en": "Shared image from my channel; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan rasm; eksportda asl muallif ko‘rsatilmagan."
    },
    "shared": true,
    "redacted": false,
    "sourceFile": "personal/photo_7@12-04-2026_18-12-44.jpg"
  },
  {
    "id": "personal-08",
    "type": "photo",
    "url": "/assets/archive/personal-08.jpg",
    "title": {
      "en": "Start messy",
      "uz": "Boshlashdan qo‘rqma"
    },
    "alt": {
      "en": "Start messy",
      "uz": "Boshlashdan qo‘rqma"
    },
    "tags": [
      "inspiration"
    ],
    "date": "2026-04-12T18:12:44",
    "sourceUrl": "https://t.me/juratss/20",
    "sourceCaption": "🧠",
    "captionInherited": true,
    "attribution": {
      "en": "Shared image from my channel; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan rasm; eksportda asl muallif ko‘rsatilmagan."
    },
    "shared": true,
    "redacted": false,
    "sourceFile": "personal/photo_8@12-04-2026_18-12-44.jpg"
  },
  {
    "id": "personal-09",
    "type": "photo",
    "url": "/assets/archive/personal-09.jpg",
    "title": {
      "en": "A line worth keeping",
      "uz": "Yodda qolgan satr"
    },
    "alt": {
      "en": "A line worth keeping",
      "uz": "Yodda qolgan satr"
    },
    "tags": [
      "inspiration"
    ],
    "date": "2026-04-12T18:12:44",
    "sourceUrl": "https://t.me/juratss/22",
    "sourceCaption": "🧠",
    "captionInherited": true,
    "attribution": {
      "en": "Shared image from my channel; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan rasm; eksportda asl muallif ko‘rsatilmagan."
    },
    "shared": true,
    "redacted": false,
    "sourceFile": "personal/photo_9@12-04-2026_18-12-44.jpg"
  },
  {
    "id": "personal-10",
    "type": "photo",
    "url": "/assets/archive/personal-10.jpg",
    "title": {
      "en": "A note about the climb",
      "uz": "Cho‘qqi sari eslatma"
    },
    "alt": {
      "en": "A note about the climb",
      "uz": "Cho‘qqi sari eslatma"
    },
    "tags": [
      "inspiration"
    ],
    "date": "2026-04-12T18:12:44",
    "sourceUrl": "https://t.me/juratss/23",
    "sourceCaption": "🧠",
    "captionInherited": true,
    "attribution": {
      "en": "Shared image from my channel; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan rasm; eksportda asl muallif ko‘rsatilmagan."
    },
    "shared": true,
    "redacted": false,
    "sourceFile": "personal/photo_10@12-04-2026_18-12-44.jpg"
  },
  {
    "id": "personal-11",
    "type": "photo",
    "url": "/assets/journal/exploring-uzbekistan.jpg",
    "title": {
      "en": "A day of discovery",
      "uz": "Kashfiyot kuni"
    },
    "alt": {
      "en": "A day of discovery",
      "uz": "Kashfiyot kuni"
    },
    "tags": [
      "photography"
    ],
    "date": "2026-04-20T07:55:12",
    "sourceUrl": "https://t.me/juratss/59",
    "sourceCaption": "Islamic sivilization centre 🕊",
    "captionInherited": false,
    "attribution": {
      "en": "Photograph from my personal channel.",
      "uz": "Shaxsiy kanalimdagi surat."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "personal/photo_11@20-04-2026_07-55-12.jpg"
  },
  {
    "id": "personal-12",
    "type": "photo",
    "url": "/assets/archive/personal-12.jpg",
    "title": {
      "en": "Nurafshon in bloom",
      "uz": "Gullagan Nurafshon"
    },
    "alt": {
      "en": "Nurafshon in bloom",
      "uz": "Gullagan Nurafshon"
    },
    "tags": [
      "photography"
    ],
    "date": "2026-04-27T17:33:42",
    "sourceUrl": "https://t.me/juratss/63",
    "sourceCaption": "Every random turn in Nurafshon 🕊",
    "captionInherited": false,
    "attribution": {
      "en": "Photograph from my personal channel.",
      "uz": "Shaxsiy kanalimdagi surat."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "personal/photo_12@27-04-2026_17-33-42.jpg"
  },
  {
    "id": "personal-13",
    "type": "photo",
    "url": "/assets/journal/nurafshon-meadow.jpg",
    "title": {
      "en": "Room for the sky",
      "uz": "Osmonga joy"
    },
    "alt": {
      "en": "Room for the sky",
      "uz": "Osmonga joy"
    },
    "tags": [
      "photography"
    ],
    "date": "2026-04-27T17:33:42",
    "sourceUrl": "https://t.me/juratss/64",
    "sourceCaption": "Every random turn in Nurafshon 🕊",
    "captionInherited": true,
    "attribution": {
      "en": "Photograph from my personal channel.",
      "uz": "Shaxsiy kanalimdagi surat."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "personal/photo_13@27-04-2026_17-33-42.jpg",
    "projectId": "nurafshon-golden-hour"
  },
  {
    "id": "personal-14",
    "type": "photo",
    "url": "/assets/archive/personal-14.jpg",
    "title": {
      "en": "A quiet turn in Nurafshon",
      "uz": "Nurafshondagi sokin burilish"
    },
    "alt": {
      "en": "A quiet turn in Nurafshon",
      "uz": "Nurafshondagi sokin burilish"
    },
    "tags": [
      "photography"
    ],
    "date": "2026-04-27T17:33:42",
    "sourceUrl": "https://t.me/juratss/65",
    "sourceCaption": "Every random turn in Nurafshon 🕊",
    "captionInherited": true,
    "attribution": {
      "en": "Photograph from my personal channel.",
      "uz": "Shaxsiy kanalimdagi surat."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "personal/photo_14@27-04-2026_17-33-42.jpg"
  },
  {
    "id": "personal-15",
    "type": "photo",
    "url": "/assets/archive/personal-15.jpg",
    "title": {
      "en": "Among the yellow flowers",
      "uz": "Sariq gullar orasida"
    },
    "alt": {
      "en": "Among the yellow flowers",
      "uz": "Sariq gullar orasida"
    },
    "tags": [
      "photography"
    ],
    "date": "2026-04-27T17:33:43",
    "sourceUrl": "https://t.me/juratss/67",
    "sourceCaption": "Every random turn in Nurafshon 🕊",
    "captionInherited": true,
    "attribution": {
      "en": "Photograph from my personal channel.",
      "uz": "Shaxsiy kanalimdagi surat."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "personal/photo_15@27-04-2026_17-33-43.jpg"
  },
  {
    "id": "personal-16",
    "type": "photo",
    "url": "/assets/archive/personal-16.jpg",
    "title": {
      "en": "A little channel humour",
      "uz": "Kanaldan biroz hazil"
    },
    "alt": {
      "en": "A little channel humour",
      "uz": "Kanaldan biroz hazil"
    },
    "tags": [
      "inspiration"
    ],
    "date": "2026-05-03T14:38:05",
    "sourceUrl": "https://t.me/juratss/77",
    "sourceCaption": "I'm arabic 😂🌺🕊\n\nPeople fall in love\nI fall in trouble 😂",
    "captionInherited": false,
    "attribution": {
      "en": "Shared image from my channel; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan rasm; eksportda asl muallif ko‘rsatilmagan."
    },
    "shared": true,
    "redacted": false,
    "sourceFile": "personal/photo_16@03-05-2026_14-38-05.jpg"
  },
  {
    "id": "personal-17",
    "type": "photo",
    "url": "/assets/archive/personal-17.jpg",
    "title": {
      "en": "The running-hour sky",
      "uz": "Yugurish paytidagi osmon"
    },
    "alt": {
      "en": "The running-hour sky",
      "uz": "Yugurish paytidagi osmon"
    },
    "tags": [
      "photography",
      "gym"
    ],
    "date": "2026-05-09T10:06:51",
    "sourceUrl": "https://t.me/juratss/83",
    "sourceCaption": "Last year's jogging time photos 🕊",
    "captionInherited": false,
    "attribution": {
      "en": "Photograph from my personal channel.",
      "uz": "Shaxsiy kanalimdagi surat."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "personal/photo_17@09-05-2026_10-06-51.jpg"
  },
  {
    "id": "personal-18",
    "type": "photo",
    "url": "/assets/journal/evening-road.jpg",
    "title": {
      "en": "One more stretch of road",
      "uz": "Yo‘lning yana bir qismi"
    },
    "alt": {
      "en": "One more stretch of road",
      "uz": "Yo‘lning yana bir qismi"
    },
    "tags": [
      "photography",
      "gym"
    ],
    "date": "2026-05-09T10:06:51",
    "sourceUrl": "https://t.me/juratss/85",
    "sourceCaption": "Last year's jogging time photos 🕊",
    "captionInherited": true,
    "attribution": {
      "en": "Photograph from my personal channel.",
      "uz": "Shaxsiy kanalimdagi surat."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "personal/photo_18@09-05-2026_10-06-51.jpg"
  },
  {
    "id": "personal-19",
    "type": "photo",
    "url": "/assets/archive/personal-19.jpg",
    "title": {
      "en": "Pause, then keep going",
      "uz": "Bir nafas, so‘ng yana davom"
    },
    "alt": {
      "en": "Pause, then keep going",
      "uz": "Bir nafas, so‘ng yana davom"
    },
    "tags": [
      "photography",
      "gym"
    ],
    "date": "2026-05-09T10:06:51",
    "sourceUrl": "https://t.me/juratss/86",
    "sourceCaption": "Last year's jogging time photos 🕊",
    "captionInherited": true,
    "attribution": {
      "en": "Photograph from my personal channel.",
      "uz": "Shaxsiy kanalimdagi surat."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "personal/photo_19@09-05-2026_10-06-51.jpg"
  },
  {
    "id": "personal-20",
    "type": "photo",
    "url": "/assets/archive/personal-20.jpg",
    "title": {
      "en": "The way back after a run",
      "uz": "Yugurishdan keyingi yo‘l"
    },
    "alt": {
      "en": "The way back after a run",
      "uz": "Yugurishdan keyingi yo‘l"
    },
    "tags": [
      "photography",
      "gym"
    ],
    "date": "2026-05-09T10:06:51",
    "sourceUrl": "https://t.me/juratss/87",
    "sourceCaption": "Last year's jogging time photos 🕊",
    "captionInherited": true,
    "attribution": {
      "en": "Photograph from my personal channel.",
      "uz": "Shaxsiy kanalimdagi surat."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "personal/photo_20@09-05-2026_10-06-51.jpg"
  },
  {
    "id": "personal-21",
    "type": "photo",
    "url": "/assets/archive/uzbek-certificate-private-preview.png",
    "title": {
      "en": "One more milestone",
      "uz": "Yana bir yutuq"
    },
    "alt": {
      "en": "One more milestone",
      "uz": "Yana bir yutuq"
    },
    "tags": [
      "learning"
    ],
    "date": "2026-06-17T15:02:09",
    "sourceUrl": "https://t.me/juratss/97",
    "sourceCaption": "One more . 🕊\n\nAlbatta har bir mashaqqat bilan birga yengillik bordir .\n\nInna ma'al usri yusro 🕊(94.5)",
    "captionInherited": false,
    "attribution": {
      "en": "My Uzbek language and literature certificate. Personal codes and QR removed in this preview.",
      "uz": "O‘zbek tili va adabiyot sertifikatim. Bu ko‘rinishda shaxsiy kodlar va QR berkitilgan."
    },
    "shared": false,
    "redacted": true,
    "sourceFile": "personal/photo_21@17-06-2026_15-02-09.jpg",
    "note": {
      "en": "Privacy-edited image preview. See the original channel post for the source document.",
      "uz": "Maxfiy qismlari berkitilgan rasm. Asl hujjat manbadagi kanal postida."
    }
  },
  {
    "id": "personal-22",
    "type": "photo",
    "url": "/assets/archive/personal-22.jpg",
    "title": {
      "en": "Field notes after dark",
      "uz": "Qorong‘idagi dala"
    },
    "alt": {
      "en": "Field notes after dark",
      "uz": "Qorong‘idagi dala"
    },
    "tags": [
      "photography"
    ],
    "date": "2026-06-18T01:12:07",
    "sourceUrl": "https://t.me/juratss/103",
    "sourceCaption": "Agar sen tush bõlganingda kun bõyi uxlagan bõlar edim. \n__Mahmud darvesh__\n \nDala 🌾🕊\n\n(aniq lakatsiyani bilmiman😂)",
    "captionInherited": false,
    "attribution": {
      "en": "Photograph from my personal channel.",
      "uz": "Shaxsiy kanalimdagi surat."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "personal/photo_22@18-06-2026_01-12-07.jpg"
  },
  {
    "id": "personal-23",
    "type": "photo",
    "url": "/assets/journal/last-light.jpg",
    "title": {
      "en": "The last warm light",
      "uz": "So‘nggi iliq nur"
    },
    "alt": {
      "en": "The last warm light",
      "uz": "So‘nggi iliq nur"
    },
    "tags": [
      "photography"
    ],
    "date": "2026-06-18T01:12:07",
    "sourceUrl": "https://t.me/juratss/104",
    "sourceCaption": "Agar sen tush bõlganingda kun bõyi uxlagan bõlar edim. \n__Mahmud darvesh__\n \nDala 🌾🕊\n\n(aniq lakatsiyani bilmiman😂)",
    "captionInherited": true,
    "attribution": {
      "en": "Photograph from my personal channel.",
      "uz": "Shaxsiy kanalimdagi surat."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "personal/photo_23@18-06-2026_01-12-07.jpg",
    "projectId": "last-light"
  },
  {
    "id": "personal-24",
    "type": "photo",
    "url": "/assets/archive/personal-24.jpg",
    "title": {
      "en": "A sky worth stopping for",
      "uz": "To‘xtab qaragulik osmon"
    },
    "alt": {
      "en": "A sky worth stopping for",
      "uz": "To‘xtab qaragulik osmon"
    },
    "tags": [
      "photography"
    ],
    "date": "2026-06-18T01:12:07",
    "sourceUrl": "https://t.me/juratss/105",
    "sourceCaption": "Agar sen tush bõlganingda kun bõyi uxlagan bõlar edim. \n__Mahmud darvesh__\n \nDala 🌾🕊\n\n(aniq lakatsiyani bilmiman😂)",
    "captionInherited": true,
    "attribution": {
      "en": "Photograph from my personal channel.",
      "uz": "Shaxsiy kanalimdagi surat."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "personal/photo_24@18-06-2026_01-12-07.jpg"
  },
  {
    "id": "personal-25",
    "type": "photo",
    "url": "/assets/archive/personal-25.jpg",
    "title": {
      "en": "When the field goes quiet",
      "uz": "Dala sokinlashganda"
    },
    "alt": {
      "en": "When the field goes quiet",
      "uz": "Dala sokinlashganda"
    },
    "tags": [
      "photography"
    ],
    "date": "2026-06-18T01:12:07",
    "sourceUrl": "https://t.me/juratss/106",
    "sourceCaption": "Agar sen tush bõlganingda kun bõyi uxlagan bõlar edim. \n__Mahmud darvesh__\n \nDala 🌾🕊\n\n(aniq lakatsiyani bilmiman😂)",
    "captionInherited": true,
    "attribution": {
      "en": "Photograph from my personal channel.",
      "uz": "Shaxsiy kanalimdagi surat."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "personal/photo_25@18-06-2026_01-12-07.jpg"
  },
  {
    "id": "personal-26",
    "type": "photo",
    "url": "/assets/archive/personal-26.jpg",
    "title": {
      "en": "Flowers under the moon",
      "uz": "Oy ostidagi gullar"
    },
    "alt": {
      "en": "Flowers under the moon",
      "uz": "Oy ostidagi gullar"
    },
    "tags": [
      "photography"
    ],
    "date": "2026-06-19T09:08:24",
    "sourceUrl": "https://t.me/juratss/107",
    "sourceCaption": "Hatto oy ham chiroyli kõrinadi . Shunchaki uzoqda bõlgani uchun .\n__Mahmud darvesh__\n \n🌙🌾",
    "captionInherited": false,
    "attribution": {
      "en": "Photograph from my personal channel.",
      "uz": "Shaxsiy kanalimdagi surat."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "personal/photo_26@19-06-2026_09-08-24.jpg"
  },
  {
    "id": "personal-27",
    "type": "photo",
    "url": "/assets/journal/moonlight.jpg",
    "title": {
      "en": "A small crescent",
      "uz": "Kichik hilol"
    },
    "alt": {
      "en": "A small crescent",
      "uz": "Kichik hilol"
    },
    "tags": [
      "photography"
    ],
    "date": "2026-06-19T09:08:24",
    "sourceUrl": "https://t.me/juratss/108",
    "sourceCaption": "Hatto oy ham chiroyli kõrinadi . Shunchaki uzoqda bõlgani uchun .\n__Mahmud darvesh__\n \n🌙🌾",
    "captionInherited": true,
    "attribution": {
      "en": "Photograph from my personal channel.",
      "uz": "Shaxsiy kanalimdagi surat."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "personal/photo_27@19-06-2026_09-08-24.jpg"
  },
  {
    "id": "personal-28",
    "type": "photo",
    "url": "/assets/archive/personal-28.jpg",
    "title": {
      "en": "Night, with a little colour",
      "uz": "Tungi ranglar"
    },
    "alt": {
      "en": "Night, with a little colour",
      "uz": "Tungi ranglar"
    },
    "tags": [
      "photography"
    ],
    "date": "2026-06-19T09:08:24",
    "sourceUrl": "https://t.me/juratss/109",
    "sourceCaption": "Hatto oy ham chiroyli kõrinadi . Shunchaki uzoqda bõlgani uchun .\n__Mahmud darvesh__\n \n🌙🌾",
    "captionInherited": true,
    "attribution": {
      "en": "Photograph from my personal channel.",
      "uz": "Shaxsiy kanalimdagi surat."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "personal/photo_28@19-06-2026_09-08-24.jpg"
  },
  {
    "id": "personal-29",
    "type": "photo",
    "url": "/assets/journal/edex-sunset.jpg",
    "title": {
      "en": "The sunset in EdEx",
      "uz": "EdExdagi quyosh botishi"
    },
    "alt": {
      "en": "The sunset in EdEx",
      "uz": "EdExdagi quyosh botishi"
    },
    "tags": [
      "learning",
      "photography"
    ],
    "date": "2026-09-13T22:08:50",
    "sourceUrl": "https://t.me/juratss/121",
    "sourceCaption": "The sunset in EdEx 🌾☘️\nthis is a good scene , isn't it?🕊",
    "captionInherited": false,
    "attribution": {
      "en": "Photograph from my personal channel.",
      "uz": "Shaxsiy kanalimdagi surat."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "personal/photo_29@13-09-2026_22-08-50.jpg",
    "projectId": "edex-after-class"
  },
  {
    "id": "personal-30",
    "type": "photo",
    "url": "/assets/archive/personal-30.jpg",
    "title": {
      "en": "English: in, on, at",
      "uz": "Ingliz tili: in, on, at"
    },
    "alt": {
      "en": "English: in, on, at",
      "uz": "Ingliz tili: in, on, at"
    },
    "tags": [
      "learning"
    ],
    "date": "2026-09-29T15:19:09",
    "sourceUrl": "https://t.me/juratss/127",
    "sourceCaption": "In,On,At ✅",
    "captionInherited": false,
    "attribution": {
      "en": "Shared image from my channel; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan rasm; eksportda asl muallif ko‘rsatilmagan."
    },
    "shared": true,
    "redacted": false,
    "sourceFile": "personal/photo_30@29-09-2026_15-19-09.jpg"
  },
  {
    "id": "personal-31",
    "type": "photo",
    "url": "/assets/archive/personal-31.jpg",
    "title": {
      "en": "A word a day: hanger",
      "uz": "Kunlik so‘z: kiyim ilgich"
    },
    "alt": {
      "en": "A word a day: hanger",
      "uz": "Kunlik so‘z: kiyim ilgich"
    },
    "tags": [
      "learning"
    ],
    "date": "2026-09-29T15:32:43",
    "sourceUrl": "https://t.me/juratss/132",
    "sourceCaption": "",
    "captionInherited": false,
    "attribution": {
      "en": "Shared image from my channel; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan rasm; eksportda asl muallif ko‘rsatilmagan."
    },
    "shared": true,
    "redacted": false,
    "sourceFile": "personal/photo_31@29-09-2026_15-32-43.jpg"
  },
  {
    "id": "personal-32",
    "type": "photo",
    "url": "/assets/archive/personal-32.jpg",
    "title": {
      "en": "A word a day: bucket",
      "uz": "Kunlik so‘z: chelak"
    },
    "alt": {
      "en": "A word a day: bucket",
      "uz": "Kunlik so‘z: chelak"
    },
    "tags": [
      "learning"
    ],
    "date": "2026-09-30T22:26:41",
    "sourceUrl": "https://t.me/juratss/139",
    "sourceCaption": "",
    "captionInherited": false,
    "attribution": {
      "en": "Shared image from my channel; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan rasm; eksportda asl muallif ko‘rsatilmagan."
    },
    "shared": true,
    "redacted": false,
    "sourceFile": "personal/photo_32@30-09-2026_22-26-41.jpg"
  },
  {
    "id": "design-01",
    "type": "photo",
    "url": "/assets/work/coffee-design.jpg",
    "title": {
      "en": "Coffee Design",
      "uz": "Coffee Design"
    },
    "alt": {
      "en": "Coffee Design",
      "uz": "Coffee Design"
    },
    "tags": [
      "blender"
    ],
    "date": "2026-09-22T09:09:56",
    "sourceUrl": "https://t.me/jurats_portfolio/2",
    "sourceCaption": "🏡Coffee Design | Blender 3D 🎨\n\n📌 Dastur: Blender\n📌 Render: Cycles\n📌Author: @sherzadovc\n\nTelegram | You Tube | Instagram | Behance\n\n#Blender #Exterior #3DArt #Visualization",
    "captionInherited": false,
    "attribution": {
      "en": "Source author: @sherzadovc. Credits retained from the original post.",
      "uz": "Asl muallif: @sherzadovc. Asl postdagi mualliflik saqlangan."
    },
    "shared": true,
    "redacted": false,
    "sourceFile": "design/photo_1@22-09-2026_09-09-56.jpg",
    "projectId": "coffee-design"
  },
  {
    "id": "design-02",
    "type": "photo",
    "url": "/assets/work/room-day.jpg",
    "title": {
      "en": "Room Design — daylight",
      "uz": "Room Design — kunduz"
    },
    "alt": {
      "en": "Room Design — daylight",
      "uz": "Room Design — kunduz"
    },
    "tags": [
      "blender"
    ],
    "date": "2026-09-22T11:16:51",
    "sourceUrl": "https://t.me/jurats_portfolio/3",
    "sourceCaption": "🏡 Room Design | Blender 3D 🎨\n\n📌 Dastur: Blender\n📌 Render: Cycles\n📌Author: @sherzadovc\n\nTelegram | You Tube | Instagram | Behance\n\n#Blender #interior #3DArt #Visualization",
    "captionInherited": false,
    "attribution": {
      "en": "Source author: @sherzadovc. Credits retained from the original post.",
      "uz": "Asl muallif: @sherzadovc. Asl postdagi mualliflik saqlangan."
    },
    "shared": true,
    "redacted": false,
    "sourceFile": "design/photo_2@22-09-2026_11-16-51.jpg",
    "projectId": "room-day-and-night"
  },
  {
    "id": "design-03",
    "type": "photo",
    "url": "/assets/work/room-night.jpg",
    "title": {
      "en": "Room Design — night",
      "uz": "Room Design — tun"
    },
    "alt": {
      "en": "Room Design — night",
      "uz": "Room Design — tun"
    },
    "tags": [
      "blender"
    ],
    "date": "2026-09-22T11:16:51",
    "sourceUrl": "https://t.me/jurats_portfolio/4",
    "sourceCaption": "🏡 Room Design | Blender 3D 🎨\n\n📌 Dastur: Blender\n📌 Render: Cycles\n📌Author: @sherzadovc\n\nTelegram | You Tube | Instagram | Behance\n\n#Blender #interior #3DArt #Visualization",
    "captionInherited": true,
    "attribution": {
      "en": "Source author: @sherzadovc. Credits retained from the original post.",
      "uz": "Asl muallif: @sherzadovc. Asl postdagi mualliflik saqlangan."
    },
    "shared": true,
    "redacted": false,
    "sourceFile": "design/photo_3@22-09-2026_11-16-51.jpg",
    "projectId": "room-day-and-night"
  },
  {
    "id": "design-04",
    "type": "photo",
    "url": "/assets/work/room-process.jpg",
    "title": {
      "en": "Inside the Blender scene",
      "uz": "Blender sahnasi ichida"
    },
    "alt": {
      "en": "Inside the Blender scene",
      "uz": "Blender sahnasi ichida"
    },
    "tags": [
      "blender"
    ],
    "date": "2026-09-22T11:46:45",
    "sourceUrl": "https://t.me/jurats_portfolio/5",
    "sourceCaption": "process )",
    "captionInherited": false,
    "attribution": {
      "en": "Source author: @sherzadovc. Credits retained from the original post.",
      "uz": "Asl muallif: @sherzadovc. Asl postdagi mualliflik saqlangan."
    },
    "shared": true,
    "redacted": false,
    "sourceFile": "design/photo_4@22-09-2026_11-46-45.jpg",
    "projectId": "room-day-and-night"
  },
  {
    "id": "design-05",
    "type": "photo",
    "url": "/assets/archive/sat-private-preview.png",
    "title": {
      "en": "SAT — a starting point",
      "uz": "SAT — boshlang‘ich nuqta"
    },
    "alt": {
      "en": "SAT — a starting point",
      "uz": "SAT — boshlang‘ich nuqta"
    },
    "tags": [
      "learning"
    ],
    "date": "2026-09-22T11:58:42",
    "sourceUrl": "https://t.me/jurats_portfolio/11",
    "sourceCaption": "",
    "captionInherited": false,
    "attribution": {
      "en": "My uploaded result. Private identifiers removed in this preview.",
      "uz": "Yuborgan natijam. Bu ko‘rinishda shaxsiy raqamlar berkitilgan."
    },
    "shared": false,
    "redacted": true,
    "sourceFile": "design/photo_5@22-09-2026_11-58-42.jpg",
    "note": {
      "en": "Privacy-edited image preview. See the original channel post for the source document.",
      "uz": "Maxfiy qismlari berkitilgan rasm. Asl hujjat manbadagi kanal postida."
    }
  },
  {
    "id": "design-06",
    "type": "photo",
    "url": "/assets/archive/uzbek-certificate-private-preview.png",
    "title": {
      "en": "Uzbek language certificate",
      "uz": "O‘zbek tili sertifikati"
    },
    "alt": {
      "en": "Uzbek language certificate",
      "uz": "O‘zbek tili sertifikati"
    },
    "tags": [
      "learning"
    ],
    "date": "2026-09-22T18:16:12",
    "sourceUrl": "https://t.me/jurats_portfolio/12",
    "sourceCaption": "From mother tongue \n(uzbek language) \nI got it in 9th grade but it helps to students to accept for 100% scholarship in universities in uzbekistan",
    "captionInherited": false,
    "attribution": {
      "en": "My uploaded result. Private identifiers removed in this preview.",
      "uz": "Yuborgan natijam. Bu ko‘rinishda shaxsiy raqamlar berkitilgan."
    },
    "shared": false,
    "redacted": true,
    "sourceFile": "design/photo_6@22-09-2026_18-16-12.jpg",
    "note": {
      "en": "Privacy-edited image preview. See the original channel post for the source document.",
      "uz": "Maxfiy qismlari berkitilgan rasm. Asl hujjat manbadagi kanal postida."
    }
  },
  {
    "id": "design-07",
    "type": "photo",
    "url": "/assets/work/first-cube.jpg",
    "title": {
      "en": "Where everything started",
      "uz": "Hammasi boshlangan joy"
    },
    "alt": {
      "en": "Where everything started",
      "uz": "Hammasi boshlangan joy"
    },
    "tags": [
      "blender"
    ],
    "date": "2026-09-25T11:29:05",
    "sourceUrl": "https://t.me/jurats_portfolio/13",
    "sourceCaption": "where everything started .....",
    "captionInherited": false,
    "attribution": {
      "en": "Blender learning exercise from my portfolio channel.",
      "uz": "Portfolio kanalimdagi Blender o‘rganish mashqi."
    },
    "shared": false,
    "redacted": false,
    "sourceFile": "design/photo_7@25-09-2026_11-29-05.jpg",
    "projectId": "where-it-started"
  },
  {
    "id": "design-08",
    "type": "photo",
    "url": "/assets/work/dining-room.jpg",
    "title": {
      "en": "Dining Room",
      "uz": "Dining Room"
    },
    "alt": {
      "en": "Dining Room",
      "uz": "Dining Room"
    },
    "tags": [
      "blender"
    ],
    "date": "2026-09-26T00:07:32",
    "sourceUrl": "https://t.me/jurats_portfolio/14",
    "sourceCaption": "🏡  Dining Room | Blender 3D 🎨\n\n📌 Dastur: Blender\n📌 Render: Cycles\n📌Author: @sherzadovc\n📌collegue: @DravexPortfolio\n\nTelegram | You Tube | Instagram | Behance\n\n#Blender #interior #3DArt #Visualization",
    "captionInherited": false,
    "attribution": {
      "en": "Source author: @sherzadovc; colleague: @DravexPortfolio.",
      "uz": "Asl muallif: @sherzadovc; hamkor: @DravexPortfolio."
    },
    "shared": true,
    "redacted": false,
    "sourceFile": "design/photo_8@26-09-2026_00-07-32.jpg",
    "projectId": "dining-room"
  },
  {
    "id": "clip-003",
    "type": "video",
    "url": "/assets/archive/clip-003.mp4",
    "poster": "/assets/archive/clip-003-poster.jpg",
    "title": {
      "en": "A first step outside",
      "uz": "Tashqaridagi ilk qadam"
    },
    "alt": {
      "en": "A first step outside",
      "uz": "Tashqaridagi ilk qadam"
    },
    "tags": [
      "moments"
    ],
    "date": "2026-04-08T23:34:46",
    "duration": 19,
    "sourceUrl": "https://t.me/juratss/3",
    "sourceCaption": "I just wanna start my channel with halal way . 😀",
    "attribution": {
      "en": "Video shared in my channel. People and footage are shown as channel inspiration; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan video. Lavha va undagi insonlar kanalimdagi ilhom manbasi sifatida ko‘rsatilgan; eksportda asl muallif berilmagan."
    },
    "shared": true,
    "sourceFile": "personal/video_1@08-04-2026_23-34-46.mp4"
  },
  {
    "id": "clip-006",
    "type": "video",
    "url": "/assets/archive/clip-006.mp4",
    "poster": "/assets/archive/clip-006-poster.jpg",
    "title": {
      "en": "A road and a reminder",
      "uz": "Yo‘l va eslatma"
    },
    "alt": {
      "en": "A road and a reminder",
      "uz": "Yo‘l va eslatma"
    },
    "tags": [
      "inspiration"
    ],
    "date": "2026-04-09T21:10:13",
    "duration": 34,
    "sourceUrl": "https://t.me/juratss/6",
    "sourceCaption": "🫀",
    "attribution": {
      "en": "Video shared in my channel. People and footage are shown as channel inspiration; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan video. Lavha va undagi insonlar kanalimdagi ilhom manbasi sifatida ko‘rsatilgan; eksportda asl muallif berilmagan."
    },
    "shared": true,
    "sourceFile": "personal/video_2@09-04-2026_21-10-13.mp4"
  },
  {
    "id": "clip-008",
    "type": "video",
    "url": "/assets/archive/clip-008.mp4",
    "poster": "/assets/archive/clip-008-poster.jpg",
    "title": {
      "en": "A field, a thought",
      "uz": "Dala va bir fikr"
    },
    "alt": {
      "en": "A field, a thought",
      "uz": "Dala va bir fikr"
    },
    "tags": [
      "moments",
      "inspiration"
    ],
    "date": "2026-04-10T18:32:21",
    "duration": 24,
    "sourceUrl": "https://t.me/juratss/8",
    "sourceCaption": "🌺",
    "attribution": {
      "en": "Video shared in my channel. People and footage are shown as channel inspiration; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan video. Lavha va undagi insonlar kanalimdagi ilhom manbasi sifatida ko‘rsatilgan; eksportda asl muallif berilmagan."
    },
    "shared": true,
    "sourceFile": "personal/video_3@10-04-2026_18-32-21.mp4"
  },
  {
    "id": "clip-027",
    "type": "video",
    "url": "/assets/archive/clip-027.mp4",
    "poster": "/assets/archive/clip-027-poster.jpg",
    "title": {
      "en": "Gym — keep showing up",
      "uz": "Gym — davom etish"
    },
    "alt": {
      "en": "Gym — keep showing up",
      "uz": "Gym — davom etish"
    },
    "tags": [
      "gym"
    ],
    "date": "2026-04-14T22:11:56",
    "duration": 12,
    "sourceUrl": "https://t.me/juratss/27",
    "sourceCaption": ".",
    "attribution": {
      "en": "Video shared in my channel. People and footage are shown as channel inspiration; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan video. Lavha va undagi insonlar kanalimdagi ilhom manbasi sifatida ko‘rsatilgan; eksportda asl muallif berilmagan."
    },
    "shared": true,
    "sourceFile": "personal/video_4@14-04-2026_22-11-56.mp4"
  },
  {
    "id": "clip-055",
    "type": "video",
    "url": "/assets/archive/clip-055.mp4",
    "poster": "/assets/archive/clip-055-poster.jpg",
    "title": {
      "en": "A little late-night humour",
      "uz": "Tungi hazil"
    },
    "alt": {
      "en": "A little late-night humour",
      "uz": "Tungi hazil"
    },
    "tags": [
      "inspiration"
    ],
    "date": "2026-04-16T04:21:58",
    "duration": 33,
    "sourceUrl": "https://t.me/juratss/55",
    "sourceCaption": "with english subtitle😂🕊",
    "attribution": {
      "en": "Video shared in my channel. People and footage are shown as channel inspiration; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan video. Lavha va undagi insonlar kanalimdagi ilhom manbasi sifatida ko‘rsatilgan; eksportda asl muallif berilmagan."
    },
    "shared": true,
    "sourceFile": "personal/745f26dc-a892-4b1c-afea-fee320ed5a9a.mp4"
  },
  {
    "id": "clip-056",
    "type": "video",
    "url": "/assets/archive/clip-056.mp4",
    "poster": "/assets/archive/clip-056-poster.jpg",
    "title": {
      "en": "An evening reminder",
      "uz": "Kechki eslatma"
    },
    "alt": {
      "en": "An evening reminder",
      "uz": "Kechki eslatma"
    },
    "tags": [
      "inspiration"
    ],
    "date": "2026-04-17T00:00:43",
    "duration": 18,
    "sourceUrl": "https://t.me/juratss/56",
    "sourceCaption": "🕊",
    "attribution": {
      "en": "Video shared in my channel. People and footage are shown as channel inspiration; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan video. Lavha va undagi insonlar kanalimdagi ilhom manbasi sifatida ko‘rsatilgan; eksportda asl muallif berilmagan."
    },
    "shared": true,
    "sourceFile": "personal/video_5@17-04-2026_00-00-43.mp4"
  },
  {
    "id": "clip-062",
    "type": "video",
    "url": "/assets/archive/clip-062.mp4",
    "poster": "/assets/archive/clip-062-poster.jpg",
    "title": {
      "en": "Stay with the process",
      "uz": "Jarayonga sodiq qol"
    },
    "alt": {
      "en": "Stay with the process",
      "uz": "Jarayonga sodiq qol"
    },
    "tags": [
      "gym",
      "inspiration"
    ],
    "date": "2026-04-25T00:00:26",
    "duration": 16,
    "sourceUrl": "https://t.me/juratss/62",
    "sourceCaption": "⚔🦅",
    "attribution": {
      "en": "Video shared in my channel. People and footage are shown as channel inspiration; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan video. Lavha va undagi insonlar kanalimdagi ilhom manbasi sifatida ko‘rsatilgan; eksportda asl muallif berilmagan."
    },
    "shared": true,
    "sourceFile": "personal/video_6@25-04-2026_00-00-26.mp4"
  },
  {
    "id": "clip-069",
    "type": "video",
    "url": "/assets/archive/clip-069.mp4",
    "poster": "/assets/archive/clip-069-poster.jpg",
    "title": {
      "en": "From the passenger-seat view",
      "uz": "Salon ichidagi nigoh"
    },
    "alt": {
      "en": "From the passenger-seat view",
      "uz": "Salon ichidagi nigoh"
    },
    "tags": [
      "moments"
    ],
    "date": "2026-04-28T21:00:07",
    "duration": 14,
    "sourceUrl": "https://t.me/juratss/69",
    "sourceCaption": "575 🌺",
    "attribution": {
      "en": "Video shared in my channel. People and footage are shown as channel inspiration; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan video. Lavha va undagi insonlar kanalimdagi ilhom manbasi sifatida ko‘rsatilgan; eksportda asl muallif berilmagan."
    },
    "shared": true,
    "sourceFile": "personal/video_7@28-04-2026_21-00-07.mp4"
  },
  {
    "id": "clip-076",
    "type": "video",
    "url": "/assets/archive/clip-076.mp4",
    "poster": "/assets/archive/clip-076-poster.jpg",
    "title": {
      "en": "A voice over the fields",
      "uz": "Dalalar uzra ovoz"
    },
    "alt": {
      "en": "A voice over the fields",
      "uz": "Dalalar uzra ovoz"
    },
    "tags": [
      "moments"
    ],
    "date": "2026-05-02T22:51:14",
    "duration": 39,
    "sourceUrl": "https://t.me/juratss/76",
    "sourceCaption": "🗣",
    "attribution": {
      "en": "Video shared in my channel. People and footage are shown as channel inspiration; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan video. Lavha va undagi insonlar kanalimdagi ilhom manbasi sifatida ko‘rsatilgan; eksportda asl muallif berilmagan."
    },
    "shared": true,
    "sourceFile": "personal/video_8@02-05-2026_22-51-14.mp4"
  },
  {
    "id": "clip-081",
    "type": "video",
    "url": "/assets/archive/clip-081.mp4",
    "poster": "/assets/archive/clip-081-poster.jpg",
    "title": {
      "en": "A moment of stillness",
      "uz": "Sokinlik lahzasi"
    },
    "alt": {
      "en": "A moment of stillness",
      "uz": "Sokinlik lahzasi"
    },
    "tags": [
      "moments"
    ],
    "date": "2026-05-06T18:57:15",
    "duration": 35,
    "sourceUrl": "https://t.me/juratss/81",
    "sourceCaption": "🕊",
    "attribution": {
      "en": "Video shared in my channel. People and footage are shown as channel inspiration; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan video. Lavha va undagi insonlar kanalimdagi ilhom manbasi sifatida ko‘rsatilgan; eksportda asl muallif berilmagan."
    },
    "shared": true,
    "sourceFile": "personal/aacf1f93-5e7a-4c9e-a670-ea3ba63a7350.mp4"
  },
  {
    "id": "clip-089",
    "type": "video",
    "url": "/assets/archive/clip-089.mp4",
    "poster": "/assets/archive/clip-089-poster.jpg",
    "title": {
      "en": "An illustrated horizon",
      "uz": "Tasvirdagi ufq"
    },
    "alt": {
      "en": "An illustrated horizon",
      "uz": "Tasvirdagi ufq"
    },
    "tags": [
      "inspiration"
    ],
    "date": "2026-05-16T22:51:26",
    "duration": 36,
    "sourceUrl": "https://t.me/juratss/89",
    "sourceCaption": "❤️م",
    "attribution": {
      "en": "Video shared in my channel. People and footage are shown as channel inspiration; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan video. Lavha va undagi insonlar kanalimdagi ilhom manbasi sifatida ko‘rsatilgan; eksportda asl muallif berilmagan."
    },
    "shared": true,
    "sourceFile": "personal/36590285-bf99-431e-af82-39d1f5d8f435.mp4"
  },
  {
    "id": "clip-090",
    "type": "video",
    "url": "/assets/archive/clip-090.mp4",
    "poster": "/assets/archive/clip-090-poster.jpg",
    "title": {
      "en": "Keep going",
      "uz": "Davom et"
    },
    "alt": {
      "en": "Keep going",
      "uz": "Davom et"
    },
    "tags": [
      "gym",
      "inspiration"
    ],
    "date": "2026-05-21T18:52:09",
    "duration": 10,
    "sourceUrl": "https://t.me/juratss/90",
    "sourceCaption": "⚔",
    "attribution": {
      "en": "Video shared in my channel. People and footage are shown as channel inspiration; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan video. Lavha va undagi insonlar kanalimdagi ilhom manbasi sifatida ko‘rsatilgan; eksportda asl muallif berilmagan."
    },
    "shared": true,
    "sourceFile": "personal/3f1de63a-c94d-479d-9a71-37a752148740.mp4"
  },
  {
    "id": "clip-091",
    "type": "video",
    "url": "/assets/archive/clip-091.mp4",
    "poster": "/assets/archive/clip-091-poster.jpg",
    "title": {
      "en": "Words about discipline",
      "uz": "Intizom haqida so‘zlar"
    },
    "alt": {
      "en": "Words about discipline",
      "uz": "Intizom haqida so‘zlar"
    },
    "tags": [
      "gym",
      "inspiration"
    ],
    "date": "2026-05-22T08:05:51",
    "duration": 7,
    "sourceUrl": "https://t.me/juratss/91",
    "sourceCaption": "🗡",
    "attribution": {
      "en": "Video shared in my channel. People and footage are shown as channel inspiration; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan video. Lavha va undagi insonlar kanalimdagi ilhom manbasi sifatida ko‘rsatilgan; eksportda asl muallif berilmagan."
    },
    "shared": true,
    "sourceFile": "personal/91b8f03b-573c-489f-8937-b95f89ae6abe.mp4"
  },
  {
    "id": "clip-092",
    "type": "video",
    "url": "/assets/archive/clip-092.mp4",
    "poster": "/assets/archive/clip-092-poster.jpg",
    "title": {
      "en": "Sport, as inspiration",
      "uz": "Sportdan ilhom"
    },
    "alt": {
      "en": "Sport, as inspiration",
      "uz": "Sportdan ilhom"
    },
    "tags": [
      "gym"
    ],
    "date": "2026-05-23T22:59:49",
    "duration": 28,
    "sourceUrl": "https://t.me/juratss/92",
    "sourceCaption": "⚔",
    "attribution": {
      "en": "Video shared in my channel. People and footage are shown as channel inspiration; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan video. Lavha va undagi insonlar kanalimdagi ilhom manbasi sifatida ko‘rsatilgan; eksportda asl muallif berilmagan."
    },
    "shared": true,
    "sourceFile": "personal/f578f943-bd47-446b-9c0d-4f8daabfaf78.mp4"
  },
  {
    "id": "clip-093",
    "type": "video",
    "url": "/assets/archive/clip-093.mp4",
    "poster": "/assets/archive/clip-093-poster.jpg",
    "title": {
      "en": "A movement in the forest",
      "uz": "O‘rmondagi harakat"
    },
    "alt": {
      "en": "A movement in the forest",
      "uz": "O‘rmondagi harakat"
    },
    "tags": [
      "inspiration"
    ],
    "date": "2026-05-31T15:50:04",
    "duration": 14,
    "sourceUrl": "https://t.me/juratss/93",
    "sourceCaption": "🕊❤️",
    "attribution": {
      "en": "Video shared in my channel. People and footage are shown as channel inspiration; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan video. Lavha va undagi insonlar kanalimdagi ilhom manbasi sifatida ko‘rsatilgan; eksportda asl muallif berilmagan."
    },
    "shared": true,
    "sourceFile": "personal/1a662850-3720-40d2-a4eb-35763ee7e7bf.mp4"
  },
  {
    "id": "clip-095",
    "type": "video",
    "url": "/assets/archive/clip-095.mp4",
    "poster": "/assets/archive/clip-095-poster.jpg",
    "title": {
      "en": "Switzerland on my mind",
      "uz": "Xayolimdagi Shveytsariya"
    },
    "alt": {
      "en": "Switzerland on my mind",
      "uz": "Xayolimdagi Shveytsariya"
    },
    "tags": [
      "moments"
    ],
    "date": "2026-06-11T22:32:37",
    "duration": 21,
    "sourceUrl": "https://t.me/juratss/95",
    "sourceCaption": "Thats why i love Switzerland\n\nВот почему я люблю Швейцарию\n\nMana nimaga men shveytsariyani yaxshi kõraman🕊",
    "attribution": {
      "en": "Video shared in my channel. People and footage are shown as channel inspiration; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan video. Lavha va undagi insonlar kanalimdagi ilhom manbasi sifatida ko‘rsatilgan; eksportda asl muallif berilmagan."
    },
    "shared": true,
    "sourceFile": "personal/fed7f249-b7f9-442d-a053-b3b9ce349cef.mp4"
  },
  {
    "id": "clip-096",
    "type": "video",
    "url": "/assets/archive/clip-096.mp4",
    "poster": "/assets/archive/clip-096-poster.jpg",
    "title": {
      "en": "A place I hope to see",
      "uz": "Ko‘rishni istagan manzil"
    },
    "alt": {
      "en": "A place I hope to see",
      "uz": "Ko‘rishni istagan manzil"
    },
    "tags": [
      "moments"
    ],
    "date": "2026-06-11T22:44:11",
    "duration": 11,
    "sourceUrl": "https://t.me/juratss/96",
    "sourceCaption": "At these days I want to go there and live without any problems . \n\nВ последнее время я хочу уехать туда и жить без лишних проблем.\n\nOxirgi vaqtlarda men faqat u yerga borib ortiqcha muammolarsiz yashashni xohlayapman.",
    "attribution": {
      "en": "Video shared in my channel. People and footage are shown as channel inspiration; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan video. Lavha va undagi insonlar kanalimdagi ilhom manbasi sifatida ko‘rsatilgan; eksportda asl muallif berilmagan."
    },
    "shared": true,
    "sourceFile": "personal/1b8d199f-ec55-4526-907f-18796bb4b83b.mp4"
  },
  {
    "id": "clip-112",
    "type": "video",
    "url": "/assets/archive/clip-112.mp4",
    "poster": "/assets/archive/clip-112-poster.jpg",
    "title": {
      "en": "Under a wider sky",
      "uz": "Keng osmon ostida"
    },
    "alt": {
      "en": "Under a wider sky",
      "uz": "Keng osmon ostida"
    },
    "tags": [
      "moments"
    ],
    "date": "2026-06-21T00:07:11",
    "duration": 19,
    "sourceUrl": "https://t.me/juratss/112",
    "sourceCaption": ".🕊",
    "attribution": {
      "en": "Video shared in my channel. People and footage are shown as channel inspiration; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan video. Lavha va undagi insonlar kanalimdagi ilhom manbasi sifatida ko‘rsatilgan; eksportda asl muallif berilmagan."
    },
    "shared": true,
    "sourceFile": "personal/7f85cfac-0028-4ce6-9196-172f7cf9109d.mp4"
  },
  {
    "id": "clip-113",
    "type": "video",
    "url": "/assets/archive/clip-113.mp4",
    "poster": "/assets/archive/clip-113-poster.jpg",
    "title": {
      "en": "The champion mindset",
      "uz": "Chempionlikka intilish"
    },
    "alt": {
      "en": "The champion mindset",
      "uz": "Chempionlikka intilish"
    },
    "tags": [
      "gym",
      "inspiration"
    ],
    "date": "2026-06-26T10:20:20",
    "duration": 30,
    "sourceUrl": "https://t.me/juratss/113",
    "sourceCaption": "Maybe not today maybe not tomorrow but one thing is true i will be champion one day🦅",
    "attribution": {
      "en": "Video shared in my channel. People and footage are shown as channel inspiration; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan video. Lavha va undagi insonlar kanalimdagi ilhom manbasi sifatida ko‘rsatilgan; eksportda asl muallif berilmagan."
    },
    "shared": true,
    "sourceFile": "personal/ea0d266c-dcaa-482f-8795-e0dd8cac1178.mp4"
  },
  {
    "id": "clip-117",
    "type": "video",
    "url": "/assets/archive/clip-117.mp4",
    "poster": "/assets/archive/clip-117-poster.jpg",
    "title": {
      "en": "A fighter’s focus",
      "uz": "Sportchining diqqat-e’tibori"
    },
    "alt": {
      "en": "A fighter’s focus",
      "uz": "Sportchining diqqat-e’tibori"
    },
    "tags": [
      "gym"
    ],
    "date": "2026-06-30T09:11:21",
    "duration": 29,
    "sourceUrl": "https://t.me/juratss/117",
    "sourceCaption": "⚔️        الله اكبر",
    "attribution": {
      "en": "Video shared in my channel. People and footage are shown as channel inspiration; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan video. Lavha va undagi insonlar kanalimdagi ilhom manbasi sifatida ko‘rsatilgan; eksportda asl muallif berilmagan."
    },
    "shared": true,
    "sourceFile": "personal/f5255e56-a83e-4d40-8dda-9a658620d8f2.mp4"
  },
  {
    "id": "clip-119",
    "type": "video",
    "url": "/assets/archive/clip-119.mp4",
    "poster": "/assets/archive/clip-119-poster.jpg",
    "title": {
      "en": "A cinematic pause",
      "uz": "Kinodan bir lahza"
    },
    "alt": {
      "en": "A cinematic pause",
      "uz": "Kinodan bir lahza"
    },
    "tags": [
      "inspiration"
    ],
    "date": "2026-07-04T19:08:33",
    "duration": 32,
    "sourceUrl": "https://t.me/juratss/119",
    "sourceCaption": "⚔️🦅",
    "attribution": {
      "en": "Video shared in my channel. People and footage are shown as channel inspiration; original creator is not identified in the export.",
      "uz": "Kanalimda ulashilgan video. Lavha va undagi insonlar kanalimdagi ilhom manbasi sifatida ko‘rsatilgan; eksportda asl muallif berilmagan."
    },
    "shared": true,
    "sourceFile": "personal/fdcb384e-7114-4734-b930-7c1435d6bd92.mp4"
  }
];
export function filterMedia(items:MediaItem[],album="all",kind="all"){
 return items.filter(item=>(album==="all"||item.tags.includes(album))&&(kind==="all"||item.type===kind));
}
export const photoCount=mediaItems.filter(item=>item.type==="photo").length;
export const videoCount=mediaItems.filter(item=>item.type==="video").length;
