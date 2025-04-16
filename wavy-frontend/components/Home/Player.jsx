import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playTrack, pauseTrack } from '../../features/musicPlayerSlice';

function Player({ selectedTrack, tracks, clearTrack }) {
    const dispatch = useDispatch();
    const audioRef = useRef(null);
    const progressRef = useRef(null);

    const currentTrack = useSelector(state => state.player.currentTrack);
    const isPlaying = useSelector(state => state.player.isPlaying);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (selectedTrack && tracks) {
            const index = tracks.findIndex(track => track._id === selectedTrack._id);
            if (index !== -1) {
                setCurrentIndex(index);
                dispatch(playTrack(selectedTrack));
            }
        }
    }, [selectedTrack, tracks, dispatch]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.play().catch(err => console.log('Play Error : ', err));
        } else {
            audio.pause();
        }
    }, [currentTrack, isPlaying]);

    const updateSliderBackground = (value, max) => {
        const percentage = (value / max) * 100;
        if (progressRef.current) {
            progressRef.current.style.background = `linear-gradient(to right, var(--slider-start-color) 0%, var(--slider-end-color) ${percentage}%, var(--slider-track-color) ${percentage}%, var(--slider-track-color) 100%)`;
        }
    };

    const handleSliderChange = (e) => {
        const newTime = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
            updateSliderBackground(newTime, duration);
        }
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            dispatch(pauseTrack());
        } else {
            dispatch(playTrack(currentTrack));
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
        const nextIndex = (currentIndex + 1) % tracks.length;
        setCurrentIndex(nextIndex);
        dispatch(playTrack(tracks[nextIndex]));
    }, 300);

    const handlePrev = () => {
        const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
        setCurrentIndex(prevIndex);
        dispatch(playTrack(tracks[prevIndex]));
    };

    useEffect(() => {
        const audio = audioRef.current;

        const updateTime = () => {
            setCurrentTime(audio.currentTime);
            updateSliderBackground(audio.currentTime, audio.duration);
        };

        const updateDuration = () => {
            setDuration(audio.duration);
            updateSliderBackground(audio.currentTime, audio.duration);
        };

        const handleEnded = () => {
            handleNext();
        };

        if (audio) {
            audio.addEventListener('timeupdate', updateTime);
            audio.addEventListener('loadedmetadata', updateDuration);
            audio.addEventListener('ended', handleEnded);
        }

        return () => {
            if (audio) {
                audio.removeEventListener('timeupdate', updateTime);
                audio.removeEventListener('loadedmetadata', updateDuration);
                audio.removeEventListener('ended', handleEnded);
            }
        };
    }, [currentTrack]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
        }
    }, [currentTrack]);

    const formatTime = (time) => {
        if (isNaN(time)) return "00:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    if (!currentTrack) return null;

    return (
        <div className="flex w-full">

            <div className="fixed bottom-0 left-0 w-full z-50">
                <div className="flex">

                    {/* Invisible space to match sidebar width */}
                    <div className="hidden md:block md:w-48 xl:w-88" />

                    {/* Player actual content */}
                    <div className="flex-1 bg-neutral-800 px-4 py-4">
                        <div className="text-white flex flex-col md:flex-row w-full md:px-8 mx-auto">
                            <div className="flex flex-col justify-center w-full">
                                <div className="absolute top-2 right-2">
                                    <button
                                        onClick={clearTrack}
                                        className="text-gray-300 h-10 w-10 hover:bg-neutral-700 rounded-full text-xl px-2 py-1"
                                        aria-label="Close player"
                                    >
                                        <i className="fa fa-times"></i>
                                    </button>
                                </div>
                                <div className='w-full text-center'>
                                    <h1 className="text-base font-semibold md:text-lg">{currentTrack.title}</h1>
                                    <p className="text-sm text-gray-300 mt-2">{currentTrack.artist}</p>
                                </div>

                                <audio
                                    ref={audioRef}
                                    src={currentTrack.audio}
                                    preload="metadata"
                                    loop
                                />

                                <div className="flex w-full justify-between text-xs md:text-sm lg:text-base">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>


                                <input
                                    type="range"
                                    ref={progressRef}
                                    className="custom-slider mt-2"
                                    value={currentTime}
                                    max={duration || 0}
                                    onChange={handleSliderChange}
                                />

                                <div className="flex items-center justify-between gap-4 mt-3 px-2">
                                    <button onClick={handlePrev} className="text-white text-lg h-10 w-10 rounded-full hover:bg-neutral-700 cursor-pointer">
                                        <i className="fa fa-backward"></i>
                                    </button>
                                    <button onClick={handlePlayPause} className="text-white h-10 w-10 rounded-full hover:bg-neutral-700 text-xl cursor-pointer">
                                        <i className={`fa ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                                    </button>
                                    <button onClick={handleNext} className="text-white text-lg cursor-pointer h-10 w-10 rounded-full hover:bg-neutral-700">
                                        <i className="fa fa-forward"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Player;