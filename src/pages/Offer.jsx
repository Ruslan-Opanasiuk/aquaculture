import SEO from "../components/SEO";
import PageHeader from "../components/PageHeader";

export default function Offer() {
  return (
    <div
      className="min-h-screen flex flex-col font-['Montserrat']"
      style={{ backgroundColor: "var(--color-brand-beige)" }}
    >
      <SEO
        title="Договір публічної оферти"
        description="Умови продажу товарів на сайті Aquaculture."
      />

      <div className="mt-[80px]">
        <PageHeader
          title="Договір публічної оферти"
          breadcrumbs={[
            { label: "Головна", link: "/" },
            { label: "Договір публічної оферти" },
          ]}
        />
      </div>

      <main className="flex-1 pt-[40px] pb-[80px]">
        <div
          className="w-full px-layout-gap mx-auto flex flex-col gap-[28px]"
          style={{ maxWidth: "780px", color: "var(--color-brand-dark)" }}
        >
          <p className="leading-[1.7]" style={{ fontSize: "var(--body-font-size)" }}>
            Цей документ є публічною офертою [ФОП [ПІБ]], РНОКПП [буде
            вказано] (далі — «Продавець»), адресованою будь-якій
            дієздатній фізичній або юридичній особі (далі — «Покупець»),
            щодо укладення договору купівлі-продажу товарів дистанційним
            способом через сайт aquaculture. Оформлення замовлення на
            сайті означає повну й безумовну згоду Покупця з умовами цього
            договору відповідно до ст. 633, 641 Цивільного кодексу
            України.
          </p>

          <section className="flex flex-col gap-[10px]">
            <h2 className="font-bold text-body uppercase tracking-widest">
              1. Предмет договору
            </h2>
            <p className="leading-[1.7]" style={{ fontSize: "var(--body-font-size)" }}>
              Продавець зобов'язується передати у власність Покупця товар,
              обраний на сайті, а Покупець — прийняти та оплатити його на
              умовах цього договору.
            </p>
          </section>

          <section className="flex flex-col gap-[10px]">
            <h2 className="font-bold text-body uppercase tracking-widest">
              2. Оформлення замовлення
            </h2>
            <p className="leading-[1.7]" style={{ fontSize: "var(--body-font-size)" }}>
              Замовлення оформлюється через кошик на сайті. Після
              оформлення Продавець зв'язується з Покупцем для підтвердження
              складу замовлення, вартості та умов доставки. Договір
              вважається укладеним з моменту підтвердження замовлення
              обома сторонами.
            </p>
          </section>

          <section className="flex flex-col gap-[10px]">
            <h2 className="font-bold text-body uppercase tracking-widest">
              3. Ціна та оплата
            </h2>
            <p className="leading-[1.7]" style={{ fontSize: "var(--body-font-size)" }}>
              Ціна товару вказується на сайті у гривнях і може включати
              знижку залежно від обсягу замовлення. Оплата здійснюється у
              повному обсязі до моменту відвантаження товару, якщо інше не
              погоджено сторонами індивідуально. Вартість доставки
              оплачується окремо та не входить у вартість товару.
            </p>
          </section>

          <section className="flex flex-col gap-[10px]">
            <h2 className="font-bold text-body uppercase tracking-widest">
              4. Доставка
            </h2>
            <p className="leading-[1.7]" style={{ fontSize: "var(--body-font-size)" }}>
              Доставка здійснюється службою доставки за адресою, вказаною
              Покупцем при оформленні замовлення, після узгодження деталей
              з менеджером. У разі відсутності Покупця за вказаною адресою
              або відмови від отримання товару, витрати на доставку
              покладаються на Покупця.
            </p>
          </section>

          <section className="flex flex-col gap-[10px]">
            <h2 className="font-bold text-body uppercase tracking-widest">
              5. Якість товару
            </h2>
            <p className="leading-[1.7]" style={{ fontSize: "var(--body-font-size)" }}>
              Продавець гарантує відповідність товару заявленим
              характеристикам та належну якість на момент передачі
              Покупцю. Усна консультація менеджера має інформаційний
              характер і не є гарантійним зобов'язанням.
            </p>
          </section>

          <section className="flex flex-col gap-[10px]">
            <h2 className="font-bold text-body uppercase tracking-widest">
              6. Відповідальність сторін
            </h2>
            <p className="leading-[1.7]" style={{ fontSize: "var(--body-font-size)" }}>
              Сторони звільняються від відповідальності за часткове або
              повне невиконання зобов'язань, якщо це стало наслідком
              обставин непереборної сили (війна, стихійне лихо, дії органів
              влади, епідемія тощо).
            </p>
          </section>

          <section className="flex flex-col gap-[10px]">
            <h2 className="font-bold text-body uppercase tracking-widest">
              7. Зміна умов договору
            </h2>
            <p className="leading-[1.7]" style={{ fontSize: "var(--body-font-size)" }}>
              Продавець залишає за собою право змінювати умови цього
              договору та ціни на товари в односторонньому порядку. Зміни
              набувають чинності з моменту публікації на сайті й не
              поширюються на замовлення, вже підтверджені та оплачені
              Покупцем.
            </p>
          </section>

          <section className="flex flex-col gap-[10px]">
            <h2 className="font-bold text-body uppercase tracking-widest">
              8. Контакти Продавця
            </h2>
            <p className="leading-[1.7]" style={{ fontSize: "var(--body-font-size)" }}>
              Контактні дані Продавця вказані в футері сайту.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
