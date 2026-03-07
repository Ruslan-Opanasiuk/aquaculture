// src/pages/Cart.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartItem from "../components/CartItem";
import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = 0;
  const total = subtotal - discount;

  return (
    <div
      className="min-h-screen flex flex-col font-['Montserrat']"
      style={{ backgroundColor: "var(--color-brand-beige)" }}
    >
    <Header />

    <div className="mt-[80px]">
      <PageHeader
        title="Кошик"
        breadcrumbs={[
          { label: "Головна", link: "/" },
          { label: "Каталог", link: "/catalog" },
          { label: "Кошик" }
        ]}
      />
    </div>

      <main className="flex-1 pt-[80px] pb-[80px]">
        <div
          className="w-full px-layout-gap mx-auto"
          style={{ maxWidth: "var(--content-max-width)" }}
        >

          {items.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center">
              <p
                style={{
                  color: "var(--color-brand-gray)",
                  fontSize: "var(--h3-font-size)",
                }}
              >
                Ваш кошик порожній
              </p>
              <Link
                to="/"
                className="mt-6 font-semibold underline decoration-2 underline-offset-4"
                style={{ color: "var(--color-brand-dark)" }}
              >
                Повернутися до каталогу
              </Link>
            </div>
          ) : (
            <>
              {/* ITEMS */}
              <div className="flex flex-col">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onIncrement={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    onDecrement={() => {
                      if (item.quantity > 1) {
                        updateQuantity(item.id, item.quantity - 1);
                      } else {
                        removeItem(item.id);
                      }
                    }}
                    onChange={(val) =>
                      updateQuantity(item.id, Number(val))
                    }
                    onRemove={() => removeItem(item.id)}
                  />
                ))}
              </div>

              {/* SUMMARY UNDER ITEMS, ALIGNED RIGHT */}
              <div className="flex justify-end mt-[60px]">
                <div
                  className="w-full max-w-[350px]"
                  style={{
                    color: "var(--color-brand-dark)",
                    fontSize: "var(--body-font-size)",
                    fontWeight: 400,
                  }}
                >
                  {/* ROW 1 */}
                  <div className="flex justify-between mb-4">
                    <span>Вартість</span>
                    <span>
                      {new Intl.NumberFormat("uk-UA").format(subtotal)} ₴
                    </span>
                  </div>

                  {/* ROW 2 */}
                  <div className="flex justify-between mb-6">
                    <span>Знижка</span>
                    <span>
                      {new Intl.NumberFormat("uk-UA").format(discount)} ₴
                    </span>
                  </div>

                  {/* LINE */}
                  <div
                    className="mb-6"
                    style={{
                      borderTop: "2px solid var(--color-brand-sand)",
                    }}
                  />

                  {/* ROW 3 */}
                  <div className="flex justify-between mb-8">
                    <span style={{ fontWeight: 600 }}>
                      До сплати
                    </span>
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: "var(--h3-font-size)",
                      }}
                    >
                      {new Intl.NumberFormat("uk-UA").format(total)} ₴
                    </span>
                  </div>

                  {/* BUTTONS (ORDER SUMMARY STYLE) */}
                  <div className="flex flex-col gap-6">
                    
                    {/* ОФОРМИТИ */}
                    <div className="flex items-center gap-4 group cursor-pointer select-none transition-all duration-300">
                      <button
                        type="button"
                        className="
                          w-[36px] h-[36px]
                          rounded-full
                          flex items-center justify-center
                          border-[2px] border-black
                          bg-black text-[#F5F1E7]
                          transition-all duration-200
                          lg:bg-transparent lg:text-black lg:group-hover:bg-black lg:group-hover:text-[#F5F1E7]
                          active:scale-90
                        "
                      >
                        <ArrowIcon className="w-6 h-6" />
                      </button>

                      <span
                        className="font-semibold tracking-wider text-[#262626]"
                        style={{ fontSize: "var(--body-font-size)" }}
                      >
                        ОФОРМИТИ ЗАМОВЛЕННЯ
                      </span>
                    </div>

                    {/* ПРОДОВЖИТИ */}
                    <Link
                      to="/"
                      className="flex items-center gap-4 group cursor-pointer select-none transition-all duration-300"
                    >
                      <button
                        type="button"
                        className="
                          w-[36px] h-[36px]
                          rounded-full
                          flex items-center justify-center
                          border-[2px] border-black
                          bg-transparent text-black
                          transition-all duration-200
                          lg:group-hover:bg-black lg:group-hover:text-[#F5F1E7]
                          active:scale-90
                        "
                      >
                        <ArrowIcon className="w-6 h-6 rotate-180" />
                      </button>

                      <span
                        className="font-semibold tracking-wider text-[#262626]"
                        style={{ fontSize: "var(--body-font-size)" }}
                      >
                        ПРОДОВЖИТИ ПОКУПКИ
                      </span>
                    </Link>

                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}