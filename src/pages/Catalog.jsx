import ProductSection from "../components/ProductSection";
import forelImg from "../assets/images/forel.webp";

function Catalog() {
  const redCaviarProducts = [
    {
      name: "чавича",
      image: forelImg,
      description: "Благородна — смак гармонії\nта сили океану.",
      price: 1234,
      indicators: [
        { label: "Колір", leftLabel: "Світлий", rightLabel: "Темний", value: 5 },
        { label: "Пружність", leftLabel: "М’яка", rightLabel: "Щільна", value: 4 },
        { label: "Розмір", leftLabel: "Дрібний", rightLabel: "Великий", value: 5 },
      ],
    },
  
    {
      name: "кіжуч",
      image: forelImg,
      description: "Благородна — смак гармонії та сили океану.",
      price: 1234,
      indicators: [
        { label: "Колір", leftLabel: "Світлий", rightLabel: "Темний", value: 4 },
        { label: "Пружність", leftLabel: "М’яка", rightLabel: "Щільна", value: 5 },
        { label: "Розмір", leftLabel: "Дрібний", rightLabel: "Великий", value: 3 },
      ],
    },

    {
      name: "нерка",
      image: forelImg,
      description: "Благородна — смак гармонії та.",
      price: 1234,
      indicators: [
        { label: "Колір", leftLabel: "Світлий", rightLabel: "Темний", value: 2 },
        { label: "Пружність", leftLabel: "М’яка", rightLabel: "Щільна", value: 3 },
        { label: "Розмір", leftLabel: "Дрібний", rightLabel: "Великий", value: 4 },
      ],
    },

    {
      name: "горбуша",
      image: forelImg,
      description: "Благородна — смак гармонії та сили океану.",
      price: 1234,
      indicators: [
        { label: "Колір", leftLabel: "Світлий", rightLabel: "Темний", value: 3 },
        { label: "Пружність", leftLabel: "М’яка", rightLabel: "Щільна", value: 3 },
        { label: "Розмір", leftLabel: "Дрібний", rightLabel: "Великий", value: 3 },
      ],
    },
    {
      name: "кета",
      image: forelImg,
      description: "Благородна — смак гармонії та сили океану.",
      price: 1234,
      indicators: [
        { label: "Колір", leftLabel: "Світлий", rightLabel: "Темний", value: 4 },
        { label: "Пружність", leftLabel: "М’яка", rightLabel: "Щільна", value: 2 },
        { label: "Розмір", leftLabel: "Дрібний", rightLabel: "Великий", value: 4 },
      ],
    },
    {
      name: "форель",
      image: forelImg,
      description: "Благородна — смак гармонії та сили океану.",
      price: 1234,
      indicators: [
        { label: "Колір", leftLabel: "Світлий", rightLabel: "Темний", value: 3 },
        { label: "Пружність", leftLabel: "М’яка", rightLabel: "Щільна", value: 3 },
        { label: "Розмір", leftLabel: "Дрібний", rightLabel: "Великий", value: 2 },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#FEFAF3] px-[60px] py-[80px]">
      <ProductSection
        title="червона ікра"
        description="Отримана з найцінніших видів лососевих риб, червона ікра має насичений смак моря та люксу, маслянисту текстуру, її зерна пружні, блискучі."
        sectionBg="#E9E5DB"
        cardBg="#FEFAF3"
        products={redCaviarProducts}
      />
    </main>
  );
}

export default Catalog;