import { Component } from '@angular/core';
import { Product } from '../product.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  products: Product[] = [
    {
      id:1,
      name:'iPhone 15 128GB',
      description:'The iPhone 15 is the latest smartphone from Apple, featuring a sleek design, powerful performance, and advanced camera capabilities.',
      price: 450000,
      rating: 4.5,
      image:'https://resources.cdn-kaspi.kz/img/m/p/h81/h37/86303335186462.jpg?format=gallery-medium',
      images:['https://resources.cdn-kaspi.kz/img/m/p/hea/h39/83559339655198.png?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/h22/hf6/83559333953566.png?format=gallery-medium',
  
        
      ],
      link:'https://kaspi.kz/shop/p/apple-iphone-15-128gb-rozovyi-113137949/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_sports_nutrition_brand&gbraid=0AAAAAC7-v7j-6MGOAcCWyy4ggZDZNWQAY&gclid=CjwKCAiAkvDMBhBMEiwAnUA9BeOew8frCBy9VCyyyBZ73E2Ijh0gQsfv4fXI5zZqKbJ8cK-NoTMZlBoCRJMQAvD_BwE',

},
{
      id:2,
      name:'Напольный штатив Jmary MT-36 черный',
      description:'Напольный штатив Jmary MT-36 черный - это надежное и удобное устройство для съемки фотографий и видео. Он оснащен прочными ножками, которые обеспечивают стабильность даже на неровных поверхностях. Штатив имеет регулируемую высоту, что позволяет адаптироваться к различным условиям съемки. Он также оснащен шаровой головой, которая обеспечивает плавное вращение и наклон камеры для достижения идеального кадра.',
      price: 15000,
      rating: 4.0,
      image:'https://resources.cdn-kaspi.kz/img/m/p/h0c/ha5/64315460386846.jpg?format=gallery-medium',
      images:[
        'https://resources.cdn-kaspi.kz/img/m/p/h0c/ha5/64315460386846.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/h0b/h24/84804522835998.jpg?format=gallery-medium',
      ],
      link:'https://kaspi.kz/shop/p/napol-nyi-shtativ-jmary-mt-36-chernyi-103584049/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_sports_nutrition_brand&gbraid=0AAAAAC7-v7j-6MGOAcCWyy4ggZDZNWQAY&gclid=CjwKCAiAkvDMBhBMEiwAnUA9BeOew8frCBy9VCyyyBZ73E2Ijh0gQsfv4fXI5zZqKbJ8cK-NoTMZlBoCRJMQAvD_BwE',
},
{
      id:3,
      name:'Смартфон Samsung Galaxy A16 8 ГБ/256 ГБ серый',
      description:'Смартфон Samsung Galaxy A16 8 ГБ/256 ГБ серый - это современное устройство, которое предлагает высокую производительность и большой объем памяти. Он оснащен мощным процессором, который обеспечивает плавную работу приложений и игр. С большим экраном и яркими цветами, этот смартфон идеально подходит для просмотра видео и фотографий. Он также имеет продвинутую камеру, которая позволяет делать качественные снимки в любых условиях освещения.',
      price: 90000,
      rating: 4.2,
      image:'https://resources.cdn-kaspi.kz/img/m/p/pe3/p08/10325160.png?format=gallery-medium',
      images:['https://resources.cdn-kaspi.kz/img/m/p/p1b/p09/10325162.png?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/p54/p09/10325164.png?format=gallery-medium',
      ],
      link:'https://kaspi.kz/shop/p/samsung-galaxy-a16-8-gb-256-gb-seryi-130609812/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_sports_nutrition_brand&gbraid=0AAAAAC7-v7j-6MGOAcCWyy4ggZDZNWQAY&gclid=CjwKCAiAkvDMBhBMEiwAnUA9BeOew8frCBy9VCyyyBZ73E2Ijh0gQsfv4fXI5zZqKbJ8cK-NoTMZlBoCRJMQAvD_BwE',

},
{
  id:4,
  name:'Игровой контроллер Sony Dualsense Edge белый',
  description:'Игровой контроллер Sony Dualsense Edge белый - это инновационный игровой контроллер, разработанный для обеспечения максимального комфорта и погружения в игровой процесс. Он оснащен эргономичным дизайном, который обеспечивает удобство при длительных игровых сессиях. Контроллер имеет адаптивные триггеры, которые обеспечивают реалистичное ощущение при нажатии, а также встроенный микрофон и динамик для общения с другими игроками. Он также поддерживает беспроводное подключение и совместим с различными игровыми платформами.',
  price: 50000,
  rating: 4.8,
  image:'https://resources.cdn-kaspi.kz/img/m/p/ha1/hdb/79255565369374.jpg?format=gallery-medium',
  images:[
    'https://resources.cdn-kaspi.kz/img/m/p/ha1/hdb/79255565369374.jpg?format=gallery-medium',
    'https://resources.cdn-kaspi.kz/img/m/p/hb1/hdb/79255565369378.jpg?format=gallery-medium',
  ],
  link:'https://kaspi.kz/shop/p/igrovoi-kontroller-sony-dualsense-edge-belyi-113137949/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_sports_nutrition_brand&gbraid=0AAAAAC7-v7j-6MGOAcCWyy4ggZDZNWQAY&gclid=CjwKCAiAkvDMBhBMEiwAnUA9BeOew8frCBy9VCyyyBZ73E2Ijh0gQsfv4fXI5zZqKbJ8cK-NoTMZlBoCRJMQAvD_BwE',
}
  ];
  shareWhatsApp(product: Product): void {
    const message = `Check out this product: ${product.link}`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/?text=${encodedMessage}`;
    window.open(url, '_blank');
  }
  shareTelegram(product: Product): void {
    const message = `Check out this product: ${product.link}`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://t.me/share/url?url=${encodedMessage}`;
    window.open(url, '_blank');
  }
}
