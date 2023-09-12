import { component$, useStore } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  fetchOneEntry,
  Content,
  getBuilderSearchParams,
  type RegisteredComponent,
} from "@builder.io/sdk-qwik";

export const BUILDER_PUBLIC_API_KEY = "6055bf1e91684892ad784b7b31b68b9d"; // <-- Add your Builder public API key here
export const BUILDER_MODEL = "page";

// Example component to use the in the drag and drop editor
// https://www.builder.io/c/docs/custom-components-setup
export const MyFunComponent = component$((props: { text: string }) => {
  const state = useStore({
    count: 0,
  });

  return (
    <div>
      <h3>{props.text.toUpperCase()}</h3>
      <p>{state.count}</p>
      <button onClick$={() => state.count++}>Dodaj</button>
    </div>
  );
});

export const CardComponent = component$(() => {
  const state = useStore({
    name: "Crna Dusa",
    author: "Ahmet M. Rahmanovic",
    type: "Roman"
  })
  return(
    <div class="card">
      <h2>Naziv knjige: {state.name}</h2>
      <h3>Ime autora: {state.author}</h3>
      <h4>Vrsta knjige: {state.type}</h4>
    </div>
  )
})

// You will find these components in the "custom components"
// section of the visual editor
// You can also turn on "components only mode" to limit
// editing to only these components 
// https://www.builder.io/c/docs/guides/components-only-mode
export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
  {
    component: MyFunComponent,
    name: "MyFunComponent",
    inputs: [
      {
        name: "text",
        type: "string",
        defaultValue: "Hello world",
      },
    ],
  },
  {
    component: CardComponent,
    name: "CardComponent",
    inputs: [
      {
        name: "text",
        type: "string",
        defaultValue: ""
      }
    ]
  }
];

// Use Qwik City's `useBuilderContent` to get your content from Builder.
// `routeLoader$()` takes an async function to fetch content
// from Builder with `getContent()`.
export const useBuilderContent = routeLoader$(async ({ url, error }) => {
  const isPreviewing = url.searchParams.has("builder.preview");

  const builderContent = await fetchOneEntry({
    model: BUILDER_MODEL,
    apiKey: BUILDER_PUBLIC_API_KEY,
    options: getBuilderSearchParams(url.searchParams),
    userAttributes: {
      urlPath: url.pathname,
    },
  });

  // If there's no content, throw a 404.
  // You can use your own 404 component here
  if (!builderContent && !isPreviewing) {
    throw error(404, "Page not found");
  }
  // return content fetched from Builder, which is JSON
  return builderContent;
});

export default component$(() => {
  const content = useBuilderContent();

  // RenderContent uses `content` to
  // render the content of the given model, here a page,
  // of your space (specified by the API Key)
  return (
    <Content
      model={BUILDER_MODEL}
      content={content.value}
      apiKey={BUILDER_PUBLIC_API_KEY}
      customComponents={CUSTOM_COMPONENTS}
    />
  );
});