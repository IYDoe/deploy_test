# The Lost Vikings

## Оглавление
+ [Геймплей](#Геймплей)
+ [UI](#UI)
+ [Управление](#Управление)
+ [Персонажи](#Персонажи)
+ [Миры](#Миры)
+ [Враги](#Враги)
+ [Расходники](#Расходники)
+ [Элементы](#Элементы)
+ [Препятствия](#Препятствия)
+ [Дополнительно](#Дополнительно)

## Геймплей
Под управлением есть 3 персонажа с разными способностями. Есть возможность переключаться между ними. Цель каждого уровня, дойти до выхода, всеми персонажами. При прохождении уровня фиксируется время, попадает в лидерборд. При переходе на новый уровень происходит сохранение прогресса.  
Если все персонажи погибли, появляется сообщение о провале, с кнопкой "начать заново".  
При успешном прохождении, появляется сообщение об успехе, с временем прохождения уровня и кнопками "начать заново" и "далее".
В обоих сообщениях могут быть и другие элементы, если потребуется.

## UI
В верхней правой части экрана распологаются блоки с персонажами. Активный персонаж выделен цветом. Под аватаром каждого, находятся красные круги, обозначающие количество здоровья и синий обозначающий броню. Слева, 4 слота инвентаря, активный выделен обводкой. Так же в этой части экрана расположена иконка уничтожения предметов и таймер.

## Управление
+ **Arrows** - перемещение (навигация по инвентарю)
+ **Space** - Первая способность (передать предмет)
+ **S** - Вторая способность (при наличии, либо дублируется первая)
+ **D** - Применить (Выбор в инвентаре)
+ **F** - Инвентарь (Либо мышка)
+ **Q** - Выбор персонажа, предыдущий
+ **W** - Выбор персонажа, следующий
+ **Esc** - меню (Игра становится на паузу)

## Персонажи
Наши персонажи викинги. Всего их 3, каждый со своим набором умений.

Общие характеристики:
+ **Здоровье** (HP)
	+ Начальное: 3 
	+ Максимальное: 3
+ **Броня** (DEF)
	+ Начальное: 0 
	+ Максимальное: 1
+ **Инвентарь** (INV)
    + 4 слота

1. ![Эрик Неуловимый](https://anatolykyznetsov.github.io/tlvi/8333_waifu2x_art_noise2_scale%20(1)%201.png)  
**Эрик Неуловимый** 

+ Пассивная способность - Движется быстрее остальных  
![спрайт бег](https://anatolykyznetsov.github.io/tlvi/8333_waifu2x_art_noise2_scale%20(3).png)
+ Способность 1 "прыжок" - просто прыгает *(высоту подобрать)*  
![спрайт прыжок](https://anatolykyznetsov.github.io/tlvi/8333_waifu2x_art_noise2_scale%20(4).png)
+ Способность 2 "разгон" - бежит вперед с немного увеличенной скоростью. При столкновении с препятствием - если это пробиваемая текстура, она ломается; Если не пробиваемая с ничего не происходит; Если это враг, ему наносится 1 урон (DMG).    
![спрайт разгона](https://anatolykyznetsov.github.io/tlvi/8333_waifu2x_art_noise2_scale%20(5).png)  
После в любом случае запускается анимация  
![удар об стену](https://anatolykyznetsov.github.io/tlvi/8333_waifu2x_art_noise2_scale%20(6).png)    
[Пример](https://disk.yandex.ru/i/SYMr-7Coi7cOxw)

2. ![Олаф Толстый](https://anatolykyznetsov.github.io/tlvi/8335_waifu2x_art_noise2_scale%20(1)%201.png)  
**Олаф Толстый**

+ Пассивная способность - поглощение урона в направлении щита
+ Пассивная способность - если щит поднят над головой, может планировать  
![планирование](https://anatolykyznetsov.github.io/tlvi/8335_waifu2x_art_noise2_scale%20(4).png)
+ Способность 1 - Поднять\опустить щит  
![щит над головой](https://anatolykyznetsov.github.io/tlvi/8335_waifu2x_art_noise2_scale%20(3).png)
+ Если щит поднят над головой, на него может запрыгнуть Викинг 1

3. ![Балеог Свирепый](https://anatolykyznetsov.github.io/tlvi/8332_waifu2x_art_noise2_scale%20(1)%201.png)  
**Балеог Свирепый** 

+ Способность 1 "Выстрел из лука" - Наносит 1 DMG, может активировать кнопку.  
![спрайт выстрела](https://anatolykyznetsov.github.io/tlvi/8332_waifu2x_art_noise2_scale%20(3).png)
+ Способность 2 "Удар мечом" - Наносит 1 DMG  
![спрайт удара мечом](https://anatolykyznetsov.github.io/tlvi/8332_waifu2x_art_noise2_scale%20(4).png)

**Персонажи получают урон от контакта с препятствиями, атак врагов, падения** *(высоту подобрать)*

## Миры
В игре есть 5 миров, с определенными врагами на них. *(Для начала предлагаю сделать по 1 карте каждого мира)*

1. **Космический корабль**  
2. **Доисторическая эпоха**
3. **Древний Египет**
4. **Фабрика**
5. **Сумасшедший мир**
    
*[Все карты](https://www.vgmaps.com/Atlas/SuperNES/index.htm#LostVikings)*

## Враги
Враги различаются скоростью передвижения, количеством здоровья (HP), уроном (DMG), типами атак и текстурам *(себя и снаряда)*

**Типы атак (A_TYPE)**
1. При сближении
2. В движении *(Скорость +1)*
3. Дистанционно
4. Комбинировано
	1. 1 и 2
	2. 2 и 3

**Виды врагов**
+ Слизь - DMG-1, HP-1, A_TYPE-3, Мир-1  
![Слизь](https://anatolykyznetsov.github.io/tlvi/32902_waifu2x_art_noise2_scale%20(1).png)

+ Робот - DMG-1, HP-1, A_TYPE-1, Мир-1  
![Робот](https://anatolykyznetsov.github.io/tlvi/32902_waifu2x_art_noise2_scale%20(9).png)

+ Динозавр 1 - DMG-1, HP-1, A_TYPE-1, Мир-2  
![Динозавр 1](https://anatolykyznetsov.github.io/tlvi/32902_waifu2x_art_noise2_scale%20(3).png)

+ Динозавр 2 - DMG-2, HP-2, A_TYPE-1, Мир-2  
![Динозавр 2](https://anatolykyznetsov.github.io/tlvi/32902_waifu2x_art_noise2_scale%20(4).png)

+ Улитка - DMG-1, HP-2, A_TYPE-3, Мир-2  
![Улитка](https://anatolykyznetsov.github.io/tlvi/32902_waifu2x_art_noise2_scale%20(2)%20(1).png)

+ Питекантроп - DMG-1, HP-2, A_TYPE-4.1, Мир-2  
![Питекантроп](https://anatolykyznetsov.github.io/tlvi/32902_waifu2x_art_noise2_scale%20(6).png)

+ Воин - DMG-1, HP-1, A_TYPE-1, Мир-3  
![Воин](https://anatolykyznetsov.github.io/tlvi/32902_waifu2x_art_noise2_scale%20(14).png)

+ Мумия - DMG-1, HP-2, A_TYPE-1, Мир-3  
![Мумия](https://anatolykyznetsov.github.io/tlvi/32902_waifu2x_art_noise2_scale%20(15).png)

+ Скорпион - DMG-1, HP-2, A_TYPE-3, Мир-3  
![Скорпион](https://anatolykyznetsov.github.io/tlvi/32902_waifu2x_art_noise2_scale%20(13).png)

+ Турель 1 - DMG-1, HP-2, A_TYPE-4.2, Мир-4  
![Турель 1](https://anatolykyznetsov.github.io/tlvi/32902_waifu2x_art_noise2_scale%20(10).png)

+ Турель 2 - DMG-1, HP-2, A_TYPE-3, Мир-4  
![Турель 2](https://anatolykyznetsov.github.io/tlvi/32902_waifu2x_art_noise2_scale%20(2)%20(2).png)

+ Шар - DMG-1, HP-2, A_TYPE-2, Мир-4  
![Шар](https://anatolykyznetsov.github.io/tlvi/32902_waifu2x_art_noise2_scale%20(12).png)

+ Шар с рукой - DMG-1, HP-2, A_TYPE-1, Мир-5  
![Шар с рукой](https://anatolykyznetsov.github.io/tlvi/32902_waifu2x_art_noise2_scale%20(8).png)

+ Зеленое что-то в шарфе - DMG-1, HP-2, A_TYPE-3, Мир-5  
![Зеленое что-то в шарфе](https://anatolykyznetsov.github.io/tlvi/32902_waifu2x_art_noise2_scale%20(7).png)

## Расходники
Можно использовать, выбросить, передать.
Поднимаются при контакте

+ **Аптечка S** - восстанавливает 1 HP
+ **Аптечка M** - восстанавливает 2 HP
+ **Бомба** - уничтожает препятствия (действует на персонажа и врагов, убивает)
+ **???** - Уничтожает всех врагов в зоне видимости  
[Пример](https://disk.yandex.ru/i/zkVPvaWei1QSOw)  
[Ситуация для применения](https://disk.yandex.ru/i/QEx8KTVPiR7A8g)
+ **Броня** - Добавляет 1 ед брони  
[Пример](https://disk.yandex.ru/i/hu7C690ENH9uCA)

*(Изображения есть на некоторых картах, вырезать по необходимости)*

## Элементы
1. Лестница - Для взаимодействия движение вверх вниз.
2. Лифт - кнопка "Применить" 
[Пример](https://disk.yandex.ru/i/aT-_bUeOL1YGyQ)
3. Подъемник (может быть активным и нет) - Срабатывает при сближении  
[Пример](https://disk.yandex.ru/i/4BRm60UENFfoBg)
3. Кнопка (активирует/отключает что-либо) - кнопка "Применить"  
[Пример](https://disk.yandex.ru/i/E7n8JAXEkER5pw)
4. Пульт управления - Уничтожить чтобы отключить что-либо  
[Пример](https://disk.yandex.ru/i/fYPhkI8PLFWy9w)
5. Телепорт - в месте назначения никаких элементов нет, кнопка "Применить"  
[Пример](https://disk.yandex.ru/i/FdQFtxf74KOSvw)
6. Дверь - Не запертая дверь открывается при приближении, запертая требует ключ Выбрать в инвентаре ключ нажать "Применить"  
[Пример](https://disk.yandex.ru/i/2sSqjTJk5u8v4Q)
7. Подсказка - кнопка "Применить"  
[Пример](https://disk.yandex.ru/i/98UAocJgPANpyA)
8. Мост   
[Пример](https://disk.yandex.ru/i/U7YqoI3Bk3DvsQ)
9. Пузырь - Для взаимодействия зайти внутрь  
[Пример 1](https://disk.yandex.ru/i/xkdZhfDsong_vg)  
[Пример 2](https://disk.yandex.ru/i/Q7xqaMT23E9k9Q)
10. Выход - Срабатывает когда все 3 персонажа находятся в области  
[Пример](https://disk.yandex.ru/i/xbDNItCyqej7Og)

## Препятствия 
1. **Пушка** стреляет на всю длину локации - DMG-2 (на первом уровне 1)  
[Пример](https://disk.yandex.ru/i/pHUhz1LxaDxduQ)
2. **Электро-стена** - DMG-1 (При контакте) пропускает стрелы  
[Пример](https://disk.yandex.ru/i/-yjXzcCpehsqmQ)
3. **Ловушки** - DMG-1 (При контакте)  
[Пример 1](https://disk.yandex.ru/i/Zh9FSuDzx5FLMw)  
[Пример 2](https://disk.yandex.ru/i/EtL5rUI4x9MFzg)


## Дополнительно
+ [Образец игры](https://okgamer.ru/super-nintendo-igry-onlajjn/4343-the-lost-vikings.html)
+ [Коды для уровней](https://docviewer.yandex.ru/view/338848830/?*=adMZGSbb99MA12YWpTfB%2Fq5cWX57InVybCI6InlhLWRpc2stcHVibGljOi8vZUM2bWQvR3plQkRyVGpNa2hHVFFGYzI2MVJONllzRVVtcGNraVgwK2FBWlBiNkk4NVYxTXZJN1AzVW5PVkFOa3EvSjZicG1SeU9Kb25UM1ZvWG5EYWc9PSIsInRpdGxlIjoibHZscy50eHQiLCJub2lmcmFtZSI6ZmFsc2UsInVpZCI6IjMzODg0ODgzMCIsInRzIjoxNjgyNDg0MDIxMjMxLCJ5dSI6Ijk1NjQyMzUxMTE2ODE2MjgzMTkifQ%3D%3D)
+ [Спрайты персонажей и врагов](https://disk.yandex.ru/d/sgvAb-2I1gBXBw) *(Улучшено качество изображений, прозрачный фон)*
+ [Спрайты без обработки](https://www.spriters-resource.com/snes/lostvikings/)
