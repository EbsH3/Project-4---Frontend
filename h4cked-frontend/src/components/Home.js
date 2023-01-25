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
        <p>H4ck th3 j06 m4rket</p>
      </div>
    </section>
  );
};

export default Home;
