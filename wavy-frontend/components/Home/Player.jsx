import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearSelectedTrack } from '../../features/musicSlice';

function Player({ selectedTrack, tracks }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef(null);
    // const [currentTime, setCurrentTime] = useState(0);
    // const [duration, setDuration] = useState(0);
    // const progressRef = useRef(null);


    useEffect(() => {
        if (selectedTrack && tracks) {
            const index = tracks.findIndex(track => track._id === selectedTrack._id);
            if (index !== -1) {
                setCurrentIndex(index);
            }
            setIsPlaying(true)
        }
    }, [selectedTrack, tracks]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleCanPlay = () => {
            if (isPlaying && audio.paused) {
                audio.play().catch((error) => {
                    console.error('Error playing audio:', error);
                });
            }
        };

        audio.addEventListener('canplay', handleCanPlay);

        // audio.load(); //remove to prevent resetting the audio

        return () => {
            audio.removeEventListener('canplay', handleCanPlay);
        };
    }, [currentIndex, isPlaying]);


    // const updateSliderBackground = (value, max) => {
    //     const percentage = (value / max) * 100;
    //     if (progressRef.current) {
    //         progressRef.current.style.background = `linear-gradient(to right, var(--slider-start-color) 0%, var(--slider-end-color) ${percentage}%, var(--slider-track-color) ${percentage}%, var(--slider-track-color) 100%)`;
    //     }
    // };



    // const handleSliderChange = (e) => {
    //     const newTime = parseFloat(e.target.value);
    //     audioRef.current.currentTime = newTime;
    //     setCurrentTime(newTime);

    //     const percentage = (newTime / duration) * 100;
    //     e.target.style.background = `linear-gradient(to right, #4b0082 0%, #8a2be2 ${percentage}%, #444 ${percentage}%, #444 100%)`;
    // };



    const handlePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.paused) {
            audio.play().catch((error) => {
                console.error('Error playing audio:', error);
            });
            setIsPlaying(true);
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    };


    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };

    const handleNext = debounce(() => {
        setCurrentIndex(prev => (prev + 1) % tracks.length);
        setIsPlaying(true);
    }, 300);

    const handlePrev = () => {
        setCurrentIndex(prev => (prev - 1 + tracks.length) % tracks.length);
        setIsPlaying(true);
    };

    const currentTrack = tracks[currentIndex];


    // useEffect(() => {
    //     const audio = audioRef.current;

    //     const updateTime = () => {
    //         setCurrentTime(audio.currentTime);
    //         updateSliderBackground(audio.currentTime, audio.duration);
    //     };

    //     const updateDuration = () => {
    //         setDuration(audio.duration);
    //         updateSliderBackground(audio.currentTime, audio.duration);
    //     };

    //     if (audio) {
    //         audio.addEventListener('timeupdate', updateTime);
    //         audio.addEventListener('loadedmetadata', updateDuration);
    //     }

    //     return () => {
    //         if (audio) {
    //             audio.removeEventListener('timeupdate', updateTime);
    //             audio.removeEventListener('loadedmetadata', updateDuration);
    //         }
    //     };
    // }, [currentTrack]);

    // useEffect(() => {
    //     if (audioRef.current) {
    //         audioRef.current.currentTime = 0;
    //         setCurrentTime(0);
    //         updateSliderBackground(0, duration);
    //     }
    // }, [currentIndex, duration]);

    const dispatch = useDispatch()

    function handleClose() {
        dispatch(clearSelectedTrack())
    }

    return (
        <div className='py-4 mt-4'>
            <div className='flex justify-center sm:px-6'>
                <div className='rounded-3xl text-white flex flex-col bg-gradient-to-r from-purple to-indigo-900 md:flex-row w-full max-w-md sm:max-w-lg md:max-w-3xl border shadow-lg'>

                    {/* Cover + Title */}
                    <div className='lg:px-14 md:px-10 py-4 flex flex-col items-center'>
                        <h1 className='font-bold text-2xl lg:pt-4 sm:text-2xl md:text-3xl text-center mb-4 text-nowrap w-full overflow-hidden text-ellipsis'>
                            Music Player
                        </h1>

                        <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 mt-2">
                            <img
                                src={'../../src/assets/track.png'}
                                alt="Track Cover"
                                className="w-full h-full object-cover spin-infinite"
                            />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className='flex flex-col justify-center px-8 md:px-14 py-4 md:pt-10 pt-4 w-full'>
                        <h1 className="text-base font-semibold md:text-lg">{currentTrack.title}</h1>
                        <p className="text-sm text-gray-300 mt-2">{currentTrack.artist}</p>

                        <audio
                            ref={audioRef}
                            src={`${currentTrack.audio}`}
                            preload="metadata"
                            loop
                            className='my-4 w-full'
                        />
{/* 
                        <input
                            type="range"
                            ref={progressRef}
                            className="custom-slider mt-6"
                            value={currentTime}
                            max={duration || 0}
                            onChange={handleSliderChange}
                        /> */}

                        <div className="flex items-center justify-between gap-4 mt-4 px-2">
                            <button onClick={handlePrev} className="text-white text-lg cursor-pointer">
                                <i className="fa fa-backward"></i>
                            </button>
                            <button onClick={handlePlayPause} className="text-white text-xl cursor-pointer">
                                <i className={`fa ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                            </button>
                            <button onClick={handleNext} className="text-white text-lg cursor-pointer">
                                <i className="fa fa-forward"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <button
                type="button"
                className="lg:w-auto block text-[12px] mx-auto my-5 py-2 mt-6 px-10 text-sm rounded-full bg-gradient-to-r from-blue-800 to-indigo-900 text-white cursor-pointer font-semibold shadow-md transition-all hover:from-blue-600 hover:to-indigo-700"
                onClick={handleClose}
            >
                Close Player
            </button>

        </div>
    );
}

export default Player;













{/* <div className="lg:flex items-end justify-center h-58 p-4 hidden">
                {Array.from({ length: 60 }).map((_, i) => {
                    const gradientOptions = [
                        "from-red-700 via-yellow-500 to-red-500",
                        "from-orange-500 via-red-400 to-pink-500",
                        "from-yellow-300 via-pink-400 to-purple-500",
                        "from-pink-600 via-fuchsia-400 to-indigo-500",
                        "from-purple-700 via-indigo-400 to-blue-500",
                        "from-blue-700 via-cyan-400 to-sky-500",
                        "from-rose-500 via-pink-300 to-fuchsia-400",
                        "from-lime-500 via-green-400 to-emerald-500",
                        "from-yellow-400 via-amber-400 to-orange-500",
                        "from-sky-600 via-blue-400 to-indigo-600",
                    ];
                    const randomGradient = gradientOptions[Math.floor(Math.random() * gradientOptions.length)];
                    const duration = (Math.random() * 1.2 + 0.5).toFixed(2);

                    return (
                        <div
                            key={i}
                            className={`w-2 md:w-3 mx-1 md:mx-2 bg-gradient-to-t ${randomGradient} rounded-full animate-rcbBar`}
                            style={{
                                animationDuration: `${duration}s`,
                                animationDelay: `${(i % 10) * 0.4}s`,
                            }}
                        />
                    );
                })}
            </div> */}