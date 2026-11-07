import React, { useMemo, useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid, LineChart, Line 
} from "recharts";
import { 
  LayoutDashboard, ShoppingBag, CreditCard, Star, MapPin, Package, Search, Bell, Receipt, Percent, Repeat, ThumbsUp, ThumbsDown, TrendingUp, Users, Settings, Download, DollarSign, Award, Layers, CheckCircle2, Shield, Palette, Check
} from "lucide-react";

// Data aggregated from your cleaned Olist CSV datasets
const D = {
  "M": [
    "2017-01","2017-02","2017-03","2017-04","2017-05","2017-06","2017-07","2017-08","2017-09","2017-10",
    "2017-11","2017-12","2018-01","2018-02","2018-03","2018-04","2018-05","2018-06","2018-07","2018-08"
  ],
  "CAT": {
    "agro_industry_and_commerce": [44,247,82,0,1520,60,2570,0,2082,951,9544,11425,5605,5171,7725,5119,3627,3072,6678,7008],
    "air_conditioning": [475,3096,4172,2503,1116,1112,2242,3280,2031,3481,2227,2519,3805,1812,3739,3124,2802,3537,1810,4436],
    "art": [0,0,114,110,420,7089,387,200,394,349,0,190,1809,1802,671,1359,3190,2196,2183,1641],
    "arts_and_craftmanship": [0,0,0,0,22,0,130,0,0,0,0,0,0,0,0,16,90,0,517,1039],
    "audio": [0,100,1035,807,1971,1647,1175,1081,804,1988,3415,2274,3864,3337,7934,9205,3212,1866,1705,3112],
    "auto": [4128,12425,12503,15223,16814,34646,14760,20500,10137,25250,25653,44724,34409,39755,47068,48909,45476,39863,43807,54708],
    "baby": [2760,6356,3442,2942,7582,10413,13449,20455,22816,18011,19387,24574,25786,18887,43764,49243,38604,32670,20276,28691],
    "bed_bath_table": [2181,13806,23494,21122,32252,36043,60824,58695,53396,45122,79137,63130,67515,64203,68585,71972,75190,73867,53939,69438],
    "books_general_interest": [125,835,2433,1055,1628,2184,1245,2806,1416,683,2017,2444,2738,1589,2064,4995,7399,3289,4028,1696],
    "books_imported": [0,99,0,20,0,99,0,61,290,0,324,231,381,450,336,299,430,348,498,774],
    "books_technical": [0,159,75,75,262,146,0,1030,1587,451,1135,568,884,1588,1269,779,3274,1817,2072,1658],
    "cds_dvds_musicals": [0,0,0,0,0,0,180,180,0,0,240,65,0,0,0,0,65,0,0,0],
    "christmas_supplies": [0,0,0,0,69,0,250,59,255,262,1180,659,703,2210,883,276,615,271,490,619],
    "cine_photo": [0,59,0,59,118,79,0,0,69,69,242,0,200,228,623,452,2353,467,1111,804],
    "computers": [0,5749,0,0,0,0,0,0,81779,32552,22410,12548,10853,790,0,13775,8700,13297,3120,16860],
    "computers_accessories": [3219,11783,22450,22877,41972,37730,38831,36269,29807,37179,58906,57586,67593,86170,106164,65568,55047,37934,42633,50708],
    "consoles_games": [5191,3975,9759,5669,1463,5933,3348,9692,7108,12199,9866,12036,7506,9087,12245,10370,7302,5970,7007,7858],
    "construction_tools_construction": [0,647,773,0,0,376,649,791,1618,2208,5278,6354,8712,10239,10121,12307,21550,21563,15508,25951],
    "construction_tools_lights": [0,0,0,0,0,0,0,720,458,250,800,1738,2423,1053,2606,4825,5763,4324,6230,9771],
    "construction_tools_safety": [0,379,380,0,0,0,0,9,745,1849,3489,1415,1409,6588,3394,4229,5798,4853,1627,4382],
    "cool_stuff": [6060,12904,20095,20074,32846,36996,38796,42316,36673,39201,59711,42023,38666,29635,37326,34898,37038,16225,28624,23483],
    "costruction_tools_garden": [0,580,0,191,2857,20,750,1081,401,355,1124,1549,3892,1339,2593,1083,1301,675,1613,4232],
    "costruction_tools_tools": [0,0,0,0,1533,0,0,0,917,1019,90,469,355,877,1374,1385,508,620,4990,1767],
    "diapers_and_hygiene": [0,0,0,0,0,0,0,0,0,0,0,76,0,125,263,104,162,321,74,308],
    "drinks": [0,0,464,200,0,140,174,220,295,470,847,1831,2117,1581,1731,4906,3015,1557,935,1946],
    "dvds_blu_ray": [0,45,1874,1435,60,137,753,130,40,155,60,180,25,50,50,75,458,374,93,9],
    "electronics": [546,1106,3395,1866,9383,2757,6736,3719,3658,3419,6818,11728,14593,13894,14753,9363,15656,12003,9430,13914],
    "fashio_female_clothing": [77,249,229,65,272,305,115,384,356,0,50,30,96,96,120,0,175,0,0,35],
    "fashion_bags_accessories": [1417,2425,3708,3798,6068,7787,5062,6550,10642,9079,11921,10925,8276,7849,12725,7356,13667,7610,6125,9315],
    "fashion_childrens_clothes": [0,0,0,0,110,110,0,50,0,130,0,0,0,0,80,0,0,90,0,0],
    "fashion_male_clothing": [127,532,642,392,684,570,520,1335,813,1329,776,752,447,103,388,0,325,408,151,480],
    "fashion_shoes": [35,107,850,1469,1220,2344,878,1962,1100,1215,1954,1364,782,931,1296,1467,1555,1715,410,882],
    "fashion_sport": [0,0,40,190,125,456,110,60,206,444,60,60,120,0,90,90,0,0,0,70],
    "fashion_underwear_beach": [86,448,220,273,284,4,120,1116,1677,313,688,1573,916,429,369,190,327,179,50,280],
    "fixed_telephony": [666,421,1321,3569,459,860,265,3384,143,17342,854,979,2554,4639,2960,1999,1965,2219,7856,4423],
    "flowers": [0,0,0,0,0,0,0,0,0,0,188,83,285,134,30,166,69,108,48,0],
    "food": [0,739,2190,988,388,150,490,458,765,956,473,877,877,1454,2123,1267,2047,1353,2761,8956],
    "food_drink": [0,0,111,14,337,171,148,383,391,2115,1837,1840,442,788,2479,516,1212,473,625,1298],
    "furniture_bedroom": [73,450,0,210,2781,457,608,1078,779,1104,873,250,1100,677,1490,1302,988,1630,884,3296],
    "furniture_decor": [10168,19056,25331,16947,24776,19113,22734,34723,33374,28600,45420,50498,53013,37379,53671,53822,59090,39643,44019,52388],
    "furniture_living_room": [408,3254,4150,2619,3442,3201,3797,2817,1026,1963,3184,5425,1445,2567,5933,3136,3865,3808,5852,7026],
    "furniture_mattress_and_upholstery": [0,0,0,0,219,486,109,109,486,0,85,1053,786,225,679,0,0,0,130,0],
    "garden_tools": [6764,12376,20364,18340,26969,15268,19599,22973,23001,23367,43282,31966,23230,27168,28780,29556,46863,18226,22989,22699],
    "health_beauty": [8571,25071,23876,15999,42790,38960,31403,52650,48743,43572,64343,76916,63368,78435,105442,81134,98010,113700,98054,140284],
    "home_appliances": [0,741,313,237,1811,2276,3214,4463,2693,2126,3039,2557,1988,3013,8945,18091,6133,5766,4580,8186],
    "home_appliances_2": [467,1676,501,800,3093,754,1176,2995,2394,3007,4611,2592,4841,11795,4209,19413,16622,5280,15743,11350],
    "home_comfort_2": [73,0,13,343,0,13,13,13,39,26,77,0,0,0,74,13,0,26,39,0],
    "home_confort": [0,325,1086,3482,4196,3890,4510,3435,4845,3987,3718,4214,2770,2280,2842,2425,2650,2341,2903,2672],
    "home_construction": [0,561,727,885,2310,1911,109,218,1027,4236,3295,7859,5499,4777,5374,9419,9106,10458,6563,8753],
    "housewares": [2211,12829,11808,9173,23669,24037,20851,23091,21477,17607,27346,31644,33690,35206,40132,38751,65797,56532,52271,82269],
    "industry_commerce_and_business": [0,0,357,0,520,277,246,867,200,2287,2025,1563,2731,5125,2868,4507,5674,2473,4832,2760],
    "kitchen_dining_laundry_garden_furniture": [0,220,144,965,908,563,1076,1505,483,1087,6243,4915,3650,5715,1987,4025,2679,3162,3834,3023],
    "la_cuisine": [0,0,0,24,0,193,341,303,139,137,0,137,112,0,0,669,0,0,0,0],
    "luggage_accessories": [143,1909,4884,6153,11302,10020,8146,7555,4517,5421,8624,5767,17154,8449,6831,7682,7613,5415,3914,8934],
    "market_place": [397,1283,2218,2634,3342,1352,1797,2107,1107,820,1565,763,539,2136,1547,686,967,424,333,1053],
    "music": [20,0,28,35,25,329,1067,0,0,55,0,0,25,25,245,460,2212,158,853,498],
    "musical_instruments": [340,1983,1561,3065,9633,5873,5396,8336,8064,7734,15662,13258,12235,10004,10027,19364,21581,15406,8650,13328],
    "office_furniture": [0,12058,9791,8190,11163,5256,14375,13990,8091,13668,21769,8706,9265,22865,27850,21369,23478,14488,9681,16260],
    "party_supplies": [0,0,0,0,0,0,0,70,270,138,299,1086,68,68,683,275,40,146,58,1285],
    "pc_gamer": [0,0,0,260,130,130,0,0,0,0,0,0,0,130,0,0,0,0,0,896],
    "perfumery": [3094,8660,18277,18630,20257,25266,11776,15220,13359,16083,25167,34234,20288,20054,23048,15934,26368,26290,19829,31454],
    "pet_shop": [799,3245,8338,4494,9605,5229,6302,9337,9886,8713,8339,9447,10680,8458,12481,18686,14284,17766,15437,31713],
    "portateis_cozinha_e_preparadores_de_alimentos": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1958,0,94,1917],
    "security_and_services": [183,0,0,0,0,0,0,0,100,0,0,0,0,0,0,0,0,0,0,0],
    "signaling_and_security": [0,0,0,174,110,702,520,388,322,860,559,138,1619,642,1027,938,2037,5321,3742,2410],
    "small_appliances": [513,5035,11356,16350,12755,6792,9026,4132,5442,11655,6952,10798,10891,7274,15949,10761,11577,15804,9553,8034],
    "small_appliances_home_oven_and_coffee": [0,0,0,0,0,0,72,22,728,0,0,0,370,2275,5364,13010,13831,4078,3711,3985],
    "sports_leisure": [7678,15744,26645,19735,37082,34037,34252,45262,47759,51478,57334,67559,65990,88688,92246,65964,66454,45564,50011,64808],
    "stationery": [892,2942,4640,4647,6011,4061,6150,7511,5042,7611,15995,24290,42662,12036,13869,12351,12614,13596,13312,20351],
    "tablets_printing_image": [0,495,594,663,2064,693,198,342,244,198,350,419,110,589,417,0,102,50,0,0],
    "telephony": [1714,7464,6031,7046,9594,8979,6590,11595,18416,20201,24154,18921,13313,15357,17182,23289,20282,26464,17803,47252],
    "toys": [3856,9007,11359,10444,21287,20148,19801,20967,27555,37630,48968,70548,26119,12303,23483,21685,33251,22083,17459,21070],
    "unknown": [1501,8178,5897,7375,12210,6974,3079,4580,6329,16668,14663,13391,24715,13203,16392,10112,4416,2667,3213,3906],
    "watches_gifts": [3123,12149,27103,21246,37766,31401,31995,38461,44243,65587,92713,77189,70378,61428,99521,78218,133848,94835,91764,85738]
  },
  "ST": {
    "MG": [70,230,334,253,474,406,343,476,432,463,585,583,550,484,544,463,534,516,477,574],
    "Other": [32,112,168,136,207,181,175,219,324,315,360,359,357,302,365,349,471,362,472,626],
    "PR": [107,177,216,174,263,255,250,305,255,355,507,595,620,863,845,625,554,447,550,654],
    "RJ": [41,89,96,110,112,119,103,107,154,197,329,395,324,320,354,315,427,381,335,462],
    "SC": [33,101,136,121,216,157,187,236,188,165,232,269,235,226,297,198,254,253,234,318],
    "SP": [398,1157,1801,1570,2878,2683,3058,3699,3371,3694,5342,5525,5406,5180,6354,5687,6525,4938,4604,6181]
  },
  "PAY": {
    "boleto": [137,386,493,417,790,701,812,913,866,953,1191,1484,1376,1212,1498,1257,1433,1019,1130,1473],
    "credit_card": [422,1235,1837,1640,2803,2613,2733,3390,3199,3431,4994,5157,5066,5078,5965,5197,6013,4756,4514,5927],
    "debit_card": [7,13,28,24,34,26,25,30,40,53,59,67,104,74,75,98,53,168,206,332],
    "voucher": [38,110,198,176,280,266,309,306,279,273,353,325,397,323,370,367,352,303,273,315]
  },
  "INS": [
    [1716,4823,7338,6783,12473,11477,11999,14365,13174,13533,19849,20477,18307,17681,22014,18558,21816,17944,16623,21871],
    [604,1744,2556,2257,3907,3606,3879,4639,4384,4710,6597,7033,6943,6687,7908,6919,7851,6246,6123,8047]
  ],
  "REV": {
    "1": [17,96,313,244,381,349,312,385,396,408,506,1190,707,782,1525,1119,694,617,454,841],
    "2": [3,39,77,71,130,103,110,138,125,132,134,288,219,199,307,273,209,206,129,251],
    "3": [23,120,217,194,329,309,301,343,310,334,438,671,550,568,725,602,564,520,395,644],
    "4": [35,275,482,402,765,678,681,850,854,922,934,1562,1201,1153,1459,1372,1487,1265,1017,1697],
    "5": [161,883,1392,1144,2105,2001,2099,2787,2514,2628,2774,4271,3502,3399,3787,3921,4504,4107,3639,5554]
  },
  "REVN": [80125,245982,343243,308148,505655,469001,465282,560093,617046,658020,883352,898921,845279,819229,1030528,958730,1084359,870737,811132,1072148],
  "ORD": [573,1650,2401,2111,3674,3385,3643,4403,4165,4490,6314,6772,6656,6450,7636,6656,7572,6019,5922,7823],
  "WORST": [
    ["pc_gamer", 3.43, 7],
    ["portateis_cozinha_e_preparadores_de_alimentos", 3.43, 14],
    ["office_furniture", 3.62, 1260],
    ["fashion_male_clothing", 3.7, 111],
    ["fashio_female_clothing", 3.73, 41]
  ]
};


