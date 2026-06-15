import redbullImg from "@/assets/products/redbull.png.asset.json";
import monsterImg from "@/assets/products/monster.png.asset.json";
import kitkatImg from "@/assets/products/kitkat.png.asset.json";
import strogonoffImg from "@/assets/products/strogonoff.png.asset.json";
import bisImg from "@/assets/products/bis_lacta.png.asset.json";
import biscoitoIntegralImg from "@/assets/products/biscoito_integral.png.asset.json";
import amendoimImg from "@/assets/products/amendoim_japones.png.asset.json";
import barraCerealImg from "@/assets/products/barra_de_cereal.png.asset.json";
import barraProteinaImg from "@/assets/products/barra_de_proteina.png.asset.json";
import mixCastanhasImg from "@/assets/products/mix_de_castanhas.png.asset.json";
import nutsImg from "@/assets/products/nuts_premium.png.asset.json";
import pringlesImg from "@/assets/products/pringles.png.asset.json";
import fandangosImg from "@/assets/products/fandangos.png.asset.json";
import doritosImg from "@/assets/products/doritos.png.asset.json";
import aguaImg from "@/assets/products/agua_mineral.png.asset.json";
import aguaGasImg from "@/assets/products/agua_com_gas.png.asset.json";
import cocaImg from "@/assets/products/coca_cola_lata.png.asset.json";
import delValleImg from "@/assets/products/del_vale_uva.png.asset.json";
import gatoradeImg from "@/assets/products/gatorade.png.asset.json";
import guaranaImg from "@/assets/products/guarana.png.asset.json";
import naturalOneImg from "@/assets/products/natural_one_laranja.png.asset.json";
import nescauImg from "@/assets/products/nescau_prontinho.png.asset.json";
import piracanjubaImg from "@/assets/products/picaranjuba_protein.png.asset.json";
import rufflesImg from "@/assets/products/ruffles.png.asset.json";
import spriteImg from "@/assets/products/sprite.png.asset.json";
import toddyImg from "@/assets/products/toddynho.png.asset.json";
import yoproImg from "@/assets/products/yopro_25g.png.asset.json";

export type Stock = "in" | "low" | "out";

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  stock: number;
  stockStatus: Stock;
  emoji: string;
  image?: string; // optional product photo URL
  badge?: string;
  bestSeller?: boolean;
  expiresIn?: string; // for refrigerated
}

export interface SubCategory {
  id: string;
  name: string;
  products: Product[];
}

export interface Category {
  id: string;
  name: string;
  icon: string; // lucide name
  blurb: string;
  subcategories: SubCategory[];
}

const s = (n: number): Stock => (n === 0 ? "out" : n <= 5 ? "low" : "in");

const p = (
  id: string,
  name: string,
  price: number,
  emoji: string,
  stock: number,
  extras: Partial<Product> = {},
): Product => ({
  id,
  name,
  price,
  emoji,
  stock,
  stockStatus: s(stock),
  ...extras,
});

