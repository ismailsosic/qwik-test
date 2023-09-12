// src/components/CollectionPage.tsx
import { BuilderComponent, component$ } from '@builder.io/qwik';
import { Builder } from '@builder.io/widgets';
import Header from '../header/header';


// Replace with your Public API Key.
Builder.init("6055bf1e91684892ad784b7b31b68b9d");

export default function component$({ urlPath }: { urlPath: string }) {
  return (
    <>
      <Header />
      <BuilderComponent model="collection-hero" urlPath={urlPath} />
    </>
  );
}