// ───────────────────────── THEMES ─────────────────────────
// Tambah tema baru cukup dengan menambah satu objek di sini.
const THEMES = {
  ocean: {
    name: "Ocean Sky",
    desc: "Warna asli dashboard · biru langit dengan glass lembut",
    swatch: ["#020617", "#0b2538", "#0e4a5e", "#0ea5e9", "#38bdf8", "#34d399"],
    bg: "linear-gradient(135deg,#020617 0%,#0b2538 50%,#0e4a5e 100%)",
    orbs: { a: "#38bdf8", b: "#0e7490", o: 0.16 },
    vars: {
      "--c1": "#7dd3fc", "--c2": "#6ee7b7", "--c3": "#fcd34d", "--c4": "#f9a8d4",
      "--accent-solid": "#0ea5e9", "--accent-solid-2": "#4f46e5", "--neg-solid": "#ec4899",
      "--glow": "rgba(56,189,248,.25)",
      "--glass-bg": "rgba(255,255,255,.06)", "--glass-hover": "rgba(255,255,255,.10)",
      "--glass-border": "rgba(255,255,255,.10)",
      "--glass-shadow": "0 8px 32px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.06)",
      "--blur": "24px",
      "--sidebar-bg": "rgba(15,23,42,.60)", "--thead-bg": "#0c283c", "--select-bg": "#1e293b",
      "--input-bg": "rgba(255,255,255,.05)",
      "--nav-active-bg": "rgba(14,165,233,.30)", "--nav-active-border": "rgba(56,189,248,.30)",
      "--pill-bg": "#ffffff", "--pill-text": "#0f172a",
    },
    chart: ["#38bdf8", "#34d399", "#fbbf24", "#f472b6", "#a78bfa", "#64748b"],
    primary: "#38bdf8", secondary: "#34d399", warn: "#fbbf24", neg: "#f472b6",
    tick: "#cbd5e1", tick2: "#94a3b8", tip: "#0f2a3d",
  },
  teal: {
    name: "Teal Glass",
    desc: "Glassmorphism teal · #05161A → #6DA5C0 dengan cahaya cyan",
    swatch: ["#05161A", "#072E33", "#0C7075", "#0F969C", "#6DA5C0", "#294D61"],
    bg: "radial-gradient(ellipse 70% 45% at 50% 0%,rgba(15,150,156,.45) 0%,transparent 70%),linear-gradient(160deg,#05161A 0%,#072E33 55%,#06232b 100%)",
    orbs: { a: "#22e5f5", b: "#0F969C", o: 0.34 },
    vars: {
      "--c1": "#86e3e8", "--c2": "#8cc4dd", "--c3": "#f4d58d", "--c4": "#f5a3b5",
      "--accent-solid": "#0F969C", "--accent-solid-2": "#294D61", "--neg-solid": "#d9667e",
      "--glow": "rgba(34,229,245,.28)",
      "--glass-bg": "linear-gradient(135deg,rgba(109,165,192,.17) 0%,rgba(15,150,156,.07) 100%)",
      "--glass-hover": "linear-gradient(135deg,rgba(109,165,192,.26) 0%,rgba(15,150,156,.13) 100%)",
      "--glass-border": "rgba(150,230,236,.20)",
      "--glass-shadow": "0 10px 36px rgba(0,10,14,.55), inset 0 1px 0 rgba(255,255,255,.16), inset 0 -1px 0 rgba(15,150,156,.15)",
      "--blur": "28px",
      "--sidebar-bg": "linear-gradient(180deg,rgba(7,46,51,.62) 0%,rgba(5,22,26,.78) 100%)",
      "--thead-bg": "#0a3138", "--select-bg": "#072E33",
      "--input-bg": "rgba(109,165,192,.10)",
      "--nav-active-bg": "linear-gradient(90deg,rgba(15,150,156,.60) 0%,rgba(109,165,192,.28) 100%)",
      "--nav-active-border": "rgba(150,230,236,.38)",
      "--pill-bg": "#6DA5C0", "--pill-text": "#05161A",
    },
    chart: ["#19c3cb", "#6DA5C0", "#0F969C", "#a6eef0", "#4b86a3", "#2f7387"],
    primary: "#19c3cb", secondary: "#6DA5C0", warn: "#f4d58d", neg: "#f08ca0",
    tick: "#bfe6ea", tick2: "#7fb0bd", tip: "#072E33",
  },
  crimson: {
    name: "Crimson Magenta",
    desc: "Gaya Glassmorphism nuansa magenta & crimson gelap yang elegan",
    swatch: ["#2b020d", "#800021", "#881144", "#c24366", "#ff69b4", "#ffe4d8"],
    bg: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(194,67,102,0.35) 0%, transparent 70%), linear-gradient(160deg, #1f0109 0%, #3b0213 55%, #150005 100%)",
    orbs: { a: "#ff69b4", b: "#881144", o: 0.28 },
    vars: {
      "--c1": "#ffb3d1", "--c2": "#ffe4d8", "--c3": "#fcd34d", "--c4": "#f9a8d4",
      "--accent-solid": "#c24366", "--accent-solid-2": "#800021", "--neg-solid": "#ff4d6d",
      "--glow": "rgba(255,105,180,0.25)",
      "--glass-bg": "linear-gradient(135deg, rgba(194,67,102,0.18) 0%, rgba(128,0,33,0.10) 100%)",
      "--glass-hover": "linear-gradient(135deg, rgba(194,67,102,0.28) 0%, rgba(136,17,68,0.18) 100%)",
      "--glass-border": "rgba(255,179,209,0.22)",
      "--glass-shadow": "0 10px 36px rgba(25,0,8,0.6), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(194,67,102,0.2)",
      "--blur": "26px",
      "--sidebar-bg": "linear-gradient(180deg, rgba(59,2,19,0.65) 0%, rgba(31,1,9,0.82) 100%)",
      "--thead-bg": "#470417", "--select-bg": "#3b0213",
      "--input-bg": "rgba(194,67,102,0.12)",
      "--nav-active-bg": "linear-gradient(90deg, rgba(194,67,102,0.65) 0%, rgba(255,105,180,0.30) 100%)",
      "--nav-active-border": "rgba(255,179,209,0.40)",
      "--pill-bg": "#ffe4d8", "--pill-text": "#800021",
    },
    chart: ["#ff69b4", "#c24366", "#ffe4d8", "#ffb3d1", "#881144", "#a23b5a"],
    primary: "#ff69b4", secondary: "#c24366", warn: "#fcd34d", neg: "#ff4d6d",
    tick: "#ffc2d6", tick2: "#d4829c", tip: "#3b0213",
  },

  // ❄️ TEMA 2: Pastel Frost Glass (Dari Gambar 2)
  pastel: {
    name: "Pastel Frost",
    desc: "Gaya Glassmorphism nuansa soft pink, sage & icy teal yang lembut",
    swatch: ["#1e292b", "#5d6b6b", "#bdd7d8", "#d5e5e5", "#ddd3d3", "#f7cbca"],
    bg: "radial-gradient(ellipse 75% 55% at 50% 0%, rgba(247,203,202,0.28) 0%, transparent 65%), linear-gradient(160deg, #1a2325 0%, #29383b 55%, #151d1f 100%)",
    orbs: { a: "#bdd7d8", b: "#f7cbca", o: 0.25 },
    vars: {
      "--c1": "#bdd7d8", "--c2": "#f7cbca", "--c3": "#fcd34d", "--c4": "#ddd3d3",
      "--accent-solid": "#5d6b6b", "--accent-solid-2": "#3b4646", "--neg-solid": "#e89998",
      "--glow": "rgba(189,215,216,0.3)",
      "--glass-bg": "linear-gradient(135deg, rgba(213,229,229,0.15) 0%, rgba(247,203,202,0.08) 100%)",
      "--glass-hover": "linear-gradient(135deg, rgba(213,229,229,0.24) 0%, rgba(247,203,202,0.14) 100%)",
      "--glass-border": "rgba(221,211,211,0.25)",
      "--glass-shadow": "0 10px 36px rgba(15,22,23,0.55), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(189,215,216,0.15)",
      "--blur": "28px",
      "--sidebar-bg": "linear-gradient(180deg, rgba(41,56,59,0.65) 0%, rgba(26,35,37,0.85) 100%)",
      "--thead-bg": "#2b3b3e", "--select-bg": "#29383b",
      "--input-bg": "rgba(213,229,229,0.12)",
      "--nav-active-bg": "linear-gradient(90deg, rgba(93,107,107,0.65) 0%, rgba(189,215,216,0.30) 100%)",
      "--nav-active-border": "rgba(221,211,211,0.45)",
      "--pill-bg": "#f7cbca", "--pill-text": "#1e292b",
    },
    chart: ["#bdd7d8", "#f7cbca", "#ddd3d3", "#8bb2b4", "#e8a09f", "#5d6b6b"],
    primary: "#bdd7d8", secondary: "#f7cbca", warn: "#fcd34d", neg: "#e89998",
    tick: "#e1eeee", tick2: "#a1b8b9", tip: "#29383b",
  },
};


