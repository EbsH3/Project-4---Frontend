import Giphy from '../assets/giphy.gif';

const Home = () => {
  return (
    <section>
      <img
        style={{
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: 2000,
          height: 1000,
        }}
        src={Giphy}
        alt='code-head'
      />

      <div className='home'>
        <h1>H4CKED</h1>
        <p>Hack into the job market</p>
      </div>
    </section>
  );
};

export default Home;
