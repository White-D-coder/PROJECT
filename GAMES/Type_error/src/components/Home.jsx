
const Home = ({ onGame }) => {
    return (
        <div className="home">
            <div className="title">NOTE</div>
            <div className="author">
                Design by deep
            </div>
            <button onClick={() => onGame('playing')} className='btnPlay'>Play Game</button>
        </div>
    );
};

export default Home;