const GLASS_CSS = `
  .glass{position:relative;background:var(--glass-bg);border:1px solid var(--glass-border);box-shadow:var(--glass-shadow);
    -webkit-backdrop-filter:blur(var(--blur)) saturate(170%);backdrop-filter:blur(var(--blur)) saturate(170%);
    transition:background .3s,box-shadow .3s,border-color .3s,transform .3s}
  .glass-hover:hover{background:var(--glass-hover);box-shadow:0 0 30px var(--glow),var(--glass-shadow)}
  .glass-thead{background:var(--thead-bg)}
  .glass-select{background:var(--select-bg)}
  .glass-select option{background:var(--select-bg);color:#fff}
  .glass-input{background:var(--input-bg);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}
  .glass-scroll::-webkit-scrollbar{width:8px;height:8px}
  .glass-scroll::-webkit-scrollbar-thumb{background:var(--glass-border);border-radius:9999px}
  .glass-scroll::-webkit-scrollbar-track{background:transparent}
`;

const RANGES = [{ k: "3M", n: 3 }, { k: "6M", n: 6 }, { k: "12M", n: 12 }, { k: "All", n: 99 }];
const sum = (a, s) => a.slice(s).reduce((x, y) => x + y, 0);
const nice = (s) => s.replace(/_/g, " ");

