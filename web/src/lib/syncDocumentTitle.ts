/** Синхронизация document.title с маршрутом (без react-helmet). Страница товара задаёт заголовок сама. */
export function syncDocumentTitle(pathname: string): void {
  if (/\/product\//.test(pathname)) return

  const base = 'АвтоМагазин'
  let suffix = ''

  if (pathname === '/' || pathname === '') suffix = ' — запчасти для авто'
  else if (pathname.includes('/catalog')) suffix = ' — каталог'
  else if (pathname.includes('/search')) suffix = ' — поиск'
  else if (pathname.includes('/cart')) suffix = ' — корзина'
  else if (pathname.includes('/checkout')) suffix = ' — оформление заказа'
  else if (pathname.includes('/order/success')) suffix = ' — заказ принят'
  else if (pathname.includes('/garage')) suffix = ' — моё авто'
  else if (pathname.includes('/favorites')) suffix = ' — избранное'
  else if (pathname.includes('/delivery')) suffix = ' — доставка и оплата'
  else if (pathname.includes('/returns')) suffix = ' — возврат'
  else if (pathname.includes('/support')) suffix = ' — поддержка'
  else if (pathname.includes('/404')) suffix = ' — страница не найдена'

  document.title = suffix ? `${base}${suffix}` : base
}
