import ProductCard from "../components/ProductCard";
import ketaImg from "../assets/images/keta.webp";
import forelImg from "../assets/images/forel.webp";
import nerkaImg from "../assets/images/nerka.webp";

function Catalog() {
  const products = [
    {
      id: 1,
      name: "кета",
      image: ketaImg,
      price: 1234,
      description: "Благородна — смак гармонії та сили океану.",
    },
    {
      id: 2,
      name: "форель",
      image: forelImg,
      price: 1234,
      description: "Благородна — смак гармонії та сили океану.",
    },
    {
      id: 3,
      name: "нерка",
      image: nerkaImg,
      price: 1234,
      description: "Благородна — смак гармонії та сили океану.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f9f8f5] flex flex-wrap justify-center gap-8 p-8">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          name={p.name}
          image={p.image}
          price={p.price}
          description={p.description}
        />
      ))}
    </div>
  );
}

export default Catalog;