function Glass({ className = "", children }) {
  return (
    <div className={"glass rounded-2xl " + className}>
      {children}
    </div>
  );
}

function Stat({ icon: Icon, label, value, sub, tone = "text-[color:var(--c1)]" }) {
  return (
    <Glass className="glass-hover p-4 hover:-translate-y-1">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
        <Icon size={18} className={tone} />
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-white/70">{label}</div>
      <div className="mt-0.5 text-xs text-white/40">{sub}</div>
    </Glass>
  );
}

export default function App() {
  const [range, setRange] = useState("6M");
  const [mode, setMode] = useState("top");
  const [nav, setNav] = useState("Overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [currency, setCurrency] = useState("BRL");
  const [saveToast, setSaveToast] = useState(false);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("dashboard-theme") || "ocean"; } catch { return "ocean"; }
  });
  const T = THEMES[theme] || THEMES.ocean;
  const changeTheme = (k) => {
    setTheme(k);
    try { localStorage.setItem("dashboard-theme", k); } catch { /* ignore */ }
  };
  const tip = {
    background: T.tip + "f2",
    border: "1px solid " + T.vars["--glass-border"],
    borderRadius: 12,
    color: "#fff",
  };

  const RATE_USD = 0.20;

  const fmtMoney = (v) => {
    const val = currency === "USD" ? v * RATE_USD : v;
    const symbol = currency === "USD" ? "$ " : "R$ ";
    return symbol + Math.round(val).toLocaleString("id-ID");
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) return "Good morning";
    if (hour >= 11 && hour < 15) return "Good afternoon";
    if (hour >= 15 && hour < 18) return "Good evening";
    return "Good night";
  };

  const n = RANGES.find((r) => r.k === range).n;
  const s = Math.max(0, D.M.length - n);
  const label = range === "All" ? "Jan 2017 – Aug 2018" : `${D.M[s]} → ${D.M[D.M.length - 1]}`;

  const v = useMemo(() => {
    const cats = Object.entries(D.CAT)
      .map(([c, a]) => ({ name: nice(c), rawKey: c, value: sum(a, s) }))
      .filter((x) => x.value > 0)
      .sort((a, b) => b.value - a.value);

    const bars = mode === "top" ? cats.slice(0, 5) : cats.slice(-5).reverse();
    const revenue = sum(D.REVN, s);
    const orders = sum(D.ORD, s);
    const states = Object.entries(D.ST).map(([k, a]) => ({ name: k, value: sum(a, s) }));
    const items = states.reduce((x, y) => x + y.value, 0);
    const sp = states.find((x) => x.name === "SP")?.value || 0;
    const pay = Object.entries(D.PAY)
      .map(([k, a]) => ({ name: k.replace("_", " ").toUpperCase(), rawKey: k, value: sum(a, s) }))
      .sort((a, b) => b.value - a.value);
    const payTot = pay.reduce((x, y) => x + y.value, 0);
    const inst = sum(D.INS[0], s) / (sum(D.INS[1], s) || 1);
    const rv = [1, 2, 3, 4, 5].map((k) => ({ star: k + "★", value: sum(D.REV[String(k)], s) }));
    const rvTot = rv.reduce((x, y) => x + y.value, 0);
    const avg = rvTot > 0 ? rv.reduce((x, y, i) => x + y.value * (i + 1), 0) / rvTot : 0;

    const monthlyTrends = D.M.slice(s).map((m, idx) => ({
      month: m,
      revenue: currency === "USD" ? Math.round(D.REVN[s + idx] * RATE_USD) : D.REVN[s + idx],
      orders: D.ORD[s + idx],
      aov: Math.round(D.REVN[s + idx] / (D.ORD[s + idx] || 1))
    }));

    return { 
      cats, bars, revenue, orders, states, items, sp, pay, payTot, inst, rv, rvTot, avg, 
      top: cats[0] || { name: "-", value: 0 },
      monthlyTrends 
    };
  }, [s, mode, currency]);

  const pct = (a, b) => (b > 0 ? ((a / b) * 100).toFixed(1) + "%" : "0%");
  const getPayVal = (k) => v.pay.find((x) => x.rawKey === k)?.value || 0;
  
  const filteredCats = useMemo(() => {
    return v.cats.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [v.cats, searchTerm]);

  const handleExportCSV = () => {
    const headers = ["Category Name", "Raw Key", `Revenue (${currency})`, "Share Percent"];
    const rows = v.cats.map((c) => {
      const revVal = currency === "USD" ? (c.value * RATE_USD).toFixed(2) : c.value;
      const share = pct(c.value, v.revenue);
      return `"${c.name}","${c.rawKey}",${revVal},"${share}"`;
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Olist_Analytics_${range}_${currency}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const navItems = [
    ["Overview", LayoutDashboard],
    ["Products", Package],
    ["Payments", CreditCard],
    ["Sellers", MapPin],
    ["Reviews", Star],
    ["Customers", Users],
    ["Settings", Settings]
  ];

  return (
    <div
      data-theme={theme}
      className="relative min-h-screen text-white lg:flex font-sans antialiased"
      style={{ ...T.vars, background: T.bg }}
    >
      <style>{GLASS_CSS}</style>

      {/* Glow orbs — memberi "isi" di belakang kaca supaya efek blur terlihat */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-28 top-[18%] h-80 w-80 rounded-full blur-[110px]" style={{ background: T.orbs.a, opacity: T.orbs.o }} />
        <div className="absolute -right-28 top-[18%] h-80 w-80 rounded-full blur-[110px]" style={{ background: T.orbs.a, opacity: T.orbs.o }} />
        <div className="absolute -left-28 bottom-[8%] h-80 w-80 rounded-full blur-[110px]" style={{ background: T.orbs.a, opacity: T.orbs.o }} />
        <div className="absolute -right-28 bottom-[8%] h-80 w-80 rounded-full blur-[110px]" style={{ background: T.orbs.a, opacity: T.orbs.o }} />
        <div className="absolute left-1/3 -top-32 h-96 w-96 rounded-full blur-[130px]" style={{ background: T.orbs.b, opacity: T.orbs.o * 0.9 }} />
      </div>
      {/* Sidebar navigation */}
      <aside
        className="relative z-10 border-b p-4 lg:min-h-screen lg:w-60 lg:border-b-0 lg:border-r shrink-0"
        style={{
          background: "var(--sidebar-bg)",
          borderColor: "var(--glass-border)",
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
        }}
      >
        <div className="mb-6 flex items-center gap-2 px-2 font-bold text-lg tracking-wide text-[color:var(--c1)]">
          <ShoppingBag className="text-[color:var(--c1)]" size={22} />
          <span>Olist Admin</span>
        </div>
        <nav className="flex gap-1 overflow-x-auto lg:flex-col">
          {navItems.map(([name, Icon]) => (
            <button
              key={name}
              onClick={() => setNav(name)}
              style={nav === name ? { background: "var(--nav-active-bg)", borderColor: "var(--nav-active-border)", boxShadow: "0 0 20px var(--glow)" } : undefined}
              className={
                "flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition duration-200 " +
                (nav === name
                  ? "text-white border"
                  : "text-white/60 hover:bg-white/10 hover:text-white")
              }
            >
              <Icon size={18} />
              {name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content area */}
      <main className="relative z-10 min-w-0 flex-1 p-4 lg:p-6">
        {/* Top Header bar */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-[200px] flex-1 max-w-md items-center gap-2.5 glass-input rounded-xl border border-white/10 px-3.5 py-2 text-sm text-white/50 focus-within:border-[color:var(--accent-solid)]">
            <Search size={16} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search categories, states, payments…" 
              className="bg-transparent text-white placeholder-white/40 focus:outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
              <Bell size={18} className="text-white/70" />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-slate-950 shadow-md" style={{ background: "linear-gradient(135deg, var(--accent-solid), var(--c2))" }}>
              MF
            </div>
          </div>
        </div>

        {/* Dashboard Title & Time Filters */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {nav === "Overview" ? `${getGreeting()}, Maulida Fatma ` : `${nav} View`}
            </h1>
            <p className="text-xs text-white/50 mt-1">Olist marketplace dataset · <span className="text-[color:var(--c1)] font-medium">{label}</span></p>
          </div>
          <div className="flex gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md" role="group" aria-label="Date range">
            {RANGES.map((r) => (
              <button
                key={r.k}
                onClick={() => setRange(r.k)}
                style={range === r.k ? { background: "var(--pill-bg)", color: "var(--pill-text)" } : undefined}
                className={
                  "rounded-full px-4 py-1.5 text-xs font-medium transition duration-200 " +
                  (range === r.k
                    ? "shadow-sm"
                    : "text-white/70 hover:bg-white/10 hover:text-white")
                }
              >
                {r.k === "All" ? "All time" : r.k.replace("M", " months")}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {nav === "Overview" && (
          <>
            <div className="mb-6 grid gap-5 xl:grid-cols-3">
              <Glass className="p-5 xl:col-span-2 flex flex-col justify-between">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="text-base font-semibold">{mode === "top" ? "Top 5" : "Bottom 5"} categories by revenue</h2>
                    <p className="text-xs text-white/50 mt-0.5">{fmtMoney(v.revenue)} total · leader: <span className="text-[color:var(--c1)] font-medium">{v.top.name}</span></p>
                  </div>
                  <div className="flex gap-1 rounded-full bg-white/10 p-1 text-xs">
                    {["top", "bottom"].map((m) => (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        style={mode === m ? { background: m === "top" ? "var(--accent-solid)" : "var(--neg-solid)" } : undefined}
                        className={
                          "rounded-full px-3.5 py-1 capitalize font-medium transition " +
                          (mode === m ? "text-white shadow" : "text-white/60 hover:bg-white/10 hover:text-white")
                        }
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={v.bars} margin={{ top: 16, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: T.tick, fontSize: 10 }} 
                        interval={0} 
                        tickFormatter={(t) => (t.length > 12 ? t.slice(0, 11) + "…" : t)} 
                        axisLine={false} 
                        tickLine={false} 
                      />
                      <YAxis 
                        tick={{ fill: T.tick2, fontSize: 10 }} 
                        tickFormatter={(t) => (t >= 1000 ? Math.round(t / 1000) + "K" : t)} 
                        axisLine={false} 
                        tickLine={false} 
                      />
                      <Tooltip 
                        cursor={{ fill: "rgba(255,255,255,.07)" }} 
                        formatter={(x) => [fmtMoney(x), "Revenue"]} 
                        contentStyle={tip} 
                      />
                      <Bar dataKey="value" fill={mode === "top" ? T.primary : T.neg} radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Glass>

              <Glass className="p-5 flex flex-col justify-between">
                <div>
                  <h2 className="text-base font-semibold">Seller states</h2>
                  <p className="text-xs text-white/50 mt-0.5">Share of items sold</p>
                </div>
                <div className="relative h-44 my-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={v.states} dataKey="value" innerRadius={48} outerRadius={70} paddingAngle={2} stroke="none">
                        {v.states.map((_, i) => (
                          <Cell key={i} fill={T.chart[i % T.chart.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(x) => [x.toLocaleString("id-ID") + " items", "Volume"]} 
                        contentStyle={tip} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <b className="text-lg font-bold">{pct(v.sp, v.items)}</b>
                    <span className="text-[10px] text-white/50 tracking-wider">SP SHARE</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs border-t border-white/10 pt-3">
                  {v.states.map((x, i) => (
                    <div key={x.name} className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5 text-white/80">
                        <i className="h-2 w-2 rounded-full inline-block" style={{ background: T.chart[i % T.chart.length] }} />
                        {x.name}
                      </span>
                      <span className="text-white/60 font-mono">{x.value.toLocaleString("id-ID")}</span>
                    </div>
                  ))}
                </div>
              </Glass>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
              <Stat icon={TrendingUp} label="Total revenue" value={fmtMoney(v.revenue)} sub={`Top: ${v.top.name} ${fmtMoney(v.top.value)}`} />
              <Stat icon={Receipt} label="Total transactions" value={v.items.toLocaleString("id-ID")} sub={`SP: ${v.sp.toLocaleString("id-ID")} (${pct(v.sp, v.items)})`} tone="text-[color:var(--c2)]" />
              <Stat icon={CreditCard} label="Credit card payments" value={getPayVal("credit_card").toLocaleString("id-ID")} sub={`${pct(getPayVal("credit_card"), v.payTot)} of payments`} tone="text-[color:var(--c3)]" />
              <Stat icon={Star} label="Avg review score" value={v.avg.toFixed(2) + " / 5"} sub={`${pct(v.rv[4]?.value || 0, v.rvTot)} give 5★`} tone="text-[color:var(--c4)]" />
              <Stat icon={Package} label="Orders" value={v.orders.toLocaleString("id-ID")} sub={`AOV ${fmtMoney(v.revenue / (v.orders || 1))}`} />
              <Stat icon={Percent} label="Boleto payments" value={getPayVal("boleto").toLocaleString("id-ID")} sub={`${pct(getPayVal("boleto"), v.payTot)} of payments`} tone="text-[color:var(--c2)]" />
              <Stat icon={Repeat} label="Avg installments" value={v.inst.toFixed(2)} sub="per payment record" tone="text-[color:var(--c3)]" />
              <Stat icon={ThumbsDown} label="1★ reviews" value={pct(v.rv[0]?.value || 0, v.rvTot)} sub={`${(v.rv[0]?.value || 0).toLocaleString("id-ID")} reviews`} tone="text-[color:var(--c4)]" />
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <Glass className="p-5 flex flex-col justify-between">
                <h2 className="mb-3 flex items-center gap-2 text-base font-semibold">
                  <ThumbsUp size={16} className="text-[color:var(--c1)]" />
                  Review score distribution
                </h2>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={v.rv}>
                      <XAxis dataKey="star" tick={{ fill: T.tick, fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip 
                        cursor={{ fill: "rgba(255,255,255,.07)" }} 
                        formatter={(val) => [val.toLocaleString("id-ID") + " reviews", "Count"]}
                        contentStyle={tip} 
                      />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {v.rv.map((_, i) => (
                          <Cell key={i} fill={i < 2 ? T.neg : i === 2 ? T.warn : T.secondary} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Glass>

              <Glass className="p-5 flex flex-col justify-between">
                <div>
                  <h2 className="text-base font-semibold">Lowest-rated categories (all time)</h2>
                  <p className="mb-4 text-xs text-white/50 mt-0.5">Needs attention · categories with fewer than 5 reviews are low confidence</p>
                </div>
                <div className="space-y-3">
                  {D.WORST.map(([c, sc, cnt]) => (
                    <div key={c} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="capitalize text-white/90">{nice(c)}</span>
                        <span className="text-white/60 font-mono">{sc.toFixed(2)} ★ · n={cnt}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-400" 
                          style={{ width: (sc / 5) * 100 + "%" }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Glass>
            </div>
          </>
        )}

        {/* TAB 2: PRODUCTS */}
        {nav === "Products" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              <Stat icon={Package} label="Total Categories" value={v.cats.length.toString()} sub="Active product lines" />
              <Stat icon={TrendingUp} label="Top Category Revenue" value={fmtMoney(v.top.value)} sub={v.top.name} tone="text-[color:var(--c2)]" />
              <Stat icon={Layers} label="Avg Revenue / Category" value={fmtMoney(v.revenue / (v.cats.length || 1))} sub="Across active categories" tone="text-[color:var(--c3)]" />
              <Stat icon={Star} label="Lowest Rated Category" value={nice(D.WORST[0][0])} sub={`${D.WORST[0][1]} ★ score`} tone="text-[color:var(--c4)]" />
            </div>

            <Glass className="p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-base font-semibold">Category Performance Breakdown</h2>
                  <p className="text-xs text-white/50">
                    Showing all <span className="text-[color:var(--c1)] font-semibold">{filteredCats.length}</span> categories
                  </p>
                </div>
              </div>
              
              <div className="glass-scroll max-h-[550px] overflow-y-auto pr-1">
                <table className="w-full text-left text-sm text-white/80 border-collapse">
                  <thead className="glass-thead sticky top-0 z-10 border-b border-white/10 text-xs font-semibold uppercase text-white/50">
                    <tr>
                      <th className="py-3 px-3 text-center w-12">No</th>
                      <th className="py-3 px-4">Category Name</th>
                      <th className="py-3 px-4 text-right">Revenue Share</th>
                      <th className="py-3 px-4 text-right">Total Revenue ({currency})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredCats.map((cat, index) => (
                      <tr key={cat.rawKey} className="hover:bg-white/5 transition">
                        <td className="py-3 px-3 text-center font-mono text-xs text-white/40">{index + 1}</td>
                        <td className="py-3 px-4 font-medium capitalize text-[color:var(--c1)]">{cat.name}</td>
                        <td className="py-3 px-4 text-right">{pct(cat.value, v.revenue)}</td>
                        <td className="py-3 px-4 text-right font-mono font-semibold text-[color:var(--c2)]">{fmtMoney(cat.value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Glass>
          </div>
        )}


        {/* TAB 3: PAYMENTS */}
        {nav === "Payments" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              <Stat icon={CreditCard} label="Credit Card Total" value={getPayVal("credit_card").toLocaleString("id-ID")} sub={`${pct(getPayVal("credit_card"), v.payTot)} share`} tone="text-[color:var(--c1)]" />
              <Stat icon={Receipt} label="Boleto Total" value={getPayVal("boleto").toLocaleString("id-ID")} sub={`${pct(getPayVal("boleto"), v.payTot)} share`} tone="text-[color:var(--c2)]" />
              <Stat icon={Repeat} label="Avg Installments" value={v.inst.toFixed(2)} sub="Monthly average" tone="text-[color:var(--c3)]" />
              <Stat icon={Percent} label="Voucher / Debit Share" value={pct(getPayVal("voucher") + getPayVal("debit_card"), v.payTot)} sub="Alternative methods" tone="text-[color:var(--c4)]" />
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <Glass className="p-5 flex flex-col justify-between">
                <h2 className="text-base font-semibold mb-2">Payment Method Volume</h2>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={v.pay}>
                      <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
                      <XAxis dataKey="name" tick={{ fill: T.tick, fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: T.tick2, fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={tip} />
                      <Bar dataKey="value" fill={T.primary} radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Glass>

              <Glass className="p-5 flex flex-col justify-between">
                <h2 className="text-base font-semibold mb-2">Payment Distribution</h2>
                <div className="h-64 w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={v.pay} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={3} stroke="none">
                        {v.pay.map((_, i) => (
                          <Cell key={i} fill={T.chart[i % T.chart.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={tip} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Glass>
            </div>
          </div>
        )}

        {/* TAB 4: SELLERS */}
        {nav === "Sellers" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
              <Stat icon={MapPin} label="Total Items Sold" value={v.items.toLocaleString("id-ID")} sub="All seller locations" tone="text-[color:var(--c1)]" />
              <Stat icon={Award} label="Top State (SP)" value={v.sp.toLocaleString("id-ID")} sub={`${pct(v.sp, v.items)} market share`} tone="text-[color:var(--c2)]" />
              <Stat icon={Users} label="Other States Total" value={(v.items - v.sp).toLocaleString("id-ID")} sub="Regional sellers" tone="text-[color:var(--c3)]" />
            </div>

            <Glass className="p-5">
              <h2 className="text-base font-semibold mb-4">Geographic Seller Distribution</h2>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={v.states}>
                    <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: T.tick, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: T.tick2, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={tip} />
                    <Bar dataKey="value" fill={T.secondary} radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Glass>
          </div>
        )}

        {/* TAB 5: REVIEWS */}
        {nav === "Reviews" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              <Stat icon={Star} label="Average Rating" value={v.avg.toFixed(2) + " / 5"} sub="Overall score" tone="text-[color:var(--c4)]" />
              <Stat icon={ThumbsUp} label="Positive Reviews (4-5★)" value={pct((v.rv[3]?.value || 0) + (v.rv[4]?.value || 0), v.rvTot)} sub="Customer satisfaction" tone="text-[color:var(--c2)]" />
              <Stat icon={ThumbsDown} label="Negative Reviews (1★)" value={pct(v.rv[0]?.value || 0, v.rvTot)} sub="Requires intervention" tone="text-[color:var(--c4)]" />
              <Stat icon={Receipt} label="Total Reviews" value={v.rvTot.toLocaleString("id-ID")} sub="Recorded feedback" tone="text-[color:var(--c3)]" />
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <Glass className="p-5">
                <h2 className="text-base font-semibold mb-3">Star Rating Breakdown</h2>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={v.rv}>
                      <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
                      <XAxis dataKey="star" tick={{ fill: T.tick, fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: T.tick2, fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={tip} />
                      <Bar dataKey="value" fill={T.warn} radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Glass>

              <Glass className="p-5">
                <h2 className="text-base font-semibold mb-3">Lowest Rated Categories</h2>
                <div className="space-y-4">
                  {D.WORST.map(([c, sc, cnt]) => (
                    <div key={c} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="capitalize text-white/90">{nice(c)}</span>
                        <span className="text-white/60 font-mono">{sc.toFixed(2)} ★ · n={cnt}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-400" style={{ width: (sc / 5) * 100 + "%" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Glass>
            </div>
          </div>
        )}

        {/* TAB 6: CUSTOMERS */}
        {nav === "Customers" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
              <Stat icon={Users} label="Total Orders" value={v.orders.toLocaleString("id-ID")} sub="Order volume" tone="text-[color:var(--c1)]" />
              <Stat icon={DollarSign} label="Average Order Value" value={fmtMoney(v.revenue / (v.orders || 1))} sub="Revenue per order" tone="text-[color:var(--c2)]" />
              <Stat icon={TrendingUp} label="Total Revenue" value={fmtMoney(v.revenue)} sub="Period total" tone="text-[color:var(--c3)]" />
            </div>

            <Glass className="p-5">
              <h2 className="text-base font-semibold mb-4">Monthly Revenue & Order Trends</h2>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={v.monthlyTrends}>
                    <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: T.tick, fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: T.tick2, fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={tip} />
                    <Line type="monotone" dataKey="revenue" stroke={T.primary} strokeWidth={2} dot={{ fill: T.primary }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Glass>
          </div>
        )}

        {/* TAB 7: SETTINGS */}
        {nav === "Settings" && (
          <div className="space-y-6">
            <Glass className="p-6 max-w-3xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Settings size={22} className="text-[color:var(--c1)]" />
                  Dashboard Preferences & Settings
                </h2>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                  Live Sync
                </span>
              </div>
              
              <div className="space-y-5 text-sm">
                <div className="border-b border-white/10 pb-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Palette size={18} className="text-[color:var(--c1)]" />
                    <div>
                      <div className="font-semibold text-white">Dashboard Theme</div>
                      <div className="text-xs text-white/50">Ubah warna & gaya dashboard — tersimpan otomatis</div>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {Object.entries(THEMES).map(([k, th]) => {
                      const active = theme === k;
                      return (
                        <button
                          key={k}
                          onClick={() => changeTheme(k)}
                          aria-pressed={active}
                          className="glass glass-hover rounded-2xl p-3 text-left"
                          style={active ? { borderColor: "var(--accent-solid)", boxShadow: "0 0 24px var(--glow)" } : undefined}
                        >
                          <div className="mb-3 flex h-14 overflow-hidden rounded-xl ring-1 ring-white/10" style={{ background: th.bg }}>
                            {th.swatch.map((c) => (
                              <div key={c} className="flex-1" style={{ background: c }} title={c} />
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-white">{th.name}</span>
                            {active && (
                              <span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ background: "var(--accent-solid)" }}>
                                <Check size={12} className="text-white" />
                              </span>
                            )}
                          </div>
                          <div className="mt-0.5 text-xs text-white/50">{th.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <div className="font-semibold text-white">Display Currency</div>
                    <div className="text-xs text-white/50">Convert all financial figures live (1 BRL ≈ 0.20 USD)</div>
                  </div>
                  <select 
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value)}
                    className="glass-select text-white font-medium rounded-xl px-3.5 py-2 border border-white/20 focus:border-[color:var(--accent-solid)] focus:outline-none cursor-pointer"
                  >
                    <option value="BRL">BRL (R$)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <div className="font-semibold text-white">Active Observation Range</div>
                    <div className="text-xs text-white/50">Current data timeframe filters</div>
                  </div>
                  <div className="flex gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10">
                    {RANGES.map((r) => (
                      <button
                        key={r.k}
                        onClick={() => setRange(r.k)}
                        style={range === r.k ? { background: "var(--accent-solid)" } : undefined}
                        className={
                          "px-3 py-1 rounded-lg text-xs font-medium transition " +
                          (range === r.k ? "text-white shadow-sm" : "text-white/60 hover:text-white")
                        }
                      >
                        {r.k}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <div className="font-semibold text-white">System Security & Engine</div>
                    <div className="text-xs text-white/50">Recharts & Vite React Dashboard Engine</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                    <Shield size={16} />
                    Verified & Active
                  </div>
                </div>

                {saveToast && (
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 p-3 text-xs text-emerald-200">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    CSV File successfully generated & downloaded!
                  </div>
                )}

                <div className="pt-3 flex items-center justify-between">
                  <span className="text-xs text-white/40">Cleaned Olist Dataset v1.0</span>
                  <button 
                    onClick={handleExportCSV}
                    style={{ background: "linear-gradient(90deg, var(--accent-solid), var(--accent-solid-2))", boxShadow: "0 8px 24px var(--glow)" }}
                    className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition hover:brightness-110 active:scale-95"
                  >
                    <Download size={16} />
                    Export Category Data (.CSV)
                  </button>
                </div>
              </div>
            </Glass>
          </div>
        )}
      </main>
    </div>
  );
}
