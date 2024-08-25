import { Route, Router } from "@solidjs/router";
import { render } from "solid-js/web";
import { Landing } from "@/view/landing";

export function App() {
  return (
    <Router>
      <Route path="/" component={Landing} />
    </Router>
  );
}

export function bootstrap(target: HTMLElement) {
  render(App, target);
}
