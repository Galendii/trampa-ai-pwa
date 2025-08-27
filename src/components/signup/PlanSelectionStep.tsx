"use client";

import React from "react";

// import { Product } from "@/models/subscriptions/product";
import Button, { ButtonProps } from "../ui/Button";
import Card from "../ui/Card";

// import { Container } from './styles';

const PlanSelectionStep: React.FC = () => {
  //   const products = useTracker(() => Meteor.subscribe("products.active"));
  // const { formData, updateFormData } = useWizard();
  // const [products, setProducts] = useState<Record<string, any>>([]);
  const products: any[] = [];
  const borderColors = ["border-primary", "border-secondary"];
  const textColors = ["text-primary", "text-secondary"];
  const buttonVariants: ButtonProps["variant"][] = ["default", "secondary"];
  // useEffect(() => {
  //   if (products.length === 0) {
  //     Meteor.call("products.all", (err: Error, result: Product[]) => {
  //       if (err) {
  //         addToast(err.message, `danger`);
  //         return;
  //       }
  //       setProducts(result);
  //     });
  //   }
  // }, []);

  return (
    <div>
      <h1>Planos</h1>
      <div className="flex justify-around items-center p-8 md:p-4">
        {products.map((product: any, index: number) => (
          <button key={product?.id} className="hover:scale-105">
            <Card.Root
              borderColor={borderColors[index]}
              hoverColor={borderColors[index]}
              key={product._id}
            >
              <h3 className={`${textColors[index]} text-lg mb-2 font-bold`}>
                {product.name}
              </h3>
              <p>{product.description}</p>
              <p>
                Assine agora por apenas:
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.amount)}
              </p>
              <Button
                variant={
                  buttonVariants[index] as unknown as ButtonProps["variant"]
                }
                className="mt-5"
              >
                Assinar agora!
              </Button>
            </Card.Root>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlanSelectionStep;