export const categories: Category[] = [
  {
    id: "bebidas",
    name: "Bebidas",
    icon: "CupSoda",
    blurb: "Geladas, sempre",
    subcategories: [
      {
        id: "energeticos",
        name: "Energéticos",
        products: [
          p("redbull", "Redbull 250ml", 9.8, "⚡", 18, { bestSeller: true, image: redbullImg.url }),
          p("monster", "Monster Energy 473ml", 11.7, "🟢", 9, { image: monsterImg.url }),
          p("gatorade", "Gatorade 500ml", 9.5, "🔵", 14, { image: gatoradeImg.url }),
        ],
      },
      {
        id: "achocolatados",
        name: "Achocolatados",
        products: [
          p("nescau", "Nescau Prontinho 200ml", 5.5, "🍫", 22, { image: nescauImg.url }),
          p("toddy", "Toddynho 200ml", 4.9, "🟫", 30, { bestSeller: true, image: toddyImg.url }),
        ],
      },
      {
        id: "refrigerantes",
        name: "Refrigerantes",
        products: [
          p("coca", "Coca-Cola Lata 350ml", 5.6, "🥤", 40, { bestSeller: true, image: cocaImg.url }),
          p("guarana", "Guaraná Antarctica 350ml", 4.5, "🟡", 28, { image: guaranaImg.url }),
          p("sprite", "Sprite 350ml", 4.5, "🟩", 16, { image: spriteImg.url }),
        ],
      },
      {
        id: "sucos",
        name: "Sucos",
        products: [
          p("delvalle", "Del Valle Uva 290ml", 5.9, "🍇", 12, { image: delValleImg.url }),
          p("naturalone", "Natural One Laranja 300ml", 8.9, "🍊", 7, { oldPrice: 10.9, badge: "-18%", image: naturalOneImg.url }),
        ],
      },
      {
        id: "proteicas",
        name: "Bebidas Proteicas",
        products: [
          p("yopro", "YoPRO 25g Proteína", 11.9, "💪", 11, { bestSeller: true, image: yoproImg.url }),
          p("piracanjuba", "Piracanjuba Protein", 9.5, "🥛", 4, { image: piracanjubaImg.url }),
        ],
      },
      {
        id: "aguas",
        name: "Águas",
        products: [
          p("agua", "Água Mineral 500ml", 4.0, "💧", 60, { image: aguaImg.url }),
          p("aguagas", "Água com Gás 500ml", 5.0, "🫧", 20, { image: aguaGasImg.url }),
        ],
      },
    ],
  },
  {
    id: "snacks",
    name: "Salgados & Snacks",
    icon: "Cookie",
    blurb: "Crocância sob demanda",
    subcategories: [
      {
        id: "chips",
        name: "Chips & Salgadinhos",
        products: [
          p("ruffles", "Ruffles 76g", 11.7, "🥔", 15, { bestSeller: true, image: rufflesImg.url }),
          p("doritos", "Doritos Queijo Nacho 84g", 12.5, "🔺", 12, { image: doritosImg.url }),
          p("fandangos", "Fandangos Presunto", 9.5, "🟧", 9, { image: fandangosImg.url }),
          p("clubsocial", "Pringles", 13.4, "🟡", 25, { image: pringlesImg.url }),
        ],
      },
      {
        id: "saudaveis",
        name: "Saudáveis",
        products: [
          p("nuts", "Nuts Premium 30g", 7.9, "🥜", 18, { image: nutsImg.url }),
          p("castanhas", "Mix de Castanhas 50g", 12.9, "🌰", 6, { bestSeller: true, image: mixCastanhasImg.url }),
          p("barraproteina", "Barra de Proteína 20g", 9.9, "🍫", 14, { image: barraProteinaImg.url }),
          p("barracereal", "Barra de Cereal Trio", 4.5, "🌾", 32, { image: barraCerealImg.url }),
          p("amendoim", "Amendoim Japonês 100g", 6.5, "🥜", 11, { image: amendoimImg.url }),
          p("biscoito", "Biscoito Integral", 6.9, "🍪", 8, { image: biscoitoIntegralImg.url }),
        ],
      },
    ],
  },
  {
    id: "doces",
    name: "Doces",
    icon: "Candy",
    blurb: "Sua dose de açúcar",
    subcategories: [
      {
        id: "chocolates",
        name: "Chocolates",
        products: [
          p("kitkat", "KitKat ", 5.6, "🍫", 22, { bestSeller: true, image: kitkatImg.url }),
          p("bis", "Bis Lacta 126g", 8.9, "🟫", 14, { image: bisImg.url }),
          p("ourobranco", "Wafer Bauducco", 5.2, "🤍", 30),
          p("lacta", "Tablete Lacta 90g", 7.5, "🍫", 11, { oldPrice: 9.5, badge: "Combo 2x R$13" }),
          p("hersheys", "Hershey's Cookies'n'Cream", 9.9, "🤎", 6),
        ],
      },
      {
        id: "balas",
        name: "Balas & Gomas",
        products: [
          p("mms", "M&M's Amendoim", 8.5, "🟤", 17),
          p("gummies", "Gummies Frutas", 6.9, "🐻", 13),
          p("cookies", "Halls", 2.0, "🍪", 9),
        ],
      },
    ],
  },
  {
    id: "refrigerados",
    name: "Refrigerados",
    icon: "Snowflake",
    blurb: "Pronto pra consumir",
    subcategories: [
      {
        id: "iogurtes",
        name: "Iogurtes",
        products: [
          p("iognat", "Iogurte Natural 170g", 5.9, "🥛", 18, { expiresIn: "5 dias" }),
          p("ioggrego", "Iogurte Grego Mel", 7.9, "🍯", 12, { expiresIn: "8 dias", bestSeller: true }),
          p("yopror", "YoPRO 250g", 11.9, "💪", 9, { expiresIn: "12 dias" }),
          p("danone", "Danone Protein", 8.9, "🥛", 4, { expiresIn: "6 dias" }),
        ],
      },
      {
        id: "prontos",
        name: "Para comer já",
        products: [
          p("queijo", "Queijo em Porção 60g", 7.5, "🧀", 8, { expiresIn: "10 dias" }),
          p("sanduiche", "Sanduíche Frango Refrigerado", 14.9, "🥪", 6, { expiresIn: "2 dias", bestSeller: true }),
          
        ],
      },
    ],
  },
  {
    id: "higiene",
    name: "Higiene & Bem-Estar",
    icon: "HeartPulse",
    blurb: "Cuide-se no campus",
    subcategories: [
      {
        id: "pessoal",
        name: "Higiene Pessoal",
        products: [
          p("absorvente", "Absorvente Pack 8un", 8.5, "🩸", 14),
          p("escova", "Escova de Dente", 7.9, "🪥", 10),
          p("pasta", "Pasta de Dente 90g", 6.5, "😬", 16),
          p("desodorante", "Desodorante Roll-on", 12.9, "🧴", 9),
          p("sabonete", "Sabonete Líquido 250ml", 9.9, "🧼", 8),
          p("shampoo", "Shampoo 200ml", 14.9, "🧴", 6),
          p("condicionador", "Condicionador 200ml", 14.9, "🧴", 5),
        ],
      },
      {
        id: "saude",
        name: "Saúde",
        products: [
          p("vitamina", "Multivitamínico 30 caps", 29.9, "💊", 7),
          p("suplemento", "Whey Sachê 30g", 9.9, "💪", 15),
          p("analgesico", "Analgésico 10 cps", 6.5, "💊", 22),
          p("antitermico", "Antitérmico 10 cps", 7.5, "🌡️", 18),
        ],
      },
      {
        id: "cuidados",
        name: "Cuidados",
        products: [
          p("protetor", "Protetor Solar FPS 50", 34.9, "🌞", 6, { oldPrice: 39.9, badge: "-12%" }),
          p("hidratante", "Hidratante Corporal", 22.9, "💧", 9),
          p("lencos", "Lenços Umedecidos 48un", 8.9, "🧻", 14),
        ],
      },
    ],
  },
];

