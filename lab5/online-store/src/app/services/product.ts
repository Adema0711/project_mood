import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  categories:Category[]=[
    {id:1,name:'Smartphones'},
    {id:2,name:'Audio'},
    {id:3,name:'Beauty'},
    {id:4,name:'Entertainment'}
  ];
  products:Product[]=[
    {
      id:1,
      name:'IPhone 15',
      description:'Apple iPhone 15 128GB',
      price:450000,
      image:'https://resources.cdn-kaspi.kz/img/m/p/h1d/hfc/86303745998878.jpg?format=preview-large',
      rating:5,
      link:'https://kaspi.kz/shop/p/apple-iphone-15-128gb-nanosim-esim-chernyi-113137790/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_bicycles_v2&gbraid=0AAAAAC7-v7hD2KPfFvmWxiG3KYoD7ODUy&gclid=CjwKCAiA2PrMBhA4EiwAwpHyC6LqWSuagC3wDvicsVFUDfek1rIyNM71mq7Rz8lcdD1DkppuOQbwcBoCP6oQAvD_BwE',
      likes:4200,
      categoryId:1
    },
    {
      id:2,
      name:'IPhone 17',
      description:'Смартфон Apple iPhone 17 Pro 256Gb оранжевый',
      price:839000,
      image:'https://resources.cdn-kaspi.kz/img/m/p/p18/p96/64168413.png?format=gallery-medium',
      rating:5,
      link:'https://kaspi.kz/shop/p/apple-iphone-17-pro-256gb-nanosim-esim-oranzhevyi-145467625/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_bicycles_v2&gbraid=0AAAAAC7-v7hD2KPfFvmWxiG3KYoD7ODUy&gclid=CjwKCAiA2PrMBhA4EiwAwpHyC6LqWSuagC3wDvicsVFUDfek1rIyNM71mq7Rz8lcdD1DkppuOQbwcBoCP6oQAvD_BwE',
      likes:3500,
      categoryId:1
    },
    {
      id:3,
      name:'Samsung Galaxy A07',
      description:'Смартфон Samsung Galaxy A07 6 ГБ/128 ГБ черный',
      price:71549,
      image:'https://resources.cdn-kaspi.kz/img/m/p/p3d/pda/61291251.jpg?format=gallery-medium',
      rating:4.9,
      link:'https://kaspi.kz/shop/p/samsung-galaxy-a07-6-gb-128-gb-chernyi-144817763/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_bicycles_v2&gbraid=0AAAAAC7-v7hD2KPfFvmWxiG3KYoD7ODUy&gclid=CjwKCAiA2PrMBhA4EiwAwpHyC6LqWSuagC3wDvicsVFUDfek1rIyNM71mq7Rz8lcdD1DkppuOQbwcBoCP6oQAvD_BwE',
      likes:4000,
      categoryId:1
    },
    {
      id:4,
      name:'Redmi A3x',
      description:'Смартфон Redmi A3x 3 ГБ/64 ГБ черный',
      price:49900,
      image:'https://resources.cdn-kaspi.kz/img/m/p/h83/h08/86585118720030.png?format=gallery-medium',
      rating:4.8,
      link:'https://kaspi.kz/shop/p/redmi-a3x-3-gb-64-gb-chernyi-121654928/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_bicycles_v2&gbraid=0AAAAAC7-v7hD2KPfFvmWxiG3KYoD7ODUy&gclid=CjwKCAiA2PrMBhA4EiwAwpHyC6LqWSuagC3wDvicsVFUDfek1rIyNM71mq7Rz8lcdD1DkppuOQbwcBoCP6oQAvD_BwE',
      likes:1037,
      categoryId:1
    },
    {
      id:5,
      name:'Apple iPhone 16',
      description:'Смартфон Apple iPhone 16 128Gb NanoSIM+eSIM фиолетовый',
      price:45000,
      image:'https://resources.cdn-kaspi.kz/img/m/p/hff/h64/87295472042014.png?format=gallery-medium',
      rating:4.9,
      link:'https://kaspi.kz/shop/p/apple-iphone-16-128gb-nanosim-esim-fioletovyi-123727182/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_bicycles_v2&gbraid=0AAAAAC7-v7hD2KPfFvmWxiG3KYoD7ODUy&gclid=CjwKCAiA2PrMBhA4EiwAwpHyC6LqWSuagC3wDvicsVFUDfek1rIyNM71mq7Rz8lcdD1DkppuOQbwcBoCP6oQAvD_BwE',
      likes:400,
      categoryId:1
    },
    {
      id:6,
      name:'VARIUM VK8',
      description:'Микрофон VARIUM VK8 черный',
      price:4990,
      image:'https://resources.cdn-kaspi.kz/img/m/p/hf0/ha7/65809983832094.jpg?format=gallery-medium',
      rating:4.6,
      link:'https://kaspi.kz/shop/p/mikrofon-varium-vk8-chernyi-107599324/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_bicycles_v2&gbraid=0AAAAAC7-v7hD2KPfFvmWxiG3KYoD7ODUy&gclid=CjwKCAiA2PrMBhA4EiwAwpHyC6LqWSuagC3wDvicsVFUDfek1rIyNM71mq7Rz8lcdD1DkppuOQbwcBoCP6oQAvD_BwE',
      likes:578,
      categoryId:2
    },
    {
      id:7,
      name:'Умная колонка',
      description:'Умная колонка Яндекс Станция Лайт YNDX-00025 фиолетовый',
      price:55000,
      image:'https://resources.cdn-kaspi.kz/img/m/p/h9f/hfc/64362954719262.jpg?format=gallery-medium',
      rating:4.8,
      link:'https://kaspi.kz/shop/p/jandeks-stantsija-lait-yndx-00025-fioletovyi-101870266/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_bicycles_v2&gbraid=0AAAAAC7-v7hD2KPfFvmWxiG3KYoD7ODUy&gclid=CjwKCAiA2PrMBhA4EiwAwpHyC6LqWSuagC3wDvicsVFUDfek1rIyNM71mq7Rz8lcdD1DkppuOQbwcBoCP6oQAvD_BwE',
      likes:2761,
      categoryId:2
    },
    {
      id:8,
      name:'JBL GO',
      description:'Портативная колонка JBL GO 4 синий',
      price:19000,
      image:'https://resources.cdn-kaspi.kz/img/m/p/h3b/h42/85598305320990.jpg?format=gallery-medium',
      rating:4.5,
      link:'https://kaspi.kz/shop/p/portativnaja-kolonka-jbl-go-4-sinii-117967875/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_bicycles_v2&gbraid=0AAAAAC7-v7hD2KPfFvmWxiG3KYoD7ODUy&gclid=CjwKCAiA2PrMBhA4EiwAwpHyC6LqWSuagC3wDvicsVFUDfek1rIyNM71mq7Rz8lcdD1DkppuOQbwcBoCP6oQAvD_BwE',
      likes:378,
      categoryId:2
    },
    {
      id:9,
      name:'Чехол для Apple AirPods 4 розовый',
      description:'Стильный аксессуар с удобством в каждом движении.Этот чехол не только защищает AirPods Pro от повреждений, но и делает их использование максимально комфортным. Благодаря ремешку и карабину вы всегда сможете носить кейс на руке или закрепить на рюкзаке. Компактный дизайн позволяет легко помещать чехол в карман или на телефон , а силиконовая текстура делает его приятным на ощупь и устойчивым к скольжению.',
      price:1037,
      image:'https://resources.cdn-kaspi.kz/img/m/p/pe1/p5a/75831322.jpeg?format=gallery-medium',
      rating:4.9,
      link:'https://kaspi.kz/shop/p/chehol-dlja-apple-airpods-4-rozovyi-148976865/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_bicycles_v2&gbraid=0AAAAAC7-v7hD2KPfFvmWxiG3KYoD7ODUy&gclid=CjwKCAiA2PrMBhA4EiwAwpHyC6LqWSuagC3wDvicsVFUDfek1rIyNM71mq7Rz8lcdD1DkppuOQbwcBoCP6oQAvD_BwE',
      likes:50,
      categoryId:2
    },
    {
      id:10,
      name:'Диктофон PLAUD Note Black Chat GPT AI черный',
      description:'PLAUD NOTE — это инновационный носимый диктофон, созданный для быстрого и точного захвата, транскрипции и анализа информации. Оснащён двумя высокочувствительными микрофонами с технологией AI-шумоподавления, он обеспечивает кристально чистую запись даже в шумной обстановке.',
      price:88137,
      image:'https://resources.cdn-kaspi.kz/img/m/p/pe2/pa4/54986445.png?format=gallery-medium',
      rating:5,
      link:'https://kaspi.kz/shop/p/diktofon-plaud-note-black-chat-gpt-ai-chernyi-119986340/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_bicycles_v2&gbraid=0AAAAAC7-v7hD2KPfFvmWxiG3KYoD7ODUy&gclid=CjwKCAiA2PrMBhA4EiwAwpHyC6LqWSuagC3wDvicsVFUDfek1rIyNM71mq7Rz8lcdD1DkppuOQbwcBoCP6oQAvD_BwE',
      likes:100,
      categoryId:2
    },
    {
      id:11,
      name:'LUXVISAGE Active complex SPF10 СС крем 10 Fair 35 мл',
      description:'Корректирующий и выравнивающий тональный крем с солнцезащитным фактором SPF 10. СС-крем идеально подстраивается под тон кожи, улучшает её естественный оттенок, обеспечивает максимальную цветокоррекцию. Также крем уменьшает видимость расширенных капилляров, покраснений, скрывает пигментацию.',
      price:1974,
      image:'https://resources.cdn-kaspi.kz/img/m/p/h72/h79/86668728434718.jpg?format=gallery-medium',
      rating:5,
      link:'https://kaspi.kz/shop/p/luxvisage-active-complex-spf10-ss-krem-10-fair-35-ml-106325149/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_bicycles_v2&gbraid=0AAAAAC7-v7hD2KPfFvmWxiG3KYoD7ODUy&gclid=CjwKCAiA2PrMBhA4EiwAwpHyC6LqWSuagC3wDvicsVFUDfek1rIyNM71mq7Rz8lcdD1DkppuOQbwcBoCP6oQAvD_BwE',
      likes:537,
      categoryId: 3    
    },
    {
      id:12,
      name:'Пудра Sen Sulu Минеральная рассыпчатая V1 для светлого тона кожи светлый натуральный',
      description:'Бесцветная минеральная пудра для лица от Sen Sulu отлично выравнивает тон, не забивая поры. Минеральная пудра имеет двух оттенках: V1 для светлого тона кожи V2 для теплого тона кожи Сен сулу пудра идеально подстраивается под любой тип и цвет кожи, устраняет ее недостатки',
      price:4895,
      image:'https://resources.cdn-kaspi.kz/img/m/p/pd4/p62/6288666.png?format=gallery-medium',
      rating:5,
      link:'https://kaspi.kz/shop/p/pudra-sen-sulu-mineral-naja-rassypchataja-v1-dlja-svetlogo-tona-kozhi-svetlyi-natural-nyi-129403630/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_bicycles_v2&gbraid=0AAAAAC7-v7hD2KPfFvmWxiG3KYoD7ODUy&gclid=CjwKCAiA2PrMBhA4EiwAwpHyC6LqWSuagC3wDvicsVFUDfek1rIyNM71mq7Rz8lcdD1DkppuOQbwcBoCP6oQAvD_BwE',
      likes:1378,
      categoryId:3
    },
    {
      id:13,
      name:'Beauty 365 набор кистей для макияжа 15 шт',
      description:'Набор кистей для макияжа Beauty 365 — это всё необходимое для создания идеального макияжа. В комплект входят 15 высококачественных кистей, которые помогут вам добиться профессионального результата в домашних условиях.',
      price:1700,
      image:'https://resources.cdn-kaspi.kz/img/m/p/h4b/h95/63840091635742.jpg?format=gallery-medium',
      rating:5,
      link:'https://kaspi.kz/shop/p/beauty-365-nabor-kistei-dlja-makijazha-15-sht-107160277/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_bicycles_v2&gbraid=0AAAAAC7-v7hD2KPfFvmWxiG3KYoD7ODUy&gclid=CjwKCAiA2PrMBhA4EiwAwpHyC6LqWSuagC3wDvicsVFUDfek1rIyNM71mq7Rz8lcdD1DkppuOQbwcBoCP6oQAvD_BwE',
      likes:900,
      categoryId:3
    },
    {
      id:14,
      name:'GlamMe Blush Me Souffle румяна C02 Magic Blush',
      description:'Румяна для лица Magic Blush от GlamMe - это новое поколение румян с жидкой текстурой, создающей естественное сияние и эффект «здоровой кожи». Прозрачная формула при контакте с кожей создаёт нежный розовый оттенок, который подстраивается под естественный тон лица.',
      price:7800,
      image:'https://resources.cdn-kaspi.kz/img/m/p/pa6/pa3/106837657.png?format=gallery-medium',
      rating:4.8,
      link:'https://kaspi.kz/shop/p/glamme-blush-me-souffle-rumjana-c02-magic-blush-152237723/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_bicycles_v2&gbraid=0AAAAAC7-v7hD2KPfFvmWxiG3KYoD7ODUy&gclid=CjwKCAiA2PrMBhA4EiwAwpHyC6LqWSuagC3wDvicsVFUDfek1rIyNM71mq7Rz8lcdD1DkppuOQbwcBoCP6oQAvD_BwE',
      likes:70,
      categoryId:3
    },
    {
      id:15,
      name:'Influence Skinnovation Matte тональный крем 01 25 мл',
      description:'Инновационный тональный крем SKINNOVATION I MATTE от INFLUENCE BEAUTY, созданный на основе технологии PLIABLE MATTE, очень пластичен: он легко наносится, растушевывается и распределяется на коже. Корректирующий пигмент, ухаживающие компоненты, витамин Е, витамин С и витамин А создают идеальное покрытие и предотвращают появление воспалений.',
      price:3299,
      image:'https://resources.cdn-kaspi.kz/img/m/p/p53/p06/111855293.jpg?format=gallery-medium',
      rating:4.4,
      link:'https://kaspi.kz/shop/p/influence-skinnovation-matte-tonal-nyi-krem-01-25-ml-107970156/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_bicycles_v2&gbraid=0AAAAAC7-v7hD2KPfFvmWxiG3KYoD7ODUy&gclid=CjwKCAiA2PrMBhA4EiwAwpHyC6LqWSuagC3wDvicsVFUDfek1rIyNM71mq7Rz8lcdD1DkppuOQbwcBoCP6oQAvD_BwE',
      likes:402,
      categoryId:3
    },
    {
      id:16,
      name:'Книга Клейсон Дж.: Самый богатый человек в Вавилоне',
      description:'Эта книга - настоящее лекарство от нищеты. Если вы всерьез решили стать богатым, она поможет вам заглянуть в суть финансовых проблем и добиться реального успеха. Обсуждаемые автором принципы универсальны и неизменны. Они докажут вам свою действенность так же, как доказали ее многим другим людям, став ключом к стабильному финансовому прогрессу и процветанию.',
      price:2799,
      image:'https://resources.cdn-kaspi.kz/img/m/p/hdc/h47/64549494358046.jpg?format=gallery-medium',
      rating:5,
      link:'https://kaspi.kz/shop/p/kleison-dzh-samyi-bogatyi-chelovek-v-vavilone-102531708/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_bicycles_v2&gbraid=0AAAAAC7-v7hD2KPfFvmWxiG3KYoD7ODUy&gclid=CjwKCAiA2PrMBhA4EiwAwpHyC6LqWSuagC3wDvicsVFUDfek1rIyNM71mq7Rz8lcdD1DkppuOQbwcBoCP6oQAvD_BwE',
      likes:66,
      categoryId:4
    },
    {
      id:17,
      name:'Книга Әуезов М.: Абай жолы 1-4 том',
      description:'«Путь Абая» — роман-эпопея Мухтара Ауэзова, описывающий жизнь известного казахского поэта Абая Кунанбаева. Первая эпопея, написанная на казахском языке. «Путь Абая» широко известен в Казахстане и далеко за его пределами. Роман-эпопея состоит из четырех книг.',
      price:8700,
      image:'https://resources.cdn-kaspi.kz/img/m/p/hda/he6/63766500212766.jpg?format=gallery-medium',
      rating:5,
      link:'https://kaspi.kz/shop/p/-uezov-m-abai-zholy-1-4-tom-26016813/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_bicycles_v2&gbraid=0AAAAAC7-v7hD2KPfFvmWxiG3KYoD7ODUy&gclid=CjwKCAiA2PrMBhA4EiwAwpHyC6LqWSuagC3wDvicsVFUDfek1rIyNM71mq7Rz8lcdD1DkppuOQbwcBoCP6oQAvD_BwE',
      likes:350,
      categoryId:4
    },
    {
      id:18,
      name:'Набор NB24 браслет 24 цв.',
      description:'Набор для бисероплетения NB24 — отличный выбор для творческих людей, желающих создать уникальные браслеты из 24 ярких цветов! Этот набор идеально подходит как для новичков, так и для опытных мастеров.',
      price:1361,
      image:'https://resources.cdn-kaspi.kz/img/m/p/hc9/h1f/85880154128414.jpg?format=gallery-medium',
      rating:4.9,
      link:'https://kaspi.kz/shop/p/nb24-braslet-24-tsv--108974715/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_bicycles_v2&gbraid=0AAAAAC7-v7hD2KPfFvmWxiG3KYoD7ODUy&gclid=CjwKCAiA2PrMBhA4EiwAwpHyC6LqWSuagC3wDvicsVFUDfek1rIyNM71mq7Rz8lcdD1DkppuOQbwcBoCP6oQAvD_BwE',
      likes:80,
      categoryId:4
    },
    {
     id:19,
      name:'Настольная игра UNO УНО',
      description:'Карточная игра UNO — это увлекательное развлечение для всей семьи, которое сочетает в себе простоту правил и стратегическую глубину.',
      price:292,
      image:'https://resources.cdn-kaspi.kz/img/m/p/hd8/h8e/85824892403742.jpg?format=gallery-medium',
      rating:5,
      link:'https://kaspi.kz/shop/p/uno-uno-118700240/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_bicycles_v2&gbraid=0AAAAAC7-v7hD2KPfFvmWxiG3KYoD7ODUy&gclid=CjwKCAiA2PrMBhA4EiwAwpHyC6LqWSuagC3wDvicsVFUDfek1rIyNM71mq7Rz8lcdD1DkppuOQbwcBoCP6oQAvD_BwE',
      likes:300,
      categoryId:4
    },
    {
      id:20,
      name:'Наклейки Лист Стикеры Наклейки Коты Мемы 50-шт',
      description:'Набор наклеек Котики_мемы для творчества. В наборе 50 шт. Для универсального использования.Порадуют как взрослых так и детей.',
      price:378,
      image:'https://resources.cdn-kaspi.kz/img/m/p/p6f/p55/61516316.jpeg?format=gallery-medium',
      rating:5,
      link:'https://kaspi.kz/shop/p/list-stikery-nakleiki-koty-memy-50-sht-129839347/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_bicycles_v2&gbraid=0AAAAAC7-v7hD2KPfFvmWxiG3KYoD7ODUy&gclid=CjwKCAiA2PrMBhA4EiwAwpHyC6LqWSuagC3wDvicsVFUDfek1rIyNM71mq7Rz8lcdD1DkppuOQbwcBoCP6oQAvD_BwE',
      likes:87,
      categoryId:4
    }
  ];
  constructor(){}
    getCategories():Category[]{
      return this.categories;
    }
    getProducts():Product[]{
      return this.products;
    }

  
}
