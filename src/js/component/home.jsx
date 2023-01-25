import React, { useState, useEffect, useRef } from "react";

// create your first component
const Home = () => {
  const [numero, setnumero] = useState(0);
  const [songs, setSongs] = useState([]);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/sound/songs")
      .then((response) => response.json())
      .then((data) => setSongs(data));
  }, []);
 
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src =
        "https://assets.breatheco.de/apis/sound/" + songs[numero].url;
      audioRef.current.play();
    }
  }, [numero]);

  const play = (index) => {
    setnumero(index);
    setPlaying(true);
    audioRef.current.play();
  };

  const pause = () => {
    setPlaying(false);
    audioRef.current.pause();
  };

  if (songs.length > 0 && numero >= 0 && numero < songs.length) {
    return (
      <>
        <div class="row justify-content-center">
          <div className="col-6 p-3 mb-2 bg-light text-dark border border-dark">
            <div className="wrapper">
              <audio
                className="d-flex ms-auto me-auto mb-2"
                ref={audioRef}
                id="audioPlayer"
              />
              <div className="container bg-light text-dark sticky-sm-bottom">
                <ol className="overflow-auto">
                  {songs.map((item, index) => (
                    <li
                      key={index}
                      className={
                        index === numero && playing ? "bg-primary" : "white"
                      }
                    >
                      <button
                        className="btn text-dark"
                        onClick={() => play(index)}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}{" "}
                </ol>
                <div className="d-flex justify-content-center">

                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        numero == 0 ? setnumero(21) : setnumero(numero - 1)
                      }
                    >
                      <i class="fas fa-angle-double-left"></i>
                    </button>
                    <button
                      className="btn btn-primary mx-3"
                      onClick={() => (playing ? pause() : play(numero))}
                    >
                      {playing ? (
                        <i class="fas fa-pause"></i>
                      ) : (
                        <i class="fas fa-play"></i>
                      )}
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        numero == 21 ? setnumero(0) : setnumero(numero + 1)
                      }
                    >
                     <i class="fas fa-angle-double-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
      </>
      
    );
  }
  return <div>Loading...</div>;
};

export default Home;
