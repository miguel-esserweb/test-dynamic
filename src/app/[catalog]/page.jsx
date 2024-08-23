import dynamic from "next/dynamic";
import fs from "fs";
import path from "path";

const getComponentsPaths = () => {
  const ModelsDirectory = path.join(
    process.cwd(),
    "src",
    "components",
    "Kia",
    "Model"
  );

  const filesData = fs.readdirSync(ModelsDirectory);

  const filesNames = filesData.map((file) => file.replace(".jsx", ""));

  console.log(filesNames);

  return filesNames;
};

const modelsAutoland = [
  "Picanto",
  //   "Soul",
  //   "Sportage",
  //   "Selos",
  //   "Sorento",
  //   "Telluri",
  //   "Carnival",
  //   "K4",
  //   "K3",
  //   "EV6",
  //   "Stinger",
  //   "Niro",
  //   "K8",
  //   "K9",
  //   "Forte",
  "Ceed",
  //   "K5",
];

export async function generateStaticParams() {
  return [{ catalog: "Picanto" }, { catalog: "Ceed" }, { catalog: "ford" }];
}

const Page = ({ params }) => {
  const files = getComponentsPaths();

  const { catalog } = params;

  let Component;

  const filesExist = files.some((file) => file === catalog);
  console.log(filesExist);

  if (filesExist) {
    Component = dynamic(() => import(`@/components/Kia/model/${catalog}`));
  }

  return <>{Component ? <Component /> : <div>No existe</div>}</>;
};

export default Page;
