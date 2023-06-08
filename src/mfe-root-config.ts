import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

function showErrorPage(nameMicrofrontend: string) {
  const errorDiv = document.createElement("div");
  errorDiv.innerHTML = `
<div style=" text-align: center; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; display: flex; flex-direction: column; height: 100vh; width: 100vw; background-color:brown; color:white; justify-content: center; align-items: center;">
  <h1 style="font-size: 3rem; color: white;">Ops, aconteceu algum problema do meu lado 🙇, vou investigar 😉</h1>
  <p style="font-size: 1rem; margin-top: 1rem; text-align: center;">Você pode tentar voltar <a  target="_blank" rel="noreferrer"  href="/" style="color: deepskyblue;font-weight: 600;">a tela inicial</a> </p>
  <p style="font-size: 1rem; margin-top: 2rem; text-align: center;">Ou você pode <a  target="_blank" rel="noreferrer" href="https://github.com/gabrielogregorio/mfe-root/issues" style="color: deepskyblue;font-weight: 600;">abrir uma issue 🧑‍💻</a> e informar que o problema aconteceu no microfrontend <strong>${nameMicrofrontend}</strong></a> </p>
</div>
  `;
  document.body.appendChild(errorDiv);
}

applications.forEach((aplication) => {
  return registerApplication({
    ...aplication,
    // @ts-ignore
    app: () =>
      System.import(aplication.name)
        .catch((error) => {
          showErrorPage(aplication.name);
          console.error(
            `Fail on load microfrontend '${aplication.name}`,
            error
          );

          return error;
        })
        .then((microfrontend) => microfrontend),
  });
});

layoutEngine.activate();
start();
