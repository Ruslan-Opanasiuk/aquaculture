import SEO from "../components/SEO";
import PageHeader from "../components/PageHeader";

export default function Privacy() {
  return (
    <div
      className="min-h-screen flex flex-col font-['Montserrat']"
      style={{ backgroundColor: "var(--color-brand-beige)" }}
    >
      <SEO
        title="Політика конфіденційності"
        description="Політика конфіденційності та обробки персональних даних Aquaculture."
      />

      <div className="mt-[80px]">
        <PageHeader
          title="Політика конфіденційності"
          breadcrumbs={[
            { label: "Головна", link: "/" },
            { label: "Політика конфіденційності" },
          ]}
        />
      </div>

      <main className="flex-1 pt-[40px] pb-[80px]">
        <div
          className="w-full px-layout-gap mx-auto flex flex-col gap-[28px]"
          style={{ maxWidth: "780px", color: "var(--color-brand-dark)" }}
        >
          <p className="opacity-60" style={{ fontSize: "var(--body-small-font-size)" }}>
            Останнє оновлення: 21 серпня 2026 р.
          </p>

          <section className="flex flex-col gap-[10px]">
            <h2 className="font-bold text-body uppercase tracking-widest">
              1. Загальні положення
            </h2>
            <p className="leading-[1.7]" style={{ fontSize: "var(--body-font-size)" }}>
              Ця Політика конфіденційності визначає порядок збору, використання
              та зберігання персональних даних користувачів сайту aquaculture
              (далі — «Сайт», «ми»). Використовуючи Сайт, ви погоджуєтесь з
              умовами цієї Політики.
            </p>
          </section>

          <section className="flex flex-col gap-[10px]">
            <h2 className="font-bold text-body uppercase tracking-widest">
              2. Які дані ми збираємо
            </h2>
            <p className="leading-[1.7]" style={{ fontSize: "var(--body-font-size)" }}>
              Під час оформлення замовлення, підписки на розсилку або
              заповнення гуртової анкети ми можемо збирати: ім'я, номер
              телефону, email, місто та адресу доставки, а також коментар до
              замовлення. Ми не збираємо платіжні дані — оплата й доставка
              узгоджуються індивідуально після підтвердження замовлення.
            </p>
          </section>

          <section className="flex flex-col gap-[10px]">
            <h2 className="font-bold text-body uppercase tracking-widest">
              3. Мета обробки даних
            </h2>
            <p className="leading-[1.7]" style={{ fontSize: "var(--body-font-size)" }}>
              Надані дані використовуються виключно для обробки замовлень,
              зв'язку з клієнтом щодо деталей доставки, надсилання
              інформаційної розсилки (за згодою) та обробки заявок на гуртову
              співпрацю. Дані не передаються третім особам, окрім випадків,
              необхідних для виконання замовлення (наприклад, служба
              доставки).
            </p>
          </section>

          <section className="flex flex-col gap-[10px]">
            <h2 className="font-bold text-body uppercase tracking-widest">
              4. Зберігання даних
            </h2>
            <p className="leading-[1.7]" style={{ fontSize: "var(--body-font-size)" }}>
              Дані замовлень надходять на електронну пошту менеджера й не
              зберігаються у публічно доступній базі даних. Дані підписки на
              розсилку зберігаються в сервісі email-розсилок до моменту
              відписки користувача.
            </p>
          </section>

          <section className="flex flex-col gap-[10px]">
            <h2 className="font-bold text-body uppercase tracking-widest">
              5. Права користувача
            </h2>
            <p className="leading-[1.7]" style={{ fontSize: "var(--body-font-size)" }}>
              Ви маєте право запросити перегляд, виправлення або видалення
              своїх персональних даних, а також відписатись від розсилки в
              будь-який момент за допомогою посилання в листі або звернувшись
              до нас напряму.
            </p>
          </section>

          <section className="flex flex-col gap-[10px]">
            <h2 className="font-bold text-body uppercase tracking-widest">
              6. Контакти
            </h2>
            <p className="leading-[1.7]" style={{ fontSize: "var(--body-font-size)" }}>
              З питань щодо обробки персональних даних звертайтесь за
              контактами, вказаними в футері Сайту.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
