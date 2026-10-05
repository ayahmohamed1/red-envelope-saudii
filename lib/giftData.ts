export interface ActivityItem {
  title?: string;
  text: string | string[];
}

export interface GiftData {
  senderName: string;
  receiverName: string;
  // مسار صورة الظرف (تظل بألوانها الطبيعية دون تغيير)
  envelopeImage: string;

  // الرسالة الأولى (بعد فتح أول ظرف - بدون صورة وبدون عنوان)
  // ملحوظة: يمكنك الضغط على Enter والنزول سطر جديد بحرية داخل علامتي الـ (``)
  initialMessageText: string | string[];
  initialMessageTitle?: string;

  // الـ 6 رسائل التي تتكرر (ظرف ثم مسدج بزرار next)
  activities: ActivityItem[];

  // الحقول الإضافية لضمان التوافق إن لزم الأمر
  cardMessage?: string;
  birthdayImage?: string;
  birthdayTitle?: string;
  birthdayText?: string;
  collageImages?: string[];
  musicCoverImage?: string;
  musicUrl?: string;
  songTitle?: string;
}

const giftData: Record<string, GiftData> = {
  aya: {
    senderName: "Youssef",
    receiverName: "Jojo",
    // صورة الظرف تظل بألوانها الأصلية
    envelopeImage: "/images/envelope-placeholder.png",

    // 💌 الرسالة الأولى (تظهر بعد أول ظرف مباشرة - يمكنك النزول أسطر بحرية)
    initialMessageText: `Happy Birthday Jojo❤️🦢
كل سنة وانتي طيبة يا احلى البنات يا احلى الصحبات يا اعز واغلى انسانة على قلبي 

جوجو 
صحبتي .. 
شريكة النجاح دايماً وابداً .. 
اختي اللي استشيريها بكل حاجه .. 
شبيهتي بالحب والصُحبه .. 

الله لا يغير علينا ابدا هذي دعوة كل سنة لانك من الناس اللي قريبه من قلبي 
يمكن هذي أكثر دعوة أقولها كل ما توحشيني لأنك من الناس القريبة مني ومن العلاقات اللي أتمنى تكون معايا طول الحياة مهما اتغيرت الأيام وكبرنا واتغيرت حياتنا

أتمنى سنتك الجديدة تكون حلوة وخفيفة عليك بقد ما انتي خفيفة وهينة على قلبي 
وتشوفي فيها نفسك بالمكان اللي دائمًا تتمنيه وأكون موجودة معاك أشوف كل نجاح وكل فرحة جاية لك 

احبك ❤️
 `,

    // 💌 الـ 6 رسائل بعد الضغط على "what we gonna do"
    // كل رسالة يسبقها ظرف، وبداخلها زرار "next"
    activities: [
      {
        text: `انتي عندك عادية سنوية تسويها بس السنه هذي ما سويتيها وقلبي ما هان عليا طبعا 🥹 
ف بنروح ناخد لك عباية البيثدااااااي🥳 
 `
      },
      {
        text: `كل سنة نزين السياره بلالين واشياء مو مناسبة ابداً وتتعبنا🤣 
السنة هذي بنروح نرسسسمم على السياره ونخلي الناس كلها تعرف انك ملكة اليوممم 👸 
`
      },
      {
        text: `وقت عشا العيد ميلاد .. حاولت اختار مطاعمك المفضلة ❤️
اختاري نروح ( باكو .. اوت باك  .. ابل بيز .. الخيار لك ) 
`
      },
      {
        text: `فعالية العيد ميلاد في نادي اليخوت 🛥️
     `
      },
      {
        text: ` حنروح نزور المكان الاخير للايام السعيده .. ايش تتوقعي🤣
`
      },
      {
        text: `طبعاً ما خلصنا الاحتفالات 🥳 
يوم الخميس الجاي عندنا بحر جهزي الملابس 🌊
       `
      }
    ],

    // الموسيقى الخلفية (اختياري)
    musicCoverImage: "/images/song-cover.jpg",
    musicUrl: "/music/our-song.mp3",
    songTitle: "Our Special Song"
  },
};

export default giftData;