import Header from "@components/Header/Header";
import Main from "@components/Main/Main";
import Footer from "@components/Footer/Footer";

const DefaultLayout = () => {
  return (
    <>
      {<Header />}
      <Main />
      <Footer />
    </>
  );
};

export default DefaultLayout;
