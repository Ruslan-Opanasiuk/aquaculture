import { useState } from "react";
import CartItem from "../components/CartItem";
import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import ActionArrowButton from "../components/ActionArrowButton";
import { calculateDiscount } from "../components/discount";
import DiscountProgressBar from "../components/DiscountProgressBar";
import SelectField from "../components/WholesaleForm/SelectField";

const CITIES = [
  "Вінниця", "Дніпро", "Донецьк", "Житомир", "Запоріжжя",
  "Івано-Франківськ", "Київ", "Кропивницький", "Луганськ", "Луцьк",
  "Львів", "Миколаїв", "Одеса", "Полтава", "Рівне",
  "Сімферополь", "Суми", "Тернопіль", "Ужгород", "Харків",
  "Херсон", "Хмельницький", "Черкаси", "Чернівці", "Чернігів",
];

const LABEL_CLASS = "mb-[6px] text-body font-medium text-brand-black";

const INPUT_BASE =
  "w-full h-[44px] rounded-full bg-transparent text-brand-black px-[18px] text-body placeholder:text-brand-gray outline-none transition-all duration-200 border border-brand-sand";

function CheckoutField({ label, type = "text", placeholder, value, onChange, error }) {
  return (
    <div className="w-full flex flex-col font-['Montserrat']">
      <label className={LABEL_CLASS}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${INPUT_BASE} ${error ? "ring-2 ring-error border-error" : "focus:ring-2 focus:ring-brand-gold"}`}
      />
      {error && <p role="alert" className="text-error text-[12px] mt-[6px]">{error}</p>}
    </div>
  );
}

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const fmt = (n) => new Intl.NumberFormat("uk-UA").format(n);

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalGrams = items.reduce((sum, item) => sum + item.grams * item.quantity, 0);
  const totalKg = totalGrams / 1000;
  const discountPercent = calculateDiscount(totalGrams);
  const discount = Math.round((subtotal * discountPercent) / 100);
  const total = subtotal - discount;

  const [showForm, setShowForm] = useState(false);
  const [formStatus, setFormStatus] = useState("idle");
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [values, setValues] = useState({
    name: "", phone: "", email: "", city: "", comment: "",
  });

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!values.name.trim()) errs.name = "Обов'язкове поле";
    if (!values.phone.trim()) errs.phone = "Обов'язкове поле";
    if (!isValidEmail(values.email)) errs.email = "Введіть коректний email";
    if (!values.city.trim()) errs.city = "Обов'язкове поле";
    if (Object.keys(errs).length > 0) { setFieldErrors(errs); return; }

    setFormError("");
    setFormStatus("loading");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: values,
          items: items.map((i) => ({ title: i.title, weight: i.weight, quantity: i.quantity, price: i.price })),
          subtotal, discount, total, discountPercent,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message);
      setFormStatus("success");
      clearCart();
    } catch (err) {
      setFormStatus("idle");
      setFormError(err.message || "Не вдалося відправити замовлення. Спробуйте пізніше.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col font-['Montserrat']"
      style={{ backgroundColor: "var(--color-brand-beige)" }}
    >
      <div className="mt-[80px]">
        <PageHeader
          title={showForm ? "Оформлення" : "Кошик"}
          breadcrumbs={
            showForm
              ? [
                  { label: "Головна", link: "/" },
                  { label: "Каталог", link: "/catalog" },
                  { label: "Кошик", onClick: () => setShowForm(false) },
                  { label: "Оформлення" },
                ]
              : [
                  { label: "Головна", link: "/" },
                  { label: "Каталог", link: "/catalog" },
                  { label: "Кошик" },
                ]
          }
        />
      </div>

      <main className="flex-1 pt-[40px] pb-[80px]">
        <div
          className="w-full px-layout-gap mx-auto"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          {/* ── SUCCESS ── */}
          {formStatus === "success" ? (
            <div className="text-center py-20 flex flex-col items-center">
              <p style={{ color: "var(--color-brand-dark)", fontSize: "var(--h3-font-size)", fontWeight: 600 }}>
                Замовлення прийнято
              </p>
              <p className="mt-4 max-w-[420px] leading-[1.6]" style={{ color: "var(--color-brand-gray)", fontSize: "var(--body-font-size)" }}>
                Ми зв'яжемося з вами найближчим часом для підтвердження та обговорення деталей доставки.
              </p>
              <Link to="/catalog" className="mt-8 font-semibold underline decoration-2 underline-offset-4" style={{ color: "var(--color-brand-dark)" }}>
                Повернутися до каталогу
              </Link>
            </div>

          /* ── EMPTY ── */
          ) : items.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center">
              <p style={{ color: "var(--color-brand-gray)", fontSize: "var(--h3-font-size)" }}>
                Ваш кошик порожній
              </p>
              <Link to="/catalog" className="mt-6 font-semibold underline decoration-2 underline-offset-4" style={{ color: "var(--color-brand-dark)" }}>
                Повернутися до каталогу
              </Link>
            </div>

          /* ── CHECKOUT LAYOUT ── */
          ) : showForm ? (
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-[60px] desktop:gap-[100px] items-start">

              {/* LEFT — order summary */}
              <div style={{ color: "var(--color-brand-dark)" }}>
                <div className="pb-4 mb-6" style={{ borderBottom: "2px solid var(--color-brand-sand)" }}>
                  <p style={{ fontSize: "var(--h3-font-size)", fontWeight: 600 }}>Ваше замовлення</p>
                </div>

                <div className="flex flex-col gap-[12px] mb-8">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center gap-4">
                      <div>
                        <p className="font-medium" style={{ fontSize: "var(--body-font-size)" }}>
                          {item.title}
                        </p>
                        <p style={{ fontSize: "var(--body-small-font-size)", opacity: 0.5 }}>
                          {item.grams}г · {item.quantity} шт.
                        </p>
                      </div>
                      <p className="shrink-0 font-medium" style={{ fontSize: "var(--body-font-size)" }}>
                        {fmt(item.price * item.quantity)} ₴
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <DiscountProgressBar totalKg={totalKg} />
                </div>

                <div className="mt-4 flex flex-col gap-[6px]" style={{ fontSize: "var(--body-font-size)" }}>
                  <div className="flex justify-between opacity-60">
                    <span>Вартість</span>
                    <span>{fmt(subtotal)} ₴</span>
                  </div>
                  <div className="flex justify-between opacity-60">
                    <span>Знижка ({discountPercent}%)</span>
                    <span>− {fmt(discount)} ₴</span>
                  </div>
                  <div className="flex justify-between mt-3 pt-3" style={{ borderTop: "2px solid var(--color-brand-sand)", fontWeight: 600 }}>
                    <span>До сплати</span>
                    <span style={{ fontSize: "var(--h3-font-size)" }}>{fmt(total)} ₴</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="mt-6 font-semibold underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
                  style={{ color: "var(--color-brand-gray)", fontSize: "var(--body-font-size)" }}
                >
                  ← Повернутися до кошика
                </button>
              </div>

              {/* RIGHT — contact form */}
              <div className="mt-12 tablet:mt-0" style={{ color: "var(--color-brand-dark)" }}>
                <div className="pb-4 mb-6" style={{ borderBottom: "2px solid var(--color-brand-sand)" }}>
                  <p style={{ fontSize: "var(--h3-font-size)", fontWeight: 600 }}>Контактні дані</p>
                </div>

                <form onSubmit={handleCheckout} noValidate className="flex flex-col gap-[16px]">
                  <CheckoutField label="Ім'я" placeholder="Іван Іванов" value={values.name} onChange={(v) => handleChange("name", v)} error={fieldErrors.name} />
                  <CheckoutField label="Телефон" placeholder="+380 50 000 00 00" value={values.phone} onChange={(v) => handleChange("phone", v)} error={fieldErrors.phone} />
                  <CheckoutField label="Email" type="email" placeholder="email@example.com" value={values.email} onChange={(v) => handleChange("email", v)} error={fieldErrors.email} />
                  <SelectField
                    label="Місто"
                    placeholder="Оберіть або введіть місто"
                    searchable={true}
                    options={CITIES}
                    value={values.city}
                    onChange={(v) => handleChange("city", v)}
                    error={fieldErrors.city}
                    bgClass="bg-transparent border border-brand-sand"
                  />

                  <div className="w-full flex flex-col font-['Montserrat']">
                    <label className={LABEL_CLASS}>Коментар</label>
                    <textarea
                      placeholder="Побажання щодо доставки, часу зв'язку тощо"
                      value={values.comment}
                      onChange={(e) => handleChange("comment", e.target.value)}
                      rows={3}
                      maxLength={500}
                      className="w-full rounded-[16px] bg-transparent text-brand-black px-[18px] py-[12px] text-body placeholder:text-brand-gray outline-none transition-all duration-200 border border-brand-sand focus:ring-2 focus:ring-brand-gold resize-none"
                    />
                  </div>

                  {formError && (
                    <p className="text-red-500 text-[13px] text-center">{formError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === "loading"}
                    className="mt-2 w-full h-[44px] rounded-full bg-brand-dark text-brand-light text-body font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === "loading" ? "Надсилаємо..." : "Підтвердити замовлення"}
                  </button>
                </form>
              </div>
            </div>

          /* ── CART ── */
          ) : (
            <>
              <div className="flex justify-end mb-4">
                <button
                  type="button"
                  onClick={clearCart}
                  className="font-semibold underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
                  style={{ color: "var(--color-brand-gray)", fontSize: "var(--body-font-size)" }}
                >
                  Очистити все
                </button>
              </div>

              <div className="flex flex-col">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onIncrement={() => updateQuantity(item.id, item.quantity + 1)}
                    onDecrement={() => {
                      if (item.quantity > 1) updateQuantity(item.id, item.quantity - 1);
                      else removeItem(item.id);
                    }}
                    onChange={(val) => updateQuantity(item.id, Number(val))}
                    onRemove={() => removeItem(item.id)}
                  />
                ))}
              </div>

              <div className="flex mt-[60px] tablet:justify-end">
                <div className="w-full tablet:max-w-[350px]" style={{ color: "var(--color-brand-dark)", fontSize: "var(--body-font-size)", fontWeight: 400 }}>
                  <div className="flex justify-between mb-2">
                    <span>Вартість</span>
                    <span>{fmt(subtotal)} ₴</span>
                  </div>
                  <div className="flex justify-between mb-12">
                    <span>Знижка ({discountPercent}%)</span>
                    <span>− {fmt(discount)} ₴</span>
                  </div>

                  <DiscountProgressBar totalKg={totalKg} />

                  <div className="mb-3" style={{ borderTop: "2px solid var(--color-brand-sand)" }} />

                  <div className="flex justify-between mb-8">
                    <span style={{ fontWeight: 600 }}>До сплати</span>
                    <span style={{ fontWeight: 600, fontSize: "var(--h3-font-size)" }}>{fmt(total)} ₴</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <ActionArrowButton
                      label="Оформити замовлення"
                      direction="right"
                      variant="filled"
                      onClick={() => setShowForm(true)}
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