export interface Marmita {
  id: string;
  name: string;
  description: string;
  price: number;
  kcal: number;
  protein: number;
  carbs: number;
  stock: number;
  emoji: string;
  image?: string;
  tag?: string;
  day: "seg" | "ter" | "qua" | "qui" | "sex";
}

export const marmitas: Marmita[] = [
  {
    id: "m1",
    name: "Omelete de frango com farofinha de bacon",
    description: "Omelete recheado com frango desfiado, farofa crocante de bacon e mix de folhas",
    price: 23.6,
    kcal: 480,
    protein: 38,
    carbs: 12,
    stock: 12,
    emoji: "🍳",
    tag: "Proteico",
    day: "seg",
  },
  {
    id: "m2",
    name: "Spaghetti de abobrinha à bolonhesa",
    description: "Macarrão de abobrinha com molho de tomate artesanal e patinho moído",
    price: 21.5,
    kcal: 350,
    protein: 28,
    carbs: 15,
    stock: 8,
    emoji: "🍝",
    tag: "Low carb",
    day: "ter",
  },
  {
    id: "m3",
    name: "Panqueca fit de frango ao molho branco",
    description: "Panquecas leves recheadas com frango, cobertas com molho branco fit e queijo",
    price: 25.5,
    kcal: 540,
    protein: 35,
    carbs: 58,
    stock: 5,
    emoji: "🥘",
    tag: "Clássico",
    day: "qua",
  },
  {
    id: "m4",
    name: "Yakissoba de carne",
    description: "Macarrão oriental com tiras de carne, brócolis, acelga e pimentão",
    price: 24.3,
    kcal: 590,
    protein: 32,
    carbs: 65,
    stock: 6,
    emoji: "🥢",
    tag: "Oriental",
    day: "qui",
  },
  {
    id: "m5",
    name: "Strogonoff de mignon com arroz branco e batata sauté",
    description: "Tiras de filé mignon, molho cremoso, arroz branco e batatas douradas",
    price: 30.5,
    kcal: 720,
    protein: 45,
    carbs: 68,
    stock: 10,
    emoji: "🍛",
    image: strogonoffImg.url,
    tag: "Premium",
    day: "sex",
  },
];

export const dayLabels: { id: Marmita["day"]; label: string }[] = [
  { id: "seg", label: "Seg" },
  { id: "ter", label: "Ter" },
  { id: "qua", label: "Qua" },
  { id: "qui", label: "Qui" },
  { id: "sex", label: "Sex" },
];
