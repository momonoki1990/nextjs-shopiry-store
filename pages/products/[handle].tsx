import React from "react";
import { GetServerSideProps } from "next";
import client from "lib/client";
import Layout from "components/common/Layout";
import ProductImage from "components/product/ProductImage";
import ProductDetail from "components/product/ProductDetail";

type Props = {
  product: {};
};

const Product: React.FC<Props> = ({ product }) => {
  console.log(product)
  return (
    <Layout>
      <article className="product">
        <section className="container md:grid md:grid-cols-2">
          <div className="product__image">
            <ProductImage />
          </div>
          <div className="product__detail">
            <ProductDetail />
          </div>
        </section>
      </article>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const handle = context.params.handle as string;
  const product = await client.product.fetchByHandle(handle);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
};

export default Product;
