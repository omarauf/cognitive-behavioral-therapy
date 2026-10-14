import source from "../../docs/CBT.tr.md?raw";
import { parseGuide } from "./guide-content";
import type { GuideContent } from "./guide-locale";

export const turkishContent = {
  language: "tr",
  direction: "ltr",
  guide: parseGuide(source),
  formatNumber: (value: number) => String(value),
  chapterLabels: [
    "Psikoterapiye giriş",
    "Kuramsal temeller",
    "Modeller ve teknikler",
    "Araçlar ve alıştırmalar",
  ],
  ui: {
    contents: "İçindekiler",
    chapters: "Bölümler",
    guideChapters: "Rehberin bölümleri",
    references: "Kullanım sınırları",
    close: "Kapat",
    skip: "Rehberin içeriğine geç",
    title: "Psikoterapiye giriş",
    titleAccent: "ve bilişsel davranışçı terapi",
    lead: "Bilişsel davranışçı terapinin kuramsal temellerini, modellerini, tekniklerini ve uygulamalarını açık bir dille ve bağlantılı örneklerle anlatır.",
    start: "Okumaya başla",
    models: "Modelleri keşfet",
    permalink: "Bu bölümün bağlantısı",
    back: "Başa dön",
    section: "Bölüm",
    part: "Kısım",
    eyebrow: "Sade bir eğitim rehberi",
  },
  educationalNote:
    "Bu rehber eğitsel bir başlangıç kaynağıdır; klinik bir kılavuz veya yetkin bir terapistin değerlendirmesinin yerini tutan bir kaynak değildir. Örnekler kavramları açıklamak için kurgulanmıştır; herkes için terapi önerileri değildir.",
  message: {
    label: "Rehberden bir örnek",
    event: "Bir arkadaş mesaja yanıt vermedi.",
    interpretation: "Yorum",
    alternative: "Başka bir yorum",
    first: '"Beni önemsemiyor"',
    firstResult: "Üzüntü ve geri çekilme.",
    second: '"Meşgul olabilir"',
    secondResult: "Bekleme.",
    caption:
      "Bu, her ruhsal acının düşüncelerden kaynaklandığı anlamına gelmez. Olaya verilen anlam, olayın kendisi ve gerçek yaşam koşullarıyla birlikte tepkiyi etkileyebilir.",
  },
  cognitive: {
    situation: "Durum",
    event: "İş arkadaşlarımın önünde sunum yapmam istendi.",
    thoughts: "Düşünceler ve yorumlar",
    thought: '"Hata yapacağım"',
    thoughtDetail: "Ve herkes yetersiz olduğumu düşünecek.",
    feelings: "Duygular",
    emotion: "Korku ve utanma",
    mutual: "Karşılıklı etki",
    behavior: "Davranış",
    action: "Sunumu yapmaktan vazgeçme",
    actionDetail: "Veya göz teması kurmadan hızla okuma.",
    body: "Beden",
    response: "Kalp atışının hızlanması",
    responseDetail: "Ve ellerin terlemesi.",
  },
  waves: [
    {
      title: "Birinci dalga: Davranışçı yaklaşım",
      period: "1950'ler ve 1960'lar",
      text: "Öğrenme kuramlarından doğdu. Pekiştirmeye, maruz bırakmaya ve davranış değişikliğine odaklandı.",
    },
    {
      title: "İkinci dalga: Bilişsel davranışçı yaklaşım",
      period: "1960'lar ve 1970'ler",
      text: "Davranışın yanında düşünce ve inançların rolünü ele aldı. Aaron Beck bilişsel terapiyi, Albert Ellis akılcı duygusal davranışçı terapiyi geliştirdi.",
    },
    {
      title: "Üçüncü dalga: Bağlamsal yaklaşımlar ve kabul",
      period: "Sonraki dönemler",
      text: "Kabule, bilinçli farkındalığa, değerlere ve psikolojik esnekliğe odaklandı. Kabul ve kararlılık terapisi ile diyalektik davranış terapisi örnekleridir. Dalgalar örtüşür; kesin bilimsel sınırlar değildir ve öncekilerin yerini bütünüyle almaz.",
    },
  ],
  avoidanceSteps: [
    {
      id: "prediction",
      label: "Başarısızlık beklentisi",
      shortLabel: "Beklenti",
      text: "Hata yapacağım ve herkes benimle alay edecek.",
    },
    { id: "anxiety", label: "Kaygı", text: "Kaygı ve kalp atışının hızlanması." },
    { id: "avoidance", label: "Kaçınma", text: "Sunumu yapmaktan vazgeçer." },
    {
      id: "relief",
      label: "Geçici rahatlama",
      shortLabel: "Rahatlama",
      text: "Kaygı azalır; kaçınma pekişir.",
    },
    {
      id: "fear",
      label: "Korkunun sürmesi",
      shortLabel: "Korku",
      text: "Beklentisini sınama ve pratik fırsatını kaybeder; sonraki sunum zorlaşabilir.",
    },
  ],
  avoidanceTitle: "Kaçınmanın kısır döngüsü",
} satisfies GuideContent;
