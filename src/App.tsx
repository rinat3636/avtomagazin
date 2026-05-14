import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { GarageProvider } from './context/GarageContext'
import { ToastProvider } from './context/ToastContext'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { CatalogPage } from './pages/CatalogPage'
import { ProductPage } from './pages/ProductPage'
import { GaragePage } from './pages/GaragePage'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { OrderSuccessPage } from './pages/OrderSuccessPage'
import { SearchPage } from './pages/SearchPage'
import { FavoritesPage } from './pages/FavoritesPage'
import { DeliveryPage } from './pages/DeliveryPage'
import { SupportPage } from './pages/SupportPage'
import { ReturnsPage } from './pages/ReturnsPage'
import { NotFoundPage } from './pages/NotFoundPage'

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ToastProvider>
        <GarageProvider>
          <FavoritesProvider>
            <CartProvider>
              <Routes>
                <Route element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="catalog" element={<CatalogPage />} />
                  <Route path="catalog/:categoryId" element={<CatalogPage />} />
                  <Route path="product/:slug" element={<ProductPage />} />
                  <Route path="garage" element={<GaragePage />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="order/success" element={<OrderSuccessPage />} />
                  <Route path="search" element={<SearchPage />} />
                  <Route path="favorites" element={<FavoritesPage />} />
                  <Route path="delivery" element={<DeliveryPage />} />
                  <Route path="support" element={<SupportPage />} />
                  <Route path="returns" element={<ReturnsPage />} />
                  <Route path="404" element={<NotFoundPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </CartProvider>
          </FavoritesProvider>
        </GarageProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
