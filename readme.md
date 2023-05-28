![картинка для привлечения внимания. чорт. надеюсь никто не читает альты..](https://habrastorage.org/webt/dy/hg/9p/dyhg9pi3u709omukgjqu9q-0jw4.gif)

Здравствуйте, меня *не* зовут Дмитрий Карловский и я.. решил написать простенькие заметки на [$mol](https://mol.hyoo.ru/#!section=docs/=4kd8nv_evh111) в несколько итераций:
 
0. [Настраиваемся](#0-nastraivaem-rabochee-okruzhenie-mamhttpsmolhyoorusectiondocsyr3qrg_z2908a)
1. [Возводим скелет](#vozvodim-skelet)
2. [Сохраняемся](#sohranyaemsya)
3. [Шаримся](#sharimsya)
4. [Пакуемся](#pakuemsya)

<cut/>

### 0. [Настраиваем рабочее окружение MAM](https://mol.hyoo.ru/#!section=docs/=yr3qrg_z2908a)
парой команд - это делается один раз под все проекты:
```bash
git clone https://github.com/hyoo-ru/mam.git
cd mam
npm install
```
Запускаем дев сервер:
```bash
npm start
```
Он заиграет на 9080 порту http://127.0.0.1:9080, а нам можно начинать смолить..

### Возводим скелет
Создаём наш проект: в склонированной папке mam создаем папки habr/notes
В нём создём точку входа habr/notes/index.html:
```html
<!doctype html>
<html mol_view_root>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
	</head>
	<body mol_view_root>
		<div mol_view_root="$habr_notes"></div>
		<script src="web.js" charset="utf-8"></script>
	</body>
</html>
```

Заметили `$habr_notes`? Тут везде [fqn](https://en.wikipedia.org/wiki/Fully_qualified_name) обращения (имя [=](https://mol.hyoo.ru/#!section=docs/=xps6z2_b92esq) путь), а в `mol_view_root` мы указываем наше приложение. Точнее, компонент - здесь это одно и то же по смыслу, только мы можем вкладывать компоненты друг в друга и [делегировать](https://mol.hyoo.ru/#!section=docs/=qdee2z_6ocqkh/Docs.View%22qdee2z_6ocqkh%22.Details=%D0%94%D0%B5%D0%BB%D0%B5%D0%B3%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)/[рекомпозировать](https://mol.hyoo.ru/#!section=docs/=qdee2z_6ocqkh/Docs.View%22qdee2z_6ocqkh%22.Details=%D0%A0%D0%B5%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%B7%D0%B8%D1%86%D0%B8%D1%8F)/[хакать](https://mol.hyoo.ru/#!section=docs/=qdee2z_6ocqkh/Docs.View%22qdee2z_6ocqkh%22.Details=%D0%9D%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0%20%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%B0%20%D0%B2%20%D1%84%D0%B0%D0%B1%D1%80%D0%B8%D0%BA%D0%B5%20-%20%D0%A5%D0%B0%D0%BA%D0%B8%D0%BD%D0%B3) их [свойства](https://mol.hyoo.ru/#!section=docs/=qdee2z_6ocqkh/Docs.View%22qdee2z_6ocqkh%22.Details=%D0%94%D1%83%D0%BC%D0%B0%D0%B9%D1%82%D0%B5%20%D1%81%D0%B2%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0%D0%BC%D0%B8) между собой.

Что же, создадим сам компонент habr/notes/view.tree:
```ruby
- это комментарий, ах да, следим за табами
$habr_notes $mol_page
```

[Шпаргалка](https://mol.hyoo.ru/#!section=docs/=vv2nig_s5zr0f/Docs.View%22vv2nig_s5zr0f%22.Details=%D0%A8%D0%BF%D0%B0%D1%80%D0%B3%D0%B0%D0%BB%D0%BA%D0%B0%20%D0%BF%D0%BE%20%D1%81%D0%BF%D0%B5%D1%86%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB%D0%B0%D0%BC) по синтаксису и [страшная статья](https://page.hyoo.ru/#!=gf3a0a_5koj1m) о [view.tree](https://mol.hyoo.ru/#!section=docs/=rv38hh_h1cjhz)

В браузере можем перейти по адресу http://127.0.0.1:9080/habr/notes и увидим зачаток нашего приложение:

![*гифка*](https://habrastorage.org/webt/nc/oo/pq/ncoopqk_jyj-ufc8_2zo-1ieoqg.gif)

Придадим форму, подправив файл view.tree:
```ruby
- мы отнаследовали $habr_notes от $mol_page
$habr_notes $mol_page
	- в свойство body мы положили массив /
	body /
		- в этот массив мы вложили компонент $mol_textarea и назвали его Input
		<= Input $mol_textarea
```

О, теперь у нас появилось текстовое поле ввода:

![*гифка*](https://habrastorage.org/webt/kn/pv/at/knpvat06sldwfambaf3ow_berta.gif)

Но наш введенный текст теряется при обновлении страницы, давайте это изменим.

### Сохраняемся..
в localStorage

Подправим наш view.tree файл до такого содержания:
```ruby
$habr_notes $mol_page
	body /
		<= Input $mol_textarea
			- переопределяем наше свойство value
			value?val <=> text?val \
```
> подробнее про свойства компонента $mol_textarea [туть](https://mol.hyoo.ru/#!section=demos/demo=mol_textarea_demo)

Собственно на этом момент можно уже начать задаваться вопросом какого черта тут происходит и зачем нужны эти view.tree файлы.

view.tree - это DSL, транслирующийся в ts.

Пример выше преобразится в такой код:
```javascript
namespace $ {
	export class $habr_notes extends $mol_page {
		
		/**
		 * ```tree
		 * body / <= input
		 * ```
		 */
		body() {
			return [
				this.input()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * text?val \
		 * ```
		 */
		@ $mol_mem
		text(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * Input $mol_textarea value?val <=> text?val
		 * ```
		 */
		@ $mol_mem
		Input() {
			const obj = new this.$.$mol_textarea()
			
			obj.value = (val?: any) => this.text(val)
			
			return obj
		}
	}
	
}

```

Вы можете сами поиграться в [песочнице](https://mol.hyoo.ru/#!section=view.tree/source=%24habr_notes%20%24mol_page%0A%09body%20%2F%0A%09%09%3C%3D%20input%20%24mol_textarea%0A%09%09%09-%20%D0%BF%D0%B5%D1%80%D0%B5%D0%BE%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D1%8F%D0%B5%D0%BC%20%D0%BD%D0%B0%D1%88%D0%B5%20%D1%81%D0%B2%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%BE%20value%0A%09%09%09value%3Fval%20%3C%3D%3E%20text%3Fval%20%5C%0A).


Зачем он нужен? Для разделения мух и котлет.

С помощью view.**tree** мы **декларативно** описываем наш **интерфейс**.
С помощью view.tree.**ts** мы **императивно** описываем работу самой **логики**.

Из view.tree сборщик сгенерировал шаблонный код в файл `habr/notes/-view.tree/view.tree.ts`
При обновлении view.tree файла, файл выше обновляется сам.

Зачем он нужен? Для переопределения!

Можем заметить, что код выше сгенерировался в неймспейсе `$`.
Свою логику мы  будем описывать в неймспейсе `$.$$` - то есть, "перекрывая" своей логикой.

Вернёмся же к нашему коду.
Создаём файл habr/notes/view.tree.ts:
```javascript
namespace $.$$ {
	export class $habr_notes extends $.$habr_notes {
		@ $mol_mem
		text(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
	}
}
```

Тут я перенёс `text(val?: any)` - функция-заглушка, сгенерированная из view.tree файла с навешенным декоратором `@ $mol_mem` (от memoization)

Это [канал](https://mol.hyoo.ru/#!section=docs/=qxmh6t_sinbmb) - он возвращает значение, при вызове его без параметра, а при вызове с параметром он указывается в качестве значения. 

Почему оно работает?
Мы открыли наше приложение, поле ввода запросило значение из функции `text`, функция `text` вернуло пустую строку.
Мы ввели первый символ, в функцию `text` передалась нажатая клавиша, функция `text` сохранила её.
Мы вводим последующие символы, они запоминаются и результат функции `text` возвращается в поле ввода.

Ага, значит сюда и можно подвязать сохранение данных в localStorage.

В $mol есть модуль $mol_state_local - реактивная обертка над localStorage - ей и воспользуемся:
```TypeScript
namespace $.$$ {
	export class $habr_notes extends $.$habr_notes {
		@ $mol_mem
		text(val?: any) {
			return $mol_state_local.value('note', val) || ""
		}
	}
}

```
 
Проверяем.. работает! После перезагрузки страницы наш введённый текст сохраняется.

![**гифка**](https://habrastorage.org/webt/wy/2t/pl/wy2tpljljm-e3ws9xwfonbklakc.gif)

Я создал репозиторий с веткой [stage-1](https://github.com/koplenov/habr-notes/tree/stage-1), действия выше воспроизведены в нём - можно сравниться. 


Что же, осталось научиться шариться данными!

собственно,
### Шаримся
заметками, используя децентрализованную криптографическую систему, ну а почему нет ¯\\_(ツ)_/¯

Поправим view.tree файл:
```ruby
$habr_notes $mol_page
	- через синк клиент мы обмениваемся данными в сети
	yard $hyoo_sync_client
		peer <= Peer null
	tools /
		- через модуль онлайна мы подключаемся к пирам и синхронизируемся
		<= Online $hyoo_sync_online
			yard <= yard
	body /
		<= Input $mol_textarea
			value?val <=> text?val \
			enabled <= i_have_can_mod false

```
Опишем логику view.tree.ts:
```javascript
namespace $.$$ {
	export class $habr_notes extends $.$habr_notes {
		@$mol_mem
		text( val?: any ) {
			return this.store().str( val ) || ""
		}

		@$mol_mem
		store() {
			// через модуль клиента мы обращаемся к хранилищу (миру),
			// используем тип $hyoo_crowd_reg - он позволяет атомарно хранить значения (строки, числа, булы)
			// запрашиваем участок с указанным id
			return this.yard().world().Fund( $hyoo_crowd_reg ).Item( this.current_note_id() )
		}

		@$mol_mem
		current_note_id() {
			// мы считываем id заметки из урла, или, если пустой, указываем новый свой
			const id = this.$.$mol_state_arg.value( '' ) || this.yard().land_grab().id()
			// задаём в урл текущий id - чтобы мы могли его сразу же скопировать
			this.$.$mol_state_arg.value( '', id )
			return id as $mol_int62_string
		}

		@$mol_mem
		i_have_can_mod() {
			// проверка наличия прав на редактирование
			return this.yard().land( this.current_note_id() ).allowed_mod()
		}
	}
}

```

Вот как это выглядит:
![ля, работает](https://habrastorage.org/webt/9u/ix/sm/9uixsmokdxdxhd981wna3rpa0bw.gif)

Для сверки, ветка [stage-2](https://github.com/koplenov/habr-notes/tree/stage-2)

#### А может вам рюшечки?
Добавим поддержку тем тройкой строк кода:
```ruby
$habr_notes $mol_page
	plugins /
		- включаем поддержку смены тем
		<= Theme $mol_theme_auto
	yard $hyoo_sync_client
	tools /
		<= Online $hyoo_sync_online
			yard <= yard
		- добавляем кнопку-переключалку
		<= Lighter $mol_lights_toggle
	body /
		<= Input $mol_textarea
			value?val <=> text?val \
			enabled <= i_have_can_mod false

```

Вот так это выглядит:
![](https://habrastorage.org/webt/-v/ra/x2/-vrax2xsgcgy3jgg9addwp9rnsu.gif)

#### Или ехать?
А может сделаем наше pwa offline-first?
Пфф: создаем в той же директории файл view.meta.tree:
```
include \/mol/offline/install
```

Одной строчкой мы подключили [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), который закеширует наше приложение и позволит работать ему при отсутствии интернетов.
Зачем? [CROWD](https://github.com/hyoo-ru/crowd.hyoo.ru), который мы используем, автоматически синхронизируется с внешним миром при потери и появлении интернета.

Для сверки, ветка [stage-3](https://github.com/koplenov/habr-notes/tree/stage-3)

### Пакуемся
мы командой:
```bash
npm start habr/notes
```
Наш статический бандл расположится в папке `habr/notes/-/` - его и можно хостить.

В ходе всех вышеописанных шагов можно заметить появившиеся папки:
* `-/` - наш бандл
* `-view.tree/` - наш переопределяемый код

Тут продуманно, что весь генерируемый код с которым мы не взаимодействуем лежит в минусах, это сделано для упрощения работы с тем же гитом.
Например, файл `.gitignore` будет таков:
```
-*
```

Отвлеклись, задеплоимся на какой-нибдь фапхаб с возможностью хостить статические странички - тот же Github Pages.

Выгрузим содержимое папки `-` в ветку [gh-pages](https://github.com/koplenov/habr-notes/tree/gh-pages) и можем лицезреть результаты наших работ по ссылке:
https://koplenov.github.io/habr-notes/#!=sxktck_j3e02v


Схожее по теме:
* https://notes.hyoo.ru/ - Ведения личных заметок с напоминаниями.
** Сорцы: https://github.com/hyoo-ru/notes.hyoo.ru
* https://page.hyoo.ru/ - Сервис написания и публикации статей с совместным редактированием даже в оффлайне.
** Сорцы: https://github.com/hyoo-ru/page.hyoo.ru/
* [Запись стрима, где мы делали таск менеджер и обкатывали реалтаймовость](https://www.youtube.com/watch?v=r9MPIoH6gNc)

Ссылка на доку [туть](https://mol.hyoo.ru/#!section=docs/=p9fok3_sq077u), а мы обитаем [туть](https://t.me/h_y_o_o)..