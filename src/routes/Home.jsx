import Grid from "../components/home/Grid";
import Controls from "../components/home/Controls";
import Header from "../components/Header";
import Footer from "../components/footer";

const Home = () => {
  return (
    <>
      <Header />
      <div>

        <Controls />
        <Grid />
      </div>
      <Footer/>
    </>
  );
};
export default Home;
