import HomeView from "../views/home";
import WebAppWrapper from "../wrapper/webapp";

export default function HomePage() {
  return (
    <WebAppWrapper>
      <HomeView />
    </WebAppWrapper>
  );
}
