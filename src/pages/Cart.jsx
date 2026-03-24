import Header from "../components/Header";
import Footer from "../components/Footer";
import CartItem from "../components/CartItem";
import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import ActionArrowButton from "../components/ActionArrowButton";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  /* ================= SUBTOTAL ================= */

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ================= DISCOUNT LOGIC ================= */

  const totalGrams = items.reduce(
    (sum, item) => sum + item.grams * item.quantity,
    0
  );

  const totalKg = totalGrams / 1000;

  const breakpoints = [3, 6, 12, 24];
  const discountPerBreakpoint = 7;

  const achievedBreakpoints = breakpoints.filter((bp) => totalKg >= bp).length;
  const discountPercent = achievedBreakpoints * discountPerBreakpoint;

  const discount = Math.round((subtotal * discountPercent) / 100);
  const total = subtotal - discount;

  /* ================= PROGRESS BAR LOGIC (same as OrderSummary) ================= */

  const segmentCount = breakpoints.length + 1;
  const segmentWidth = 100 / segmentCount;

  let progressPercent = 0;
  if (totalKg > 0) {
    let prev = 0;
    for (let i = 0; i < breakpoints.length; i++) {
      const bp = breakpoints[i];
      if (totalKg < bp) {
        const segmentProgress = (totalKg - prev) / (bp - prev);
        progressPercent =
          i * segmentWidth + segmentProgress * segmentWidth;
        break;
      }
      prev = bp;
      if (i === breakpoints.length - 1) {
        progressPercent = 100;
      }
    }
  }

  const nextLegendKg = breakpoints.find((bp) => totalKg < bp);

  /* ================= UI ================= */

  return (
    <div
      className="min-h-screen flex flex-col font-['Montserrat']"
      style={{ backgroundColor: "var(--color-brand-beige)" }}
    >


      <div className="mt-[80px]">
        <PageHeader
          title="Кошик"
          breadcrumbs={[
            { label: "Головна", link: "/" },
            { label: "Каталог", link: "/catalog" },
            { label: "Кошик" },
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

              {/* SUMMARY BLOCK */}
              <div className="flex mt-[60px] tablet:justify-end">
                <div
                  className="w-full tablet:max-w-[350px]"
                  style={{
                    color: "var(--color-brand-dark)",
                    fontSize: "var(--body-font-size)",
                    fontWeight: 400,
                  }}
                >
                  {/* SUBTOTAL */}
                  <div className="flex justify-between mb-2">
                    <span>Вартість</span>
                    <span>
                      {new Intl.NumberFormat("uk-UA").format(subtotal)} ₴
                    </span>
                  </div>

                  {/* DISCOUNT */}
                  <div className="flex justify-between mb-12">
                    <span>Знижка ({discountPercent}%)</span>
                    <span>
                      − {new Intl.NumberFormat("uk-UA").format(discount)} ₴
                    </span>
                  </div>

                  {/* BREAKPOINT BAR (duplicated) */}
                  <div
                    style={{
                      width: "100%",
                      position: "relative",
                      marginBottom: 18,
                    }}
                  >
                    <div
                      style={{
                        height: 8,
                        width: "100%",
                        backgroundColor: "var(--color-brand-sand)",
                        borderRadius: 4,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${progressPercent}%`,
                          backgroundColor: "var(--color-brand-gold)",
                          transition:
                            "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      />
                    </div>

                    {breakpoints.map((kg, index) => {
                      const isCompleted = totalKg >= kg;
                      const isActive = isCompleted || nextLegendKg === kg;
                      const position =
                        ((index + 1) / segmentCount) * 100;

                      return (
                        <div key={kg}>
                          <div
                            style={{
                              position: "absolute",
                              bottom: 18,
                              left: `${position}%`,
                              transform: "translateX(-50%)",
                              fontSize: "var(--body-font-size)",
                              fontWeight: 600,
                              whiteSpace: "nowrap",
                              color: isActive
                                ? "var(--color-brand-dark)"
                                : "var(--color-brand-gray)",
                              transition: "color 0.3s ease",
                            }}
                          >
                            {kg} кг
                          </div>
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: `${position}%`,
                              transform: "translate(-50%, -50%)",
                              width: 18,
                              height: 18,
                              borderRadius: "50%",
                              backgroundColor: "var(--color-brand-beige)",
                              border: `4px solid ${
                                isCompleted
                                  ? "var(--color-brand-gold)"
                                  : "var(--color-brand-sand)"
                              }`,
                              transition: "all 0.3s ease",
                              zIndex: 2,
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* DIVIDER */}
                  <div
                    className="mb-3"
                    style={{
                      borderTop: "2px solid var(--color-brand-sand)",
                    }}
                  />

                  {/* TOTAL */}
                  <div className="flex justify-between mb-8">
                    <span style={{ fontWeight: 600 }}>До сплати</span>

                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: "var(--h3-font-size)",
                      }}
                    >
                      {new Intl.NumberFormat("uk-UA").format(total)} ₴
                    </span>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex flex-col gap-3">
                    <ActionArrowButton
                      label="Оформити замовлення"
                      direction="right"
                      variant="filled"
                      onClick={() => console.log("Checkout")}
                    />

                    <ActionArrowButton
                      label="Продовжити покупки"
                      direction="left"
                      variant="outline"
                      to="/"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

    </div>
  );
}